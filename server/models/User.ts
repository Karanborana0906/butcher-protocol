import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  securityBadge: string;
  clearanceStatus: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    securityBadge: {
      type: String,
      default: 'OPERATOR-DELTA-9',
    },
    clearanceStatus: {
      type: String,
      default: 'ACTIVE ADJUDICATION (SECRET ELIGIBLE)',
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
