import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import SignalTrace from "./SignalTrace";
import { profile } from "../data";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* background grid */}
      <div className="absolute inset-0 bg-grid bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_10%,transparent_70%)]" />

      {/* ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber/[0.06] rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 font-display text-xs text-teal border border-teal/30 bg-teal/[0.06] rounded-full px-3 py-1 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
          open to new roles · {profile.location}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-text"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 font-display text-lg md:text-xl text-amber"
        >
          {profile.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="font-display text-sm bg-amber text-base font-semibold px-6 py-3 rounded-md hover:bg-amber/90 transition-colors"
          >
            My Work
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="font-display text-sm border border-line text-text px-6 py-3 rounded-md hover:border-amber/50 hover:text-amber transition-colors"
          >
            resume ↓
          </a>
        </motion.div>
      </div>

      {/* signature signal trace */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 w-full max-w-3xl mt-16 px-6"
      >
        <SignalTrace height={60} segments={64} seed={7} animated />
        <div className="flex justify-between font-display text-[10px] text-faint mt-1">
          <span>SIP/2.0</span>
          <span>200 OK</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 text-faint"
      >
        <ArrowDown size={18} />
      </motion.div>
    </section>
  );
}