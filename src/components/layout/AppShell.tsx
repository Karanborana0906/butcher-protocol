import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

const ROUTE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': {
    title: 'COMMAND CENTER',
    subtitle: 'TACTICAL OVERVIEW // ACTIVE TARGETS & TELEMETRY',
  },
  '/intel-feed': {
    title: 'INTEL FEED',
    subtitle: 'RECONNAISSANCE // DISCOVERED TARGET OPPORTUNITIES',
  },
  '/target-database': {
    title: 'TARGET DATABASE',
    subtitle: 'ENCRYPTED REPOSITORY // SAVED & CLASSIFIED TARGETS',
  },
  '/identity-forge': {
    title: 'IDENTITY FORGE',
    subtitle: 'RESUME GENERATION ENGINE // DETERMINISTIC RESUME FORGING',
  },
  '/protocol-scan': {
    title: 'PROTOCOL SCAN',
    subtitle: 'DIAGNOSTIC MATRIX // INTERNAL COMPATIBILITY ESTIMATE',
  },
  '/operations': {
    title: 'OPERATION STATUS',
    subtitle: 'ACTIVE MISSION TRACKER // APPLICATION PIPELINE',
  },
  '/profile': {
    title: 'CAREER PROFILE',
    subtitle: 'OPERATOR CREDENTIALS // VERIFIED CAPABILITIES & TARGETS',
  },
  '/settings': {
    title: 'SYSTEM SETTINGS',
    subtitle: 'CONFIGURATION MATRIX // GEMMA 4 ARCHITECTURE BOUNDARIES',
  },
};

export const AppShell: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const currentInfo = ROUTE_TITLES[location.pathname] || {
    title: 'COMMAND CENTER',
    subtitle: 'BUTCHER PROTOCOL INTELLIGENCE INTERFACE',
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-base)',
        color: 'var(--text-primary)',
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Sidebar */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          backgroundColor: 'var(--bg-base)',
        }}
      >
        <TopBar
          title={currentInfo.title}
          subtitle={currentInfo.subtitle}
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <main
          style={{
            flex: 1,
            padding: '24px',
            overflowY: 'auto',
            maxWidth: '1540px',
            width: '100%',
            margin: '0 auto',
            boxSizing: 'border-box',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
