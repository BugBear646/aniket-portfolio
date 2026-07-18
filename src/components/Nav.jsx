import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const sections = [
  { id: "about", label: "about" },
  { id: "education", label: "education" },
  { id: "experience", label: "experience" },
  { id: "work", label: "work" },
  { id: "side-projects", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "contact", label: "contact" },
];

export default function Nav() {
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-base/85 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="font-display text-sm font-semibold tracking-tight text-text hover:text-amber transition-colors"
        >
          <span className="text-amber">&gt;</span> akj
          <span className="text-amber animate-pulse">_</span>
        </a>

        <ul className="hidden md:flex items-center gap-1 font-display text-xs">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`relative px-4 py-2 rounded-md transition-colors ${
                  active === id ? "text-amber" : "text-muted hover:text-text"
                }`}
              >
                {active === id && (
                  <span className="text-amber/60 mr-1">/</span>
                )}
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="https://topmate.io/aniket_jha"
            target="_blank"
            rel="noreferrer"
            className="font-display text-xs border border-amber/40 text-amber px-4 py-2 rounded-md hover:bg-amber/10 transition-colors"
          >
            book a call
          </a>
        </div>
      </nav>
    </header>
  );
}