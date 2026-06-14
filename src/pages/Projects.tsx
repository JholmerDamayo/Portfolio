import React, { useCallback, useEffect, useRef, useState } from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import LiquidEther from '../components/LiquidEther';

const PROJECT_IDLE_HOME_DELAY_MS = 5000;
const PROJECT_VIEWPORT_TOP_SHIFT = 0;

interface ProjectsProps {
  onIdleReturnHome?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onIdleReturnHome }) => {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [pulseToken, setPulseToken] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const autoReturnTimerRef = useRef<number | null>(null);
  const selectionTimerRef = useRef<number | null>(null);
  const [pendingProjectId, setPendingProjectId] = useState<string | null>(null);

  const activeProject = projects.find((p) => p.id === activeProjectId);
  const activeTitleClassName =
    activeProject?.id === '1'
      ? 'max-w-none text-white text-3xl leading-tight sm:text-[3.6rem] sm:leading-[0.94] lg:text-[4.4rem] lg:whitespace-nowrap'
      : 'max-w-3xl text-white text-3xl leading-tight sm:text-4xl sm:leading-[0.92] lg:text-[4rem]';
  const clearSelectionTimer = useCallback(() => {
    if (selectionTimerRef.current !== null) {
      window.clearTimeout(selectionTimerRef.current);
      selectionTimerRef.current = null;
    }
  }, []);

  const clearAutoReturnTimer = useCallback(() => {
    if (autoReturnTimerRef.current !== null) {
      window.clearTimeout(autoReturnTimerRef.current);
      autoReturnTimerRef.current = null;
    }
  }, []);

  const closeActiveProject = useCallback(() => {
    clearSelectionTimer();
    clearAutoReturnTimer();
    setPendingProjectId(null);
    setActiveProjectId(null);
  }, [clearAutoReturnTimer, clearSelectionTimer]);

  const scheduleAutoReturn = useCallback(() => {
    if (!activeProjectId) return;
    clearAutoReturnTimer();
    autoReturnTimerRef.current = window.setTimeout(() => {
      closeActiveProject();
      window.requestAnimationFrame(() => {
        onIdleReturnHome?.();
      });
    }, PROJECT_IDLE_HOME_DELAY_MS);
  }, [activeProjectId, clearAutoReturnTimer, closeActiveProject, onIdleReturnHome]);

  const scrollSectionIntoView = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targetY = Math.max(
      section.getBoundingClientRect().top + window.scrollY + PROJECT_VIEWPORT_TOP_SHIFT,
      0
    );

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  }, []);

  const handleSectionInteraction = useCallback(() => {
    if (!activeProjectId) return;

    scheduleAutoReturn();
  }, [activeProjectId, scheduleAutoReturn]);

  useEffect(() => {
    if (activeProjectId) {
      scheduleAutoReturn();
    } else {
      clearAutoReturnTimer();
    }

    return () => {
      clearSelectionTimer();
      clearAutoReturnTimer();
    };
  }, [
    activeProjectId,
    scheduleAutoReturn,
    clearSelectionTimer,
    clearAutoReturnTimer
  ]);

  useEffect(() => {
    if (!activeProjectId) return;

    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const activityEvents = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'keydown'] as const;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, handleSectionInteraction, { passive: true });
    });

    return () => {
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, handleSectionInteraction);
      });
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [activeProjectId, handleSectionInteraction]);

  const handleProjectImageClick = (id: string) => {
    clearSelectionTimer();
    clearAutoReturnTimer();
    setPendingProjectId(id);

    if (activeProjectId === null) {
      scrollSectionIntoView();
    }

    selectionTimerRef.current = window.setTimeout(() => {
      setActiveProjectId(id);
      setPulseToken((prev) => prev + 1);
      setPendingProjectId(null);
    }, 230);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionInteraction}
      onMouseEnter={handleSectionInteraction}
      onTouchStart={handleSectionInteraction}
      onTouchMove={handleSectionInteraction}
      onWheel={handleSectionInteraction}
      onKeyDown={handleSectionInteraction}
      className={`transition-colors duration-700 overflow-hidden overscroll-none ${
        activeProject
          ? 'fixed inset-0 z-[60] h-screen pt-20 pb-10 lg:pt-28 lg:pb-8'
          : 'relative min-h-[600px] py-16 sm:py-24'
      } bg-[#02030a]`}
    >
      <div className="absolute inset-0 z-0">
        <LiquidEther
          className="absolute inset-0 opacity-90"
          colors={['#5227FF', '#FF9FFC', '#B497CF']}
          mouseForce={28}
          cursorSize={120}
          isViscous
          viscous={30}
          iterationsViscous={24}
          iterationsPoisson={24}
          resolution={0.38}
          isBounce={false}
          autoDemo={false}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={1000}
          autoRampDuration={0.6}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(82,39,255,0.18),transparent_34%),radial-gradient(circle_at_82%_24%,rgba(255,159,252,0.14),transparent_32%),linear-gradient(180deg,rgba(2,6,23,0.72),rgba(2,6,23,0.9))]" />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <AnimatePresence initial={false} mode="sync">
          {activeProject && (
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <img
                src={activeProject.image}
                alt=""
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
                style={{ objectPosition: activeProject.backgroundPosition ?? 'center' }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.34)_0%,rgba(2,6,23,0.18)_38%,rgba(2,6,23,0.08)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_42%,rgba(255,255,255,0.14),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(2,6,23,0.14)_58%,rgba(2,6,23,0.24)_100%)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
          activeProject ? 'flex h-full flex-col justify-between' : ''
        }`}
      >
        {activeProject && (
          <div className="mb-5 flex flex-wrap justify-start gap-3 md:-ml-[100px] lg:mb-6">
            <button
              type="button"
              onClick={closeActiveProject}
              className="inline-flex items-center gap-2 self-start rounded-full border border-white/30 bg-black/25 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-black/35"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to projects
            </button>
          </div>
        )}

        <div className={`${activeProject ? 'mb-5 lg:mb-8' : 'mb-10 sm:mb-16'}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={activeProject ? 'max-w-fit rounded-3xl border border-white/12 bg-black/12 px-4 py-4 backdrop-blur-[3px] sm:px-6 sm:py-5' : ''}
          >
            <h2
              className={`text-3xl font-bold tracking-tight mb-4 transition-colors duration-500 sm:text-4xl ${
                activeProject ? activeTitleClassName : 'text-white'
              }`}
            >
              {activeProject ? activeProject.title : 'My Projects'}
            </h2>
            <p
              className={`text-lg max-w-2xl transition-colors duration-500 ${
                activeProject
                  ? 'max-w-[66rem] text-base leading-7 text-gray-100/90 lg:text-[1rem]'
                  : 'max-w-3xl text-base leading-7 text-gray-300 lg:text-lg'
              }`}
            >
              {activeProject
                ? activeProject.description
                : 'A collection of some of my favorite works, ranging from complex web applications to experimental UI explorations.'}
            </p>
          </motion.div>
        </div>

        {!activeProject && (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false} mode="popLayout">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard
                    project={project}
                    isActive={activeProjectId === project.id}
                    isPendingSelection={pendingProjectId === project.id}
                    pulseToken={pulseToken}
                    onImageClick={handleProjectImageClick}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        {activeProject && (
          <div className="grid min-h-0 flex-1 grid-cols-1 items-end gap-5 lg:grid-cols-1 lg:gap-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="rounded-3xl border border-white/12 bg-black/14 px-4 py-4 text-left backdrop-blur-[4px] sm:px-6 sm:py-5 lg:max-w-3xl lg:self-end lg:pr-4"
              >
                {activeProject.role && (
                  <p className="mb-4 text-sm font-medium text-emerald-300/95">
                    Role: <span className="text-white">{activeProject.role}</span>
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-3">
                  {activeProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/35 bg-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
