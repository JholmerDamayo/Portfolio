import React from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { Award, ChevronLeft, ChevronRight, Rocket, Trophy, X } from 'lucide-react';
import CountUp from '../components/CountUp';
import Lanyard from '../components/Lanyard';
import Particles from '../components/Particles';
import capstoneBestPosterCertificate from '../assets/awards/capstone-best-poster.jpg';
import capstoneOutstandingProjectCertificate from '../assets/awards/capstone-outstanding-project.jpg';
import researchForumFirstPlaceCertificate from '../assets/awards/research-forum-first-place.jpg';
import researchForumParticipantCertificate from '../assets/awards/research-forum-participant.jpg';

const achievements = [
  {
    icon: Trophy,
    title: 'Project Finished',
    value: 10,
    description: 'Completed 10 projects across portfolio builds, app concepts, and polished frontend experiences.',
    action: 'projects'
  },
  {
    icon: Rocket,
    title: 'Performance',
    value: 95,
    suffix: '%',
    description: 'Focused on fast loading, smoother interactions, and stronger overall frontend responsiveness.'
  },
  {
    icon: Award,
    title: 'Collaboration',
    value: 100,
    suffix: '%',
    description: 'Worked closely with teammates, shared ideas clearly, and supported smooth delivery across projects.'
  }
];

interface AchievementsProps {
  onNavigateToProjects?: () => void;
}

interface AwardCertificate {
  image: string;
  alt: string;
  label: string;
  award: string;
  description: string;
}

interface SchoolAchievement {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  tag: string;
  accentFrom: string;
  accentTo: string;
  details: string;
  highlights: string[];
  certificates?: AwardCertificate[];
}

