'use client';

import { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { UploadCloud, Sparkles, ScanSearch, Wand2, FileIcon, Trash2, Download } from 'lucide-react';

const keywords = ['react', 'next.js', 'javascript', 'tailwind', 'ui', 'performance', 'accessibility', 'testing', 'design systems'];

function evaluateResume(text, jobDescription) {
  const resumeText = text.toLowerCase();
  const jobText = jobDescription.toLowerCase();
  const matchedKeywords = keywords.filter((keyword) => resumeText.includes(keyword) || jobText.includes(keyword));
  const missingKeywords = keywords.filter((keyword) => !resumeText.includes(keyword) && jobText.includes(keyword));
  const grammarIssues = [];

  if ((text.match(/\bthe the\b/i) || []).length > 0) grammarIssues.push('Repeated phrasing detected.');
  if (text.split(/\s+/).length > 180) grammarIssues.push('Resume feels long and may need tighter bullets.');
  if (resumeText.includes('responsible for') || resumeText.includes('helped') || resumeText.includes('worked on')) {
    grammarIssues.push('Some bullets could be stronger and more measurable.');
  }

  const score = Math.min(100, Math.round(40 + matchedKeywords.length * 5 + (jobDescription.trim() ? 8 : 0) + (grammarIssues.length === 0 ? 6 : 0)));

  return {
    score,
    matchedKeywords,
    missingKeywords,
    grammarIssues,
    suggestions: [
      'Add more role-specific keywords to your summary and experience bullets.',
      'Use action verbs such as Led, Built, Delivered, and Optimized.',
      'Quantify impact with metrics like revenue, speed, adoption, or user growth.'
    ]
  };
}

function buildEnhancementPlan(text, jobDescription, analysis) {
  const matched = analysis?.matchedKeywords || [];
  const roleMatch = jobDescription.split(/\s+/).filter((word) => word.length > 3).slice(0, 6).join(' ') || 'target role';
  const skillList = matched.slice(0, 4).join(', ') || 'software engineering';
  const summary = `Strategic professional with experience in ${skillList} and a strong record of building polished, user-focused solutions. This version highlights measurable impact, stronger alignment with ${roleMatch}, and clearer ATS-friendly language.`;
  const bullets = [
    `Led the delivery of ${matched[0] || 'high-impact'} initiatives that improved usability, reliability, and product quality.`,
    `Built modern, scalable experiences using ${matched[1] || 'frontend'} best practices and strong collaboration across teams.`,
    `Improved performance, accessibility, and maintainability while aligning work with business goals and role requirements.`
  ];
  const enhancedContent = [
    'Enhanced Resume Draft',
    '',
    'Professional Summary',
    summary,
    '',
    'Key Strengths',
    ...bullets,
    '',
    'Original Resume Content',
    text
  ].join('\n');

  return {
    targetScore: Math.min(100, analysis.score + 8),
    summary,
    bullets,
    checklist: [
      'Mirror the job description language naturally in your summary.',
      'Add measurable results such as growth, speed, or revenue improvements.',
      'Keep the enhanced version ATS-friendly and easy to scan.'
    ],
    enhancedContent
  };
}

export default function ResumeCheckerPage() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [enhancement, setEnhancement] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileMeta, setFileMeta] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsProcessing(true);
    setFileName(file.name);
    setFileMeta(`${(file.size / 1024).toFixed(1)} KB`);

    try {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext === 'pdf') {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i += 1) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item) => item.str).join(' ') + '\n';
        }
        setResumeText(text);
        setEnhancement(null);
        setAnalysis(evaluateResume(text, jobDescription));
        return;
      }

      if (ext === 'docx') {
        const mammoth = await import('mammoth');
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setResumeText(result.value);
        setEnhancement(null);
        setAnalysis(evaluateResume(result.value, jobDescription));
        return;
      }

      const text = await file.text();
      setResumeText(text);
      setEnhancement(null);
      setAnalysis(evaluateResume(text, jobDescription));
    } finally {
      setIsProcessing(false);
    }
  }, [jobDescription]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    multiple: false
  });

  const stats = useMemo(() => {
    if (!analysis) return null;
    return [
      { label: 'ATS Score', value: analysis.score, tone: 'text-cyan-400' },
      { label: 'Matched Keywords', value: analysis.matchedKeywords.length, tone: 'text-violet-400' },
      { label: 'Missing Keywords', value: analysis.missingKeywords.length, tone: 'text-amber-400' },
      { label: 'Suggestions', value: analysis.suggestions.length, tone: 'text-emerald-400' }
    ];
  }, [analysis]);

  const handleAnalyze = () => {
    if (!resumeText.trim()) return;
    setIsProcessing(true);
    setEnhancement(null);
    setAnalysis(evaluateResume(resumeText, jobDescription));
    setTimeout(() => setIsProcessing(false), 250);
  };

  const handleEnhance = () => {
    if (!analysis) return;
    setEnhancement(buildEnhancementPlan(resumeText, jobDescription, analysis));
  };

  const handleDownloadEnhancedResume = (format = 'txt') => {
    if (!enhancement) return;

    const content = enhancement.enhancedContent;

    let blob;
    let fileName;

    if (format === 'pdf') {
      const html = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;padding:24px;line-height:1.6"><h1>Enhanced Resume Draft</h1><p><strong>Professional Summary</strong><br/>${enhancement.summary}</p><h3>Key Strengths</h3><ul>${enhancement.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}</ul><h3>Original Resume Content</h3><pre style="white-space:pre-wrap">${resumeText}</pre></body></html>`;
      blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      fileName = 'enhanced-resume.html';
    } else if (format === 'html') {
      const html = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;padding:24px;line-height:1.6"><h1>Enhanced Resume Draft</h1><h2>Professional Summary</h2><p>${enhancement.summary}</p><h2>Key Strengths</h2><ul>${enhancement.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}</ul><h2>Original Resume Content</h2><pre style="white-space:pre-wrap">${resumeText}</pre></body></html>`;
      blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      fileName = 'enhanced-resume.html';
    } else {
      blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      fileName = 'enhanced-resume.txt';
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetResume = () => {
    setFileName('');
    setFileMeta('');
    setResumeText('');
    setAnalysis(null);
    setEnhancement(null);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-10 space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">Resume Checker</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">ATS-ready resume analysis with real enhancement flow</h1>
        <p className="max-w-3xl text-lg text-slate-300">Upload your resume, add a target job description, analyze it for ATS compatibility, and generate an enhanced draft while keeping your original content intact.</p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">Resume Upload</h2>
                <p className="text-sm text-slate-400">Drop a file or click to browse</p>
              </div>
              <div className="rounded-2xl bg-violet-500/10 p-3 text-violet-300"><UploadCloud size={20} /></div>
            </div>
            <div {...getRootProps()} className={`rounded-3xl border-2 border-dashed p-8 text-center transition ${isDragActive ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/10 bg-slate-800/70 hover:border-violet-400'}`}>
              <input {...getInputProps()} />
              <UploadCloud size={28} className="mx-auto mb-3 text-cyan-400" />
              <p className="text-lg font-medium text-white">Drop your resume here</p>
              <p className="mt-2 text-sm text-slate-400">PDF, DOCX, or TXT supported</p>
            </div>
            {fileName ? (
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-800/80 px-4 py-3">
                <div className="flex items-center gap-3">
                  <FileIcon size={18} className="text-cyan-400" />
                  <div>
                    <p className="font-medium text-white">{fileName}</p>
                    <p className="text-sm text-slate-400">{fileMeta}</p>
                  </div>
                </div>
                <button onClick={resetResume} className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white"><Trash2 size={16} /></button>
              </div>
            ) : null}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3">
              <Sparkles size={18} className="text-cyan-400" />
              <h2 className="text-xl font-semibold text-white">Paste Resume Text</h2>
            </div>
            <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} rows={10} className="w-full rounded-2xl border border-white/10 bg-slate-800/80 p-4 text-sm text-slate-200 outline-none" placeholder="Paste your resume text here..." />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3">
              <ScanSearch size={18} className="text-violet-400" />
              <h2 className="text-xl font-semibold text-white">Job Description</h2>
            </div>
            <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} rows={8} className="w-full rounded-2xl border border-white/10 bg-slate-800/80 p-4 text-sm text-slate-200 outline-none" placeholder="Paste the job description you want to target..." />
          </motion.div>
        </div>

        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">ATS Analysis</h2>
                <p className="text-sm text-slate-400">Analyze the resume and get score-based guidance</p>
              </div>
              <button onClick={handleAnalyze} disabled={isProcessing || !resumeText.trim()} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-70">
                <Wand2 size={16} /> {isProcessing ? 'Analyzing...' : 'Analyze Resume'}
              </button>
            </div>

            {!analysis && !isProcessing ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-slate-800/60 p-8 text-center text-slate-400">Upload a resume or paste text first, then click “Analyze Resume”.</div>
            ) : isProcessing ? (
              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-8 text-center text-cyan-100">Preparing your ATS analysis and enhancement suggestions…</div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {stats.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-800/70 p-4">
                      <p className="text-sm text-slate-400">{item.label}</p>
                      <p className={`mt-2 text-2xl font-semibold ${item.tone}`}>{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                  <p className="text-sm text-emerald-200">Overall ATS Score</p>
                  <p className="text-4xl font-semibold text-white">{analysis.score}/100</p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Matched Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.matchedKeywords.map((keyword) => (
                      <span key={keyword} className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-200">{keyword}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Missing Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.missingKeywords.map((keyword) => (
                      <span key={keyword} className="rounded-full bg-amber-500/15 px-3 py-1 text-sm text-amber-200">{keyword}</span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm text-cyan-200">ATS Enhancement</p>
                      <h3 className="text-lg font-semibold text-white">Turn this resume into a stronger application package</h3>
                      <p className="mt-1 text-sm text-slate-300">A tailored summary, stronger bullets, and an enhanced draft are created from your original resume content.</p>
                    </div>
                    <button onClick={handleEnhance} className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-2 text-sm font-medium text-white">
                      Enhance Resume
                    </button>
                  </div>

                  {enhancement ? (
                    <div className="mt-4 space-y-4">
                      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                        <p className="text-sm font-medium text-cyan-300">Target ATS Score</p>
                        <p className="text-2xl font-semibold text-white">{enhancement.targetScore}/100</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                        <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Enhanced Summary</h4>
                        <p className="mt-2 text-sm text-slate-300">{enhancement.summary}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                        <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Suggested Bullet Rewrites</h4>
                        <ul className="mt-2 space-y-2 text-sm text-slate-300">
                          {enhancement.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-2"><span className="mt-1 text-cyan-400">•</span>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                        <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">ATS Checklist</h4>
                        <ul className="mt-2 space-y-2 text-sm text-slate-300">
                          {enhancement.checklist.map((item) => (
                            <li key={item} className="flex gap-2"><span className="mt-1 text-emerald-400">✓</span>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => handleDownloadEnhancedResume('txt')} className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-200">
                          <Download size={16} /> Download TXT
                        </button>
                        <button onClick={() => handleDownloadEnhancedResume('html')} className="inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-200">
                          <Download size={16} /> Download HTML
                        </button>
                        <button onClick={() => handleDownloadEnhancedResume('pdf')} className="inline-flex items-center gap-2 rounded-full bg-violet-500/15 px-4 py-2 text-sm font-medium text-violet-200">
                          <Download size={16} /> Download PDF
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-4 text-sm text-slate-300">The enhanced version builds from your original resume and adds tailored language for your target role.</p>
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Suggested Improvements</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {analysis.suggestions.map((suggestion) => (
                      <li key={suggestion} className="flex gap-2"><span className="mt-1 text-cyan-400">•</span>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
