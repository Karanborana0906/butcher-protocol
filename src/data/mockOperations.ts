/**
 * BUTCHER PROTOCOL — Mock Application Operations (Kanban)
 * Tracks user application lifecycles across tactical operational stages.
 */

export type OperationStatus = 'SAVED' | 'APPLIED' | 'INTERVIEW' | 'REJECTED' | 'OFFER';

export interface OperationCardItem {
  id: string;
  jobId: string;
  title: string;
  company: string;
  location: string;
  matchScore: number;
  status: OperationStatus;
  appliedDate?: string;
  nextStep?: string;
  salary?: string;
  notes?: string;
}

export const INITIAL_OPERATIONS: OperationCardItem[] = [
  {
    id: 'OP-101',
    jobId: 'TGT-8901',
    title: 'Staff AI Systems Engineer',
    company: 'Apex Intelligence Labs',
    location: 'San Francisco, CA',
    matchScore: 96,
    status: 'INTERVIEW',
    appliedDate: '2026-09-28',
    nextStep: 'System Architecture & CUDA Profiling Screen (Tomorrow 14:00 PST)',
    salary: '$180,000 - $220,000',
    notes: 'Recruiter commended custom runtime project benchmarks.',
  },
  {
    id: 'OP-102',
    jobId: 'TGT-8902',
    title: 'Autonomous ML Pipeline Architect',
    company: 'Vanguard Defense Systems',
    location: 'Arlington, VA',
    matchScore: 92,
    status: 'APPLIED',
    appliedDate: '2026-10-01',
    nextStep: 'Security Verification & Requisition Review',
    salary: '$165,000 - $205,000',
    notes: 'Tailored resume submitted highlighting containerization and edge TPU experience.',
  },
  {
    id: 'OP-103',
    jobId: 'TGT-8903',
    title: 'Distributed Deep Learning Researcher',
    company: 'CipherTech Dynamics',
    location: 'Seattle, WA',
    matchScore: 88,
    status: 'SAVED',
    appliedDate: undefined,
    nextStep: 'Identity Forge awaiting execution',
    salary: '$170,000 - $210,000',
    notes: 'Target matches Ray Core and Megatron-LM focus.',
  },
  {
    id: 'OP-104',
    jobId: 'TGT-8904',
    title: 'Computer Vision Intelligence Specialist',
    company: 'OmniVision Synthetic Labs',
    location: 'Austin, TX',
    matchScore: 85,
    status: 'APPLIED',
    appliedDate: '2026-09-30',
    nextStep: 'Awaiting Technical Screening invitation',
    salary: '$150,000 - $185,000',
    notes: 'Emphasized TensorRT acceleration and OpenCV spatial graphs.',
  },
  {
    id: 'OP-105',
    jobId: 'TGT-8905',
    title: 'Model Quantization & Inference Engineer',
    company: 'Kestrel Aerospace',
    location: 'Denver, CO',
    matchScore: 79,
    status: 'INTERVIEW',
    appliedDate: '2026-09-24',
    nextStep: 'Technical Deep-Dive with Flight Software Lead',
    salary: '$140,000 - $175,000',
    notes: 'Completed initial phone screen. Focus will be on AWQ quantization noise limits.',
  },
  {
    id: 'OP-106',
    jobId: 'TGT-8906',
    title: 'Applied AI Platform Engineer',
    company: 'Hyperion Autonomous Systems',
    location: 'Boston, MA',
    matchScore: 74,
    status: 'SAVED',
    appliedDate: undefined,
    nextStep: 'Protocol Scan pending',
    salary: '$135,000 - $165,000',
    notes: 'Review database query optimization bullet before applying.',
  },
  {
    id: 'OP-107',
    jobId: 'TGT-8907',
    title: 'Cybernetic Systems Safety Auditor',
    company: 'Ironclad Cybernetics',
    location: 'New York, NY',
    matchScore: 68,
    status: 'REJECTED',
    appliedDate: '2026-09-15',
    nextStep: 'Archived for analysis',
    salary: '$145,000 - $180,000',
    notes: 'Role prioritized 5+ years formal red-teaming certification over software infrastructure.',
  },
  {
    id: 'OP-108',
    jobId: 'TGT-8890',
    title: 'Senior Distributed Systems Specialist',
    company: 'Blackbox Cognitive Architecture',
    location: 'Remote',
    matchScore: 94,
    status: 'OFFER',
    appliedDate: '2026-09-10',
    nextStep: 'Counter-offer evaluation and clearance paperwork',
    salary: '$195,000 + Equity',
    notes: 'Official offer package received. Strong match on distributed execution stack.',
  },
];
