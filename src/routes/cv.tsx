import { createFileRoute } from "@tanstack/react-router";

import {
  profile,
  summary,
  summaryShort,
  headlineStats,
  capabilities,
  stack,
  experience,
  achievements,
  education,
  organizations,
  languages,
  certifications,
  industries,
  adsPortfolio,
  skuBoard,
  spendByPlatform,
  spendLedgerTotal,
} from "@/data/cv";
import { projects } from "@/data/projects";
// Formal headshot lifted from the 2026 CV PDF; the site keeps its candid portrait.
import portrait from "@/assets/portrait-formal.jpg";

/**
 * `?compact` renders the short screening CV: identity, profile, the proof band,
 * experience, education. It runs to three pages, which is what nine roles plus
 * the spend chart honestly occupy; squeezing it to two would mean cutting real
 * history. A recruiter's first pass rarely survives fourteen pages, so the full
 * evidence portfolio lives at the same URL without the flag and is linked from
 * the short version rather than attached to it.
 */
// `compact` must be omitted rather than set to false when absent: returning the
// key unconditionally makes the router redirect /cv to /cv?compact=false, and the
// bare URL is the one that gets shared.
type CvSearch = { compact?: true };

export const Route = createFileRoute("/cv")({
  validateSearch: (search: Record<string, unknown>): CvSearch => {
    const raw = search.compact;
    const on = raw === true || raw === "" || raw === "1" || raw === "true";
    return on ? { compact: true } : {};
  },
  head: () => ({
    meta: [
      { title: `${profile.name} - Curriculum Vitae` },
      {
        name: "description",
        content:
          "Digital Growth & Performance Marketing Leader, AI Systems & SaaS Builder. IDR 16.8B of ad spend evidenced in-platform across Meta, Google, TikTok and marketplaces.",
      },
    ],
  }),
  component: CvPage,
});

/**
 * The CV is a document, not a landing page: it renders on white so that what you
 * see on screen is exactly what comes out of "Save as PDF". Styles are scoped to
 * `.cv` and declared here rather than in styles.css, which owns the dark site
 * theme and would otherwise bleed through.
 *
 * ONE RULE GOVERNS THE COLOR: amber marks a figure that is legible in one of the
 * dashboard screenshots in this document. Everything else, including numbers the
 * candidate merely asserts, is ink. The accent is a claim about provenance, not
 * decoration, so it is never spent on rules, labels or headings.
 */
