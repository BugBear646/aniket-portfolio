import { useState } from "react";
import { motion } from "framer-motion";

// Banner-only company list — separate from the `companies` data used in the
// Experience section. Edit logos, names, and click-through URLs here directly.
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
// box height alone doesn't make them *look* the same size. `scale` (a
// multiplier applied to the target height, default 1) compensates per logo.
// Calibrated against Sprinklr as the reference:
//   > 1  → logo reads smaller than Sprinklr at baseline, sized up
//   < 1  → logo reads larger than Sprinklr at baseline, sized down
const bannerCompanies = [
  {
    name: "Sprinklr",
    logo: "/logos/banner/banner_sprinklr.png",
    url: "https://www.sprinklr.com",
  },
  {
    name: "Merlin AI by Foyer",
    logo: "/logos/banner/banner_merlin.png",
    url: "https://www.getmerlin.in/",
    scale: 0.8,
  },
  {
    name: "Mercedes-Benz Research & Development India",
    logo: "/logos/banner/banner_mercedes.png",
    url: "https://www.mbrdi.co.in",
    scale: 1.5,
  },
  {
    name: "Unstop",
    logo: "/logos/banner/banner_unstop.png",
    url: "https://unstop.com",
    scale: 0.8,
  },
  {
    name: "IEEE IIT KGP Student Branch",
    logo: "/logos/banner/banner_ieee.png",
    url: "https://sac.iitkgp.ac.in/",
    scale: 0.7,
  },
  {
    name: "Embibe",
    logo: "/logos/banner/banner_embibe.png",
    url: "https://www.embibe.com",
    scale: 1.4,
  },
  {
    name: "Neilsoft",
    logo: "/logos/banner/banner_neilsoft.png",
    url: "https://neilsoft.com",
    scale: 0.8,
  },
  {
    name: "Student's Alumni Cell, IIT Kharagpur",
    logo: "/logos/banner/banner_sac.png",
    url: "https://sac.iitkgp.ac.in/",
    scale: 1.25,
  },
  {
    name: "TeamKart, IIT Kharagpur",
    logo: "/logos/banner/banner_teamkart.png",
    url: "https://teamkart.org/",
    scale: 1.35,
  },
];

// Global multiplier applied on top of each logo's individual `scale`.
// Brings every logo down to 80% of its previous rendered size.
const GLOBAL_SCALE = 0.8;

function CompanyTile({ company }) {
  const [imgFailed, setImgFailed] = useState(false);

  // Combine per-logo scale (default 1) with the global scale, and apply it
  // via height percentage rather than a CSS `transform`. A transform only
  // changes how the image *looks* — the layout box stays full-size — which
  // is what was causing uneven gaps between logos of different scales.
  // Sizing the box itself keeps every tile's footprint proportional to its
  // visual size, so a fixed `gap` on the container reads as even spacing.
  const effectiveScale = (company.scale ?? 1) * GLOBAL_SCALE;

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
        // `scale` (if set) compensates for source files cropped tighter
        // than the rest. grayscale applied uniformly so every logo reads
        // as the same tone, then reveals full color on hover.
        <img
          src={company.logo}
          alt={company.name}
          onError={() => setImgFailed(true)}
          style={{ height: `${effectiveScale * 100}%` }}
          className="w-auto max-w-[170px] object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
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

        <motion.div
          className="flex w-max items-center gap-28"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {track.map((company, i) => (
            <CompanyTile company={company} key={`${company.name}-${i}`} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}