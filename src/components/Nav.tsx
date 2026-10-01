import { useEffect, useRef, useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#ads", label: "Ads" },
  { href: "#industries", label: "Industries" },
  { href: "#experience", label: "Experience" },
  { href: "/cv", label: "CV" },
];

/** Where the bar turns solid. Matches the bar's own height. */
const TRIGGER = 64;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Correct immediately, including when the page loads already scrolled (a
    // refresh partway down, or a link straight to #work).
    setScrolled(window.scrollY > TRIGGER);

    // Two mechanisms on purpose. The observer is the efficient one: it costs
    // nothing per frame and cannot desync from Lenis the way reading scrollY
    // during smooth interpolation can. The listener is the guarantee: it is
    // passive, does one comparison, and React discards the update when the
    // boolean has not changed, so the redundancy is close to free.
    const update = (next: boolean) => setScrolled(next);

    const el = sentinel.current;
    let io: IntersectionObserver | undefined;
    if (el && typeof IntersectionObserver !== "undefined") {
      // The sentinel is as tall as the bar and carries no rootMargin. A 1px
      // sentinel with `rootMargin: -64px` reports "not intersecting" even at
      // scroll top, because a shrunk root excludes y=0; that pinned the bar in
      // its scrolled state permanently. Height sets the trigger point, not margin.
      io = new IntersectionObserver(([entry]) => update(!entry.isIntersecting));
      io.observe(el);
    }

    const onScroll = () => update(window.scrollY > TRIGGER);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Escape closes, and focus returns to the control that opened it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div ref={sentinel} aria-hidden className="absolute top-0 h-16 w-px" />
      <header
        className={
          // Only colour transitions. `transition-all` used to animate
          // backdrop-filter over 500ms, so the blur visibly crawled in on every
          // scroll; animated filters are expensive as well as ugly.
          "fixed top-0 inset-x-0 z-50 transition-colors duration-300 " +
          (scrolled || open
            ? "supports-[backdrop-filter]:backdrop-blur-md bg-background/80 border-b border-border"
            : "bg-transparent border-b border-transparent")
        }
      >
        <nav className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-6">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="font-display text-xl tracking-tight shrink-0 rounded-sm py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Maulana<span className="text-accent">.</span>
          </a>

          {/* Desktop. Links keep a 44px-tall hit area via padding, so the
              target is finger-sized without changing the type scale. */}
          <ul className="hidden md:flex items-center gap-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex items-center h-11 px-2 whitespace-nowrap rounded-sm hover:text-foreground transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden md:inline-flex shrink-0 items-center gap-2 h-11 whitespace-nowrap rounded-full border border-border px-5 text-xs uppercase tracking-[0.18em] transition-colors duration-200 hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Let&rsquo;s talk <span aria-hidden>&rarr;</span>
          </a>

          {/* Below md the links above are hidden. Without this control the CV,
              the single most important destination on the site, was reachable
              from nowhere on a phone. */}
          <button
            ref={toggle}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden inline-flex items-center justify-center -mr-2 h-11 w-11 rounded-sm text-foreground transition-transform duration-150 ease-out active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span aria-hidden className="relative block w-5 h-[10px]">
              <span
                className={
                  "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-200 ease-out " +
                  (open ? "translate-y-[5px] rotate-45" : "")
                }
              />
              <span
                className={
                  "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-200 ease-out " +
                  (open ? "-translate-y-[4px] -rotate-45" : "")
                }
              />
            </span>
          </button>
        </nav>

        {/* Panel. Height and opacity rather than a portal: it is six links, it
            never needs to trap focus, and this keeps it in the header's own
            stacking context so the backdrop blur above covers it too. */}
        <div
          id="mobile-nav"
          ref={panel}
          hidden={!open}
          className="md:hidden border-t border-border bg-background/95 supports-[backdrop-filter]:backdrop-blur-md"
        >
          <ul className="max-w-[1400px] mx-auto px-6 py-2">
            {links.map((l) => (
              <li key={l.href} className="border-b border-border/60 last:border-b-0">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center h-14 text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="max-w-[1400px] mx-auto px-6 pb-5 pt-1">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 h-12 rounded-full bg-foreground px-5 text-xs uppercase tracking-[0.18em] text-background transition-transform duration-150 ease-out active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Let&rsquo;s talk <span aria-hidden>&rarr;</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
