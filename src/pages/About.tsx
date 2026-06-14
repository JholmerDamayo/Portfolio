import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Download, FileText, X } from 'lucide-react';
import portraitImage from '../assets/jholmer-portrait.png';
import SoftAurora from '../components/SoftAurora';
import resumePdf from '../assets/documents/Jholmer_Damayo_Resume.pdf?url';
import cvPdf from '../assets/documents/Jholmer_Damayo-CV.pdf?url';

type DocumentType = 'resume' | 'cv';

interface ProfileDocument {
  label: string;
  title: string;
  url: string;
  pageCount: number;
}

const profileDocuments: Record<DocumentType, ProfileDocument> = {
  resume: {
    label: 'Resume',
    title: 'Jholmer Damayo Resume',
    url: resumePdf,
    pageCount: 2
  },
  cv: {
    label: 'CV',
    title: 'Jholmer Damayo CV',
    url: cvPdf,
    pageCount: 3
  }
};

interface DocumentPreviewProps {
  documentType: DocumentType | null;
  onClose: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ documentType, onClose }) => {
  const pointerStartXRef = React.useRef<number | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const selectedDocument = documentType ? profileDocuments[documentType] : null;

  React.useEffect(() => {
    setCurrentPage(1);
  }, [documentType]);

  React.useEffect(() => {
    if (!documentType || !selectedDocument) {
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'ArrowLeft') {
        setCurrentPage((page) => Math.max(page - 1, 1));
      }
      if (event.key === 'ArrowRight') {
        setCurrentPage((page) => Math.min(page + 1, selectedDocument.pageCount));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [documentType, onClose, selectedDocument]);

  const goToPage = (page: number) => {
    if (!selectedDocument) {
      return;
    }

    setCurrentPage(Math.min(Math.max(page, 1), selectedDocument.pageCount));
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStartXRef.current === null) {
      return;
    }

    const deltaX = event.clientX - pointerStartXRef.current;
    pointerStartXRef.current = null;

    if (Math.abs(deltaX) < 48) {
      return;
    }

    goToPage(deltaX < 0 ? currentPage + 1 : currentPage - 1);
  };

  return (
    <AnimatePresence>
      {selectedDocument && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/82 px-4 py-6 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-5xl rounded-[1.5rem] border border-white/12 bg-slate-950/94 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.42)] sm:rounded-[2rem] sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-cyan-200/80">
                  {selectedDocument.label}
                </p>
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  {selectedDocument.title}
                </h3>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={selectedDocument.url}
                  download
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white transition hover:bg-cyan-300/18"
                  aria-label={`Download ${selectedDocument.label}`}
                  title={`Download ${selectedDocument.label}`}
                >
                  <Download className="h-5 w-5" />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white transition hover:bg-white/14"
                  aria-label="Close document preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div
              className="relative flex min-h-[420px] touch-pan-y select-none items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/6"
              onPointerDown={(event) => {
                pointerStartXRef.current = event.clientX;
              }}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => {
                pointerStartXRef.current = null;
              }}
            >
              <iframe
                key={`${selectedDocument.label}-${currentPage}`}
                src={`${selectedDocument.url}#page=${currentPage}&toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                title={`${selectedDocument.title} page ${currentPage}`}
                className="h-[70svh] min-h-[420px] w-full rounded-2xl bg-white"
              />
            </div>

            <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm font-medium text-slate-300">
                Page {currentPage} of {selectedDocument.pageCount}
              </p>

              <div className="flex items-center justify-center gap-2" aria-label="Document pages">
                {Array.from({ length: selectedDocument.pageCount }, (_, index) => {
                  const page = index + 1;
                  const isActive = page === currentPage;

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => goToPage(page)}
                      className={`h-3 w-3 rounded-full transition ${
                        isActive ? 'bg-white' : 'bg-white/28 hover:bg-white/55'
                      }`}
                      aria-label={`Go to page ${page}`}
                      aria-current={isActive ? 'page' : undefined}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const About: React.FC = () => {
  const [activeDocument, setActiveDocument] = React.useState<DocumentType | null>(null);
  const [highlightedDocument, setHighlightedDocument] = React.useState<DocumentType | null>(null);
  const skills = [
    'React & Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Node.js & Express',
    'PostgreSQL & MongoDB',
    'AWS & Cloudflare',
    'UI/UX Design',
    'Performance Optimization'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const openDocument = (documentType: DocumentType) => {
    setHighlightedDocument(documentType);
    setActiveDocument(documentType);
  };

  const documentButtonClass = (documentType: DocumentType) =>
    `inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 font-bold transition ${
      highlightedDocument === documentType
        ? 'border-cyan-200 bg-white text-slate-950 shadow-[0_0_26px_rgba(125,211,252,0.28)] hover:bg-cyan-100'
        : 'border-white/20 bg-white/8 text-white hover:bg-white/14'
    }`;

  return (
    <section className="relative overflow-hidden bg-[#060815] py-16 transition-colors duration-300 sm:py-24">
      <div className="absolute inset-0 z-0 opacity-60">
        <SoftAurora
          speed={0.35}
          scale={1.1}
          brightness={0.4}
          color1="#eef2ff"
          color2="#7dd3fc"
          noiseFrequency={1.8}
          noiseAmplitude={0.65}
          bandHeight={0.58}
          bandSpread={0.72}
          octaveDecay={0.16}
          layerOffset={0.35}
          colorSpeed={0.45}
          enableMouseInteraction={false}
          mouseInfluence={0.1}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,21,0.8),rgba(6,8,21,0.92)_45%,rgba(6,8,21,0.98)),radial-gradient(circle_at_top,rgba(125,211,252,0.1),transparent_24%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[1.5rem] border border-white/18 bg-white/[0.08] p-5 shadow-[0_24px_70px_rgba(15,23,42,0.2)] backdrop-blur-xl sm:rounded-[2rem] sm:p-8 lg:p-10"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-45"
              style={{ backgroundImage: `url(${portraitImage})` }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.72),rgba(15,23,42,0.58),rgba(2,6,23,0.76))] backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-white/[0.06]" />
            <div className="relative z-10">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:mb-8 sm:text-4xl">About Me</h2>
              <div className="space-y-5 text-base leading-7 text-slate-200/88 sm:space-y-6 sm:text-lg sm:leading-relaxed">
                <p>
                  I'm Jholmer L. Damayo, a fresh graduating Bachelor of Science in Information Technology student with a strong passion for software development and technology. I enjoy building systems and applications that solve real-world problems while improving user experience and functionality.
                </p>
                <p>
                  My journey in IT has helped me develop skills in web and mobile development, UI/UX design, database management, and problem-solving. I am continuously learning new technologies and improving my craft through personal projects, academic work, and hands-on experience.
                </p>
                <p>
                  Beyond coding, I enjoy exploring new tech trends, creating creative digital projects, and collaborating with others to turn ideas into meaningful solutions.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl sm:p-8 lg:p-12"
          >
            <h3 className="mb-8 text-2xl font-bold text-white">Technical Expertise</h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {skills.map((skill) => (
                <motion.div
                  key={skill}
                  variants={itemVariants}
                  className="flex items-center space-x-3 rounded-xl border border-white/10 bg-slate-950/35 p-3 shadow-[0_14px_40px_rgba(0,0,0,0.16)]"
                >
                  <CheckCircle2 className="h-5 w-5 text-cyan-200" />
                  <span className="font-medium text-slate-200">{skill}</span>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8 rounded-2xl border border-cyan-200/10 bg-white/10 p-5 text-white sm:mt-12 sm:p-6">
              <p className="mb-2 text-sm font-medium uppercase tracking-widest opacity-70">Currently Learning</p>
              <p className="text-lg font-bold italic sm:text-xl">Web3 Development & Smart Contracts</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 text-center backdrop-blur-xl sm:mt-14 sm:rounded-[2rem] sm:p-8"
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-cyan-200/80">
            Let&apos;s Connect
          </p>
          <h3 className="mx-auto mb-6 max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-3xl">
            View my Resume or CV anytime.
          </h3>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openDocument('resume')}
              className={documentButtonClass('resume')}
              aria-pressed={highlightedDocument === 'resume'}
            >
              <FileText className="h-5 w-5" />
              Resume
            </button>
            <button
              type="button"
              onClick={() => openDocument('cv')}
              className={documentButtonClass('cv')}
              aria-pressed={highlightedDocument === 'cv'}
            >
              <FileText className="h-5 w-5" />
              CV
            </button>
          </div>
        </motion.div>
      </div>

      <DocumentPreview documentType={activeDocument} onClose={() => setActiveDocument(null)} />
    </section>
  );
};
