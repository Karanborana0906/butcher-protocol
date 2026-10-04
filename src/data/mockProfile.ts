/**
 * BUTCHER PROTOCOL — User Career Intelligence Profile
 * Editable baseline data for resume forging and deterministic matching.
 */

export interface UserCareerProfile {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    securityBadge: string;
    clearanceStatus: string;
    bio: string;
  };
  education: {
    degree: string;
    college: string;
    graduationYear: string;
    gpa: string;
    honors: string;
  };
  skills: {
    programming: string[];
    aiml: string[];
    data: string[];
    tools: string[];
  };
  careerTargets: {
    desiredRoles: string[];
    targetLocations: string[];
    remotePreference: 'Remote' | 'Hybrid' | 'Flexible' | 'On-site';
    minimumCompensation: string;
    availability: string;
  };
  links: {
    github: string;
    linkedin: string;
    portfolio: string;
  };
}

export const INITIAL_USER_PROFILE: UserCareerProfile = {
  personal: {
    fullName: 'Karan Borana',
    email: 'karan.borana@protocol.intel',
    phone: '+1 (555) 019-4821',
    location: 'San Francisco, CA',
    securityBadge: 'OPERATOR-DELTA-9',
    clearanceStatus: 'ACTIVE ADJUDICATION (SECRET ELIGIBLE)',
    bio: 'AI Systems Engineer focused on distributed inference, GPU runtime optimization, and high-throughput machine learning infrastructure.',
  },
  education: {
    degree: 'B.Tech in Computer Science & Artificial Intelligence',
    college: 'National Institute of Technology',
    graduationYear: '2024',
    gpa: '3.92 / 4.00',
    honors: 'Summa Cum Laude, Dean’s Honors Research Fellow',
  },
  skills: {
    programming: ['Python', 'C++', 'CUDA', 'Rust', 'Go', 'TypeScript', 'SQL', 'Bash'],
    aiml: [
      'PyTorch',
      'vLLM',
      'TensorRT-LLM',
      'Distributed Systems',
      'DeepSpeed',
      'Ray Core',
      'Hugging Face',
      'Model Quantization (AWQ/FP8)',
    ],
    data: ['PostgreSQL', 'Redis', 'Milvus', 'DuckDB', 'Apache Arrow', 'Parquet'],
    tools: ['Docker', 'Kubernetes', 'Linux Internals', 'Git', 'Prometheus', 'Grafana', 'eBPF'],
  },
  careerTargets: {
    desiredRoles: [
      'Staff AI Systems Engineer',
      'Autonomous ML Pipeline Architect',
      'Distributed Deep Learning Researcher',
      'Machine Learning Infrastructure Engineer',
    ],
    targetLocations: ['San Francisco, CA', 'Seattle, WA', 'Austin, TX', 'Remote / US'],
    remotePreference: 'Flexible',
    minimumCompensation: '$160,000 / year',
    availability: 'Immediate (2 weeks notice)',
  },
  links: {
    github: 'https://github.com/karanborana',
    linkedin: 'https://linkedin.com/in/karanborana',
    portfolio: 'https://karanborana.systems',
  },
};