const css = `
/* This stylesheet only ships on /cv, so overriding body is safe here. Without it
   the dark site background shows through below the last sheet, and prints as a
   black band. Unlayered, so it beats styles.css's @layer base. */
body { background: #ffffff; }

.cv {
  min-height: 100vh;
  --ink: #14161a;
  --ink-soft: #464b53;
  --ink-faint: #767c86;
  --rule: #d9dce1;
  --rule-soft: #ecedf0;
  --paper: #ffffff;

  /* Evidence accent. 5.4:1 on paper, so it is legal for text, not only marks. */
  --proof: #8a5405;

  /* Sequential ramp for the spend bar: one hue, dark to light, monotonic
     L* 0.296 / 0.425 / 0.55 / 0.67 / 0.772. The categorical checks in the dataviz
     validator are out of scope for a single-hue ramp; the sub-3:1 contrast on the
     two lightest steps is relieved by the legend below the bar, which labels every
     segment in ink. */
  --ramp-1: #3f2703;
  --ramp-2: #6d4408;
  --ramp-3: #9a6512;
  --ramp-4: #c08a2e;
  --ramp-5: #d9ad64;

  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 1.5;
}

/* Browser surfaces the page did not draw still belong to it. */
.cv ::selection { background: #f4e3c6; color: var(--ink); }
.cv :focus-visible { outline: 2px solid var(--proof); outline-offset: 2px; border-radius: 2px; }
.cv a { color: inherit; text-decoration: none; }
.cv a[href^="http"], .cv a[href^="mailto"] {
  text-decoration: underline;
  text-decoration-color: var(--rule);
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
}

/* Every figure on this page is compared against another figure. */
.cv .num, .cv .y, .cv .mono {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum" 1;
}

.cv .sheet {
  max-width: 210mm;
  margin: 0 auto;
  padding: 16mm 15mm 18mm;
  background: var(--paper);
}
.cv h1, .cv h2, .cv h3, .cv h4, .cv h5 {
  font-family: 'Archivo', var(--font-sans);
  font-weight: 600;
  letter-spacing: -0.02em;
}
.cv .mono { font-family: var(--font-mono); }

/* A section is announced by its heading alone. No kicker, no number. */
.cv .sec { margin-top: 10mm; }
.cv .sec > h2 {
  font-size: 14pt;
  line-height: 1.1;
  border-top: 1.5px solid var(--ink);
  padding-top: 2.5mm;
  margin-bottom: 4mm;
  break-after: avoid;
}
.cv .sec > h2 .hint {
  float: right;
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 8pt;
  color: var(--ink-faint);
  letter-spacing: 0;
  padding-top: 1.5mm;
}

/* --- masthead ------------------------------------------------------ */
.cv .masthead { display: grid; grid-template-columns: 1fr 26mm; gap: 8mm; align-items: start; }
.cv .masthead h1 { font-size: 29pt; line-height: 1; font-weight: 700; letter-spacing: -0.035em; }
.cv .masthead .role { margin-top: 2mm; font-size: 10.5pt; color: var(--ink-soft); }
.cv .masthead img { width: 26mm; height: 33mm; object-fit: cover; border-radius: 2px; filter: grayscale(1); }
.cv .contact {
  margin-top: 5mm; padding-top: 3mm; border-top: 1px solid var(--rule);
  display: flex; flex-wrap: wrap; gap: 1.5mm 6mm;
  font-size: 8.5pt; color: var(--ink-soft);
}
.cv .contact span b { color: var(--ink-faint); font-weight: 400; text-transform: uppercase; letter-spacing: 0.1em; font-size: 7pt; margin-right: 1.5mm; }

/* --- the proof band ------------------------------------------------- */
/* Three ranked figures, not six equal tiles. Rank is carried by size. */
.cv .proof-lede { display: grid; grid-template-columns: 1.15fr 1fr 1fr; gap: 7mm; align-items: end; }
.cv .proof-lede .fig .v {
  font-family: 'Archivo', var(--font-sans);
  font-weight: 700; letter-spacing: -0.04em; line-height: 0.9;
  color: var(--proof);
  font-size: 23pt;
}
.cv .proof-lede .fig:first-child .v { font-size: 33pt; }
.cv .proof-lede .fig .l { margin-top: 2mm; font-size: 8.5pt; color: var(--ink); font-weight: 500; }
.cv .proof-lede .fig .n { margin-top: 1mm; font-size: 7.5pt; color: var(--ink-faint); line-height: 1.35; }

/* --- spend bar ------------------------------------------------------ */
.cv .spend { margin-top: 7mm; break-inside: avoid; }
.cv .spend .bar { display: flex; height: 9mm; width: 100%; border-radius: 2px; overflow: hidden; }
.cv .spend .seg { height: 100%; }
/* 2px surface gap between stacked segments, per the mark spec. */
.cv .spend .seg + .seg { margin-left: 2px; }
.cv .spend .legend {
  margin-top: 3mm;
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 4mm;
}
.cv .spend .legend .item { border-top: 1px solid var(--rule); padding-top: 2mm; }
.cv .spend .legend .swatch-row { display: flex; align-items: center; gap: 1.5mm; }
.cv .spend .legend .sw { width: 2.5mm; height: 2.5mm; border-radius: 1px; flex: none; }
.cv .spend .legend .name { font-size: 8.5pt; font-weight: 500; color: var(--ink); }
.cv .spend .legend .val { margin-top: 1mm; font-size: 9.5pt; color: var(--ink); }
.cv .spend .legend .pct { font-size: 7.5pt; color: var(--ink-faint); }
.cv .spend .legend .d { margin-top: 1mm; font-size: 7pt; color: var(--ink-faint); line-height: 1.35; }
.cv .spend .caption { margin-top: 3mm; font-size: 8pt; color: var(--ink-soft); max-width: 78ch; }
.cv .spend .caption b { color: var(--proof); font-weight: 500; }

/* --- prose & lists -------------------------------------------------- */
.cv .lede { color: var(--ink-soft); font-size: 9.5pt; max-width: 72ch; }
.cv .two { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm 9mm; }
.cv .cap { break-inside: avoid; }
.cv .cap h3 { font-size: 10.5pt; }
.cv .cap p { margin-top: 1mm; font-size: 8.8pt; color: var(--ink-soft); }

.cv .role-item { break-inside: avoid; margin-bottom: 5.5mm; }
.cv .role-item .top { display: flex; justify-content: space-between; align-items: baseline; gap: 6mm; }
.cv .role-item h3 { font-size: 12pt; line-height: 1.2; }
.cv .role-item .when { font-family: var(--font-mono); font-variant-numeric: tabular-nums; font-size: 8pt; color: var(--ink-faint); white-space: nowrap; }
.cv .role-item .org { font-size: 9.5pt; color: var(--ink-soft); margin-top: 0.5mm; font-weight: 500; }
.cv .role-item .sub { font-size: 8pt; color: var(--ink-faint); margin-top: 1mm; }
.cv .role-item ul, .cv ul.plain { margin: 2.5mm 0 0; padding: 0; list-style: none; }
.cv .role-item li, .cv ul.plain li {
  position: relative; padding-left: 4mm; margin-bottom: 1.5mm;
  font-size: 9.3pt; color: var(--ink-soft); break-inside: avoid;
}
.cv .role-item li::before, .cv ul.plain li::before {
  content: ""; position: absolute; left: 0; top: 1.9mm;
  width: 2mm; height: 1px; background: var(--ink-faint);
}
.cv ul.plain { margin-top: 0; }

/* --- key/value blocks. No hairline under every row. ------------------ */
.cv .kv { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5mm 9mm; }
.cv .kv .row { break-inside: avoid; }
.cv .kv .k { font-size: 9.3pt; color: var(--ink); font-weight: 500; }
.cv .kv .v { font-size: 8.8pt; color: var(--ink-soft); margin-top: 0.5mm; }
.cv .kv .y { font-family: var(--font-mono); font-size: 7.5pt; color: var(--ink-faint); margin-top: 0.8mm; }

/* --- case studies ---------------------------------------------------- */
.cv .case { break-inside: avoid; padding: 3.5mm 0; border-top: 1px solid var(--rule-soft); }
.cv .case:first-of-type { border-top: 1px solid var(--rule); }
.cv .case .top { display: flex; justify-content: space-between; align-items: baseline; gap: 4mm; }
.cv .case h3 { font-size: 11.5pt; }
.cv .case .meta { font-family: var(--font-mono); font-size: 7.5pt; color: var(--ink-faint); white-space: nowrap; }
.cv .case .desc { margin-top: 1.5mm; font-size: 8.8pt; color: var(--ink-soft); max-width: 76ch; }
.cv .case .res { margin-top: 2.5mm; display: flex; flex-wrap: wrap; gap: 2mm 7mm; }
.cv .case .res .v { font-family: 'Archivo', var(--font-sans); font-weight: 600; font-size: 12.5pt; line-height: 1; color: var(--proof); }
.cv .case .res .v.stated { color: var(--ink); font-weight: 500; }
.cv .case .res .l { font-size: 7pt; color: var(--ink-faint); margin-top: 1mm; }

/* --- ads exhibits ---------------------------------------------------- */
.cv .ads-group { margin-top: 7mm; }
.cv .ads-group > .gh { border-top: 1px solid var(--rule); padding-top: 2mm; margin-bottom: 4mm; break-after: avoid; }
.cv .ads-group > .gh h3 { font-size: 10.5pt; }
.cv .ads-group > .gh p { font-size: 8.3pt; color: var(--ink-faint); margin-top: 0.8mm; }
.cv .exhibits { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm 7mm; align-items: start; }
.cv .exhibit { break-inside: avoid; }
/* Evidence you cannot read is not evidence: the dense dashboards run full width. */
.cv .exhibit.wide { grid-column: 1 / -1; }
.cv .exhibit .cap-row { display: flex; justify-content: space-between; align-items: baseline; gap: 5mm; margin-bottom: 2mm; }
.cv .exhibit h4 { font-size: 10.5pt; line-height: 1.2; }
.cv .exhibit .who { font-size: 8pt; color: var(--ink-faint); margin-top: 0.5mm; }
.cv .exhibit .hl { text-align: right; white-space: nowrap; }
.cv .exhibit .hl .v { font-family: 'Archivo', var(--font-sans); font-weight: 700; font-size: 14pt; line-height: 1; color: var(--proof); letter-spacing: -0.03em; }
.cv .exhibit .hl .l { font-size: 6.5pt; color: var(--ink-faint); margin-top: 1mm; }
.cv .exhibit img { width: 100%; height: auto; display: block; border: 1px solid var(--rule); border-radius: 2px; }
.cv .exhibit .note { margin-top: 2mm; font-size: 8.3pt; color: var(--ink-soft); }
.cv .exhibit .figs { margin-top: 1.5mm; display: flex; flex-wrap: wrap; gap: 1mm 5mm; font-size: 8pt; color: var(--ink-faint); }
.cv .exhibit .figs b { font-weight: 500; color: var(--proof); }

/* --- sku board ------------------------------------------------------- */
.cv .skus { margin-top: 7mm; break-inside: avoid; }
.cv .skus > .gh { border-top: 1px solid var(--rule); padding-top: 2mm; margin-bottom: 4mm; }
.cv .skus > .gh h3 { font-size: 10.5pt; }
.cv .skus > .gh p { font-size: 8.3pt; color: var(--ink-faint); margin-top: 0.8mm; }
.cv .sku-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5mm; }
.cv .sku { break-inside: avoid; }
.cv .sku img { width: 100%; height: auto; display: block; border-radius: 2px; }
.cv .sku h5 { font-size: 9.5pt; margin-top: 2mm; }
.cv .sku .roas { display: flex; gap: 5mm; margin-top: 1.5mm; }
.cv .sku .roas .v { font-family: 'Archivo', var(--font-sans); font-weight: 700; font-size: 13pt; line-height: 1; color: var(--proof); letter-spacing: -0.03em; }
.cv .sku .roas .l { font-size: 6pt; color: var(--ink-faint); margin-top: 0.8mm; }
.cv .sku dl { margin: 2mm 0 0; padding-top: 1.5mm; border-top: 1px solid var(--rule-soft); font-family: var(--font-mono); font-variant-numeric: tabular-nums; font-size: 7pt; color: var(--ink-faint); }
.cv .sku dl div { display: flex; justify-content: space-between; gap: 2mm; }
.cv .sku dl dd { margin: 0; color: var(--ink); }

/* --- pointer & footer ------------------------------------------------ */
.cv .pointer { margin-top: 7mm; border-top: 1.5px solid var(--proof); padding-top: 3mm; break-inside: avoid; }
.cv .pointer .t { font-family: 'Archivo', var(--font-sans); font-weight: 600; font-size: 11pt; }
.cv .pointer .d { margin-top: 1.5mm; font-size: 8.8pt; color: var(--ink-soft); max-width: 76ch; }
.cv .pointer .u { margin-top: 2mm; font-family: var(--font-mono); font-size: 9pt; color: var(--proof); }
.cv .foot { margin-top: 9mm; padding-top: 3mm; border-top: 1px solid var(--rule); font-size: 8pt; color: var(--ink-faint); }
.cv .foot .key { display: inline-flex; align-items: center; gap: 1.5mm; }
.cv .foot .key i { width: 2.5mm; height: 2.5mm; border-radius: 1px; background: var(--proof); display: inline-block; }

/* --- toolbar (screen only) ------------------------------------------- */
.cv-bar {
  position: sticky; top: 0; z-index: 20;
  display: flex; align-items: center; justify-content: space-between; gap: 4mm;
  padding: 10px 16px; background: #14161a; color: #f4f5f7;
  font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
}
.cv-bar a, .cv-bar button {
  font: inherit; letter-spacing: inherit; text-transform: inherit;
  color: inherit; background: transparent; text-decoration: none;
  border: 1px solid rgba(255,255,255,0.28); border-radius: 999px;
  padding: 6px 14px; cursor: pointer;
  transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1), background-color 160ms ease;
}
.cv-bar a:active, .cv-bar button:active { transform: scale(0.97); }
.cv-bar-modes { display: flex; gap: 8px; }
.cv-bar-modes a.on { background: rgba(255,255,255,0.14); border-color: rgba(255,255,255,0.5); }
.cv-bar button.print { background: #d99a3e; border-color: #d99a3e; color: #14161a; }
@media (hover: hover) and (pointer: fine) {
  .cv-bar a:hover, .cv-bar button:hover { background: rgba(255,255,255,0.12); }
  .cv-bar button.print:hover { background: #e8b05c; }
}
@media (prefers-reduced-motion: reduce) {
  .cv-bar a, .cv-bar button { transition: none; }
}

/* --- compact: the two-page screening variant -------------------------- */
.cv.compact .hide-compact { display: none; }
.cv.compact { font-size: 9.5pt; }
.cv.compact .sec { margin-top: 6mm; }
.cv.compact .sec > h2 { padding-top: 2mm; margin-bottom: 3mm; }
.cv.compact .role-item { margin-bottom: 3.5mm; }
.cv.compact .role-item li { margin-bottom: 1mm; font-size: 9pt; }
.cv.compact .masthead h1 { font-size: 25pt; }
.cv.compact .masthead img { width: 22mm; height: 28mm; }
.cv.compact .contact { margin-top: 3.5mm; padding-top: 2.5mm; }
.cv.compact .proof-lede .fig .v { font-size: 20pt; }
.cv.compact .proof-lede .fig:first-child .v { font-size: 28pt; }
.cv.compact .proof-lede .fig .n { display: none; }
.cv.compact .spend { margin-top: 5mm; }
.cv.compact .spend .bar { height: 7mm; }
.cv.compact .spend .legend .d { display: none; }
.cv.compact .cap p { font-size: 8.3pt; }
.cv.compact .two { gap: 3mm 8mm; }
.cv.compact .kv { gap: 2.5mm 8mm; }

/* Must be screen-scoped: A4 is ~794 CSS px, so a bare max-width query would
   also fire when printing and collapse every grid to one column. */
@media screen and (max-width: 820px) {
  .cv .sheet { padding: 8mm 6mm 12mm; }
  .cv .two, .cv .kv { grid-template-columns: 1fr; }
  .cv .exhibits { grid-template-columns: 1fr; }
  .cv .sku-grid { grid-template-columns: 1fr 1fr; }
  .cv .proof-lede { grid-template-columns: 1fr; gap: 5mm; }
  .cv .spend .legend { grid-template-columns: 1fr 1fr; }
  .cv .masthead { grid-template-columns: 1fr; }
  .cv .masthead img { width: 22mm; height: 28mm; }
}

@page { size: A4; margin: 12mm 0; }

@media print {
  .cv-bar { display: none !important; }
  .cv { font-size: 9.5pt; }
  .cv .sheet { max-width: none; padding: 0 14mm; }
  .cv .page-break { break-before: page; }
  .cv .exhibit img { max-height: 52mm; object-fit: contain; object-position: left top; }
  .cv .exhibit.wide img { max-height: 74mm; }
  .cv a[href^="http"], .cv a[href^="mailto"] { text-decoration: none; }
}
`;

