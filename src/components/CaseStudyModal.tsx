import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tilt } from "@/components/fx/Tilt";
import { MouseLight } from "@/components/fx/MouseLight";
import { ScrambleText } from "@/components/fx/ScrambleText";
import { Magnetic } from "@/components/fx/Magnetic";

/**
 * `evidence: "dashboard"` means the figure is legible in a platform screenshot
 * bundled under src/assets/ads and is quotable verbatim. `"stated"` means it is
 * asserted without an artefact in this repo — it still renders, but it is never
 * badged as verified. See the evidence policy in src/data/cv.ts.
 */
export type Evidence = "dashboard" | "stated";

export type CaseStudy = {
  n: string;
  tag: string;
  title: string;
  desc: string;
  /** Omitted when no genuine asset exists. Never fill this with stock. */
  img?: string;
  meta: string[];
  role?: string;
  year?: string;
  story?: string[];
  results?: { v: string; l: string; evidence?: Evidence }[];
  gallery?: string[];
  link?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function CaseStudyModal({
  project,
  total,
  onClose,
}: {
  project: CaseStudy | null;
  /** Case count, so the "01 / 09" marker stays honest when cases are added. */
  total: number;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {/* Backdrop */}
          <motion.button
            aria-label="Close case study"
            onClick={onClose}
            data-cursor="Close"
            className="fixed inset-0 bg-background/85 backdrop-blur-xl cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sheet */}
          <motion.article
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative mx-auto my-6 md:my-10 max-w-[1200px] w-[calc(100%-1.5rem)] bg-surface border border-border rounded-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <MouseLight />

            {/* Close */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-5 md:px-8 py-4 bg-background/60 backdrop-blur border-b border-border">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Case · {project.n} / {String(total).padStart(2, "0")} · {project.tag}
              </div>
              <Magnetic strength={0.3}>
                <button
                  onClick={onClose}
                  data-cursor="Close"
                  className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors border border-border rounded-full px-4 py-2"
                >
                  Close
                  <span className="transition-transform duration-300 group-hover:rotate-90">✕</span>
                </button>
              </Magnetic>
            </div>

            {/* Hero */}
            <header className="relative px-5 md:px-12 pt-10 md:pt-16 pb-8 md:pb-12">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
                className="text-xs uppercase tracking-[0.28em] text-accent mb-5 font-mono"
              >
                ✦ {project.role ?? "Case Study"} {project.year ? `· ${project.year}` : ""}
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
                className="font-display text-4xl md:text-7xl leading-[0.95] tracking-tighter text-balance"
              >
                <ScrambleText text={project.title} duration={900} />
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.7, ease: EASE }}
                className="mt-6 max-w-2xl text-muted-foreground leading-relaxed md:text-lg"
              >
                {project.desc}
              </motion.p>
            </header>

            {/* Cover */}
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 1.1, ease: EASE }}
              className="px-5 md:px-12"
            >
              {project.img && (
                <Tilt max={4} className="relative overflow-hidden rounded-sm">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={project.img}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-border pointer-events-none" />
                </Tilt>
              )}
            </motion.div>

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <section className="px-5 md:px-12 mt-12 md:mt-16">
                <p className="text-xs uppercase tracking-[0.28em] text-accent mb-6 font-mono">
                  ✦ Outcomes
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border pt-8">
                  {project.results.map((r, i) => (
                    <motion.div
                      key={r.l}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: EASE }}
                    >
                      <div className="font-display text-3xl md:text-5xl text-accent leading-none">
                        {r.v}
                      </div>
                      <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        {r.l}
                      </div>
                      {r.evidence === "dashboard" && (
                        <div
                          title="Read directly off a platform dashboard screenshot"
                          className="mt-2 inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-accent/70 font-mono"
                        >
                          <span className="w-1 h-1 rounded-full bg-accent/70" />
                          Verified in-platform
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Story */}
            <section className="px-5 md:px-12 mt-14 md:mt-20 grid md:grid-cols-12 gap-10">
              <div className="md:col-span-4">
                <p className="text-xs uppercase tracking-[0.28em] text-accent mb-4 font-mono">
                  ✦ The Story
                </p>
                <h3 className="font-display text-2xl md:text-3xl leading-tight">
                  How it was built, and what it changed.
                </h3>
              </div>
              <div className="md:col-span-8 space-y-5 text-muted-foreground leading-relaxed md:text-[17px]">
                {(project.story ?? [project.desc]).map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
                  >
                    {para}
                  </motion.p>
                ))}
                <ul className="flex flex-wrap gap-2 pt-2">
                  {project.meta.map((m) => (
                    <li
                      key={m}
                      className="text-[11px] uppercase tracking-[0.18em] border border-border px-3 py-1.5 rounded-full text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <section className="px-5 md:px-12 mt-14 md:mt-20">
                <p className="text-xs uppercase tracking-[0.28em] text-accent mb-6 font-mono">
                  ✦ Selected Media
                </p>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  {project.gallery.map((g, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
                      className={i % 3 === 0 ? "md:col-span-2" : ""}
                    >
                      <Tilt max={5} className="relative overflow-hidden rounded-sm group">
                        <div className={`${i % 3 === 0 ? "aspect-[16/8]" : "aspect-[4/3]"} overflow-hidden`}>
                          <img
                            src={g}
                            alt={`${project.title} media ${i + 1}`}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute inset-0 ring-1 ring-inset ring-border pointer-events-none" />
                      </Tilt>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <section className="px-5 md:px-12 mt-16 md:mt-24 mb-12 md:mb-16">
              <div className="relative overflow-hidden rounded-sm border border-border bg-background/60 p-8 md:p-14 text-center">
                <div
                  className="absolute inset-0 opacity-60 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, oklch(0.78 0.15 65 / 0.18), transparent 60%)",
                  }}
                />
                <p className="relative text-xs uppercase tracking-[0.28em] text-accent mb-4 font-mono">
                  ✦ Want a build like this?
                </p>
                <h3 className="relative font-display text-3xl md:text-5xl tracking-tight leading-[1.05] text-balance">
                  Let's engineer the next one together.
                </h3>
                <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Magnetic strength={0.4}>
                    <a
                      href="mailto:maulana.arif.pratama@gmail.com"
                      data-cursor="Email"
                      className="group inline-flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium hover:bg-accent transition-all duration-300"
                    >
                      Start a conversation
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                  </Magnetic>
                  {project.link && (
                    <Magnetic strength={0.3}>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="Open"
                        className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors border border-border px-5 py-3 rounded-full"
                      >
                        Visit live →
                      </a>
                    </Magnetic>
                  )}
                </div>
              </div>
            </section>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
