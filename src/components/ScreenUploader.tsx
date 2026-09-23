import React, { useRef, useState } from 'react';
import { BrandLogo } from './BrandLogo.tsx';
import { DOSSIER_PROFILES } from '../data/dossiers.ts';

interface ScreenUploaderProps {
  resumeText: string;
  setResumeText: (text: string) => void;
  fileName: string | null;
  fileSize: string | null;
  onFileSelect: (file: File) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  onLoadPreset: (presetKey: string) => void;
}

export const ScreenUploader: React.FC<ScreenUploaderProps> = ({
  resumeText,
  setResumeText,
  fileName,
  fileSize,
  onFileSelect,
  onAnalyze,
  isAnalyzing,
  onLoadPreset
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const wordCount = resumeText.trim().length ? resumeText.trim().split(/\s+/).length : 0;
  const hasHighDensity = wordCount >= 15;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[480px] mx-auto pb-8">
      {/* Editorial Warm Header Block */}
      <header className="pt-2 pb-6 flex flex-col items-center text-center">
        {/* Brand Mark with Logo */}
        <div className="flex items-center gap-2 mb-3">
          <BrandLogo size={32} />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c6edbb] text-[#4b6d45] shadow-xs">
            <span className="material-symbols-outlined text-[14px]">auto_read_play</span>
            <span className="font-sans text-[0.6875rem] font-semibold tracking-widest uppercase">
              Career Dossier Intelligence
            </span>
          </div>
        </div>

        <h1 className="font-headline text-[1.75rem] sm:text-[2.25rem] text-[#172e15] tracking-tight leading-tight">
          Job Search AI
        </h1>

        <p className="font-sans text-[0.9375rem] text-[#434840] max-w-xs mt-2 text-balance leading-relaxed">
          Upload your credentials to unveil curated titles, missing keywords, and strategic market fit.
        </p>

        {/* Visual Paper Folio Thumbnail */}
        <div className="mt-4 flex items-center gap-3 px-3 py-1.5 rounded-xl bg-[#f0f5ed] shadow-xs border border-[#dfe4dc]/60">
          <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 bg-[#dfe4dc] flex items-center justify-center">
            <img
              className="w-full h-full object-cover"
              alt="Thick cream textured cotton parchment paper with subtle letterpress typography"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl--reir6ZAeq2i__nOD7OlxF0jBUdPSlso3qDzSH-3D6Hiuroz-mBtnxkreiJxMGvEELkYJcpBraHLi3BFinh1F4hUbt7_jNQBpzGI3Ut1bbDrwjdk40ggkepDC11ky8Aejg-amidXf-a-S4XWsM7h0YXh2CwM8Cn_9NRfCuqQ2IG92PNuK9wcH7-KciAHmCxlFh5ZqVH7tYjx2Ya-HGaB6KFWM691uO__dDyYTGLt6kFLpO32Eo"
              loading="lazy"
            />
          </div>
          <p className="font-sans text-[0.6875rem] text-[#434840] text-left">
            <span className="font-semibold text-[#172e15]">Archival Parsing:</span> Private, client-side NLP
          </p>
        </div>
      </header>

      {/* Main Interaction Area */}
      <div className="flex flex-col gap-5 w-full">
        {/* Upload Dropzone Card */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative group cursor-pointer transition-all duration-300 rounded-xl bg-white p-6 flex flex-col items-center text-center shadow-xs overflow-hidden border border-[#e4e0d6] hover:shadow-md ${
            isDragOver ? 'bg-[#c6edbb]/40 scale-[1.01] border-[#456740]' : ''
          }`}
          id="drop-zone"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
        >
          {/* Ambient decorative gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#c6edbb]/20 via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* Dashed border representation via SVG pattern for crisp editorial control */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none stroke-[#c3c8be] group-hover:stroke-[#456740] transition-colors"
            fill="none"
          >
            <rect
              height="calc(100% - 4px)"
              rx="12"
              strokeDasharray="6 6"
              strokeWidth="1.5"
              width="calc(100% - 4px)"
              x="2"
              y="2"
            />
          </svg>

          {/* Center Botanical/Feather Glyph Medallion */}
          <div
            className="relative z-10 w-14 h-14 rounded-full bg-[#ebefe7] flex items-center justify-center mb-3.5 transition-transform duration-300 group-hover:scale-105 shadow-xs border border-[#dfe4dc]"
            id="upload-icon-wrapper"
          >
            <span
              className="material-symbols-outlined text-[#456740] text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              history_edu
            </span>
          </div>

          {/* Hidden File input element */}
          <input
            ref={fileInputRef}
            accept=".pdf,.txt,.docx,.md"
            className="hidden"
            id="file-input"
            type="file"
            onChange={handleFileInputChange}
          />

          <div className="relative z-10 flex flex-col items-center">
            <span className="font-headline text-[1.125rem] text-[#172e15] font-medium tracking-tight">
              Upload your resume
            </span>
            <span className="font-sans text-[0.6875rem] text-[#456740] font-semibold uppercase tracking-wider mt-0.5">
              .PDF, .DOCX, OR .TXT
            </span>
            <p className="font-sans text-[0.8125rem] text-[#434840] mt-2 max-w-[260px] leading-snug">
              Drag &amp; drop document here, or{' '}
              <span className="text-[#172e15] font-semibold underline decoration-[#456740] decoration-1 underline-offset-2">
                browse files
              </span>
            </p>

            {/* Status badge or format notice */}
            {fileName ? (
              <div className="mt-4 px-3 py-1.5 rounded-full bg-[#c6edbb] text-[#022103] flex items-center gap-1.5 shadow-xs">
                <span className="material-symbols-outlined text-[15px] text-[#456740]">task_alt</span>
                <span className="font-sans text-[0.6875rem] text-[#172e15] font-semibold truncate max-w-[180px]">
                  {fileName}
                </span>
                {fileSize && (
                  <span className="font-sans text-[0.6875rem] text-[#434840]">({fileSize})</span>
                )}
              </div>
            ) : (
              <div className="mt-4 px-3 py-1.5 rounded-full bg-[#ebefe7] flex items-center gap-1.5 text-[#434840]">
                <span className="material-symbols-outlined text-[15px] text-[#456740]">verified_user</span>
                <span className="font-sans text-[0.6875rem]">Max 10MB • Confidential &amp; parsed in-browser</span>
              </div>
            )}
          </div>
        </div>

        {/* Editorial Divider */}
        <div className="relative flex items-center justify-center py-1">
          <div className="w-full h-[1px] bg-[#dfe4dc]" />
          <span className="absolute bg-[#f6fbf2] px-4 font-headline text-[0.875rem] text-[#434840] italic font-serif">
            or
          </span>
        </div>

        {/* Paste Textarea Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <label
              className="font-headline text-[0.9375rem] text-[#172e15] font-medium flex items-center gap-1.5"
              htmlFor="resume-text"
            >
              <span className="material-symbols-outlined text-[16px] text-[#456740]">notes</span>
              Paste career excerpt or summary
            </label>
            <span className="font-sans text-[0.6875rem] text-[#434840]" id="char-badge">
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </span>
          </div>

          <div className="relative rounded-xl bg-white shadow-xs transition-all focus-within:shadow-md focus-within:ring-2 focus-within:ring-[#456740]/20 border border-[#e4e0d6] overflow-hidden">
            {/* Accent line top */}
            <div className="h-0.5 w-full bg-[#e5eae1]" />
            <textarea
              className="w-full p-3.5 bg-transparent font-sans text-[0.9375rem] text-[#181d18] placeholder:text-[#434840]/60 focus:outline-none resize-none leading-relaxed"
              id="resume-text"
              placeholder="Paste raw resume text, work history highlights, executive bio, or LinkedIn summary export here..."
              rows={5}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />

            {/* Auxiliary Bar below textarea */}
            <div className="px-3.5 py-2 bg-[#f0f5ed] flex items-center justify-between border-t border-[#dfe4dc]/60">
              <div className="flex items-center gap-1 text-[#434840]">
                <span className="material-symbols-outlined text-[14px]">markdown</span>
                <span className="font-sans text-[0.6875rem]">Accepts markdown &amp; bulleted plain text</span>
              </div>
              {resumeText.length > 0 && (
                <button
                  className="font-sans text-[0.6875rem] text-[#ba1a1a] hover:underline flex items-center gap-0.5 cursor-pointer"
                  id="clear-btn"
                  type="button"
                  onClick={() => setResumeText('')}
                >
                  <span className="material-symbols-outlined text-[12px]">delete_sweep</span> Clear
                </button>
              )}
            </div>
          </div>

          {/* Quick Presets Drawer for instant 1-click test */}
          <div className="flex items-center justify-between px-1 pt-1">
            <span className="font-sans text-[0.6875rem] text-[#434840] font-medium">Quick sample dossiers:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => onLoadPreset('designer')}
                className="font-sans text-[0.6875rem] px-2 py-0.5 rounded-md bg-[#ebefe7] hover:bg-[#c6edbb] text-[#172e15] font-medium transition-colors cursor-pointer"
              >
                Designer
              </button>
              <button
                type="button"
                onClick={() => onLoadPreset('engineer')}
                className="font-sans text-[0.6875rem] px-2 py-0.5 rounded-md bg-[#ebefe7] hover:bg-[#c6edbb] text-[#172e15] font-medium transition-colors cursor-pointer"
              >
                AI Architect
              </button>
              <button
                type="button"
                onClick={() => onLoadPreset('growth')}
                className="font-sans text-[0.6875rem] px-2 py-0.5 rounded-md bg-[#ebefe7] hover:bg-[#c6edbb] text-[#172e15] font-medium transition-colors cursor-pointer"
              >
                VP Growth
              </button>
            </div>
          </div>
        </div>

        {/* Live Keyword Peek Box (Subtle Delight Pill Sandbox) */}
        <div className="p-3.5 rounded-xl bg-[#e5eae1] flex flex-col gap-2 border border-[#dfe4dc]" id="keyword-preview">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[0.6875rem] uppercase tracking-wider text-[#434840] font-semibold">
              Anticipated Vector Signals
            </span>
            <span className="font-sans text-[0.6875rem] text-[#456740] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#456740] animate-pulse" />
              Ready for scan
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5" id="pills-container">
            {fileName && (
              <span className="px-2.5 py-1 rounded-full bg-[#cdebc4] text-[#092008] font-sans text-[0.6875rem] font-medium shadow-2xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">check</span>
                File: {fileName.split('.').pop()?.toUpperCase()} • Parsed locally
              </span>
            )}
            {hasHighDensity && (
              <span className="px-2.5 py-1 rounded-full bg-[#456740] text-white font-sans text-[0.6875rem] font-medium shadow-2xs flex items-center gap-1 animate-pulse">
                <span className="material-symbols-outlined text-[12px]">bolt</span> High semantic density
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full bg-[#ebefe7] text-[#434840] font-sans text-[0.6875rem] font-medium shadow-2xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#456740]" /> Leadership
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#ebefe7] text-[#434840] font-sans text-[0.6875rem] font-medium shadow-2xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#456740]" /> Quantitative Impact
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#ebefe7] text-[#434840] font-sans text-[0.6875rem] font-medium shadow-2xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#456740]" /> Domain Expertise
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#ebefe7] text-[#434840] font-sans text-[0.6875rem] font-medium shadow-2xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#456740]" /> Tech Stack
            </span>
          </div>
        </div>

        {/* Primary Action CTA */}
        <div className="pt-1 flex flex-col gap-2.5">
          <button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className="relative group w-full py-4 px-6 rounded-xl bg-[#172e15] hover:bg-[#2d4529] text-white font-headline text-[1.125rem] font-semibold tracking-wide flex items-center justify-center gap-2.5 shadow-md active:scale-[0.99] transition-all cursor-pointer disabled:opacity-90"
            id="analyze-trigger"
            type="button"
          >
            {isAnalyzing ? (
              <>
                <span>Curating Job Vectors...</span>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </>
            ) : (
              <>
                <span id="btn-text">Analyze &amp; Suggest Jobs</span>
                <span
                  className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-x-1"
                  id="btn-arrow"
                >
                  arrow_forward
                </span>
              </>
            )}
          </button>

          {/* Trust Indicator Micro-Strip */}
          <div className="flex items-center justify-center gap-3 text-center px-2 py-1">
            <div className="flex items-center gap-1 text-[#434840]">
              <span className="material-symbols-outlined text-[15px] text-[#456740]">check_circle</span>
              <span className="font-sans text-[0.6875rem]">Instant vector indexing</span>
            </div>
            <span className="text-[#dfe4dc]">•</span>
            <div className="flex items-center gap-1 text-[#434840]">
              <span className="material-symbols-outlined text-[15px] text-[#456740]">lock</span>
              <span className="font-sans text-[0.6875rem]">100% Client-side sandbox</span>
            </div>
          </div>
        </div>

        {/* Editorial Quote Accent Card */}
        <div className="mt-2 p-4 rounded-xl bg-[#f0f5ed] border border-[#dfe4dc]/70 flex items-start gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#dfe4dc]">
            <img
              className="w-full h-full object-cover"
              alt="Warm studio still life of a fountain pen, leather journal, and clean spectacles on an oak desk"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9CcV_V8S5lgwxjKpgMXd3c0enMBSjAalQ8dtZ0yNMvkS6y-tgxf59zWfnqsRCBpsj46vrnPdxODLRDsNkMSMxlyCiPRIosIlMClp11-qpdwi3G9UfDfQ4QZHf3xOD80VyXhY8yspfixwMIrfkRHQSVFcJXJ6cmaCKlZ6XgfyBquLaVDpuF2szrQo9oErcHRDRf1pRObFXsNSXpxZ4tc9wouSdQy00eMAH7cZ-F9K-p9xJkclsR4c"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-headline text-[0.8125rem] text-[#172e15] italic font-serif leading-snug">
              “Precision in narrative unlocks the hidden tier of unposted executive leadership roles.”
            </p>
            <span className="font-sans text-[0.6875rem] text-[#434840] mt-1 uppercase tracking-wider font-semibold">
              The Career Editorial Index • Vol. IX
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
