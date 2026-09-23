import React, { useState } from 'react';
import { DossierProfile } from '../data/dossiers.ts';

interface ScreenResultsProps {
  profile: DossierProfile;
  onBackToUpload: () => void;
  onNewResume: () => void;
  onShowToast: (message: string) => void;
}

export const ScreenResults: React.FC<ScreenResultsProps> = ({
  profile,
  onBackToUpload,
  onNewResume,
  onShowToast
}) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedItems, setCopiedItems] = useState<Record<string, boolean>>({});

  const copyToClipboard = (text: string, label?: string) => {
    navigator.clipboard?.writeText(text);
    onShowToast(label ? `Copied: "${label}"` : `Copied: ${text}`);
  };

  const handleCopyTitle = (title: string, id: string) => {
    copyToClipboard(title, title);
    setCopiedItems((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedItems((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleCopyKeyword = (keyword: string) => {
    const quoted = `"${keyword}"`;
    copyToClipboard(quoted, quoted);
  };

  const handleCopySkill = (skill: string) => {
    copyToClipboard(skill, skill);
  };

  const handleCopyAll = () => {
    const lines = [
      `=== CAREER DOSSIER INTELLIGENCE REPORT ===`,
      `PROFILE: ${profile.recognizedTitle}`,
      `MATCH CONFIDENCE: ${profile.confidenceScore}`,
      `TRAJECTORY: ${profile.trajectory}`,
      ``,
      `TARGET TITLES TO SEARCH:`,
      ...profile.jobs.map((j) => `${j.rank}. ${j.title} (${j.matchScore} • ${j.scopeTag}) - ${j.description}`),
      ``,
      `SEARCH KEYWORDS (Optimized queries):`,
      profile.keywords.map((k) => `"${k}"`).join(', '),
      ``,
      `KEY SKILLS DETECTED:`,
      profile.skills.join(' • '),
      ``,
      `TARGET COMPANY TYPES:`,
      ...profile.companyTypes.map((c) => `• ${c.title}: ${c.description}`),
      ``,
      `Standard Dossier Match Confidence v2.4`
    ];

    navigator.clipboard?.writeText(lines.join('\n'));
    setCopiedAll(true);
    onShowToast('All titles & keywords copied to clipboard');
    setTimeout(() => setCopiedAll(false), 3000);
  };

  const handleExportPDF = () => {
    window.print();
    onShowToast('Opening print / PDF export dialog');
  };

  const openJobSearch = (title: string) => {
    const query = encodeURIComponent(`"${title}"`);
    const url = `https://www.google.com/search?q=${query}+jobs`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col w-full max-w-[480px] mx-auto pb-10 space-y-6">
      {/* Top Navigation & Action */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBackToUpload}
          className="group inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#ebefe7] hover:bg-[#dfe4dc] transition-colors text-[#181d18] cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[1.125rem] text-[#172e15] transition-transform group-hover:-translate-x-0.5">
            arrow_back
          </span>
          <span className="font-sans text-[0.875rem] text-[#434840] font-medium">
            Re-analyze another resume
          </span>
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#c6edbb]/70 text-[#2e4e2a] border border-[#c3c8be]/40 shadow-2xs">
          <span className="material-symbols-outlined text-[0.875rem] text-[#456740]">verified</span>
          <span className="font-sans text-[0.6875rem] font-semibold uppercase tracking-wider">
            Archived Dossier
          </span>
        </div>
      </div>

      {/* Editorial Masthead Section */}
      <header className="space-y-3 pt-1">
        <div className="space-y-1">
          <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-[#456740] font-semibold">
            Diagnostic Report
          </p>
          <h1 className="font-headline text-[1.75rem] sm:text-[2.25rem] text-[#172e15] tracking-tight leading-tight">
            Analysis Results
          </h1>
        </div>

        <p className="font-sans text-[0.9375rem] text-[#434840] leading-relaxed">
          Extracted insights &amp; targeted market positioning based on your professional background.
        </p>

        {/* Meta Summary Pill Badge Card */}
        <div className="p-3.5 rounded-xl bg-[#f0f5ed] shadow-xs flex items-start gap-3 border border-[#dfe4dc]">
          <div className="w-8 h-8 rounded-full bg-[#c6edbb] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
            <span className="material-symbols-outlined text-[1.125rem] text-[#172e15]">psychology</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="font-sans text-[0.6875rem] font-semibold text-[#456740] uppercase tracking-wider">
                Profile Recognized
              </span>
              <span className="font-sans text-[0.6875rem] font-semibold px-2 py-0.5 rounded-full bg-[#cdebc4] text-[#092008]">
                {profile.confidenceScore}
              </span>
            </div>

            <p className="font-headline text-[1.125rem] font-semibold text-[#181d18] mt-0.5 truncate">
              {profile.recognizedTitle}
            </p>

            <p className="font-sans text-[0.8125rem] text-[#434840] mt-1 leading-snug">
              {profile.trajectory}
            </p>
          </div>
        </div>
      </header>

      {/* Editorial Divider Bar */}
      <div className="h-px w-full bg-[#dfe4dc]" />

      {/* Section 1: Key Skills Detected */}
      <section className="space-y-3.5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#456740] text-[1.25rem]">auto_awesome</span>
            <h2 className="font-headline text-[1.375rem] font-medium text-[#172e15]">Key Skills Detected</h2>
          </div>
          <p className="font-sans text-[0.8125rem] text-[#434840]">
            Primary competencies and domain proficiencies extracted from your dossier:
          </p>
        </div>

        {/* Keyword Chips & Match Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {profile.skills.map((skill, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleCopySkill(skill)}
              title="Click to copy skill"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f0f5ed] hover:bg-[#c6edbb]/50 text-[#2d4529] font-sans text-[0.875rem] shadow-xs border border-[#dfe4dc]/80 transition-all cursor-pointer active:scale-95"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#456740]" />
              <span>{skill}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Section 2: Job Titles to Search */}
      <section className="space-y-3.5 pt-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#456740] text-[1.25rem]">work_outline</span>
              <h2 className="font-headline text-[1.375rem] font-medium text-[#172e15]">Job Titles to Search</h2>
            </div>
            <span className="font-sans text-[0.6875rem] text-[#434840] font-medium">
              {profile.jobs.length} Recommendations
            </span>
          </div>
          <p className="font-sans text-[0.8125rem] text-[#434840]">
            Ranked strategic market alignments with compensation and scope resonance:
          </p>
        </div>

        {/* Editorial Job Cards Stack */}
        <div className="space-y-3">
          {profile.jobs.map((job) => {
            const isCopied = copiedItems[job.id];
            return (
              <article
                key={job.id}
                className="p-4 rounded-xl bg-white shadow-xs flex flex-col gap-2.5 transition-all border border-[#e4e0d6] hover:shadow-md hover:border-[#456740]/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#ebefe7] flex items-center justify-center shrink-0 mt-0.5 border border-[#dfe4dc]">
                      <span className="font-headline text-[1.125rem] text-[#456740] font-medium">
                        {job.rank}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-headline text-[1.125rem] text-[#181d18] font-semibold leading-tight">
                        {job.title}
                      </h3>
                      <p className="font-sans text-[0.8125rem] text-[#434840] mt-0.5">
                        {job.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full font-sans text-[0.6875rem] font-medium shrink-0 ${
                      job.rank === '01'
                        ? 'bg-[#172e15] text-white'
                        : job.rank === '02' || job.rank === '03'
                        ? 'bg-[#c6edbb] text-[#022103]'
                        : 'bg-[#e5eae1] text-[#434840]'
                    }`}
                  >
                    {job.matchScore}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 text-[#434840] text-[0.8125rem] border-t border-[#f0f5ed]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[1rem] text-[#456740]">
                      {job.scopeIcon}
                    </span>
                    <span>{job.scopeTag}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openJobSearch(job.title)}
                      className="text-[#434840] hover:text-[#172e15] transition-colors flex items-center gap-1 font-sans text-[0.75rem] cursor-pointer"
                      title="Search live job postings"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[0.875rem]">open_in_new</span>
                      <span>Jobs</span>
                    </button>

                    <button
                      onClick={() => handleCopyTitle(job.title, job.id)}
                      className="text-[#456740] hover:text-[#172e15] transition-colors flex items-center gap-1 font-sans text-[0.875rem] font-medium cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[1rem]">
                        {isCopied ? 'done' : 'content_copy'}
                      </span>
                      <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Section 3: Search Keywords */}
      <section className="space-y-3.5 pt-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#456740] text-[1.25rem]">travel_explore</span>
            <h2 className="font-headline text-[1.375rem] font-medium text-[#172e15]">Search Keywords</h2>
          </div>
          <p className="font-sans text-[0.8125rem] text-[#434840]">
            Optimized for LinkedIn, Indeed, and Google Jobs search queries. Tap to copy individual terms:
          </p>
        </div>

        {/* Keyword Interactive Chips */}
        <div className="flex flex-wrap gap-2 pt-1" id="keyword-container">
          {profile.keywords.map((term, idx) => (
            <button
              key={idx}
              onClick={() => handleCopyKeyword(term)}
              className="copy-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ebefe7] hover:bg-[#dfe4dc] active:scale-95 transition-all text-[#181d18] font-sans text-[0.875rem] border border-[#c3c8be]/40 cursor-pointer shadow-2xs"
              type="button"
            >
              <span>"{term}"</span>
              <span className="material-symbols-outlined text-[0.875rem] text-[#456740]">content_copy</span>
            </button>
          ))}
        </div>
      </section>

      {/* Section 4: Target Company Types */}
      <section className="space-y-3.5 pt-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#456740] text-[1.25rem]">domain</span>
            <h2 className="font-headline text-[1.375rem] font-medium text-[#172e15]">Target Company Types</h2>
          </div>
          <p className="font-sans text-[0.8125rem] text-[#434840]">
            High-resonance organizational ecosystems tailored for your seniority level:
          </p>
        </div>

        {/* Editorial Commentary Cards List */}
        <div className="space-y-2.5">
          {profile.companyTypes.map((company, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white shadow-xs flex items-start gap-3.5 border border-[#e4e0d6]"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#456740] shrink-0 mt-1.5" />
              <div className="space-y-1">
                <h3 className="font-headline text-[1.125rem] text-[#181d18] font-semibold leading-snug">
                  {company.title}
                </h3>
                <p className="font-sans text-[0.8125rem] text-[#434840] leading-relaxed">
                  {company.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Visual Vignette: Study Space Motif */}
      <div className="rounded-xl overflow-hidden shadow-xs relative bg-[#f0f5ed] p-4 flex items-center gap-4 border border-[#dfe4dc]">
        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#dfe4dc]">
          <img
            className="w-full h-full object-cover"
            alt="Quiet minimalist architectural study studio with linen notebooks and directional window light"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjmmWtM3QwifRYsDZ7bwFXwDemq1SNGHdcq2HcEbXt_NHH8MrCmYPozjJnk9b8HLm4f1IHF89A9hpRoOjs0jAkLlC-9OSw1RaY10pfCS82EqjkfGAUtySxa1tneGmPwZkwDs1HWz13_Qp8-RXjQntjupyN1wlAlG59nbAccWzVqpCcrqhZpzZfpgpYyW2qdFnJ6QViOXUk3ZJr5GRoCdYFxXmGEX0Gg3JeWluBucfx2SXEU6jTBII"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-headline text-[1.125rem] text-[#172e15] italic">
            "Structure precedes strategy."
          </p>
          <p className="font-sans text-[0.8125rem] text-[#434840] mt-0.5 leading-snug">
            Use these refined search vectors directly in job boards to bypass broad algorithmic filters.
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <footer className="pt-4 space-y-3 no-print">
        {/* Primary CTA: Copy All */}
        <button
          onClick={handleCopyAll}
          className="w-full py-3.5 px-6 rounded-xl bg-[#172e15] hover:bg-[#2d4529] active:scale-[0.99] text-white font-sans text-[0.875rem] font-semibold tracking-wide flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer"
          id="copy-all-btn"
          type="button"
        >
          <span className="material-symbols-outlined text-[1.25rem]">inventory</span>
          <span id="copy-all-text">
            {copiedAll ? 'Dossier Copied!' : 'Copy All Keywords & Titles'}
          </span>
        </button>

        {/* Secondary Action CTAs */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleExportPDF}
            className="w-full py-3 px-4 rounded-xl bg-[#ebefe7] hover:bg-[#dfe4dc] text-[#181d18] font-sans text-[0.875rem] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer border border-[#c3c8be]/40"
            type="button"
          >
            <span className="material-symbols-outlined text-[1.125rem] text-[#456740]">picture_as_pdf</span>
            <span>Export PDF</span>
          </button>

          <button
            onClick={onNewResume}
            className="w-full py-3 px-4 rounded-xl bg-[#ebefe7] hover:bg-[#dfe4dc] text-[#181d18] font-sans text-[0.875rem] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer border border-[#c3c8be]/40"
            type="button"
          >
            <span className="material-symbols-outlined text-[1.125rem] text-[#456740]">restart_alt</span>
            <span>New Resume</span>
          </button>
        </div>

        {/* Quiet Editorial Timestamp */}
        <p className="text-center font-sans text-[0.6875rem] text-[#434840]/70 pt-2">
          Dossier rendered • Match confidence standard v2.4
        </p>
      </footer>
    </div>
  );
};
