import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { projects } from "../data";

function ProjectCard({ project, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border border-line rounded-lg bg-panel hover:border-amber/30 transition-colors overflow-hidden"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 group"
      >
        <div>
          <div className="flex items-center gap-3 font-display text-xs text-faint mb-1">
            <span className="text-amber">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{project.subtitle}</span>
          </div>
          <h3 className="font-display text-lg md:text-xl font-semibold text-text group-hover:text-amber transition-colors">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-display text-[10px] uppercase tracking-wide text-teal border border-teal/25 bg-teal/[0.05] rounded px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 mt-1 text-faint group-hover:text-amber"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-1 grid sm:grid-cols-3 gap-5 border-t border-line/60 mt-2">
              <div className="pt-4">
                <div className="font-display text-[10px] uppercase text-faint mb-1.5">
                  Problem
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  {project.problem}
                </p>
              </div>
              <div className="pt-4">
                <div className="font-display text-[10px] uppercase text-faint mb-1.5">
                  What I built
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  {project.build}
                </p>
              </div>
              <div className="pt-4">
                <div className="font-display text-[10px] uppercase text-amber mb-1.5">
                  Outcome
                </div>
                <p className="text-sm text-text leading-relaxed">
                  {project.outcome}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative py-28 md:py-36 px-6 bg-panel2/40">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <span className="font-display text-xs text-teal">04 / work</span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text mt-3">
            Things I built, not just shipped.
          </h2>
          <p className="text-muted/80 text-body md:text-lg mt-3">
            Case studies from enterprise integrations shipped end-to-end, from problem to production.
          </p>
        </div>

        <div className="space-y-4">
          {projects.map((project, i) => (
            <ProjectCard project={project} index={i} key={project.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
