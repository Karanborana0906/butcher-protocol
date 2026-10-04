import mongoose, { Schema, Document } from 'mongoose';

export interface ISavedJob extends Document {
  userId?: mongoose.Types.ObjectId | string;
  jobId: string;
  savedAt: Date;
}

const SavedJobSchema = new Schema<ISavedJob>(
  {
    userId: {
      type: Schema.Types.Mixed,
      default: 'DEFAULT_OPERATOR',
      required: true,
    },
    jobId: {
      type: String,
      required: true,
      trim: true,
    },
    savedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

// Compound index to ensure uniqueness per user and job
SavedJobSchema.index({ userId: 1, jobId: 1 }, { unique: true });

export const SavedJob = mongoose.models.SavedJob || mongoose.model<ISavedJob>('SavedJob', SavedJobSchema);
export default SavedJob;
