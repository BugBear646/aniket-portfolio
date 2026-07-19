import { useEffect, useState } from "react";

// Banner-only company list — separate from the `companies` data used in the
// Experience section. Edit logos, names, and click-through URLs here directly.
//
// THEME-AWARE LOGOS: dark and light themes use separate source files, since
// the dark-theme marks are designed to sit on a dark background (and are
// desaturated via CSS to a uniform gray, revealing color on hover) while the
// light-theme marks are already colored for a light background and are shown
// as-is, no grayscale.
//   logo       → dark-theme file, from /logos/banner/
//   logoLight  → light-theme file, from /logos/banner_white/
//
// SIZING: every logo is capped to the same fixed HEIGHT (not width) and
// scaled with object-contain — so each logo's own aspect ratio determines
// its rendered width. A wide-and-short mark (IEEE, 287×84 ≈ 3.4:1) still
// fills the full target height and renders proportionally wide, instead of
// being width-capped and shrinking vertically the way a fixed-width box
// would force it to.
//
// Source files differ in how tightly they're cropped around the actual
// mark — some have generous padding, some are edge-to-edge — so the same
// box height alone doesn't make them *look* the same size. `scaleDark` and
// `scaleLight` (multipliers applied to the target height, default 1 each)
// compensate per logo, per theme, calibrated against Sprinklr as the
// reference:
//   > 1  → logo reads smaller than Sprinklr at baseline, sized up
//   < 1  → logo reads larger than Sprinklr at baseline, sized down
//
// Dark and light source files for the same company are often cropped
// differently, so the two scales are set and tuned independently.
const bannerCompanies = [
  {
    name: "Sprinklr",
    logo: "/logos/banner/banner_sprinklr.png",
    logoLight: "/logos/banner_white/banner_sprinklr.png",
    url: "https://www.sprinklr.com",
    scaleDark: 1.0,
    scaleLight: 1.75,
  },
  {
    name: "Merlin AI by Foyer",
    logo: "/logos/banner/banner_merlin.png",
    logoLight: "/logos/banner_white/banner_merlin.png",
    url: "https://www.getmerlin.in/",
    scaleDark: 0.8,
    scaleLight: 1.75,
  },
  {
    name: "Mercedes-Benz Research & Development India",
    logo: "/logos/banner/banner_mercedes.png",
    logoLight: "/logos/banner_white/banner_mercedes.png",
    url: "https://www.mbrdi.co.in",
    scaleDark: 1.5,
    scaleLight: 1.5,
  },
  {
    name: "Unstop",
    logo: "/logos/banner/banner_unstop.png",
    logoLight: "/logos/banner_white/banner_unstop.png",
    url: "https://unstop.com",
    scaleDark: 0.8,
    scaleLight: 0.7,
  },
  {
    name: "IEEE IIT KGP Student Branch",
    logo: "/logos/banner/banner_ieee.png",
    logoLight: "/logos/banner_white/banner_ieee.png",
    url: "https://sac.iitkgp.ac.in/",
    scaleDark: 0.7,
    scaleLight: 0.65,
  },
  {
    name: "Embibe",
    logo: "/logos/banner/banner_embibe.png",
    logoLight: "/logos/banner_white/banner_embibe.png",
    url: "https://www.embibe.com",
    scaleDark: 1.4,
    scaleLight: 1.4,
  },
  {
    name: "Neilsoft",
    logo: "/logos/banner/banner_neilsoft.png",
    logoLight: "/logos/banner_white/banner_neilsoft.png",
    url: "https://neilsoft.com",
    scaleDark: 0.8,
    scaleLight: 2.75,
  },
  {
    name: "Student's Alumni Cell, IIT Kharagpur",
    logo: "/logos/banner/banner_sac.png",
    logoLight: "/logos/banner_white/banner_sac.png",
    url: "https://sac.iitkgp.ac.in/",
    scaleDark: 1.25,
    scaleLight: 1.25,
  },
  {
    name: "TeamKart, IIT Kharagpur",
    logo: "/logos/banner/banner_teamkart.png",
    logoLight: "/logos/banner_white/banner_teamkart.png",
    url: "https://teamkart.org/",
    scaleDark: 1.45,
    scaleLight: 1.75,
  },
];

