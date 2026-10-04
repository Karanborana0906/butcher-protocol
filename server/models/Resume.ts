import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
  userId?: mongoose.Types.ObjectId | string;
  type: 'BASE' | 'FORGED';
  targetJobId?: string;
  targetRole: string;
  targetCompany: string;
  candidateName: string;
  headline: string;
  summary: string;
  tailoredSkills: string[];
  experienceHighlights: {
    title: string;
    company: string;
    period: string;
    highlights: string[];
  }[];
  projects: {
    name: string;
    tech: string[];
    description: string;
    outcomes: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  };
  integrityVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema = new Schema<IResume>(
  {
    userId: {
      type: Schema.Types.Mixed,
      default: 'DEFAULT_OPERATOR',
    },
    type: {
      type: String,
      enum: ['BASE', 'FORGED'],
      default: 'FORGED',
    },
    targetJobId: {
      type: String,
      default: '',
    },
    targetRole: {
      type: String,
      required: true,
    },
    targetCompany: {
      type: String,
      required: true,
    },
    candidateName: {
      type: String,
      required: true,
    },
    headline: {
      type: String,
      default: '',
    },
    summary: {
      type: String,
      default: '',
    },
    tailoredSkills: {
      type: [String],
      default: [],
    },
    experienceHighlights: [
      {
        title: { type: String, required: true },
        company: { type: String, required: true },
        period: { type: String, required: true },
        highlights: { type: [String], default: [] },
      },
    ],
    projects: [
      {
        name: { type: String, required: true },
        tech: { type: [String], default: [] },
        description: { type: String, default: '' },
        outcomes: { type: [String], default: [] },
      },
    ],
    education: {
      degree: { type: String, default: '' },
      institution: { type: String, default: '' },
      year: { type: String, default: '' },
    },
    integrityVerified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Resume = mongoose.models.Resume || mongoose.model<IResume>('Resume', ResumeSchema);
export default Resume;