const schoolAchievements: SchoolAchievement[] = [
  {
    id: 'lanyard-1',
    title: "Dean's List Honor",
    subtitle: 'Recognized for consistent academic excellence across major subjects.',
    year: '2022 - 2026',
    tag: 'Academic',
    accentFrom: '#34d399',
    accentTo: '#0f172a',
    details:
      "Recognized on the Dean's List from 2022 to 2026, with yearly placements that show steady academic performance across the program.",
    highlights: [
      "2022 - Top 33 Dean's Lister",
      "2023 - Top 12 Dean's Lister",
      "2024 - Top 60 Dean's Lister",
      "2025 - Top 20 Dean's Lister",
      "2026 - Top 20 Dean's Lister"
    ]
  },
  {
    id: 'lanyard-2',
    title: 'Best Capstone Presentation',
    subtitle: 'Presented a standout final-year project to faculty and peers.',
    year: '2026',
    tag: 'Presentation',
    accentFrom: '#38bdf8',
    accentTo: '#172554',
    details:
      'Recognized by the University of Cebu - Lapu-Lapu and Mandaue College of Computer Studies for the WisEnergy capstone study, a mobile application with AI and IoT for real-time appliance energy monitoring and optimization.',
    highlights: [
      'Best in Poster/Exhibit Booth',
      'Outstanding Capstone Project',
      'WisEnergy Mobile Application with AI and IoT'
    ],
    certificates: [
      {
        image: capstoneBestPosterCertificate,
        alt: 'Certificate awarding Jholmer L. Damayo as Best in Poster/Exhibit Booth for the WisEnergy capstone study.',
        label: 'Certificate of Recognition',
        award: 'Best in Poster/Exhibit Booth',
        description:
          'Awarded on June 4, 2026 for the study entitled "WisEnergy: Mobile Application with AI & IoT for Real-time Appliance Energy Monitoring and Optimization."'
      },
      {
        image: capstoneOutstandingProjectCertificate,
        alt: 'Certificate recognizing Jholmer L. Damayo for Outstanding Capstone Project.',
        label: 'Certificate of Recognition',
        award: 'Outstanding Capstone Project',
        description:
          'Recognized on June 4, 2026 for the same WisEnergy capstone study under the College of Computer Studies.'
      }
    ] satisfies AwardCertificate[]
  },
  {
    id: 'lanyard-3',
    title: 'Research Forum Recognition',
    subtitle: 'Won recognition for presenting the WisEnergy research paper.',
    year: '2026',
    tag: 'Research',
    accentFrom: '#a78bfa',
    accentTo: '#1e1b4b',
    details:
      'Presented the WisEnergy research paper during the UC CCS Research Congress 2026 and earned recognition in the student research forum.',
    highlights: [
      '1st Place in Poster Presentation',
      'Podium Presentation participant',
      'UC CCS Research Congress 2026'
    ],
    certificates: [
      {
        image: researchForumFirstPlaceCertificate,
        alt: 'Certificate awarding Jholmer L. Damayo first place in poster presentation during UC CCS Research Congress 2026.',
        label: 'Certificate of Recognition',
        award: '1st Place in Poster Presentation',
        description:
          'Won 1st place for the paper entitled "WisEnergy: A Smart Mobile App for Real-Time Energy Monitoring and Optimization" on May 13, 2026.'
      },
      {
        image: researchForumParticipantCertificate,
        alt: 'Certificate of participation for Jholmer L. Damayo in the podium presentation student category.',
        label: 'Certificate of Participation',
        award: 'Podium Presentation - Student Category',
        description:
          'Participated with the same WisEnergy paper during the UC CCS Research Congress 2026 at UC-Main Jones AVR.'
      }
    ] satisfies AwardCertificate[]
  },
  {
    id: 'lanyard-4',
    title: 'Programming Contest Finalist',
    subtitle: 'Awarded for debugging and improving my own school system project.',
    year: '2023',
    tag: 'Debugging',
    accentFrom: '#f59e0b',
    accentTo: '#451a03',
    details:
      'Recognized for working on and debugging my own system, the CCS Programming Talent Monitoring System, with focus on fixing issues, improving the workflow, and making the system more reliable.',
    highlights: [
      'CCS Programming Talent Monitoring System',
      'Debugged my own system work',
      'Awarded for project improvement'
    ]
  },
  {
    id: 'lanyard-6',
    title: 'UI Design Excellence',
    subtitle: 'Recognized during capstone days for strong UI quality.',
    year: '2024',
    tag: 'Design',
    accentFrom: '#22c55e',
    accentTo: '#052e16',
    details:
      'During capstone days, one of our systems became part of the Top 10 and received a good grade for UI Design because of its clear layout, visual consistency, and usable interface.',
    highlights: ['Top 10 capstone system', 'Good graded UI Design', 'Clear and usable interface']
  },
  {
    id: 'lanyard-7',
    title: 'Outstanding Team Project',
    subtitle: 'Contributed to a collaborative build chosen as a class standout.',
    year: '2020',
    tag: 'Teamwork',
    accentFrom: '#60a5fa',
    accentTo: '#172554',
    details:
      'Worked closely with a small team to deliver a complete project that stood out for communication, execution quality, and balanced contribution.',
    highlights: ['Shared ownership', 'Milestone completion', 'Strong final output']
  },
  {
    id: 'lanyard-8',
    title: 'Technology Fair Exhibitor',
    subtitle: 'Showcased a student-built digital solution during a campus fair.',
    year: '2023',
    tag: 'Exhibit',
    accentFrom: '#2dd4bf',
    accentTo: '#042f2e',
    details:
      'Presented an interactive software concept to visitors and faculty, demonstrating both the technical build and the practical user value behind it.',
    highlights: ['Public demo', 'Faculty engagement', 'Interactive showcase']
  },
  {
    id: 'lanyard-9',
    title: 'Research Poster Merit',
    subtitle: 'Created a clear, well-structured poster for technical findings.',
    year: '2022',
    tag: 'Research',
    accentFrom: '#c084fc',
    accentTo: '#3b0764',
    details:
      'Developed a poster that translated technical information into a concise visual narrative, helping judges quickly understand the work and outcomes.',
    highlights: ['Clear visual summary', 'Good information flow', 'Positive evaluator feedback']
  },
  {
    id: 'lanyard-10',
    title: 'Community Impact Recognition',
    subtitle: 'Supported a school initiative with digital materials and coordination.',
    year: '2024',
    tag: 'Service',
    accentFrom: '#f97316',
    accentTo: '#431407',
    details:
      'Helped a school-led initiative by preparing digital assets, coordinating updates, and making sure communication materials were ready on time.',
    highlights: ['Useful support work', 'Organized delivery', 'Positive team contribution']
  }
];

