/** @type {import('tailwindcss').Config} */

function withOpacity(cssVar) {
  return ({ opacityValue }) =>
    opacityValue === undefined
      ? `rgb(var(${cssVar}))`
      : `rgb(var(${cssVar}) / ${opacityValue})`;
}

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: withOpacity("--color-base"),
        body: withOpacity("--color-body"),
        panel: withOpacity("--color-panel"),
        panel2: withOpacity("--color-panel2"),
        line: withOpacity("--color-line"),
        amber: withOpacity("--color-amber"),
        amberDim: withOpacity("--color-amberDim"),
        teal: withOpacity("--color-teal"),
        violet: withOpacity("--color-violet"),
        text: withOpacity("--color-text"),
        muted: withOpacity("--color-muted"),
        faint: withOpacity("--color-faint"),
      },
      fontFamily: {
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      backgroundImage: {
        grid: "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};