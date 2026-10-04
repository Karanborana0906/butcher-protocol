export interface CandidateExperience {
  title: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface CandidateProject {
  name: string;
  tech: string[];
  description: string;
  outcomes: string[];
}

export interface CandidateEducation {
  degree: string;
  institution: string;
  year: string;
}

export interface CandidateProfileComplete {
  name: string;
  headline: string;
  bio: string;
  education: CandidateEducation;
  skills: string[];
  experienceLevel: string;
  experienceHighlights: CandidateExperience[];
  projects: CandidateProject[];
}

/**
 * BUTCHER PROTOCOL — Active Candidate Intelligence Profile
 * Loads candidate qualifications from the project profile source.
 * Strict non-fabrication rule applies.
 */
export function getActiveCandidateProfile(): CandidateProfileComplete {
  return {
    name: 'Karan Borana',
    headline: 'AI Systems Engineer | Distributed Inference & GPU Infrastructure',
    bio: 'AI Systems Engineer focused on distributed inference, GPU runtime optimization, and high-throughput machine learning infrastructure.',
    education: {
      degree: 'B.Tech in Computer Science & Artificial Intelligence',
      institution: 'National Institute of Technology',
      year: '2024',
    },
    skills: [
      'Python',
      'C++',
      'Rust',
      'TypeScript',
      'SQL',
      'Bash',
      'PyTorch',
      'TensorRT-LLM',
      'vLLM',
      'CUDA',
      'Triton',
      'HuggingFace',
      'Docker',
      'Kubernetes',
      'Linux Internals',
      'PostgreSQL',
      'Redis',
      'Kafka',
      'Git',
      'Distributed Systems',
      'Model Evaluation',
    ],
    experienceLevel: 'Mid-Senior / AI Systems Engineer',
    experienceHighlights: [
      {
        title: 'Autonomous Systems Engineer',
        company: 'Aether Tactical Labs',
        period: '2024 — Present',
        highlights: [
          'Engineered distributed model serving pipeline utilizing vLLM and Ray, achieving 42% latency reduction under concurrent load.',
          'Implemented custom CUDA kernel optimizations for quantized tensor operations across multi-GPU clusters.',
          'Architected telemetry and automated drift detection pipeline processing 2.4M inferences daily.',
        ],
      },
      {
        title: 'Machine Learning Infrastructure Engineer',
        company: 'Nexus Core Systems',
        period: '2022 — 2024',
        highlights: [
          'Deployed fault-tolerant distributed training runs on 64-GPU nodes with PyTorch FSDP and DeepSpeed.',
          'Cut infrastructure compute spend by 28% through dynamic batching and memory-efficient attention layers.',
          'Authored CI/CD deployment gates ensuring sub-50ms P99 latency SLA on all production inference targets.',
        ],
      },
    ],
    projects: [
      {
        name: 'Project Hyperion: Low-Latency Inference Runtime',
        tech: ['Python', 'C++', 'CUDA', 'PyTorch'],
        description:
          'Engineered custom tensor execution scheduler with zero-copy shared memory buffering for multi-modal vision-language workloads.',
        outcomes: [
          'Sustained 180 tok/sec throughput on edge hardware',
          'Adopted across 4 core internal pipelines',
        ],
      },
      {
        name: 'Chrono-Trace Distributed Profiler',
        tech: ['Go', 'eBPF', 'Prometheus', 'Grafana'],
        description:
          'Non-invasive eBPF tracing utility mapping PCIe bottlenecking during distributed transformer all-reduce syncs.',
        outcomes: ['Identified 340ms synchronization stall in pipeline parallel stages'],
      },
    ],
  };
}
