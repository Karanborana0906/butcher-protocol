import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { CommandCenterPage } from './pages/CommandCenterPage';
import { IntelFeedPage } from './pages/IntelFeedPage';
import { IdentityForgePage } from './pages/IdentityForgePage';
import { ProtocolScanPage } from './pages/ProtocolScanPage';
import { OperationsPage } from './pages/OperationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { TargetDatabasePage } from './pages/TargetDatabasePage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Application Command Center Shell */}
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<CommandCenterPage />} />
          <Route path="/intel-feed" element={<IntelFeedPage />} />
          <Route path="/target-database" element={<TargetDatabasePage />} />
          <Route path="/identity-forge" element={<IdentityForgePage />} />
          <Route path="/protocol-scan" element={<ProtocolScanPage />} />
          <Route path="/operations" element={<OperationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
