import { useEffect, useRef, useState } from "react";

// A soft, opaque light patch that follows the cursor around the page.
// Uses refs + rAF instead of React state so it never triggers re-renders.
export default function CursorGlow() {
  const glowRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const visible = useRef(false);
  const raf = useRef(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Skip entirely on touch devices or when reduced motion is requested.
    if (!isFinePointer || prefersReducedMotion) return;

    const el = glowRef.current;
    if (!el) return;

    const handleMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible.current) {
        visible.current = true;
        el.style.opacity = "1";
      }
    };

    const handleLeave = () => {
      visible.current = false;
      el.style.opacity = "0";
    };

    const animate = () => {
      // Lerp toward the target for a soft trailing feel.
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const [blendMode, setBlendMode] = useState("screen");

  useEffect(() => {
    const root = document.documentElement;
    const updateBlend = () =>
      setBlendMode(root.classList.contains("theme-light") ? "multiply" : "screen");
    updateBlend();
    const observer = new MutationObserver(updateBlend);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[420px] w-[420px] rounded-full opacity-0 transition-opacity duration-300 ease-out"
      style={{
        background:
          "radial-gradient(circle, rgb(var(--color-amber) / 0.10) 0%, rgb(var(--color-amber) / 0.05) 35%, transparent 70%)",
        mixBlendMode: blendMode,
        willChange: "transform",
      }}
    />
  );
}