import mongoose, { Schema, Document } from 'mongoose';

export type OperationStatus = 'SAVED' | 'APPLIED' | 'INTERVIEW' | 'REJECTED' | 'OFFER';

export interface IOperation extends Document {
  userId?: mongoose.Types.ObjectId | string;
  operationId: string;
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
  history: {
    status: OperationStatus;
    timestamp: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const OperationSchema = new Schema<IOperation>(
  {
    userId: {
      type: Schema.Types.Mixed,
      default: 'DEFAULT_OPERATOR',
    },
    operationId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    jobId: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: '',
    },
    matchScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      enum: ['SAVED', 'APPLIED', 'INTERVIEW', 'REJECTED', 'OFFER'],
      default: 'SAVED',
    },
    appliedDate: {
      type: String,
    },
    nextStep: {
      type: String,
    },
    salary: {
      type: String,
    },
    notes: {
      type: String,
    },
    history: [
      {
        status: {
          type: String,
          enum: ['SAVED', 'APPLIED', 'INTERVIEW', 'REJECTED', 'OFFER'],
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Operation = mongoose.models.Operation || mongoose.model<IOperation>('Operation', OperationSchema);
export default Operation;
