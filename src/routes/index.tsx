import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import heroBg from "@/assets/hero-bg.jpg";
import heroVideoAsset from "@/assets/hero-video.mp4.asset.json";
import portrait from "@/assets/portrait.jpg";
import tiktokImg from "@/assets/tiktok-summit.jpg";
import waImg from "@/assets/whatsapp-summit.jpg";
import googleImg from "@/assets/google.jpg";
import projImpactory from "@/assets/project-impactory.jpg";
import projBisabaik from "@/assets/project-bisabaik.jpg";
import projPasarbaik from "@/assets/project-pasarbaik.jpg";
import projHalalpro from "@/assets/project-halalpro.jpg";
import projLittlechamp from "@/assets/project-littlechamp.jpg";
import projResinid from "@/assets/project-resinid.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maulana Arif Pratama — Digital Business Leader & AI Builder" },
      {
        name: "description",
        content:
          "8+ years building growth engines, AI workflows, and social impact platforms. Managed IDR 20B+ in performance media across Meta, Google, TikTok.",
      },
      { property: "og:title", content: "Maulana Arif Pratama — Digital Business Leader" },
      {
        property: "og:description",
        content: "Growth strategist, AI agent builder, social impact technologist.",
      },
    ],
  }),
  component: Home,
});

const expertise = [
  { k: "01", t: "Growth Marketing", d: "Performance media, funnel design, CRO, and digital fundraising at scale across Meta, Google, TikTok and marketplaces." },
  { k: "02", t: "AI & Automation", d: "Designing agent workflows on Azure AI Foundry, prompt governance, RAG pipelines, and human-in-the-loop systems." },
  { k: "03", t: "Product & Platform", d: "From crowdfunding platforms to SaaS — web, payment rails, CRM/ERP, and marketing technology stacks." },
  { k: "04", t: "Social Impact Tech", d: "Building digital infrastructure for NGOs, foundations and impact-driven commerce that scales." },
  { k: "05", t: "Brand & Strategy", d: "Positioning, narrative and go-to-market for consumer brands, education and social enterprises." },
  { k: "06", t: "Leadership", d: "C-level operating roles across multiple brands — building teams, SOPs and growth systems from zero." },
];

const projects = [
  {
    n: "01",
    tag: "Health · Supplements",
    title: "Halal Pro Supplement",
    desc: "Led as CEO from product launch to digital revenue scale. Built the brand, performance funnels and marketplace engine for a premium halal sports nutrition line.",
    img: projHalalpro,
    meta: ["Brand", "Meta Ads", "TikTok Shop", "Marketplace"],
  },
  {
    n: "02",
    tag: "AI · SaaS",
    title: "Impactory.id",
    desc: "An AI-powered platform for impact organizations — grant discovery, proposal drafting, document intelligence and reporting workflows.",
    img: projImpactory,
    meta: ["Azure AI Foundry", "RAG", "Prompt Governance"],
  },
  {
    n: "03",
    tag: "Childcare · Education",
    title: "LittleChamp Daycare",
    desc: "CMO scope: brand positioning, parent-funnel design and full-service digital acquisition for a premium early-years daycare network.",
    img: projLittlechamp,
    meta: ["Positioning", "Lead Gen", "Local SEO"],
  },
  {
    n: "04",
    tag: "Crowdfunding · Impact",
    title: "BisaBaik.or.id",
    desc: "End-to-end donation platform with campaign pages, payment gateway integration and an SEO foundation engineered for trust.",
    img: projBisabaik,
    meta: ["Platform", "Payments", "SEO"],
  },
  {
    n: "05",
    tag: "Home Decor · Lifestyle",
    title: "ResinID Home Decor",
    desc: "Built the digital sales engine for a designer resin home-decor brand — visual identity, e-commerce stack and creator-led performance media.",
    img: projResinid,
    meta: ["E-commerce", "Creator Ads", "Brand"],
  },
  {
    n: "06",
    tag: "Marketplace · Commerce",
    title: "PasarBaik.com",
    desc: "An aggregator concept connecting impact-driven products, communities and ethical commerce into one storefront.",
    img: projPasarbaik,
    meta: ["Aggregator", "Commerce", "Brand"],
  },
];

