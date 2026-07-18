import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Trophy, Medal, Calendar } from "lucide-react";
import { education } from "../data";

// Two logo variants: a white mark for dark theme, a dark mark for light
// theme. Swaps automatically based on the .theme-light/.theme-dark class
// on <html>. Falls back to the GraduationCap icon if neither loads, so a
// missing asset never breaks the layout.
function InstitutionMark({ src, srcLight, alt }) {
  const [failed, setFailed] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsLight(root.classList.contains("theme-light"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const activeSrc = isLight && srcLight ? srcLight : src;

  return (
    <div
      className={`w-20 h-20 rounded-lg border flex items-center justify-center shrink-0 overflow-hidden ${
        isLight && srcLight ? "bg-panel border-line" : "bg-panel2 border-line"
      }`}
    >
      {!activeSrc || failed ? (
        <GraduationCap size={30} className="text-panel" strokeWidth={1.5} />
      ) : (
        <img
          src={activeSrc}
          alt={alt}
          onError={() => setFailed(true)}
          className="max-w-[72%] max-h-[72%] object-contain"
        />
      )}
    </div>
  );
}

// Competition wins get their own accent — not reused from Experience/Work.
const RESULT_STYLE = {
  Winner: {
    icon: Trophy,
    ring: "border-amber/25 hover:border-amber/50",
    chip: "text-amber bg-amber/[0.08] border-amber/25",
    iconWrap: "bg-amber/[0.08] border-amber/25 text-amber",
  },
  "National Finalist": {
    icon: Medal,
    ring: "border-teal/25 hover:border-teal/50",
    chip: "text-teal bg-teal/[0.08] border-teal/25",
    iconWrap: "bg-teal/[0.08] border-teal/25 text-teal",
  },
};

function CompetitionCard({ item, index }) {
  const style = RESULT_STYLE[item.result] ?? RESULT_STYLE.Winner;
  const Icon = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={`relative rounded-xl border bg-panel2/50 transition-colors px-5 py-5 ${style.ring}`}
    >
      <div className="flex items-start gap-3.5">
        <div
          className={`w-11 h-11 rounded-lg border flex items-center justify-center shrink-0 ${style.iconWrap}`}
        >
          <Icon size={19} strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h4 className="font-display text-[15px] font-semibold text-text">
              {item.title}
            </h4>
            <span
              className={`inline-flex font-display text-[10px] uppercase tracking-wide border rounded-full px-2 py-0.5 whitespace-nowrap ${style.chip}`}
            >
              {item.result}
            </span>
          </div>
          <p className="font-display text-[10px] uppercase tracking-wide text-faint mt-1.5">
            {item.tag} · {item.period}
          </p>
          <p className="text-sm text-muted leading-relaxed mt-2.5">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  if (!education) return null;

  return (
    <section id="education" className="relative py-28 md:py-36 px-6 bg-panel2/40">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14">
          <span className="font-display text-xs text-teal">02 / education</span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text mt-3">
            Where it started.
          </h2>
          <p className="text-muted mt-3 max-w-xl text-sm md:text-lg">
            Four years at IIT Kharagpur, compressed.
          </p>
        </div>

        {/* Degree — credential-plaque layout, deliberately not the
           Experience card shell (no icon-box header row / pill duo). */} 
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-xl border border-line bg-gradient-to-br from-panel2/70 to-panel/40 overflow-hidden"
        >
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amber via-amber/40 to-transparent" />

          <div className="pl-7 pr-6 py-7 md:pl-9 md:pr-8 md:py-8">
            <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-5">
              <div className="flex items-start gap-4 min-w-0">
                <InstitutionMark
                  src="/logos/iitkgp.png"
                  srcLight="/logos/iitkgp-dark.png"
                  alt="IIT Kharagpur"
                />
                <div className="min-w-0">
                  <h3 className="font-display text-lg md:text-xl font-semibold text-text">
                    {education.institution}
                  </h3>
                  <p className="font-display text-sm text-amber mt-1">
                    {education.degree}
                  </p>
                  <p className="font-display text-[11px] text-faint mt-2.5">
                    {education.period} · {education.location}
                  </p>
                </div>
              </div>

              <div className="shrink-0 inline-flex items-baseline gap-1.5 rounded-lg border border-line bg-panel/50 px-4 py-2.5">
                <span className="font-display text-xl md:text-2xl font-bold text-text leading-none">
                  {education.grade}
                  {education.gradeScale && (
                    <span className="text-faint font-semibold">/{education.gradeScale}</span>
                  )}
                </span>
                <span className="font-display text-[10px] uppercase tracking-wide text-faint">
                  CGPA
                </span>
              </div>
            </div>

            {/* Achievements — kept as a flat honors list. */}
            {education.achievements?.length > 0 && (
              <div className="mt-6 pt-6 border-t border-dashed border-line">
                <p className="font-display text-[10px] uppercase tracking-wide text-amber mb-2.5">
                  Achievements
                </p>
                <ul className="space-y-1.5">
                  {education.achievements.map((ach, i) => (
                    <li
                      key={i}
                      className="text-sm text-body leading-relaxed flex gap-2"
                    >
                      <span className="text-amber/60 mt-1.5 text-[8px] shrink-0">●</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Positions of responsibility — same card, mirroring the
               Experience rung layout (role, period pill, one-liner)
               instead of a flat POR bullet list. All entries are past,
               so every timeline dot gets the same solid style. */}
            {education.positions?.length > 0 && (
              <div className="mt-6 pt-6 border-t border-dashed border-line">
                <p className="font-display text-[10px] uppercase tracking-wide text-teal mb-4">
                  Positions of Responsibility
                </p>
                <div className="relative pl-5">
                  <div className="absolute left-[3px] top-1.5 bottom-1.5 w-px bg-line" />
                  {education.positions.map((pos, i) => (
                    <div
                      key={pos.role}
                      className={`relative ${i < education.positions.length - 1 ? "pb-6" : ""}`}
                    >
                      <span className="absolute -left-5 top-1 w-2 h-2 rounded-full bg-faint border-2 border-faint" />
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <p className="font-display text-sm font-medium text-text">
                          {pos.role}
                        </p>
                        {pos.period && (
                          <span className="inline-flex items-center gap-1.5 font-display text-[11px] text-teal bg-teal/[0.08] border border-teal/25 rounded-full px-2.5 py-0.5 whitespace-nowrap">
                            <Calendar size={11} />
                            {pos.period}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-body leading-relaxed mt-1.5">
                        {pos.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Competitions — the highlight. Visually its own block, not a
           duplicate of the degree card or Experience timeline entries. */}
        {education.competitions?.length > 0 && (
          <div className="mt-6">
            <p className="font-display text-[11px] uppercase tracking-wide text-faint mb-3">
              Competitions
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {education.competitions.map((item, i) => (
                <CompetitionCard item={item} index={i} key={item.title} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}