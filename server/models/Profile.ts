import mongoose, { Schema, Document } from 'mongoose';

export interface IProfile extends Document {
  userId?: mongoose.Types.ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    personal: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      securityBadge: { type: String, default: 'OPERATOR-DELTA-9' },
      clearanceStatus: { type: String, default: 'ACTIVE ADJUDICATION (SECRET ELIGIBLE)' },
      bio: { type: String, default: '' },
    },
    education: {
      degree: { type: String, default: '' },
      college: { type: String, default: '' },
      graduationYear: { type: String, default: '' },
      gpa: { type: String, default: '' },
      honors: { type: String, default: '' },
    },
    skills: {
      programming: { type: [String], default: [] },
      aiml: { type: [String], default: [] },
      data: { type: [String], default: [] },
      tools: { type: [String], default: [] },
    },
    careerTargets: {
      desiredRoles: { type: [String], default: [] },
      targetLocations: { type: [String], default: [] },
      remotePreference: {
        type: String,
        enum: ['Remote', 'Hybrid', 'Flexible', 'On-site'],
        default: 'Flexible',
      },
      minimumCompensation: { type: String, default: '' },
      availability: { type: String, default: 'Immediate' },
    },
    links: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      portfolio: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

export const Profile = mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);
export default Profile;