const industries = [
  { n: "01", t: "Health & Supplements", b: "Halal Pro · Muscle First" },
  { n: "02", t: "Childcare & Early Education", b: "LittleChamp Daycare" },
  { n: "03", t: "Home & Lifestyle Decor", b: "ResinID" },
  { n: "04", t: "Humanitarian & NGO", b: "ACT · PalestinaID · PPPA Daarul Qur'an" },
  { n: "05", t: "Social Impact Platforms", b: "Bisa Baik · Impactory · PasarBaik" },
  { n: "06", t: "Education & Study Abroad", b: "KuliahdiTurki · StudydiTurki · BelajardiTurki" },
  { n: "07", t: "Travel & Hospitality", b: "Biru Marmara Travel · Shilla at Sawangan" },
  { n: "08", t: "Natural & Consumer Goods", b: "Adev Natural Indonesia" },
  { n: "09", t: "Fitness & Sports Nutrition", b: "Muscle First" },
  { n: "10", t: "Foundations & Faith-based", b: "Daarul Qur'an · Yayasan RPB" },
];

const experience = [
  { y: "2024 — Now", r: "Founder & Digital Business Lead", c: "Bisa Baik / Yayasan Rumah Pembangunan Berkelanjutan" },
  { y: "2022 — 2024", r: "CEO / CMO — Multiple Brands", c: "Meta Kreasi Indonusa Holding" },
  { y: "2021 — 2022", r: "Marketing & Sales Manager", c: "PT. Adev Natural Indonesia" },
  { y: "2021", r: "Martech Senior Manager", c: "Biru Marmara Group / MUSIAD Indonesia" },
  { y: "2020 — 2021", r: "Digital Project Lead", c: "Shilla at Sawangan" },
  { y: "2019 — 2020", r: "Digital Marketing Manager", c: "PPPA Daarul Qur'an Foundation" },
  { y: "2014 — 2019", r: "Integrated Digital Marketing Supervisor", c: "ACT Foundation / Aksi Cepat Tanggap" },
];

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
    <section ref={ref} id="top" className="relative h-[100svh] w-full overflow-hidden grain">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <video
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
        <div className="absolute -inset-x-20 top-1/3 h-40 opacity-30 blur-3xl animate-[sweep_9s_ease-in-out_infinite]" style={{ background: "linear-gradient(90deg, transparent, oklch(0.85 0.16 65 / 0.5), transparent)" }} />
      </motion.div>

      {/* Cinematic letterbox bars */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-[6vh] bg-background z-20" />
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-[6vh] bg-background z-20" />

      {/* Corner TVC marks */}
      <div className="pointer-events-none absolute top-[7vh] left-6 md:left-10 z-30 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-accent/80">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Rec · 00:00:24
      </div>
      <div className="pointer-events-none absolute top-[7vh] right-6 md:right-10 z-30 text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
        Reel 01 / 06 · 24fps · 2.39:1
      </div>

      <div className="relative h-full max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground mb-8"
        >
          <span className="w-8 h-px bg-accent" />
          Portfolio — Vol. 01 / 2026
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
            Maulana Arif Pratama — digital business leader, growth strategist
            and AI builder. Eight years turning ambition into measurable impact.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium hover:bg-accent transition-all duration-300"
            >
              View selected work
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
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
  return (
    <section aria-hidden className="relative border-y border-border py-6 overflow-hidden bg-surface/40">
      <div className="flex whitespace-nowrap marquee">
        {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => (
          <span
            key={i}
            className="font-display text-3xl md:text-5xl px-8 text-muted-foreground/70"
          >
            {w} <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-32 md:py-48 max-w-[1400px] mx-auto px-6 md:px-10">
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
            <h2 className="font-display text-4xl md:text-6xl leading-tight tracking-tight text-balance">
              I build the systems behind the growth — and the meaning behind the metrics.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 grid sm:grid-cols-2 gap-8 text-muted-foreground leading-relaxed">
              <p>
                For nearly a decade I've operated at the intersection of marketing,
                technology and social impact — leading C-level roles across consumer
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
            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-10">
              {[
                { v: "8+", l: "Years operating" },
                { v: "20B+", l: "IDR ad spend managed" },
                { v: "10K", l: "USD Google Grant won" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-4xl md:text-5xl text-accent">{s.v}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {s.l}
                  </div>
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
    <section id="expertise" className="relative py-32 md:py-48 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-accent mb-4 font-mono">
              ✦ Expertise
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-tight tracking-tight max-w-2xl">
              Six disciplines, one operating system.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground max-w-sm">
              A multidisciplinary stack honed across NGOs, startups and consumer
              brands — built to ship outcomes, not slides.
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
    <section id="industries" className="relative py-32 md:py-44 border-t border-border bg-background overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 20%, oklch(0.78 0.15 65 / 0.18), transparent 50%)" }} />
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-accent mb-4 font-mono">
              ✦ Industries Operated
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-tight tracking-tight max-w-2xl">
              Ten verticals. One operating playbook.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground max-w-sm">
              From supplements to study-abroad, daycare to humanitarian relief —
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

function Work() {
  return (
    <section id="work" className="relative py-32 md:py-48 border-t border-border bg-surface/30">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="mb-20">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-accent mb-4 font-mono">
              ✦ Selected Work
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-tight tracking-tight max-w-3xl">
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
                  <div className="md:col-span-7 relative group overflow-hidden rounded-sm">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 ring-1 ring-inset ring-border pointer-events-none" />
                    <div className="absolute top-4 left-4 text-xs font-mono text-foreground/80 bg-background/60 backdrop-blur px-3 py-1 rounded-full border border-border">
                      {p.tag}
                    </div>
                  </div>
                  <div className="md:col-span-5">
                    <div className="font-mono text-xs text-muted-foreground mb-4">
                      Case · {p.n}
                    </div>
                    <h3 className="font-display text-4xl md:text-5xl leading-tight tracking-tight mb-5">
                      {p.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-8">{p.desc}</p>
                    <ul className="flex flex-wrap gap-2 mb-8">
                      {p.meta.map((m) => (
                        <li
                          key={m}
                          className="text-[11px] uppercase tracking-[0.18em] border border-border px-3 py-1.5 rounded-full text-muted-foreground"
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-sm border-b border-accent pb-1 hover:text-accent transition-colors"
                    >
                      Read the story <span>→</span>
                    </a>
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

function Experience() {
  return (
    <section id="experience" className="relative py-32 md:py-48 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="mb-20">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-accent mb-4 font-mono">
              ✦ Trajectory
            </p>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight max-w-2xl">
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
    <section id="contact" className="relative py-32 md:py-48 border-t border-border overflow-hidden grain">
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
          <h2 className="font-display text-5xl md:text-8xl tracking-tighter leading-[0.95] text-balance max-w-5xl mx-auto">
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
            <a
              href="mailto:maulana.arif.pratama@gmail.com"
              className="group inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full text-sm font-medium hover:bg-accent transition-all duration-300"
            >
              maulana.arif.pratama@gmail.com
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="https://wa.me/6282112455705"
              className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors border border-border px-6 py-4 rounded-full"
            >
              +62 821-1245-5705
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-20 flex items-center justify-center gap-8 text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">
            <a href="https://instagram.com/arif.uno" className="hover:text-foreground transition-colors">Instagram</a>
            <span className="w-1 h-1 rounded-full bg-border" />
            <a href="mailto:maulana.arif.pratama@gmail.com" className="hover:text-foreground transition-colors">Email</a>
            <span className="w-1 h-1 rounded-full bg-border" />
            <a href="https://wa.me/6282112455705" className="hover:text-foreground transition-colors">WhatsApp</a>
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
        <div>© 2026 Maulana Arif Pratama</div>
        <div>Crafted with intention · Depok / ID</div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Expertise />
        <Work />
        <Moments />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