/** Exhibits whose value is in dense on-screen numbers get the full column width. */
const WIDE_EXHIBITS = new Set([
  "meta-act",
  "meta-palestina",
  "google-act",
  "shopee-mf",
  "tiktok-76",
  "cpas-shopee",
]);

const RAMP = ["var(--ramp-1)", "var(--ramp-2)", "var(--ramp-3)", "var(--ramp-4)", "var(--ramp-5)"];

function Bar({ compact }: { compact: boolean }) {
  return (
    <div className="cv-bar">
      <a href="/">Portfolio</a>
      <span className="cv-bar-modes">
        <a href="/cv" className={compact ? "" : "on"}>
          Full portfolio
        </a>
        <a href="/cv?compact" className={compact ? "on" : ""}>
          Short CV
        </a>
      </span>
      <button type="button" className="print" onClick={() => window.print()}>
        Print / Save as PDF
      </button>
    </div>
  );
}

function Section({
  title,
  hint,
  breakBefore,
  hideInCompact,
  children,
}: {
  title: string;
  hint?: string;
  breakBefore?: boolean;
  /** Dropped from the two-page screening variant; still in the full portfolio. */
  hideInCompact?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`sec${breakBefore ? " page-break" : ""}${hideInCompact ? " hide-compact" : ""}`}
    >
      <h2>
        {hint && <span className="hint">{hint}</span>}
        {title}
      </h2>
      {children}
    </section>
  );
}

