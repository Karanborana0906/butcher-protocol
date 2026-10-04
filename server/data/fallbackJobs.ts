export interface FallbackJob {
  id: string;
  jobId?: string;
  title: string;
  company: string;
  location: string;
  workplaceType: string;
  source: string;
  postedDate: string;
  skills: string[];
  matchPercentage: number;
  priority: string;
  salary: string;
  experienceLevel: string;
  description: string;
  requirements: string[];
}

export const FALLBACK_MOCK_JOBS: FallbackJob[] = [
  {
    id: 'TGT-8901',
    jobId: 'TGT-8901',
    title: 'Staff AI Systems Engineer',
    company: 'Apex Intelligence Labs',
    location: 'San Francisco, CA',
    workplaceType: 'Hybrid',
    source: 'Direct Intel',
    postedDate: '2 hours ago',
    skills: ['Python', 'PyTorch', 'Distributed Systems', 'CUDA', 'vLLM', 'Linux Internals'],
    matchPercentage: 96,
    priority: 'CRITICAL',
    salary: '$180,000 - $220,000',
    experienceLevel: 'Senior / Staff',
    description:
      'Lead the architecture of low-latency distributed inference engines powering autonomous multi-modal agents. You will optimize memory bandwidth across multi-node GPU clusters, author custom CUDA kernels, and integrate dynamic batching with vLLM runtimes.',
    requirements: [
      'Proven expertise profiling and tuning GPU memory pipelines and CUDA kernels',
      'Demonstrated experience with PyTorch distributed frameworks (FSDP, DeepSpeed, Megatron)',
      'Deep fluency in low-level systems (C++, Linux kernel memory management, NUMA nodes)',
      'Experience deploying models in zero-downtime, sub-40ms P99 production environments',
    ],
  },
  {
    id: 'TGT-8902',
    jobId: 'TGT-8902',
    title: 'Autonomous ML Pipeline Architect',
    company: 'Vanguard Defense Systems',
    location: 'Arlington, VA',
    workplaceType: 'On-site',
    source: 'Classified Feed',
    postedDate: '5 hours ago',
    skills: ['PyTorch', 'Docker', 'Kubernetes', 'Python', 'Model Evaluation', 'Edge AI'],
    matchPercentage: 92,
    priority: 'CRITICAL',
    salary: '$165,000 - $205,000',
    experienceLevel: 'Senior',
    description:
      'Develop ruggedized, fault-tolerant machine learning telemetry and automated evaluation pipelines for tactical edge deployment. Requires deep grounding in containerized model orchestration, adversarial robustness testing, and reproducible artifact provenance.',
    requirements: [
      '4+ years building containerized ML training and inference microservices with Kubernetes',
      'Experience implementing automated validation harnesses for deep neural networks',
      'Familiarity with hardware acceleration on constrained edge TPU/SoC architectures',
      'U.S. Citizenship eligible for high-level security adjudication',
    ],
  },
  {
    id: 'TGT-8903',
    jobId: 'TGT-8903',
    title: 'Distributed Deep Learning Researcher',
    company: 'CipherTech Dynamics',
    location: 'Seattle, WA',
    workplaceType: 'Remote',
    source: 'Strategic Wire',
    postedDate: '8 hours ago',
    skills: ['Python', 'PyTorch', 'Distributed Systems', 'Ray Core', 'TensorRT', 'CUDA'],
    matchPercentage: 88,
    priority: 'HIGH',
    salary: '$170,000 - $210,000',
    experienceLevel: 'Mid-Senior',
    description:
      'Drive research and engineering initiatives around scalable parallelization strategies for reasoning-oriented neural networks. Implement 3D parallelism schemas across thousands of accelerators and profile collective communication bottlenecks.',
    requirements: [
      'M.S. or B.S. in Computer Science, Mathematics, or Electrical Engineering',
      'Hands-on implementation experience with Megatron-LM, Ray Train, or custom parallel collectives',
      'Strong grasp of transformer architecture internals, RoPE, and attention kernel variants (FlashAttention)',
    ],
  },
  {
    id: 'TGT-8904',
    jobId: 'TGT-8904',
    title: 'Computer Vision Intelligence Specialist',
    company: 'OmniVision Synthetic Labs',
    location: 'Austin, TX',
    workplaceType: 'Remote',
    source: 'Encrypted Board',
    postedDate: '1 day ago',
    skills: ['OpenCV', 'PyTorch', 'Python', 'CUDA', 'C++', 'Object Detection'],
    matchPercentage: 85,
    priority: 'HIGH',
    salary: '$150,000 - $185,000',
    experienceLevel: 'Mid-Senior',
    description:
      'Engineer real-time multi-spectral sensor fusion pipelines. Transform high-bandwidth video streams into tactical semantic state representations using state-of-the-art vision backbones and spatial-temporal graphs.',
    requirements: [
      'Experience deploying real-time vision pipelines with TensorRT and OpenCV',
      'Familiarity with multi-camera calibration and 3D bounding volume reconstruction',
      'Strong Python and modern C++ (C++17/20) systems programming ability',
    ],
  },
  {
    id: 'TGT-8905',
    jobId: 'TGT-8905',
    title: 'Model Quantization & Inference Engineer',
    company: 'Kestrel Aerospace',
    location: 'Denver, CO',
    workplaceType: 'Hybrid',
    source: 'Direct Intel',
    postedDate: '1 day ago',
    skills: ['Python', 'C++', 'TensorRT-LLM', 'Model Quantization', 'Linux Internals'],
    matchPercentage: 79,
    priority: 'MEDIUM',
    salary: '$140,000 - $175,000',
    experienceLevel: 'Mid-Level',
    description:
      'Specialize in post-training quantization (AWQ, GPTQ, FP8) and weight-only pruning for mission-critical flight avionics inference pods.',
    requirements: [
      'Deep understanding of quantization noise mitigation and calibration datasets',
      'Proficiency writing C++ wrappers around ONNX Runtime and TensorRT',
      'Solid software engineering habits: Git, CI/CD pipelines, unit testing',
    ],
  },
  {
    id: 'TGT-8906',
    jobId: 'TGT-8906',
    title: 'Security Operations & AI Threat Analyst',
    company: 'Blackwatch Cyber Ops',
    location: 'Reston, VA',
    workplaceType: 'On-site',
    source: 'Classified Feed',
    postedDate: '2 days ago',
    skills: ['Python', 'Threat Detection', 'Model Evaluation', 'Linux Internals', 'Docker'],
    matchPercentage: 72,
    priority: 'LOW',
    salary: '$135,000 - $165,000',
    experienceLevel: 'Mid-Level',
    description:
      'Audit AI agent tool execution boundaries, jailbreak vulnerabilities, and data provenance pipelines in secure mission enclaves.',
    requirements: [
      'Experience analyzing prompt injection vectors and agent sandboxing escape methods',
      'Working knowledge of SIEM tools, network telemetry, and Linux auditing frameworks (auditd)',
      'Active Security+ or equivalent certification preferred',
    ],
  },
];
