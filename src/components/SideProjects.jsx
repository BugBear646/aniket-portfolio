import { motion } from "framer-motion";
import { Wrench, Lightbulb, ArrowUpRight } from "lucide-react";
import { sideProjects } from "../data";

// Maps each project.status value to its own ribbon icon. Add new statuses
// here — falls back to Wrench if a status isn't listed.
const statusIcons = {
  "in progress": Wrench,
  ideation: Lightbulb,
};

function SideProjectCard({ project, index }) {
  return (
    <motion.a
      href={project.repoUrl}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative block border border-line rounded-lg bg-panel hover:border-amber/40 hover:-translate-y-1 transition-all duration-300 p-6 md:p-7"
    >
      {/* status ribbon */}
      <div className="absolute top-0 right-6 -translate-y-1/2 flex items-center gap-1.5 font-display text-[10px] uppercase tracking-wide text-base bg-amber px-3 py-1 rounded-full shadow-md shadow-black/30">
        {(() => {
          const StatusIcon = statusIcons[project.status] || Wrench;
          return <StatusIcon size={11} />;
        })()}
        {project.status}
      </div>

      <div className="font-display text-[11px] text-faint mb-3">
        bugbear646 / {project.title.toLowerCase()}
      </div>

      <h3 className="font-display text-xl md:text-2xl font-bold text-text group-hover:text-amber transition-colors">
        {project.title}
      </h3>

      <p className="text-body text-sm mt-3 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-display text-[10px] uppercase tracking-wide text-teal border border-teal/25 bg-teal/[0.05] rounded-full px-3 py-1"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-dashed border-line flex items-center justify-end">
        <span className="font-display text-xs text-amber flex items-center gap-1 group-hover:gap-1.5 transition-all">
          view <ArrowUpRight size={13} />
        </span>
      </div>
    </motion.a>
  );
}

export default function SideProjects() {
  if (!sideProjects || sideProjects.length === 0) return null;

  return (
    <section id="side-projects" className="relative py-28 md:py-36 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <span className="font-display text-xs text-teal">05 / side quests</span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text mt-3">
            No client sign-off required.
          </h2>
          <p className="text-muted mt-3 max-w-xl text-sm md:text-lg">
            Built on weekends, for the fun of building.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {sideProjects.map((project, i) => (
            <SideProjectCard project={project} index={i} key={project.id} />
          ))}
        </div>

        <p className="font-display text-xs text-faint text-center mt-10">
          more experiments cooking, watch this space ✦
        </p>
      </div>
    </section>
  );
}