/**
 * Part-to-whole of one measure, so one bar rather than five. The point it makes
 * is concentration: three platforms carry 98% of the spend, and the smallest
 * slice is the only one with revenue attributed against it.
 */
function SpendBar({ compact }: { compact: boolean }) {
  const total = spendLedgerTotal;
  const pct = (v: number) => (v / total) * 100;
  // Rounding a figure on a CV to something it is not is the one thing this page
  // cannot do: Rp1.5M must not print as "Rp2M", and 0.009% must not print as "0.0%".
  const fmt = (v: number) => {
    if (v >= 1_000_000_000) return `Rp${(v / 1_000_000_000).toFixed(2)}B`;
    const m = v / 1_000_000;
    return `Rp${m >= 10 ? Math.round(m) : m.toFixed(1)}M`;
  };
  const fmtPct = (v: number) => {
    const p = pct(v);
    return p < 0.1 ? "<0.1%" : `${p.toFixed(1)}%`;
  };

  return (
    <figure className="spend">
      <div className="bar" role="img" aria-label={`Ad spend by platform, total ${fmt(total)}`}>
        {spendByPlatform.map((p, i) => (
          <div
            key={p.l}
            className="seg"
            style={{
              // The LinkedIn test is 0.009% of the total and would vanish entirely;
              // a floor keeps it visible without misstating the others by more than
              // a hair. The legend carries the exact figure.
              width: `${Math.max(pct(p.v), 0.6)}%`,
              background: RAMP[i],
            }}
          />
        ))}
      </div>

      <div className="legend">
        {spendByPlatform.map((p, i) => (
          <div className="item" key={p.l}>
            <div className="swatch-row">
              <span className="sw" style={{ background: RAMP[i] }} />
              <span className="name">{p.l}</span>
            </div>
            <div className="val num">
              {fmt(p.v)} <span className="pct num">{fmtPct(p.v)}</span>
            </div>
            {!compact && <div className="d">{p.detail}</div>}
          </div>
        ))}
      </div>

      <figcaption className="caption">
        Total <b className="num">Rp{total.toLocaleString("en-US")}</b> across ten ad accounts,
        every line of it legible in the dashboards reproduced here. Marketplace is 1.7% of the
        spend and the only channel with sales attributed against it: <b className="num">Rp3.22B</b>{" "}
        returned, 11.4x blended.
      </figcaption>
    </figure>
  );
}

