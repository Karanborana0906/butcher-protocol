import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Radio,
  Database,
  FileText,
  ScanLine,
  Kanban,
  UserCheck,
  Settings,
  LogOut,
  Target,
} from 'lucide-react';
import { Badge } from '../ui/Badge';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'COMMAND CENTER', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'INTEL FEED', path: '/intel-feed', icon: <Radio size={18} /> },
    { label: 'TARGET DATABASE', path: '/target-database', icon: <Database size={18} /> },
    { label: 'IDENTITY FORGE', path: '/identity-forge', icon: <FileText size={18} /> },
    { label: 'PROTOCOL SCAN', path: '/protocol-scan', icon: <ScanLine size={18} /> },
    { label: 'OPERATION STATUS', path: '/operations', icon: <Kanban size={18} /> },
    { label: 'CAREER PROFILE', path: '/profile', icon: <UserCheck size={18} /> },
    { label: 'SYSTEM SETTINGS', path: '/settings', icon: <Settings size={18} /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 5, 6, 0.8)',
            backdropFilter: 'blur(3px)',
            zIndex: 40,
            display: 'block',
          }}
          className="md-hidden"
        />
      )}

      <aside
        style={{
          width: '260px',
          backgroundColor: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          transition: 'transform 0.25s ease-in-out',
        }}
        className={`app-sidebar ${isOpen ? 'sidebar-open' : ''}`}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '20px 18px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'rgba(225, 29, 56, 0.12)',
              border: '1px solid var(--signal-red)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--signal-red)',
              flexShrink: 0,
            }}
          >
            <Target size={18} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: 'var(--text-primary)',
              }}
            >
              BUTCHER
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                color: 'var(--signal-red)',
                fontWeight: 600,
              }}
            >
              PROTOCOL // V1.0
            </span>
          </div>
        </div>

        {/* System Status Banner */}
        <div
          style={{
            padding: '10px 18px',
            backgroundColor: 'rgba(5, 5, 6, 0.6)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Badge variant="ONLINE" size="xs" pulse>
            PROTOCOL ONLINE
          </Badge>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
            }}
          >
            NODE:US-WEST
          </span>
        </div>

        {/* Navigation Items */}
        <nav style={{ flex: 1, padding: '14px 10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              padding: '6px 12px',
            }}
          >
            INTELLIGENCE MODULES
          </div>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '9px 14px',
                textDecoration: 'none',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                borderRadius: 'var(--radius-sm)',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--bg-elevated)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--signal-red)' : '3px solid transparent',
                borderTop: '1px solid',
                borderRight: '1px solid',
                borderBottom: '1px solid',
                borderColor: isActive ? 'var(--border-strong)' : 'transparent',
                transition: 'all 0.15s ease-out',
              })}
            >
              <span style={{ color: 'inherit', display: 'flex' }}>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer Area */}
        <div
          style={{
            padding: '16px',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'rgba(5, 5, 6, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div
            style={{
              padding: '8px 10px',
              backgroundColor: 'rgba(19, 19, 24, 0.7)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'var(--text-muted)',
                }}
              >
                AI MODEL READY
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'var(--intel-blue)',
                  fontWeight: 600,
                }}
              >
                PHASE 3
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-primary)',
                fontWeight: 600,
              }}
            >
              gemma-4-31b-it
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Badge variant="DEVELOPMENT" size="xs">
              DEVELOPMENT DATA
            </Badge>

            <button
              onClick={() => navigate('/login')}
              title="Terminate session"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-heading)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--signal-red)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <LogOut size={13} />
              <span>EXIT</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
