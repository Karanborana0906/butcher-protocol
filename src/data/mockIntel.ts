/**
 * BUTCHER PROTOCOL — System Intelligence Telemetry
 * Provides system-wide aggregate metrics for the Command Center.
 */

export interface SystemTelemetry {
  targetsAcquired: number;
  highMatchTargets: number;
  atsReadinessEstimate: number;
  activeOperations: number;
  systemStatus: 'PROTOCOL ONLINE' | 'CALIBRATING' | 'RECON SILENT';
  modelTarget: 'gemma-4-31b-it';
  recentSignals: {
    id: string;
    timestamp: string;
    type: 'DISCOVERY' | 'ANALYSIS' | 'FORGE' | 'STATUS_CHANGE';
    title: string;
    details: string;
    priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  }[];
}

export const SYSTEM_TELEMETRY: SystemTelemetry = {
  targetsAcquired: 48,
  highMatchTargets: 18,
  atsReadinessEstimate: 84, // Internal compatibility estimate
  activeOperations: 7,
  systemStatus: 'PROTOCOL ONLINE',
  modelTarget: 'gemma-4-31b-it',
  recentSignals: [
    {
      id: 'SIG-901',
      timestamp: '12m ago',
      type: 'DISCOVERY',
      title: 'Target Acquired: Apex Intelligence Labs',
      details: 'Staff AI Systems Engineer requisition matched (96% compatibility). High GPU runtime alignment.',
      priority: 'CRITICAL',
    },
    {
      id: 'SIG-902',
      timestamp: '44m ago',
      type: 'STATUS_CHANGE',
      title: 'Operation Advance: Vanguard Defense Systems',
      details: 'Application status verified: Security questionnaire and technical dossier dispatched.',
      priority: 'HIGH',
    },
    {
      id: 'SIG-903',
      timestamp: '1h ago',
      type: 'ANALYSIS',
      title: 'Protocol Scan Completed: CipherTech Requisition',
      details: 'Internal compatibility: 88%. Missing skill identified: Ray Core parallelism specifics.',
      priority: 'MEDIUM',
    },
    {
      id: 'SIG-904',
      timestamp: '3h ago',
      type: 'FORGE',
      title: 'Identity Forged: Requisition TGT-8901',
      details: 'Deterministic tailoring completed. Zero synthetic credentials injected. Ready for export.',
      priority: 'HIGH',
    },
  ],
};