function CvPage() {
  const { compact = false } = Route.useSearch();

  // Three ranked figures carry the band; rank is size. The remaining headline
  // stats live in the sections that earn them.
  const lede = headlineStats.slice(0, 3);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className={compact ? "cv compact" : "cv"}>
        <Bar compact={compact} />
        <div className="sheet">
          <header className="masthead">
            <div>
              <h1>{profile.name}</h1>
              <p className="role">
                {profile.title}. {profile.subtitle}.
              </p>
            </div>
            <img src={portrait} alt={profile.name} />
          </header>

          <div className="contact">
            <span>
              <b>Email</b>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </span>
            <span>
              <b>Phone</b>
              {profile.phone}
            </span>
            <span>
              <b>Site</b>
              <a href={profile.siteUrl}>{profile.site}</a>
            </span>
            <span>
              <b>LinkedIn</b>
              <a href={profile.linkedinUrl}>{profile.linkedin}</a>
            </span>
            <span>
              <b>Location</b>
              {profile.location}
            </span>
          </div>

          <Section title="Profile">
            <p className="lede">{compact ? summaryShort : summary}</p>
          </Section>

          <Section title="Where the budget went, and what came back">
            <div className="proof-lede">
              {lede.map((s) => (
                <div className="fig" key={s.l}>
                  <div className="v num">{s.v}</div>
                  <div className="l">{s.l}</div>
                  {s.note && <div className="n">{s.note}</div>}
                </div>
              ))}
            </div>
            <SpendBar compact={compact} />
          </Section>

          <Section title="Core capabilities">
            <div className="two">
              {capabilities.map((c) => (
                <div className="cap" key={c.k}>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Professional experience">
            {experience
              .filter((e) => e.kind === "current")
              .map((e) => (
                <article className="role-item" key={e.r + e.y}>
                  <div className="top">
                    <h3>{e.r}</h3>
                    <span className="when">{e.y}</span>
                  </div>
                  <p className="org">{e.c}</p>
                  {e.sub && <p className="sub">{e.sub}</p>}
                  <ul>
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </article>
              ))}
          </Section>

          <Section title="Earlier career">
            {experience
              .filter((e) => e.kind === "earlier")
              .map((e) => (
                <article className="role-item" key={e.r + e.y}>
                  <div className="top">
                    <h3>{e.r}</h3>
                    <span className="when">{e.y}</span>
                  </div>
                  <p className="org">{e.c}</p>
                  <ul>
                    {(compact ? e.bullets.slice(0, 1) : e.bullets).map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </article>
              ))}
          </Section>

          <Section title="Key achievements" hideInCompact>
            <ul className="plain">
              {achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </Section>

          <Section
            title="Selected case studies"
            hint={`${projects.length} engagements`}
            breakBefore
            hideInCompact
          >
            {projects.map((p) => (
              <article className="case" key={p.n}>
                <div className="top">
                  <h3>{p.title}</h3>
                  <span className="meta">
                    {p.role}
                    {p.year ? ` · ${p.year}` : ""}
                  </span>
                </div>
                <p className="desc">{p.desc}</p>
                {p.results && p.results.length > 0 && (
                  <div className="res">
                    {p.results.map((r) => (
                      <div key={r.l}>
                        <div className={`v num${r.evidence === "stated" ? " stated" : ""}`}>
                          {r.v}
                        </div>
                        <div className="l">{r.l}</div>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </Section>

          <Section
            title="Ads portfolio"
            hint="Screenshots from live ad accounts"
            breakBefore
            hideInCompact
          >
            <p className="lede">
              Account setup, targeting, creative testing, budget scaling and reporting, across
              enterprise humanitarian fundraising (ACT Foundation), multi-brand e-commerce (Muscle
              First, Halal Pro), education (LittleChamp Daycare), wellness (Wellspaces) and
              CSR/grant campaigns (PalestinaID, PT Bukit Asam, Bisa Baik). Every figure is read
              directly off the screenshot beside it.
            </p>

            {adsPortfolio.map((group) => (
              <div className="ads-group" key={group.section}>
                <div className="gh">
                  <h3>{group.section.replace(/^\d+\s*-\s*/, "")}</h3>
                  <p>{group.blurb}</p>
                </div>
                <div className="exhibits">
                  {group.exhibits.map((ex) => (
                    <figure
                      className={`exhibit${WIDE_EXHIBITS.has(ex.id) ? " wide" : ""}`}
                      key={ex.id}
                    >
                      <div className="cap-row">
                        <div>
                          <h4>{ex.title}</h4>
                          <p className="who">
                            {ex.platform} · {ex.client}
                            {ex.period ? ` · ${ex.period}` : ""}
                          </p>
                        </div>
                        {ex.headline && (
                          <div className="hl">
                            <div className="v num">{ex.headline.v}</div>
                            <div className="l">{ex.headline.l}</div>
                          </div>
                        )}
                      </div>
                      <img
                        src={ex.img}
                        alt={`${ex.platform}, ${ex.client}`}
                        width={ex.w}
                        height={ex.h}
                        decoding="async"
                      />
                      <figcaption className="note">{ex.caption}</figcaption>
                      <div className="figs">
                        {ex.figures.map((f) => (
                          <span key={f.l}>
                            <b className="num">{f.v}</b> {f.l}
                          </span>
                        ))}
                      </div>
                    </figure>
                  ))}
                </div>
              </div>
            ))}

            <div className="skus">
              <div className="gh">
                <h3>Creative to revenue, SKU by SKU</h3>
                <p>
                  The {skuBoard.client} Pro line. {skuBoard.note}
                </p>
              </div>
              <div className="sku-grid">
                {skuBoard.skus.map((sku) => (
                  <figure className="sku" key={sku.name}>
                    <img src={sku.img} alt={`${skuBoard.client} ${sku.name}`} />
                    <figcaption>
                      <h5>{sku.name}</h5>
                      <div className="roas">
                        <div>
                          <div className="v num">{sku.shopeeRoas}</div>
                          <div className="l">Shopee</div>
                        </div>
                        <div>
                          <div className="v num">{sku.cpasRoas}</div>
                          <div className="l">Meta CPAS</div>
                        </div>
                      </div>
                      <dl>
                        <div>
                          <dt>Spend</dt>
                          <dd>{sku.spend}</dd>
                        </div>
                        <div>
                          <dt>Sales</dt>
                          <dd>{sku.revenue}</dd>
                        </div>
                        <div>
                          <dt>ACOS</dt>
                          <dd>{sku.acos}</dd>
                        </div>
                      </dl>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </Section>

          <Section title="Industries operated" breakBefore hideInCompact>
            <div className="kv">
              {industries.map((it) => (
                <div className="row" key={it.n}>
                  <div className="k">{it.t}</div>
                  <div className="v">{it.b}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Technical stack" hideInCompact>
            <div className="two">
              {stack.map((s) => (
                <div className="cap" key={s.g}>
                  <h3>{s.g}</h3>
                  <p>{s.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Education">
            <div className="kv">
              {education.map((e) => (
                <div className="row" key={e.d}>
                  <div className="k">{e.d}</div>
                  <div className="v">{e.i}</div>
                  <div className="y">{e.y}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Certifications & training">
            <div className="kv">
              {(compact ? certifications.slice(0, 4) : certifications).map((c) => (
                <div className="row" key={c.t}>
                  <div className="k">{c.t}</div>
                  <div className="v">{c.i}</div>
                  {c.d && !compact && <div className="v">{c.d}</div>}
                  <div className="y">{c.y}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Organisations & languages" hideInCompact>
            <div className="kv">
              {organizations.map((o) => (
                <div className="row" key={o.o}>
                  <div className="k">{o.o}</div>
                  <div className="v">
                    {o.r}. {o.d}
                  </div>
                </div>
              ))}
              {languages.map((l) => (
                <div className="row" key={l.l}>
                  <div className="k">{l.l}</div>
                  <div className="v">{l.v}</div>
                </div>
              ))}
            </div>
          </Section>

          {compact && (
            <div className="pointer">
              <div className="t">The evidence sits behind this page.</div>
              <div className="d">
                Nine case studies and fourteen dashboard screenshots from the ad accounts behind
                these figures: Meta, Google, TikTok, Shopee, Tokopedia and LinkedIn, with a
                line-by-line ledger of the Rp16.83B they add up to.
              </div>
              <div className="u">{profile.site}/cv</div>
            </div>
          )}

          <p className="foot">
            <span className="key">
              <i />
              An amber figure is read directly off a platform dashboard reproduced in this
              document.
            </span>{" "}
            Figures in black are stated without an artefact here. Campaign-level breakdowns,
            references and additional certifications are available on request. {profile.email} ·{" "}
            {profile.phone} · <a href={profile.siteUrl}>{profile.site}</a>
          </p>
        </div>
      </div>
    </>
  );
}
