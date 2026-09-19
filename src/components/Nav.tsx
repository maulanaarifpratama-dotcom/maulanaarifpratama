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
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Correct immediately, including when the page loads already scrolled (a
    // refresh partway down, or a link straight to #work).
    setScrolled(window.scrollY > TRIGGER);

    // Two mechanisms on purpose. The observer is the efficient one: it costs
    // nothing per frame and cannot desync from Lenis the way reading scrollY
    // during smooth interpolation can. The listener is the guarantee: it is
    // passive, does one comparison, and React discards the update when the
    // boolean has not changed, so the redundancy is close to free. This bar has
    // been reported broken twice, and the environment available here cannot
    // exercise scroll at all, so it is built to be right rather than tested.
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

  return (
    <>
      <div ref={sentinel} aria-hidden className="absolute top-0 h-16 w-px" />
      <header
        className={
          // Only colour transitions. `transition-all` used to animate
          // backdrop-filter over 500ms, so the blur visibly crawled in on every
          // scroll; animated filters are expensive as well as ugly.
          "fixed top-0 inset-x-0 z-50 transition-colors duration-300 " +
          (scrolled
            ? "supports-[backdrop-filter]:backdrop-blur-md bg-background/80 border-b border-border"
            : "bg-transparent border-b border-transparent")
        }
      >
        <nav className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-6">
          <a
            href="#top"
            className="font-display text-xl tracking-tight shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Maulana<span className="text-accent">.</span>
          </a>

          <ul className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="whitespace-nowrap rounded-sm hover:text-foreground transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden md:inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors duration-200 hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Let&rsquo;s talk <span aria-hidden>&rarr;</span>
          </a>
        </nav>
      </header>
    </>
  );
}
