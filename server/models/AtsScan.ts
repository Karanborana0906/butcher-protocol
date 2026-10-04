import mongoose, { Schema, Document } from 'mongoose';

export interface IAtsScan extends Document {
  userId?: mongoose.Types.ObjectId | string;
  resumeId?: string;
  jobId: string;
  atsReadiness: number;
  keywordCoverage: number;
  skillMatch: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendations: string[];
  diagnosticNotes: {
    category: 'PASSED' | 'OPTIMIZATION' | 'CRITICAL';
    message: string;
  }[];
  disclaimer: string;
  createdAt: Date;
}

const AtsScanSchema = new Schema<IAtsScan>(
  {
    userId: {
      type: Schema.Types.Mixed,
      default: 'DEFAULT_OPERATOR',
    },
    resumeId: {
      type: String,
      default: '',
    },
    jobId: {
      type: String,
      required: true,
    },
    atsReadiness: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    keywordCoverage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    skillMatch: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    matchedSkills: {
      type: [String],
      default: [],
    },
    missingSkills: {
      type: [String],
      default: [],
    },
    recommendations: {
      type: [String],
      default: [],
    },
    diagnosticNotes: [
      {
        category: {
          type: String,
          enum: ['PASSED', 'OPTIMIZATION', 'CRITICAL'],
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
      },
    ],
    disclaimer: {
      type: String,
      default: 'INTERNAL COMPATIBILITY ESTIMATE',
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const AtsScan = mongoose.models.AtsScan || mongoose.model<IAtsScan>('AtsScan', AtsScanSchema);
export default AtsScan;
