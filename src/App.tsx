import { useState } from 'react';
import { ScreenUploader } from './components/ScreenUploader.tsx';
import { ScreenResults } from './components/ScreenResults.tsx';
import { BrandLogo } from './components/BrandLogo.tsx';
import { DOSSIER_PROFILES, DossierProfile } from './data/dossiers.ts';
import { analyzeResumeContentAsync } from './utils/analyzer.ts';

type ViewMode = 'uploader' | 'results' | 'dual';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('uploader');
  const [activePresetKey, setActivePresetKey] = useState<string>('designer');
  const [resumeText, setResumeText] = useState<string>(DOSSIER_PROFILES.designer.sampleText);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentProfile, setCurrentProfile] = useState<DossierProfile>(DOSSIER_PROFILES.designer);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2400);
  };

  const handleLoadPreset = (presetKey: string) => {
    setActivePresetKey(presetKey);
    const profile = DOSSIER_PROFILES[presetKey] || DOSSIER_PROFILES.designer;
    setResumeText(profile.sampleText);
    setFileName(null);
    setFileSize(null);
    setCurrentProfile(profile);
    showToast(`Loaded sample dossier: ${profile.recognizedTitle}`);
  };

  const handleFileSelect = (file: File) => {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    setFileName(file.name);
    setFileSize(`${sizeMB} MB`);

    // If it's plain text or markdown, read the content directly
    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (content) {
          setResumeText(content);
        }
      };
      reader.readAsText(file);
    } else {
      // For PDF / Word docx, simulate extracted summary if textarea is empty
      if (!resumeText || resumeText.length < 50) {
        setResumeText(
          `Document: ${file.name}\nSize: ${sizeMB} MB\n[Parsed Executive Profile Summary: Design Systems Architecture, Cross-functional Product Leadership, User Research & Heuristic Analysis, B2B SaaS Strategy, Figma & Advanced Prototyping]`
        );
      }
    }
    showToast(`Uploaded ${file.name} (${sizeMB} MB)`);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const determinedProfile = await analyzeResumeContentAsync(resumeText, fileName);
      setCurrentProfile(determinedProfile);
      setViewMode('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast('Career intelligence dossier generated');
    } catch (err: any) {
      console.error('Analysis failed:', err);
      showToast('Failed to generate dossier report');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewResume = () => {
    setResumeText('');
    setFileName(null);
    setFileSize(null);
    setViewMode('uploader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f6fbf2] text-[#181d18] flex flex-col antialiased selection:bg-[#c6edbb] selection:text-[#092008]">
      {/* Top Universal App Header Bar */}
      <nav className="w-full bg-[#f6fbf2]/90 backdrop-blur-md border-b border-[#dfe4dc] px-4 py-2.5 sticky top-0 z-40 flex items-center justify-between no-print">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2.5">
          <BrandLogo size={28} />
          <div className="flex flex-col leading-tight">
            <span className="font-headline text-[1.125rem] font-medium text-[#172e15] tracking-tight">
              Job Search AI
            </span>
            <span className="font-sans text-[0.625rem] uppercase tracking-widest text-[#456740] font-semibold hidden sm:inline-block">
              Career Dossier Intelligence
            </span>
          </div>
        </div>

        {/* View Switcher Controls (Particularly useful for reviewing both screens) */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#ebefe7] border border-[#dfe4dc]/80">
          <button
            type="button"
            onClick={() => setViewMode('uploader')}
            className={`px-2.5 py-1 rounded-md font-sans text-[0.75rem] font-medium transition-all cursor-pointer ${
              viewMode === 'uploader'
                ? 'bg-white text-[#172e15] shadow-xs'
                : 'text-[#434840] hover:text-[#181d18]'
            }`}
          >
            Screen 1: Upload
          </button>
          <button
            type="button"
            onClick={() => setViewMode('results')}
            className={`px-2.5 py-1 rounded-md font-sans text-[0.75rem] font-medium transition-all cursor-pointer ${
              viewMode === 'results'
                ? 'bg-white text-[#172e15] shadow-xs'
                : 'text-[#434840] hover:text-[#181d18]'
            }`}
          >
            Screen 2: Results
          </button>
          <button
            type="button"
            onClick={() => setViewMode('dual')}
            className={`hidden lg:inline-block px-2.5 py-1 rounded-md font-sans text-[0.75rem] font-medium transition-all cursor-pointer ${
              viewMode === 'dual'
                ? 'bg-white text-[#172e15] shadow-xs'
                : 'text-[#434840] hover:text-[#181d18]'
            }`}
          >
            Side-by-Side Dual View
          </button>
        </div>
      </nav>

      {/* Main Content Viewport */}
      <main className="flex-1 w-full px-4 sm:px-6 py-4 flex flex-col justify-start items-center">
        {viewMode === 'uploader' && (
          <ScreenUploader
            resumeText={resumeText}
            setResumeText={setResumeText}
            fileName={fileName}
            fileSize={fileSize}
            onFileSelect={handleFileSelect}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
            onLoadPreset={handleLoadPreset}
          />
        )}

        {viewMode === 'results' && (
          <ScreenResults
            profile={currentProfile}
            onBackToUpload={() => setViewMode('uploader')}
            onNewResume={handleNewResume}
            onShowToast={showToast}
          />
        )}

        {viewMode === 'dual' && (
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start pb-12">
            <div className="bg-[#f0f5ed]/50 p-4 sm:p-6 rounded-2xl border border-[#dfe4dc]">
              <div className="mb-4 pb-2 border-b border-[#dfe4dc] flex items-center justify-between">
                <span className="font-sans text-[0.6875rem] uppercase tracking-widest font-semibold text-[#456740]">
                  Screen 1: Upload Intake
                </span>
                <span className="font-sans text-[0.6875rem] text-[#434840]">Live Interactive</span>
              </div>
              <ScreenUploader
                resumeText={resumeText}
                setResumeText={setResumeText}
                fileName={fileName}
                fileSize={fileSize}
                onFileSelect={handleFileSelect}
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
                onLoadPreset={handleLoadPreset}
              />
            </div>

            <div className="bg-[#f0f5ed]/50 p-4 sm:p-6 rounded-2xl border border-[#dfe4dc]">
              <div className="mb-4 pb-2 border-b border-[#dfe4dc] flex items-center justify-between">
                <span className="font-sans text-[0.6875rem] uppercase tracking-widest font-semibold text-[#456740]">
                  Screen 2: Analysis Results
                </span>
                <span className="font-sans text-[0.6875rem] text-[#456740]">Live Interactive</span>
              </div>
              <ScreenResults
                profile={currentProfile}
                onBackToUpload={() => setViewMode('uploader')}
                onNewResume={handleNewResume}
                onShowToast={showToast}
              />
            </div>
          </div>
        )}
      </main>

      {/* Floating Toast Notification */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 ${
          toastMessage
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95'
        } px-4 py-2.5 rounded-full bg-[#2d322c] text-[#eef2ea] font-sans text-[0.875rem] font-medium shadow-xl flex items-center gap-2 border border-white/10`}
        id="toast-notify"
        role="status"
        aria-live="polite"
      >
        <span className="material-symbols-outlined text-[1.125rem] text-[#b2cea9]">check_circle</span>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
