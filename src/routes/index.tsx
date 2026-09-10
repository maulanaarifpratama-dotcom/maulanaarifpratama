import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { CaseStudyModal, type CaseStudy } from "@/components/CaseStudyModal";
import { projects } from "@/data/projects";
import {
  profile,
  headlineStats,
  capabilities as expertise,
  industries,
  experience,
  adsPortfolio,
  skuBoard,
  stack,
} from "@/data/cv";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { CinematicScroll } from "@/components/fx/CinematicScroll";
import { FilmTreatment } from "@/components/fx/FilmTreatment";
import { HeroTimeline } from "@/components/fx/HeroTimeline";
import { CustomCursor } from "@/components/fx/CustomCursor";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { Magnetic } from "@/components/fx/Magnetic";
import { Tilt } from "@/components/fx/Tilt";
import { ScrambleText } from "@/components/fx/ScrambleText";
import { MouseLight } from "@/components/fx/MouseLight";
import { ClientOnly } from "@/components/fx/ClientOnly";
import heroBg from "@/assets/hero-bg.jpg";
import heroVideoAsset from "@/assets/hero-video.mp4.asset.json";
import portrait from "@/assets/portrait.jpg";
import tiktokImg from "@/assets/tiktok-summit.jpg";
import waImg from "@/assets/whatsapp-summit.jpg";
import googleImg from "@/assets/google.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maulana Arif Pratama - Digital Business Leader & AI Builder" },
      {
        name: "description",
        content:
          "8+ years building growth engines, AI workflows, and social impact platforms. Managed IDR 20B+ in performance media across Meta, Google, TikTok.",
      },
      { property: "og:title", content: "Maulana Arif Pratama - Digital Business Leader" },
      {
        property: "og:description",
        content: "Growth strategist, AI agent builder, social impact technologist.",
      },
    ],
  }),
  component: Home,
});

const marqueeWords = [
  "Growth", "AI Agents", "Performance", "Strategy", "Impact",
  "Martech", "Product", "Brand", "Automation", "Fundraising",
];

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section ref={ref} id="top" data-hero-section className="relative h-[100svh] w-full overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <video
          data-hero-video
          src={heroVideoAsset.url}
          poster={heroBg}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-110"
        />
        {/* TVC color grade + vignette */}
        <div className="absolute inset-0 mix-blend-soft-light" style={{ background: "linear-gradient(180deg, oklch(0.78 0.15 65 / 0.18), oklch(0.55 0.18 250 / 0.12))" }} />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 220px 60px oklch(0 0 0 / 0.85)" }} />
        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 2px, oklch(1 0 0) 2px 3px)" }} />
        {/* Light sweep */}
        <div className="absolute -inset-x-20 top-1/3 h-40 opacity-30 animate-[sweep_9s_ease-in-out_infinite] motion-reduce:animate-none" style={{ background: "linear-gradient(90deg, transparent, oklch(0.85 0.16 65 / 0.5), transparent)" }} />
      </motion.div>

      {/* Cinematic letterbox bars now provided globally by <FilmTreatment /> */}

      {/* Corner TVC marks */}
      <div className="pointer-events-none absolute top-[7vh] left-6 md:left-10 z-30 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-accent/80">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Rec · 00:00:24
      </div>
      <div className="pointer-events-none absolute top-[7vh] right-6 md:right-10 z-30 text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
        Reel 01 / 09 · 24fps · 2.39:1
      </div>

      <div className="relative h-full max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground mb-8"
        >
          <span className="w-8 h-px bg-accent" />
          Portfolio - Vol. 01 / 2026
        </motion.div>

        <h1 className="font-display text-balance text-[14vw] md:text-[8.5vw] leading-[0.95] tracking-tighter">
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            Engineering growth
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="block italic text-accent"
          >
            with purpose.
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <p className="max-w-md text-base md:text-lg text-muted-foreground leading-relaxed">
            Maulana Arif Pratama - digital business leader, growth strategist
            and AI builder. Eight years turning ambition into measurable impact.
          </p>
          <div className="flex items-center gap-4">
            <Magnetic strength={0.4}>
              <a
                href="#work"
                data-cursor="View"
                className="group inline-flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium hover:bg-accent transition-all duration-300"
              >
                <ScrambleText text="View selected work" duration={900} />
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                data-cursor="Talk"
                className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </Magnetic>
          </div>

        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 right-6 md:right-10 text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono rotate-180"
        style={{ writingMode: "vertical-rl" }}
      >
        Scroll to explore
      </motion.div>
    </section>
  );
}

