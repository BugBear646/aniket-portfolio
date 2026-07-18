import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, Check } from "lucide-react";
import { profile } from "../data";

// lucide-react only ships the legacy bird mark under "Twitter" — this is
// the current X wordmark, sized/colored the same way the other icons are.
function XIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  { key: "linkedin", icon: Linkedin, url: profile.socials.linkedin, label: "LinkedIn" },
  { key: "github", icon: Github, url: profile.socials.github, label: "GitHub" },
  { key: "twitter", icon: XIcon, url: profile.socials.twitter, label: "X (Twitter)" },
].filter((s) => s.url);

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <span className="font-display text-xs text-teal">07 / contact</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text mt-3">
          Let's build something.
        </h2>
        <p className="text-muted mt-4 max-w-md mx-auto">
          Open to new PM roles, collaborations, or a good conversation about
          building great products.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-left bg-panel border border-line rounded-lg p-6 md:p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="font-display text-[11px] uppercase text-faint">
                Name
              </label>
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1.5 bg-base border border-line rounded-md px-3.5 py-2.5 text-sm text-text focus:border-amber/50 outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="font-display text-[11px] uppercase text-faint">
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1.5 bg-base border border-line rounded-md px-3.5 py-2.5 text-sm text-text focus:border-amber/50 outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="font-display text-[11px] uppercase text-faint">
              Message
            </label>
            <textarea
              required
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="w-full mt-1.5 bg-base border border-line rounded-md px-3.5 py-2.5 text-sm text-text focus:border-amber/50 outline-none transition-colors resize-none"
              placeholder="What's on your mind?"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="w-full font-display text-sm font-semibold bg-amber text-base rounded-md py-3 flex items-center justify-center gap-2 hover:bg-amber/90 transition-colors disabled:opacity-60"
          >
            {status === "sent" ? (
              <>
                <Check size={16} /> sent, talk soon
              </>
            ) : status === "sending" ? (
              "sending..."
            ) : (
              <>
                <Send size={15} /> send message
              </>
            )}
          </button>
          {status === "error" && (
            <p className="text-xs text-red-400 text-center">
              Something went wrong. Try emailing directly at {profile.email}
            </p>
          )}
        </motion.form>

        <div className="mt-12 flex items-center justify-center gap-5">
          <a
            href={`mailto:${profile.email}`}
            className="text-faint hover:text-amber transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          {socialLinks.map(({ key, icon: Icon, url, label }) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="text-faint hover:text-amber transition-colors"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        <p className="font-display text-[11px] text-faint mt-16">
          © {new Date().getFullYear()} {profile.name} · built with React + Tailwind + Framer Motion
        </p>
      </div>
    </section>
  );
}