export const Achievements: React.FC<AchievementsProps> = ({ onNavigateToProjects }) => {
  const [selectedLanyardId, setSelectedLanyardId] = React.useState<string | null>(null);
  const [certificateIndex, setCertificateIndex] = React.useState(0);
  const [countCycle, setCountCycle] = React.useState(0);
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const selectedLanyard =
    schoolAchievements.find((achievement) => achievement.id === selectedLanyardId) ?? null;
  const selectedCertificates = selectedLanyard?.certificates ?? [];
  const selectedCertificate = selectedCertificates[certificateIndex] ?? null;
  const isAchievementsInView = useInView(sectionRef, {
    once: false,
    amount: 0.3,
    margin: '0px 0px -10% 0px'
  });

  React.useEffect(() => {
    if (isAchievementsInView) {
      setCountCycle((current) => current + 1);
    }
  }, [isAchievementsInView]);

  React.useEffect(() => {
    setCertificateIndex(0);
  }, [selectedLanyardId]);

  React.useEffect(() => {
    if (!selectedLanyard) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedLanyardId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedLanyard]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050816] py-16 transition-colors duration-300 sm:py-24"
    >
      <div className="absolute inset-0 z-0">
        <Particles
          className="opacity-80"
          particleColors={['#ffffff', '#8cc8ff', '#7df9d1', '#c7b6ff']}
          particleCount={220}
          particleSpread={9}
          speed={0.08}
          particleBaseSize={92}
          moveParticlesOnHover={true}
          particleHoverFactor={0.22}
          alphaParticles={true}
          sizeRandomness={0.75}
          cameraDistance={18}
          pixelRatio={1}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,249,209,0.12),transparent_26%),radial-gradient(circle_at_80%_22%,rgba(140,200,255,0.12),transparent_24%),linear-gradient(180deg,rgba(3,7,18,0.78),rgba(5,8,22,0.92))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-cyan-200/80"
          >
            Achievements
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.04 }}
            className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Milestones that reflect delivery, growth, and measurable results.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-base leading-7 text-slate-300/82 sm:text-lg"
          >
            A few concise highlights that help round out the portfolio story beyond the project gallery.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            const isProjectsCard = achievement.action === 'projects';

            return (
              <motion.article
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                onClick={isProjectsCard ? onNavigateToProjects : undefined}
                onKeyDown={
                  isProjectsCard
                    ? (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          onNavigateToProjects?.();
                        }
                      }
                    : undefined
                }
                tabIndex={isProjectsCard ? 0 : -1}
                role={isProjectsCard ? 'button' : undefined}
                className={`rounded-3xl border border-white/10 bg-white/8 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-8 ${
                  isProjectsCard
                    ? 'cursor-pointer transition duration-300 hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-cyan-200/60'
                    : ''
                }`}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/12 bg-white/10">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-cyan-100/70">
                  {achievement.title}
                </p>
                <div className="mb-4 flex items-end gap-1 text-4xl font-bold text-white">
                  <div key={`${achievement.title}-${countCycle}`}>
                    <CountUp
                      from={0}
                      to={achievement.value}
                      duration={1.6}
                      startWhen={isAchievementsInView}
                      className="tabular-nums"
                    />
                  </div>
                  {achievement.suffix ? <span>{achievement.suffix}</span> : null}
                </div>
                <p className="text-base leading-relaxed text-slate-300/82">
                  {achievement.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <div className="relative mt-14 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-8 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-[8px] sm:mt-20 sm:rounded-[2rem] sm:px-8 sm:py-10 lg:px-10">
          <div className="absolute inset-0 z-0">
            <Particles
              className="opacity-75"
              particleColors={['#f8fafc', '#86efac', '#93c5fd', '#c4b5fd']}
              particleCount={160}
              particleSpread={8}
              speed={0.06}
              particleBaseSize={80}
              moveParticlesOnHover={true}
              particleHoverFactor={0.18}
              alphaParticles={true}
              sizeRandomness={0.9}
              cameraDistance={16}
              pixelRatio={1}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(134,239,172,0.08),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]" />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="mb-10 text-center"
            >
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-emerald-300/88">
                School Achievements
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                School awards, honors, and research recognitions.
              </h3>
            </motion.div>

            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
              {schoolAchievements.slice(0, 5).map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                >
                  <Lanyard
                    title={achievement.title}
                    subtitle={achievement.subtitle}
                    year={achievement.year}
                    tag={achievement.tag}
                    accentFrom={achievement.accentFrom}
                    accentTo={achievement.accentTo}
                    position={[index % 2 === 0 ? -4 : 4, 0, 20]}
                    gravity={[0, -40 - (index % 3) * 2, 0]}
                    onClick={() => setSelectedLanyardId(achievement.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedLanyard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm"
            onClick={() => setSelectedLanyardId(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[calc(100svh-4rem)] w-full max-w-4xl overflow-y-auto rounded-[1.5rem] border border-white/10 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.28)] dark:bg-neutral-950 sm:rounded-[2rem] sm:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-400">
                    {selectedLanyard.tag} / {selectedLanyard.year}
                  </p>
                  <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                    {selectedLanyard.title}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLanyardId(null)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-700 transition hover:bg-gray-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="mb-6 text-base leading-8 text-gray-600 dark:text-neutral-300">
                {selectedLanyard.details}
              </p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {selectedLanyard.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 text-sm font-semibold text-gray-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                  >
                    {highlight}
                  </div>
                ))}
              </div>

              {selectedCertificate && (
                <div className="mt-7 rounded-[1.25rem] border border-gray-200 bg-gray-50 p-3 dark:border-neutral-800 dark:bg-neutral-900/80 sm:p-4">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
                        {selectedCertificate.label}
                      </p>
                      <div className="inline-flex rounded-full bg-amber-300 px-4 py-2 text-sm font-extrabold text-amber-950 shadow-sm">
                        {selectedCertificate.award}
                      </div>
                    </div>
                    {selectedCertificates.length > 1 && (
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-neutral-400">
                        {certificateIndex + 1} / {selectedCertificates.length}
                      </p>
                    )}
                  </div>

                  <p className="mb-4 text-sm leading-6 text-gray-600 dark:text-neutral-300">
                    {selectedCertificate.description}
                  </p>

                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-inner dark:border-neutral-800 dark:bg-neutral-950">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-neutral-950">
                      <img
                        src={selectedCertificate.image}
                        alt={selectedCertificate.alt}
                        className="h-full w-full object-contain"
                      />

                      {certificateIndex > 0 && (
                        <button
                          type="button"
                          onClick={() => setCertificateIndex((current) => Math.max(0, current - 1))}
                          className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white backdrop-blur transition hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/70"
                          aria-label="View previous certificate"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                      )}

                      {certificateIndex < selectedCertificates.length - 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setCertificateIndex((current) =>
                              Math.min(selectedCertificates.length - 1, current + 1)
                            )
                          }
                          className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white backdrop-blur transition hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/70"
                          aria-label="View next certificate"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
