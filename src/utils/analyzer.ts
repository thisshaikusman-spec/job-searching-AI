import { DossierProfile, DOSSIER_PROFILES } from '../data/dossiers.ts';

export function analyzeResumeContent(text: string, fileName?: string | null): DossierProfile {
  const lower = (text + ' ' + (fileName || '')).toLowerCase();

  // Keyword clustering heuristics
  const isEngineer =
    lower.includes('engineer') ||
    lower.includes('python') ||
    lower.includes('llm') ||
    lower.includes('gpu') ||
    lower.includes('distributed') ||
    lower.includes('backend') ||
    lower.includes('cloud') ||
    lower.includes('infrastructure');

  const isGrowth =
    lower.includes('growth') ||
    lower.includes('monetization') ||
    lower.includes('plg') ||
    lower.includes('arr') ||
    lower.includes('retention') ||
    lower.includes('marketing') ||
    lower.includes('cpo');

  if (isGrowth && !lower.includes('figma')) {
    return DOSSIER_PROFILES.growth;
  }

  if (isEngineer && !lower.includes('figma')) {
    return DOSSIER_PROFILES.engineer;
  }

  // Default to the Designer profile
  const base = { ...DOSSIER_PROFILES.designer };

  if (text.trim().length > 60) {
    const words = text.split(/[\n,;.]+/).map((s) => s.trim()).filter(Boolean);
    const candidateSkills: string[] = [];

    for (const chunk of words) {
      if (chunk.length > 4 && chunk.length < 35 && !candidateSkills.includes(chunk)) {
        if (/^[A-Z]/.test(chunk) && !chunk.includes('http') && !chunk.includes('@')) {
          candidateSkills.push(chunk);
        }
      }
    }

    if (candidateSkills.length >= 3) {
      const customSkills = Array.from(new Set([...candidateSkills.slice(0, 4), ...base.skills])).slice(0, 9);
      base.skills = customSkills;
    }
  }

  return base;
}

export async function analyzeResumeContentAsync(
  text: string,
  fileName?: string | null
): Promise<DossierProfile> {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resumeText: text }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server responded with status ${response.status}`);
    }

    const dossier: DossierProfile = await response.json();
    return dossier;
  } catch (err) {
    console.warn('Backend /api/analyze failed, falling back to local heuristic analysis:', err);
    return analyzeResumeContent(text, fileName);
  }
}