// Global multiplier applied on top of each logo's individual scale.
// Brings every logo down to 80% of its previous rendered size.
const GLOBAL_SCALE = 0.8;

// Reads the active theme from the `theme-light` / `theme-dark` class that
// ThemeToggle sets on <html>, and stays in sync with it. No React context
// exists for theme, so this mirrors ThemeToggle's own mechanism (class on
// documentElement) via a MutationObserver rather than introducing one.
function useTheme() {
  const getTheme = () =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("theme-light")
      ? "light"
      : "dark";

  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return theme;
}

function CompanyTile({ company, theme }) {
  const [imgFailed, setImgFailed] = useState(false);

  const isLight = theme === "light";
  const src = isLight ? company.logoLight ?? company.logo : company.logo;

  // Each company sets its own scaleDark and scaleLight independently, since
  // the dark and light source files can be cropped differently.
  const themeScale = isLight
    ? company.scaleLight ?? 1
    : company.scaleDark ?? 1;
  const effectiveScale = themeScale * GLOBAL_SCALE;

  return (
    <a
      href={company.url}
      target="_blank"
      rel="noreferrer"
      className="group shrink-0 flex items-center justify-center h-12 md:h-14"
      aria-label={`Visit ${company.name}`}
      title={company.name}
    >
      {!imgFailed ? (
        // Fixed HEIGHT only — no fixed width. This lets each logo's own
        // aspect ratio decide how wide it renders, so a wide-and-short mark
        // (e.g. IEEE, ~3.4:1) still fills the full target height instead of
        // being width-capped and shrinking vertically inside a fixed box.
        // `scaleDark`/`scaleLight` compensate for source files cropped
        // tighter than the rest, independently per theme.
        // Dark theme: grayscale at rest, full color on hover.
        // Light theme: logos are pre-colored for a light background, so no
        // grayscale — just a subtle opacity dip that lifts on hover.
        <img
          src={src}
          alt={company.name}
          onError={() => setImgFailed(true)}
          style={{ height: `${effectiveScale * 100}%` }}
          className={
            isLight
              ? "w-auto max-w-[170px] object-contain opacity-80 group-hover:opacity-100 transition-all duration-300"
              : "w-auto max-w-[170px] object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
          }
        />
      ) : (
        // Text fallback shown until a real logo file is added at company.logo
        <span className="font-display text-sm text-muted group-hover:text-amber transition-colors text-center px-3">
          {company.name}
        </span>
      )}
    </a>
  );
}

export default function CompanyBanner() {
  const theme = useTheme();

  // Duplicate the list so the marquee loops seamlessly.
  const track = [...bannerCompanies, ...bannerCompanies];

  return (
    <section className="relative py-14">
      <p className="text-center font-display text-[11px] uppercase tracking-wide text-faint mb-8">
        Companies I've worked with
      </p>

      <div className="relative overflow-hidden">
        {/* fade edges — blend into the same base background, no visible box */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-base to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-base to-transparent z-10" />

        {/* Plain CSS animation (see `marquee` in tailwind.config.js), not
            Framer Motion's `animate` prop. A Framer keyframe animation
            restarts from its first frame whenever the component re-renders
            with a new `animate` object reference — which happens every time
            `theme` changes (dark/light toggle), causing a visible jump back
            to the start. A CSS animation runs entirely in the browser
            compositor, independent of React's render cycle, so switching
            themes never interrupts or resets its position. */}

        <div
          className="flex w-max items-center gap-28 animate-marquee"
          style={{ willChange: "transform" }}
        >
          {track.map((company, i) => (
            <CompanyTile company={company} theme={theme} key={`${company.name}-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}