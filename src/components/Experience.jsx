import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { experience } from "../data";

function CompanyLogo({ logo, company }) {
  const [failed, setFailed] = useState(false);

  if (!logo || failed) {
    return (
      <div className="w-10 h-10 rounded-md bg-panel2 border border-line flex items-center justify-center shrink-0">
        <span className="font-display text-xs text-faint">
          {company.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-md bg-white/[0.03] border border-line flex items-center justify-center shrink-0 overflow-hidden">
      <img
        src={logo}
        alt={`${company} logo`}
        onError={() => setFailed(true)}
        className="max-w-[70%] max-h-[70%] object-contain"
      />
    </div>
  );
}

// Accepts either shape:
//   { company, role, period, points, location, logo }             — single role
//   { company, roles: [{role, period, points}, ...], location, logo } — ladder
// Normalizes to a `roles` array either way, ordered most-recent-first.
function normalize(entry) {
  if (entry.roles) return entry;
  const { role, period, points, ...rest } = entry;
  return { ...rest, roles: [{ role, period, points }] };
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-36 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14">
          <span className="font-display text-xs text-teal">03 / experience</span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text mt-3">
            Career trace.
          </h2>
          <p className="text-muted mt-3 max-w-xl text-sm md:text-lg">
            The route the last few years took.
          </p>
        </div>

        <div className="relative pl-8 md:pl-10">
          <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-line" />

          {experience.map((raw, i) => {
            const job = normalize(raw);
            const isLadder = job.roles.length > 1;

            return (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative pb-12 last:pb-0"
              >
                <span
                  className={`absolute -left-8 md:-left-10 top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                    i === 0
                      ? "bg-amber border-amber shadow-[0_0_0_4px_rgba(232,163,61,0.15)]"
                      : "bg-base border-faint"
                  }`}
                />

                <div className="rounded-lg border border-line bg-panel/60 hover:border-amber/25 transition-colors px-5 py-4 md:px-6 md:py-5">
                  {/* company header — shown once */}
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                    <div className="flex items-start gap-3">
                      <CompanyLogo logo={job.logo} company={job.company} />
                      <div>
                        <h3 className="font-display text-lg font-semibold text-text">
                          {job.company}
                        </h3>
                        {!isLadder && (
                          <p className="font-display text-sm text-amber mt-0.5">
                            {job.roles[0].role}
                          </p>
                        )}
                      </div>
                    </div>

                    {job.location && (
                      <span className="inline-flex items-center gap-1.5 font-display text-[11px] text-faint whitespace-nowrap shrink-0">
                        <MapPin size={11} />
                        {job.location}
                      </span>
                    )}
                  </div>

                  {/* single-role: period + bullets directly */}
                  {!isLadder && (
                    <>
                      <span className="inline-flex items-center gap-1.5 font-display text-[11px] text-teal bg-teal/[0.08] border border-teal/25 rounded-full px-2.5 py-1 whitespace-nowrap mt-3">
                        <Calendar size={11} />
                        {job.roles[0].period}
                      </span>
                      <ul className="mt-4 space-y-1.5">
                        {job.roles[0].points.map((pt, j) => (
                          <li
                            key={j}
                            className="text-sm text-body leading-relaxed flex gap-2"
                          >
                            <span className="text-teal/60 mt-1.5 text-[8px]">●</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {/* ladder: each role as its own rung, most recent first */}
                  {isLadder && (
                    <div className="mt-4 relative pl-5">
                      <div className="absolute left-[3px] top-1.5 bottom-1.5 w-px bg-line" />
                      {job.roles.map((r, ri) => (
                        <div
                          key={r.role}
                          className={`relative ${ri < job.roles.length - 1 ? "pb-6" : ""}`}
                        >
                          <span
                            className={`absolute -left-5 top-1 w-2 h-2 rounded-full border-2 ${
                              ri === 0
                                ? "bg-amber border-amber"
                                : "bg-base border-faint"
                            }`}
                          />
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <p className="font-display text-sm text-amber">
                              {r.role}
                            </p>
                            <span className="inline-flex items-center gap-1.5 font-display text-[11px] text-teal bg-teal/[0.08] border border-teal/25 rounded-full px-2.5 py-0.5 whitespace-nowrap">
                              <Calendar size={11} />
                              {r.period}
                            </span>
                          </div>
                          <ul className="mt-2.5 space-y-1.5">
                            {r.points.map((pt, j) => (
                              <li
                                key={j}
                                className="text-sm text-body leading-relaxed flex gap-2"
                              >
                                <span className="text-teal/60 mt-1.5 text-[8px]">●</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}