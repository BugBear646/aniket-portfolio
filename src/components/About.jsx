import { motion } from "framer-motion";
import { Dumbbell, Trophy, Gamepad2, Mountain, Plane } from "lucide-react";
import { about } from "../data";

const iconMap = {
  dumbbell: Dumbbell,
  trophy: Trophy,
  gamepad: Gamepad2,
  mountain: Mountain,
  plane: Plane,
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// Renders "**word**" as a highlighted span so key phrases in the about
// copy stand out instead of the whole paragraph reading as flat gray text.
function renderHighlighted(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) => {
    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      return (
        <span key={i} className="text-amber/80">
          {chunk.slice(2, -2)}
        </span>
      );
    }
    return chunk;
  });
}

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-16"
        >
          <div className="space-y-5 order-1">
            <span className="font-display text-xs text-teal">01 / about</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text mt-3 leading-snug">
              Product,
              <br />
              built with precision.
            </h2>

            {about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="text-text/80 text-lg md:text-xl mt-3 leading-relaxed"
              >
                {renderHighlighted(p)}
              </motion.p>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="order-2 flex flex-col items-center gap-5 md:pt-32"
          >
            <div className="relative w-full max-w-sm aspect-[4/3]">
              {/* Portrait blended into the dark background: native 4:3
                 aspect ratio preserved exactly (object-contain, no crop).
                 Grayscale + reduced contrast keeps it tonal, and a mask
                 fades the top more than the bottom so the frame dissolves
                 into the page instead of sitting as a hard box. */}
              <img
                src="/aniket.png"
                alt="Aniket Kumar Jha"
                className="w-full h-full object-contain"
                style={{
                  filter: "grayscale(1) contrast(0.95) brightness(0.9)",
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, black 20%, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                  maskComposite: "intersect",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, black 20%, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                  WebkitMaskComposite: "source-in",
                }}
              />
            </div>

            {/* Small personality card, centered under the portrait rather
               than stretched full-width, a casual aside rather than
               another résumé line. */}
            <div className="w-full max-w-sm rounded-xl border border-line bg-panel/60 px-5 py-4 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl leading-none mt-0.5">🧭</span>
                <div>
                  <p className="font-display text-[10px] uppercase tracking-wide text-teal mb-1">
                    {about.sideNote.label}
                  </p>
                  <p className="text-sm text-body leading-relaxed">
                    {about.sideNote.text}
                  </p>
                </div>
              </div>

              {about.sideNote.hobbies?.length > 0 && (
                <div className="flex flex-wrap gap-2 pl-9">
                  {about.sideNote.hobbies.map((h) => {
                    const Icon = iconMap[h.icon];
                    return (
                      <span
                        key={h.label}
                        className="inline-flex items-center gap-1.5 font-display text-xs text-faint border border-line rounded-full px-3 py-1.5 transition-colors hover:bg-white/5 hover:text-body hover:border-faint cursor-default"
                      >
                        {Icon && <Icon size={13} />}
                        {h.label}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}