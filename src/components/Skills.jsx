import { motion } from "framer-motion";
import { skills } from "../data";

const groupColors = {
  Product: { text: "text-amber", border: "border-amber/30", bg: "hover:bg-amber/10" },
  Technical: { text: "text-teal", border: "border-teal/30", bg: "hover:bg-teal/10" },
  Analytical: { text: "text-violet", border: "border-violet/30", bg: "hover:bg-violet/10" },
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36 px-6 bg-panel2/40">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <span className="font-display text-xs text-teal">06 / skills</span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text mt-3">
            Stack &amp; strengths.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {Object.entries(skills).map(([group, items], gi) => {
            const c = groupColors[group] || groupColors.Technical;
            return (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: gi * 0.1 }}
              >
                <h3
                  className={`font-display text-xs uppercase tracking-wide ${c.text} mb-4`}
                >
                  {group}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: gi * 0.1 + i * 0.03 }}
                      whileHover={{ y: -2 }}
                      className={`font-display text-xs text-muted border ${c.border} ${c.bg} rounded-md px-3 py-1.5 cursor-default transition-colors`}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}