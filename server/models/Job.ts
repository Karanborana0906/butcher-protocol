import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  jobId: string;
  externalId?: string;
  title: string;
  company: string;
  location: string;
  workplaceType: 'Remote' | 'On-site' | 'Hybrid';
  source: string;
  postedDate: string;
  skills: string[];
  matchPercentage: number;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  description: string;
  salary: string;
  requirements: string[];
  experienceLevel: string;
  applicationUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>(
  {
    jobId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    externalId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    workplaceType: {
      type: String,
      enum: ['Remote', 'On-site', 'Hybrid'],
      required: true,
      default: 'Remote',
    },
    source: {
      type: String,
      default: 'Direct Intel',
    },
    postedDate: {
      type: String,
      default: 'Recently',
    },
    skills: {
      type: [String],
      default: [],
    },
    matchPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    priority: {
      type: String,
      enum: ['CRITICAL', 'HIGH', 'MEDIUM'],
      default: 'HIGH',
    },
    description: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      default: 'Competitive',
    },
    requirements: {
      type: [String],
      default: [],
    },
    experienceLevel: {
      type: String,
      default: 'Mid-Senior',
    },
    applicationUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: Record<string, any>) => {
        ret.id = ret.jobId || ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes
JobSchema.index({
  title: 'text',
  company: 'text',
  description: 'text',
  skills: 'text',
});

export const Job = mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);
export default Job;
