import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Job } from '../models/Job.js';
import { analyzeJobWithGemma, tailorResumeWithGemma } from '../services/ai/gemmaService.js';
import { getActiveCandidateProfile } from '../services/profile/candidateProfile.js';
import { config } from '../config/index.js';
import { connectToDatabase } from '../db/mongodb.js';

export const aiRouter = Router();

/**
 * POST /api/ai/analyze-job
 * Real-time Job Analysis using Gemma 4 31B IT
 */
aiRouter.post('/analyze-job', async (req: Request, res: Response) => {
  try {
    const { jobId } = req.body || {};

    // 1. Validate jobId
    if (!jobId || typeof jobId !== 'string' || !jobId.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid "jobId" parameter in request body',
      });
    }

    const cleanJobId = jobId.trim();

    // 2. Validate GEMINI_API_KEY presence
    if (!config.geminiApiKey || config.geminiApiKey.trim() === '') {
      return res.status(503).json({
        success: false,
        error: 'GEMINI_API_KEY is not configured on the server. AI analysis unavailable.',
      });
    }

    // 3. Ensure database is connected
    await connectToDatabase();

    // 4. Load job from MongoDB (by jobId, externalId, or MongoDB _id)
    const queryConditions: any[] = [
      { jobId: cleanJobId },
      { externalId: cleanJobId },
    ];

    if (mongoose.Types.ObjectId.isValid(cleanJobId)) {
      queryConditions.push({ _id: cleanJobId });
    }

    const job = await Job.findOne({ $or: queryConditions });

    if (!job) {
      return res.status(404).json({
        success: false,
        error: `Target job with identifier "${cleanJobId}" not found in database.`,
      });
    }

    // 4. Load candidate profile
    const candidateProfile = getActiveCandidateProfile();

    // 5. Send job + candidate profile to Gemma 4 31B IT
    const analysis = await analyzeJobWithGemma(
      {
        jobId: job.jobId || String(job._id),
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        skills: job.skills,
        requirements: job.requirements,
        experienceLevel: job.experienceLevel,
      },
      candidateProfile
    );

    // 6. Update job's match score in database for persistence
    job.matchPercentage = analysis.matchScore;
    await job.save();

    // 7. Return verified structured response
    return res.status(200).json({
      success: true,
      analysis: {
        matchScore: analysis.matchScore,
        summary: analysis.summary,
        matchedSkills: analysis.matchedSkills,
        missingSkills: analysis.missingSkills,
        recommendation: analysis.recommendation,
      },
    });
  } catch (error: any) {
    console.error('[AI ROUTE ERROR] /api/ai/analyze-job failed:', error?.message);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Internal error encountered during Gemma job analysis',
    });
  }
});

/**
 * POST /api/ai/tailor-resume
 * Real-time Resume Tailoring using Gemma 4 31B IT
 */
aiRouter.post('/tailor-resume', async (req: Request, res: Response) => {
  try {
    const { jobId } = req.body || {};

    // 1. Validate jobId
    if (!jobId || typeof jobId !== 'string' || !jobId.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid "jobId" parameter in request body',
      });
    }

    const cleanJobId = jobId.trim();

    // 2. Validate GEMINI_API_KEY presence
    if (!config.geminiApiKey || config.geminiApiKey.trim() === '') {
      return res.status(503).json({
        success: false,
        error: 'GEMINI_API_KEY is not configured on the server. AI resume tailoring unavailable.',
      });
    }

    // 3. Ensure database is connected
    await connectToDatabase();

    // 4. Load job from MongoDB
    const queryConditions: any[] = [
      { jobId: cleanJobId },
      { externalId: cleanJobId },
    ];

    if (mongoose.Types.ObjectId.isValid(cleanJobId)) {
      queryConditions.push({ _id: cleanJobId });
    }

    const job = await Job.findOne({ $or: queryConditions });

    if (!job) {
      return res.status(404).json({
        success: false,
        error: `Target job with identifier "${cleanJobId}" not found in database.`,
      });
    }

    // 4. Load candidate profile
    const candidateProfile = getActiveCandidateProfile();

    // 5. Send job + candidate profile to Gemma 4 31B IT
    const tailoredResume = await tailorResumeWithGemma(
      {
        jobId: job.jobId || String(job._id),
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        skills: job.skills,
        requirements: job.requirements,
        experienceLevel: job.experienceLevel,
      },
      candidateProfile
    );

    // 6. Return verified structured response conforming to required contract
    return res.status(200).json({
      success: true,
      resume: {
        targetedRole: tailoredResume.targetedRole,
        targetRole: tailoredResume.targetRole,
        targetCompany: tailoredResume.targetCompany,
        candidateName: tailoredResume.candidateName,
        headline: tailoredResume.headline,
        summary: tailoredResume.summary,
        skills: tailoredResume.skills,
        tailoredSkills: tailoredResume.tailoredSkills,
        experienceHighlights: tailoredResume.experienceHighlights,
        projects: tailoredResume.projects,
        education: tailoredResume.education,
        integrityVerified: true,
        forgedAt: tailoredResume.forgedAt,
      },
    });
  } catch (error: any) {
    console.error('[AI ROUTE ERROR] /api/ai/tailor-resume failed:', error?.message);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Internal error encountered during Gemma resume tailoring',
    });
  }
});

