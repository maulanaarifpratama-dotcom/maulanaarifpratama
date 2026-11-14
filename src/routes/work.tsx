import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/cv";
import reelVideo from "@/assets/video/work-reel.mp4";
import reelPoster from "@/assets/video/poster.jpg";
import {
  platforms,
  clientSites,
  alsoBuilt,
  resin,
  creator,
  motion,
  mendag,
  milestones,
  overview,
  type Shot,
  type Site,
} from "@/data/work";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work - Maulana Arif Pratama" },
      {
        name: "description",
        content:
          "Fourteen live websites, a design-and-build business, creator work and the content behind them, from Maulana Arif Pratama.",
      },
      { property: "og:title", content: "Work - Maulana Arif Pratama" },
    ],
  }),
  component: WorkPage,
});

const sections = [
  ["platforms", "Platforms"],
  ["sites", "Client sites"],
  ["property", "Property"],
  ["creator", "Creator"],
  ["motion", "Motion"],
  ["recognition", "Recognition"],
] as const;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
const press = "transition-transform duration-150 ease-out active:scale-[0.98]";

/** The image is never cropped: the box takes the file's own ratio. */
function Frame({ shot, href, label }: { shot: Shot; href?: string; label?: string }) {
  const img = (
    <img
      src={shot.src}
      alt={shot.alt}
      width={shot.w}
      height={shot.h}
      loading="lazy"
      decoding="async"
      className="block h-auto w-full"
    />
  );
  const box =
    "block overflow-hidden rounded-lg border border-border bg-surface shadow-[0_28px_60px_-30px_rgb(0_0_0/0.75)]";
  if (!href) return <div className={box}>{img}</div>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={
        box +
        " transition-transform duration-200 ease-out [@media(hover:hover)]:hover:-translate-y-1 " +
        focusRing
      }
    >
      {img}
    </a>
  );
}

function ArrowUpRight() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        "inline-flex h-11 items-center gap-2 text-sm text-accent underline-offset-4 hover:underline " +
        press +
        " " +
        focusRing
      }
    >
      {children} <ArrowUpRight />
    </a>
  );
}

function SectionHead({ id, title, lead }: { id: string; title: string; lead: string }) {
  return (
    <header id={id} className="scroll-mt-32 max-w-2xl">
      <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{lead}</p>
    </header>
  );
}

function PlatformRow({ site, flip }: { site: Site; flip: boolean }) {
  return (
    <article
      id={site.id}
      className="grid scroll-mt-32 items-center gap-8 lg:grid-cols-12 lg:gap-14"
    >
      <div className={"lg:col-span-7 " + (flip ? "lg:order-2" : "")}>
        <Frame shot={site.shot} href={site.href} label={`Open ${site.label}`} />
      </div>
      <div className={"lg:col-span-5 " + (flip ? "lg:order-1" : "")}>
        <h3 className="font-display text-3xl leading-tight md:text-4xl">{site.name}</h3>
        <p className="mt-2 text-base text-foreground/90">{site.line}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{site.body}</p>
        {site.role ? <p className="mt-4 text-sm">{site.role}</p> : null}
        {site.tags?.length ? (
          <p className="mt-1 text-sm text-muted-foreground">{site.tags.join(" · ")}</p>
        ) : null}
        <div className="mt-3">
          <ExternalLink href={site.href}>{site.label}</ExternalLink>
        </div>
      </div>
    </article>
  );
}

function ClientSite({ site }: { site: Site }) {
  return (
    <article id={site.id} className="scroll-mt-32">
      <Frame shot={site.shot} href={site.href} label={`Open ${site.label}`} />
      <h3 className="mt-5 font-display text-2xl leading-tight">{site.name}</h3>
      <p className="mt-1 text-sm text-foreground/90">
        {site.line}
        {site.role ? <span className="text-muted-foreground"> · {site.role}</span> : null}
      </p>
      <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
        {site.body}
      </p>
      <div className="mt-1">
        <ExternalLink href={site.href}>{site.label}</ExternalLink>
      </div>
    </article>
  );
}

function WorkPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <div className="relative isolate overflow-hidden">
        {/* Remotion loop: real screenshots drifting on a tilted plane. Purely
            decorative, so it is hidden from assistive tech, and under reduced
            motion the still poster replaces the moving video. */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <video
            src={reelVideo}
            poster={reelPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            className="h-full w-full object-cover motion-reduce:hidden"
          />
          <img
            src={reelPoster}
            alt=""
            width={960}
            height={540}
            className="hidden h-full w-full object-cover motion-reduce:block"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/10" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
        </div>
      <main className="relative mx-auto max-w-[1200px] px-6 pb-28 pt-28 md:px-10 md:pt-36">
        <header className="max-w-3xl">
          <h1 className="font-display text-5xl leading-[1] tracking-tight text-balance md:text-7xl">
            Everything I have built, <span className="italic text-accent">in one place.</span>
          </h1>
          <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-muted-foreground md:text-lg">
            Fourteen live sites, a design-and-build business, creator work and the content behind
            them. Every link was opened on 14 November 2026.
          </p>
        </header>

        {/* Zoomed-out view. Each thumbnail keeps its own proportions, so the
            whole body of work reads at once and nothing is cut off. */}
        <ul
          aria-label="All sites at a glance"
          className="mt-12 flex flex-wrap items-end gap-x-4 gap-y-5"
        >
          {overview.map((o, i) => (
            <li key={o.id} className="rise" style={{ ["--i" as string]: i }}>
              <a
                href={`#${o.id}`}
                className={
                  "group flex flex-col gap-2 " + press + " " + focusRing
                }
              >
                <img
                  src={o.shot.src}
                  alt=""
                  width={o.shot.w}
                  height={o.shot.h}
                  loading="eager"
                  decoding="async"
                  className="block h-16 w-auto rounded-md border border-border bg-surface transition-opacity duration-200 sm:h-20 [@media(hover:hover)]:opacity-80 [@media(hover:hover)]:group-hover:opacity-100"
                />
                <span className="max-w-[10rem] truncate text-xs text-muted-foreground group-hover:text-foreground">
                  {o.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </main>
      </div>

      <nav
        aria-label="Sections"
        className="sticky top-16 z-40 border-y border-border bg-background/90 supports-[backdrop-filter]:backdrop-blur-md"
      >
        <ul className="mx-auto flex max-w-[1200px] gap-1 overflow-x-auto px-4 md:px-8 [scrollbar-width:none]">
          {sections.map(([id, label]) => (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                className={
                  "inline-flex h-12 items-center px-3 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground " +
                  focusRing
                }
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-[1200px] px-6 pb-28 pt-20 md:px-10 md:pt-28">
        <SectionHead
          id="platforms"
          title="Products I own and run"
          lead="Four platforms, from an AI workspace for NGOs to a marketplace for community producers."
        />
        <div className="mt-14 space-y-24 md:space-y-32">
          {platforms.map((s, i) => (
            <Reveal key={s.id} y={28}>
              <PlatformRow site={s} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>

        <div className="mt-32 md:mt-44">
          <SectionHead
            id="sites"
            title="Sites for brands and clinics"
            lead="Brand, clinic and community sites. Most hand the visitor to WhatsApp or a marketplace, because that is where the sale happens."
          />
          <div className="mt-14 grid gap-x-10 gap-y-20 md:grid-cols-2">
            {clientSites.map((s, i) => (
              <Reveal key={s.id} y={24} delay={(i % 2) * 0.08}>
                <ClientSite site={s} />
              </Reveal>
            ))}
          </div>
          <p className="mt-16 text-sm text-muted-foreground">
            {alsoBuilt.text} <ExternalLink href={alsoBuilt.href}>{alsoBuilt.label}</ExternalLink>
          </p>
        </div>

        <section className="mt-32 md:mt-44" aria-labelledby="property-title">
          <SectionHead
            id="property"
            title="Property and home decor"
            lead="A building business of my own, run alongside the digital work."
          />
          <div className="mt-14 grid items-center gap-10 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-5 lg:col-span-4">
              <Frame shot={resin.shot} href={resin.href} label={`Open ${resin.label}`} />
            </div>
            <div className="md:col-span-7 lg:col-span-6">
              <h3 id="property-title" className="font-display text-3xl leading-tight md:text-4xl">
                {resin.name}
              </h3>
              <p className="mt-2 text-base text-foreground/90">{resin.legal}</p>
              <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-muted-foreground">
                {resin.body}
              </p>
              <p className="mt-4 text-sm">
                {resin.role} <span className="text-muted-foreground">· {resin.stats}</span>
              </p>
              <div className="mt-2">
                <ExternalLink href={resin.href}>{resin.label}</ExternalLink>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-32 md:mt-44">
          <SectionHead
            id="creator"
            title="Creator and UGC"
            lead="Making the content, then reading what it returned."
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-8">
              <Frame shot={creator.ugc.shot} />
              <h3 className="mt-6 font-display text-2xl">{creator.ugc.title}</h3>
              <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
                {creator.ugc.body}
              </p>
              <p className="mt-3 text-sm tabular-nums">
                {creator.ugc.roas.map(([n, v], i) => (
                  <span key={n}>
                    {i ? <span className="text-muted-foreground"> · </span> : null}
                    {n} <span className="text-accent">{v}</span>
                  </span>
                ))}
              </p>
            </div>
            <div className="lg:col-span-4">
              <h3 className="font-display text-2xl">{creator.tiktok.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {creator.tiktok.body}
              </p>
              <div className="mt-2">
                <ExternalLink href={creator.tiktok.href}>{creator.tiktok.label}</ExternalLink>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-32 md:mt-44">
          <SectionHead id="motion" title={motion.title} lead={motion.body} />
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <ul className="divide-y divide-border border-y border-border lg:col-span-7">
              {motion.reels.map(([t, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      "flex min-h-14 items-center justify-between gap-4 py-3 text-base transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                    }
                  >
                    <span>{t}</span>
                    <span className="text-muted-foreground">
                      <ArrowUpRight />
                    </span>
                  </a>
                </li>
              ))}
              <li className="py-3">
                <ExternalLink href={motion.account.href}>
                  All reels on {motion.account.label}
                </ExternalLink>
              </li>
            </ul>
            <div className="lg:col-span-5">
              <ul className="space-y-4">
                {motion.pillars.map(([t, d]) => (
                  <li key={t}>
                    <p className="text-sm">{t}</p>
                    <p className="text-sm text-muted-foreground">{d}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                {motion.pipeline.join(" → ")}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-32 md:mt-44">
          <SectionHead
            id="recognition"
            title="Recognition"
            lead="Rooms I have been in, and results that were checked by someone else."
          />
          <figure className="mt-14 max-w-3xl">
            <Frame shot={mendag.shot} href={mendag.href} label={mendag.label} />
            <figcaption className="mt-5">
              <p className="font-display text-2xl">
                {mendag.title} <span className="text-muted-foreground">· {mendag.when}</span>
              </p>
              <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
                {mendag.body}
              </p>
            </figcaption>
          </figure>
          <dl className="mt-16 max-w-3xl border-t border-border">
            {milestones.map((m) => (
              <div
                key={m.t}
                className="grid gap-1 border-b border-border py-5 sm:grid-cols-[8rem_1fr] sm:gap-8"
              >
                <dt className="text-sm tabular-nums text-muted-foreground">{m.k}</dt>
                <dd>
                  <p className="text-base">{m.t}</p>
                  <p className="mt-1 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
                    {m.d}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <footer className="mt-32 border-t border-border pt-10 md:mt-44">
          <p className="font-display text-3xl md:text-4xl text-balance">Want something built?</p>
          <p className="mt-3 flex flex-wrap items-center gap-x-8 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className={"inline-flex h-11 items-center text-accent hover:underline " + focusRing}
            >
              {profile.email}
            </a>
            <a
              href={profile.whatsapp}
              className={"inline-flex h-11 items-center hover:text-accent " + focusRing}
            >
              WhatsApp
            </a>
            <a
              href="/cv"
              className={"inline-flex h-11 items-center hover:text-accent " + focusRing}
            >
              CV
            </a>
            <a
              href={profile.instagram}
              className={"inline-flex h-11 items-center hover:text-accent " + focusRing}
            >
              Instagram
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
