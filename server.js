import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8787;

app.use(express.json({ limit: '10mb' }));

// Response Schema matching the exact Dossier profile structure
const dossierResponseSchema = {
  type: Type.OBJECT,
  properties: {
    id: {
      type: Type.STRING,
      description: 'A slug identifier for the profile archetype, e.g. "senior-staff-engineer" or "product-lead"'
    },
    label: {
      type: Type.STRING,
      description: 'Core functional archetype label, e.g. "Senior Product Designer" or "Principal Systems Architect"'
    },
    confidenceScore: {
      type: Type.STRING,
      description: 'Confidence score string, e.g. "94% Match Confidence"'
    },
    recognizedTitle: {
      type: Type.STRING,
      description: 'The primary detected title or specialization with seniority, e.g. "Senior Product Designer / Strategist"'
    },
    trajectory: {
      type: Type.STRING,
      description: 'Strategic career trajectory advice statement based strictly on their seniority and skills, e.g. "Ready for executive and principal IC trajectory"'
    },
    skills: {
      type: Type.ARRAY,
      description: '6 to 9 key core competencies extracted directly from the resume',
      items: { type: Type.STRING }
    },
    jobs: {
      type: Type.ARRAY,
      description: 'Exactly 5 ranked job role recommendations best matching the candidate',
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: 'Unique identifier, e.g. "1"' },
          rank: { type: Type.STRING, description: 'Two-digit rank number, e.g. "01", "02", "03", "04", "05"' },
          title: { type: Type.STRING, description: 'Target job title' },
          description: { type: Type.STRING, description: 'Concise summary of focus area & scope' },
          matchScore: { type: Type.STRING, description: 'Match score with tier, e.g. "98% High" or "91% Strong"' },
          scopeTag: { type: Type.STRING, description: 'Scope tag, e.g. "Tier 1 Enterprise Scope" or "High-Growth Scaleup"' },
          scopeIcon: { type: Type.STRING, description: 'Icon name (e.g. "trending_up", "hub", "layers", "domain", "rocket_launch")' }
        },
        required: ['id', 'rank', 'title', 'description', 'matchScore', 'scopeTag', 'scopeIcon']
      }
    },
    keywords: {
      type: Type.ARRAY,
      description: '5 to 8 Boolean and search keyword strings optimized for finding relevant openings',
      items: { type: Type.STRING }
    },
    companyTypes: {
      type: Type.ARRAY,
      description: '3 to 4 target company environments that match the candidate profile',
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: 'Category name, e.g. "Enterprise SaaS Platforms"' },
          description: { type: Type.STRING, description: 'Why this environment aligns with the candidate' }
        },
        required: ['title', 'description']
      }
    }
  },
  required: [
    'id',
    'label',
    'confidenceScore',
    'recognizedTitle',
    'trajectory',
    'skills',
    'jobs',
    'keywords',
    'companyTypes'
  ]
};

app.post('/api/analyze', async (req, res) => {
  try {
    const { resumeText } = req.body || {};

    if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length < 20) {
      return res.status(400).json({
        error: 'Missing or insufficient resume content. Please provide at least 20 characters of resume text.'
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured in the server environment (.env).'
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are an elite executive career strategist, recruiter, and resume intelligence analyst.
Analyze the following resume thoroughly and generate an accurate career dossier.

CRITICAL INSTRUCTIONS:
- Be strictly specific to the ACTUAL resume content and the candidate's verified seniority level.
- DO NOT invent employers, phantom achievements, false credentials, or hallucinated metrics.
- Exactly 5 ranked jobs (ranked "01" through "05").
- Between 6 and 9 skills.
- Between 5 and 8 targeted search keywords.
- Between 3 and 4 target company types.
- Ensure confidenceScore is realistic (e.g. "94% Match Confidence").
- Choose appropriate Material symbol names for scopeIcon (e.g. "trending_up", "hub", "layers", "domain", "rocket_launch", "analytics", "psychology").

RESUME CONTENT:
"""
${resumeText.trim()}
"""`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: dossierResponseSchema,
        temperature: 0.2
      }
    });

    const outputText = response.text?.();
    if (!outputText) {
      throw new Error('Gemini returned an empty response.');
    }

    const dossier = JSON.parse(outputText);

    // Enforce slice constraints just in case
    if (Array.isArray(dossier.jobs) && dossier.jobs.length > 5) {
      dossier.jobs = dossier.jobs.slice(0, 5);
    }
    if (Array.isArray(dossier.skills)) {
      dossier.skills = dossier.skills.slice(0, 9);
    }
    if (Array.isArray(dossier.keywords)) {
      dossier.keywords = dossier.keywords.slice(0, 8);
    }
    if (Array.isArray(dossier.companyTypes)) {
      dossier.companyTypes = dossier.companyTypes.slice(0, 4);
    }

    return res.json(dossier);
  } catch (error) {
    console.error('Error analyzing resume with Gemini:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to analyze resume with Gemini.'
    });
  }
});

// Production static file serving
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res, next) => {
  // If request is for an API route not matched above, return 404 JSON
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      next();
    }
  });
});

app.listen(PORT, () => {
  console.log(`Resume Analyzer backend listening on http://localhost:${PORT}`);
});