function Marquee() {
  const row = [...marqueeWords, ...marqueeWords, ...marqueeWords];
  return (
    <section aria-hidden data-pin-fade className="relative border-y border-border py-10 overflow-hidden bg-surface/40 noise">
      <div data-pin-layer className="flex whitespace-nowrap marquee -skew-y-1">
        {row.map((w, i) => (
          <span
            key={`a-${i}`}
            className="font-display text-4xl md:text-6xl px-8 text-foreground"
          >
            {w} <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
      <div data-pin-layer className="flex whitespace-nowrap marquee-rev skew-y-1 mt-2">
        {row.map((w, i) => (
          <span
            key={`b-${i}`}
            className="font-display text-4xl md:text-6xl px-8 text-stroke"
          >
            {w} <span className="opacity-40">/</span>
          </span>
        ))}
      </div>
    </section>
  );
}


function About() {
  return (
    <section id="about" data-section-reveal className="relative py-32 md:py-48 max-w-[1400px] mx-auto px-6 md:px-10">
      <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
        <Reveal className="md:col-span-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src={portrait}
              alt="Maulana Arif Pratama"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-border" />
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">
            Depok, Indonesia · Available worldwide
          </p>
        </Reveal>

        <div className="md:col-span-8 md:pl-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-accent mb-6 font-mono">
              ✦ About
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 data-section-title className="font-display text-4xl md:text-6xl leading-tight tracking-tight text-balance">
              I build the systems behind the growth - and the meaning behind the metrics.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 grid sm:grid-cols-2 gap-8 text-muted-foreground leading-relaxed">
              <p>
                For nearly a decade I've operated at the intersection of marketing,
                technology and social impact - leading C-level roles across consumer
                brands, education, foundations and digital platforms.
              </p>
              <p>
                Today I'm focused on AI-enabled infrastructure for impact: agent
                workflows, grant intelligence, crowdfunding rails and aggregator
                products that compound good outcomes.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-border pt-10">
              {headlineStats.map((s) => (
                <div key={s.l} title={s.note}>
                  <div className="font-display text-3xl md:text-4xl text-accent leading-none">
                    {s.v}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {s.l}
                  </div>
                  {s.evidence === "dashboard" && (
                    <div className="mt-1.5 inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-accent/70 font-mono">
                      <span className="w-1 h-1 rounded-full bg-accent/70" />
                      Verified
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section id="expertise" data-section-reveal className="relative py-32 md:py-48 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-accent mb-4 font-mono">
              ✦ Expertise
            </p>
            <h2 data-section-title className="font-display text-4xl md:text-6xl leading-tight tracking-tight max-w-2xl">
              Six disciplines, one operating system.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground max-w-sm">
              A multidisciplinary stack honed across NGOs, startups and consumer
              brands - built to ship outcomes, not slides.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
          {expertise.map((e, i) => (
            <Reveal key={e.k} delay={i * 0.05}>
              <div className="group relative p-8 md:p-10 border-b border-r border-border h-full overflow-hidden hover:bg-surface transition-colors duration-500">
                <div className="absolute top-0 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-700" />
                <div className="flex items-start justify-between mb-12">
                  <span className="font-mono text-xs text-muted-foreground">{e.k}</span>
                  <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    ↗
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl mb-3">{e.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{e.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section id="industries" data-section-reveal className="relative py-32 md:py-44 border-t border-border bg-background overflow-hidden">
      <ClientOnly><MouseLight /></ClientOnly>
      <div data-parallax-bg="-18" className="absolute -top-32 -right-24 w-[40rem] h-[40rem] rounded-full opacity-30 blur-3xl float-blob pointer-events-none" style={{ background: "radial-gradient(circle, oklch(0.78 0.15 65 / 0.45), transparent 70%)" }} />
      <div data-parallax-bg="-12" className="absolute -bottom-32 -left-24 w-[36rem] h-[36rem] rounded-full opacity-20 blur-3xl float-blob pointer-events-none" style={{ background: "radial-gradient(circle, oklch(0.55 0.18 250 / 0.5), transparent 70%)", animationDelay: "-7s" }} />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-accent mb-4 font-mono">
              ✦ Industries Operated
            </p>
            <h2 data-section-title className="font-display text-4xl md:text-6xl leading-tight tracking-tight max-w-2xl">
              Ten verticals. One operating playbook.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground max-w-sm">
              From supplements to study-abroad, daycare to humanitarian relief -
              brands I've directed, scaled or built from zero.
            </p>
          </Reveal>
        </div>

        <ul className="border-t border-border">
          {industries.map((it, i) => (
            <Reveal key={it.n} delay={i * 0.03}>
              <li className="group relative border-b border-border">
                <div className="grid grid-cols-12 items-center py-6 md:py-8 gap-4 px-2 md:px-4 transition-colors duration-500 group-hover:bg-surface">
                  <span className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground">
                    {it.n}
                  </span>
                  <h3 className="col-span-10 md:col-span-5 font-display text-2xl md:text-4xl tracking-tight">
                    {it.t}
                  </h3>
                  <p className="col-span-12 md:col-span-5 text-sm text-muted-foreground md:text-right">
                    {it.b}
                  </p>
                  <span className="hidden md:block col-span-1 text-right text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    ↗
                  </span>
                </div>
                <span className="absolute left-0 bottom-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-700" />
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Work({ onOpen }: { onOpen: (p: CaseStudy) => void }) {
  return (
    <section id="work" data-section-reveal className="relative py-32 md:py-48 border-t border-border bg-surface/30 overflow-hidden">
      <ClientOnly>
        <MouseLight />
      </ClientOnly>
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="mb-20">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-accent mb-4 font-mono">
              ✦ Selected Work
            </p>
            <h2 data-section-title className="font-display text-4xl md:text-6xl leading-tight tracking-tight max-w-3xl">
              Platforms built where impact and technology meet.
            </h2>
          </Reveal>
        </div>

        <div className="space-y-32 md:space-y-48">
          {projects.map((p, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal key={p.n}>
                <article className={`grid md:grid-cols-12 gap-8 md:gap-14 items-center ${reversed ? "md:[&>div:first-child]:order-2" : ""}`}>
                  <div className="md:col-span-7">
                    <Tilt className="relative group overflow-hidden rounded-sm will-change-transform">
                      <button
                        type="button"
                        onClick={() => onOpen(p)}
                        data-cursor="Open"
                        aria-label={`Open case study: ${p.title}`}
                        className="block w-full text-left"
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={p.img}
                            alt={p.title}
                            loading="lazy"
                            data-parallax-bg="-12"
                            className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute inset-0 ring-1 ring-inset ring-border pointer-events-none" />
                        <div className="absolute top-4 left-4 text-xs font-mono text-foreground/80 bg-background/85 px-3 py-1 rounded-full border border-border">
                          {p.tag}
                        </div>
                        <div className="absolute bottom-4 right-4 text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/70 bg-background/50 px-3 py-1 rounded-full border border-border">
                          {p.n} / {String(projects.length).padStart(2, "0")}
                        </div>
                        <div className="pointer-events-none absolute bottom-4 left-4 text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/0 group-hover:text-accent transition-colors duration-500 bg-background/0 group-hover:bg-background/85 px-3 py-1 rounded-full border border-transparent group-hover:border-border">
                          View case →
                        </div>
                      </button>
                    </Tilt>
                  </div>
                  <div className="md:col-span-5">
                    <div className="font-mono text-xs text-muted-foreground mb-4">
                      Case · {p.n}
                    </div>
                    <h3 className="font-display text-4xl md:text-5xl leading-tight tracking-tight mb-5">
                      <ScrambleText text={p.title} duration={700} trigger="hover" />
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-8">{p.desc}</p>
                    <ul className="flex flex-wrap gap-2 mb-8">
                      {p.meta.map((m) => (
                        <li
                          key={m}
                          className="text-[11px] uppercase tracking-[0.18em] border border-border px-3 py-1.5 rounded-full text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                    <Magnetic strength={0.3}>
                      <button
                        type="button"
                        onClick={() => onOpen(p)}
                        data-cursor="Open"
                        className="inline-flex items-center gap-2 text-sm border-b border-accent pb-1 hover:text-accent transition-colors"
                      >
                        Read the story <span>→</span>
                      </button>
                    </Magnetic>
                  </div>
                </article>
              </Reveal>

            );
          })}
        </div>
      </div>
    </section>
  );
}

function Moments() {
  const imgs = [
    { src: googleImg, c: "Google APAC HQ" },
    { src: tiktokImg, c: "TikTok Shoppertainment Summit 2023" },
    { src: waImg, c: "WhatsApp Business Summit Indonesia 2024" },
  ];
  return (
    <section className="py-24 md:py-36 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-accent mb-10 font-mono">
            ✦ In the room
          </p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-4">
          {imgs.map((im, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure className="group relative overflow-hidden rounded-sm">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={im.src}
                    alt={im.c}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                <figcaption className="absolute bottom-4 left-4 right-4 text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">
                  {im.c}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdsPortfolio() {
  return (
    <section
      id="ads"
      data-section-reveal
      className="relative py-32 md:py-48 border-t border-border bg-surface/20 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-accent mb-4 font-mono">
              ✦ Ads Portfolio
            </p>
            <h2
              data-section-title
              className="font-display text-4xl md:text-6xl leading-tight tracking-tight max-w-2xl"
            >
              The receipts, straight off the dashboards.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground max-w-sm">
              Fourteen screenshots pulled from live ad accounts I ran end to end - account
              setup, targeting, creative testing, budget scaling and reporting. Figures are
              shown exactly as the platform reports them.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="border-t border-border pt-8 mb-20 md:mb-28 grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-5">
              <div className="font-display text-6xl md:text-7xl text-accent leading-[0.85] tracking-tight">
                IDR 16.8B
              </div>
              <div className="mt-4 text-sm text-muted-foreground max-w-xs">
                of ad spend, itemised line by line from the dashboards below.
              </div>
            </div>
            <div className="md:col-span-7 md:pb-2 grid grid-cols-2 gap-8">
              <div>
                <div className="font-display text-3xl md:text-4xl leading-none">IDR 3.22B</div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Marketplace revenue driven
                </div>
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl leading-none">11.4x</div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Blended marketplace ROAS
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {adsPortfolio.map((group) => (
          <div key={group.section} className="mb-20 md:mb-32 last:mb-0">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 border-t border-border pt-6 mb-10">
                <h3 className="font-mono text-xs uppercase tracking-[0.28em] text-accent whitespace-nowrap">
                  {group.section}
                </h3>
                <p className="text-sm text-muted-foreground">{group.blurb}</p>
              </div>
            </Reveal>

            <div className="space-y-16 md:space-y-24">
              {group.exhibits.map((ex, i) => (
                <Reveal key={ex.id} delay={i * 0.04}>
                  <figure className="grid md:grid-cols-12 gap-6 md:gap-10 items-start">
                    <div className="md:col-span-7 lg:col-span-8">
                      <div className="relative overflow-hidden rounded-sm bg-white">
                        <img
                          src={ex.img}
                          alt={`${ex.platform} dashboard, ${ex.client}`}
                          width={ex.w}
                          height={ex.h}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-auto"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-border pointer-events-none" />
                      </div>
                    </div>

                    <figcaption className="md:col-span-5 lg:col-span-4 md:pt-2">
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent mb-3">
                        {ex.platform}
                        {ex.period ? ` · ${ex.period}` : ""}
                      </p>
                      <h4 className="font-display text-2xl md:text-3xl leading-tight tracking-tight">
                        {ex.title}
                      </h4>
                      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {ex.client}
                      </p>

                      {ex.headline && (
                        <div className="mt-6 inline-flex items-baseline gap-3 border border-accent/40 rounded-full px-5 py-2">
                          <span className="font-display text-2xl md:text-3xl text-accent leading-none">
                            {ex.headline.v}
                          </span>
                          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                            {ex.headline.l}
                          </span>
                        </div>
                      )}

                      <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                        {ex.caption}
                      </p>

                      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-5">
                        {ex.figures.map((f) => (
                          <div key={f.l}>
                            <dt className="font-display text-xl text-foreground leading-none">
                              {f.v}
                            </dt>
                            <dd className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                              {f.l}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        ))}

        <SkuBoard />

        <Reveal>
          <p className="mt-16 text-xs text-muted-foreground/70 font-mono leading-relaxed max-w-3xl border-t border-border pt-6">
            Every figure above is read directly off the screenshot beside it. Campaign-level
            breakdowns and references are available on request.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** Product creative next to the return it produced - the clearest single view
 *  of what a performance marketer actually did. */
function SkuBoard() {
  return (
    <div className="mt-24 md:mt-32 border-t border-border pt-10">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent mb-3">
              05 - Creative to revenue
            </p>
            <h3 className="font-display text-3xl md:text-4xl tracking-tight">
              The {skuBoard.client} Pro line, SKU by SKU.
            </h3>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">{skuBoard.note}</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {skuBoard.skus.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.06}>
            <figure className="group h-full border border-border rounded-sm overflow-hidden bg-surface/40 flex flex-col">
              <div className="aspect-square overflow-hidden bg-white">
                <img
                  src={s.img}
                  alt={`${skuBoard.client} ${s.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
              </div>
              <figcaption className="p-5 flex flex-col gap-4 flex-1">
                <h4 className="font-display text-xl leading-none">{s.name}</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="font-display text-2xl text-accent leading-none">
                      {s.shopeeRoas}
                    </div>
                    <div className="mt-1.5 text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                      Shopee ROAS
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-2xl text-foreground leading-none">
                      {s.cpasRoas}
                    </div>
                    <div className="mt-1.5 text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                      Meta CPAS
                    </div>
                  </div>
                </div>
                <dl className="mt-auto pt-3 border-t border-border text-[11px] text-muted-foreground space-y-1 font-mono">
                  <div className="flex justify-between gap-2">
                    <dt>Spend</dt>
                    <dd className="text-foreground">{s.spend}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt>Sales</dt>
                    <dd className="text-foreground">{s.revenue}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt>ACOS</dt>
                    <dd className="text-foreground">{s.acos}</dd>
                  </div>
                </dl>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function Stack() {
  return (
    <section data-section-reveal className="relative py-24 md:py-36 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-accent mb-10 font-mono">
            ✦ Stack
          </p>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {stack.map((s, i) => (
            <Reveal key={s.g} delay={i * 0.05}>
              <div className="bg-background p-7 md:p-8 h-full">
                <h3 className="font-display text-xl mb-5">{s.g}</h3>
                <ul className="space-y-2">
                  {s.items.map((it) => (
                    <li key={it} className="text-sm text-muted-foreground leading-snug">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" data-section-reveal className="relative py-32 md:py-48 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="mb-20">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-accent mb-4 font-mono">
              ✦ Trajectory
            </p>
            <h2 data-section-title className="font-display text-4xl md:text-6xl tracking-tight max-w-2xl">
              A decade of operating roles.
            </h2>
          </Reveal>
        </div>

        <ol className="relative border-l border-border ml-2 md:ml-6">
          {experience.map((e, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <li className="relative pl-8 md:pl-14 pb-12 group">
                <span className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-background border border-accent group-hover:bg-accent transition-colors duration-500" />
                <div className="grid md:grid-cols-12 gap-2 md:gap-6 items-baseline">
                  <div className="md:col-span-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {e.y}
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="font-display text-2xl md:text-3xl">{e.r}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{e.c}</p>
                    {e.sub && (
                      <p className="text-muted-foreground/70 text-xs mt-2 font-mono">{e.sub}</p>
                    )}
                    <ul className="mt-4 space-y-2 max-w-3xl">
                      {e.bullets.map((b) => (
                        <li
                          key={b}
                          className="relative pl-5 text-sm text-muted-foreground leading-relaxed before:absolute before:left-0 before:top-[0.65em] before:w-1.5 before:h-px before:bg-accent/60"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" data-section-reveal className="relative py-32 md:py-48 border-t border-border overflow-hidden">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.78 0.15 65 / 0.18), transparent 60%)",
        }}
      />
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-accent mb-6 font-mono">
            ✦ Let's build
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 data-section-title className="font-display text-5xl md:text-8xl tracking-tighter leading-[0.95] text-balance max-w-5xl mx-auto">
            Have an ambitious idea
            <br />
            <span className="italic text-accent">worth the effort?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 text-muted-foreground max-w-xl mx-auto">
            I'm open to founding teams, advisory engagements and impact-led
            collaborations where growth, AI and product meet.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Magnetic strength={0.45}>
              <a
                href={`mailto:${profile.email}`}
                data-cursor="Email"
                className="group inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full text-sm font-medium hover:bg-accent transition-all duration-300 shadow-[0_0_60px_rgba(255,180,80,0.25)]"
              >
                maulana.arif.pratama@gmail.com
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.35}>
              <a
                href={profile.whatsapp}
                data-cursor="WA"
                className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors border border-border px-6 py-4 rounded-full"
              >
                +62 821-1245-5705
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-20 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
            <span className="w-1 h-1 rounded-full bg-border" />
            <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Instagram</a>
            <span className="w-1 h-1 rounded-full bg-border" />
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            <span className="w-1 h-1 rounded-full bg-border" />
            <a href={profile.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Facebook</a>
            <span className="w-1 h-1 rounded-full bg-border" />
            <a href={`mailto:${profile.email}`} className="hover:text-foreground transition-colors">Email</a>
            <span className="w-1 h-1 rounded-full bg-border" />
            <a href={profile.whatsapp} className="hover:text-foreground transition-colors">WhatsApp</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono uppercase tracking-[0.18em]">
        <div>© 2026 {profile.name}</div>
        <div>Crafted with intention · Depok / ID</div>
      </div>
    </footer>
  );
}

function Home() {
  const [active, setActive] = useState<CaseStudy | null>(null);
  return (
    <div className="bg-background text-foreground">
      <ClientOnly>
        <SmoothScroll />
        <CinematicScroll />
        <HeroTimeline />
        <FilmTreatment />
        <CustomCursor />
        <ScrollProgress />
      </ClientOnly>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Expertise />
        <Industries />
        <Work onOpen={setActive} />
        <AdsPortfolio />
        <Moments />
        <Stack />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <CaseStudyModal
        project={active}
        total={projects.length}
        onClose={() => setActive(null)}
      />
    </div>
  );
}

