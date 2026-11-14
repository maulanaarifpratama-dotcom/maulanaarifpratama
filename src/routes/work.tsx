import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/Nav";
import { profile } from "@/data/cv";
import {
  categories,
  workItems,
  reelLinks,
  contentSystem,
  type Category,
  type WorkItem,
} from "@/data/work";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work - Maulana Arif Pratama" },
      {
        name: "description",
        content:
          "Websites, property projects, creator and UGC work, motion content and recognition from Maulana Arif Pratama.",
      },
      { property: "og:title", content: "Work - Maulana Arif Pratama" },
    ],
  }),
  component: WorkPage,
});

function Card({ item }: { item: WorkItem }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface">
      {item.img ? (
        <img
          src={item.img}
          alt={item.imgAlt ?? item.title}
          loading="lazy"
          decoding="async"
          className="aspect-[2/1] w-full object-cover object-top"
        />
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {item.kicker}
        </p>
        <h3 className="font-display text-2xl leading-tight text-balance">{item.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
        {item.facts?.length ? (
          <ul className="mt-1 flex flex-wrap gap-2">
            {item.facts.map((f) => (
              <li
                key={f}
                className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground"
              >
                {f}
              </li>
            ))}
          </ul>
        ) : null}
        {item.href ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex h-11 items-center gap-2 pt-2 text-xs uppercase tracking-[0.18em] text-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {item.hrefLabel ?? "Open"} <span aria-hidden>&rarr;</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}

function WorkPage() {
  const [active, setActive] = useState<"all" | Category>("all");
  const shown = active === "all" ? workItems : workItems.filter((w) => w.cat === active);
  const showMotion = active === "all" || active === "motion";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-[1400px] px-6 pb-24 pt-28 md:px-10 md:pt-32">
        <header className="max-w-3xl">
          <h1 className="font-display text-5xl leading-[1] tracking-tight text-balance md:text-7xl">
            Work I can show,
            <span className="italic text-accent"> with the link next to it.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Live websites, a property business, creator and UGC work, motion content and the
            recognition behind them. Every site below answered when it was last checked, on 14
            November 2026.
          </p>
        </header>

        <div
          role="group"
          aria-label="Filter work"
          className="mt-10 flex flex-wrap gap-2"
        >
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={active === c.id}
              onClick={() => setActive(c.id)}
              className={
                "inline-flex h-11 items-center rounded-full border px-5 text-xs uppercase tracking-[0.16em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
                (active === c.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:text-foreground")
              }
            >
              {c.label}
            </button>
          ))}
        </div>

        <section aria-live="polite" className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </section>

        {showMotion ? (
          <section className="mt-20 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl md:text-4xl">Motion, watch them</h2>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {reelLinks.map(([title, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-14 items-center justify-between gap-4 py-3 text-sm hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                    >
                      <span>{title}</span>
                      <span aria-hidden className="text-muted-foreground">
                        &rarr;
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl">How the content is run</h2>
              <ul className="mt-6 space-y-4">
                {contentSystem.pillars.map(([t, d]) => (
                  <li key={t}>
                    <p className="text-sm font-medium">{t}</p>
                    <p className="text-sm text-muted-foreground">{d}</p>
                  </li>
                ))}
              </ul>
              <ol className="mt-6 flex flex-wrap gap-2">
                {contentSystem.pipeline.map((s, i) => (
                  <li
                    key={s}
                    className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {i + 1}. {s}
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ) : null}

        <footer className="mt-24 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-8 text-sm text-muted-foreground">
          <a href="/cv" className="inline-flex h-11 items-center hover:text-foreground">
            Open the CV
          </a>
          <a href={profile.instagram} className="inline-flex h-11 items-center hover:text-foreground">
            Instagram
          </a>
          <a href={`mailto:${profile.email}`} className="inline-flex h-11 items-center hover:text-foreground">
            {profile.email}
          </a>
        </footer>
      </main>
    </div>
  );
}
