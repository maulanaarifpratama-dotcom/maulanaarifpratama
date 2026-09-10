import { useEffect, useRef, useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#ads", label: "Ads" },
  { href: "#industries", label: "Industries" },
  { href: "#experience", label: "Experience" },
  { href: "/cv", label: "CV" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  // A sentinel plus IntersectionObserver instead of a scroll listener. Three
  // reasons: the observer costs nothing per frame, it cannot desync from Lenis
  // the way `window.scrollY` does while smooth scrolling is interpolating, and
  // the observer's own threshold gives hysteresis, so the bar no longer flickers
  // when you hover around the trigger point.
  useEffect(() => {
    // Correct on mount even before the observer's first delivery, which matters
    // when the page loads already scrolled (a refresh partway down, or a link
    // straight to #work).
    setScrolled(window.scrollY > 64);

    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      rootMargin: "-64px 0px 0px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden className="absolute top-0 h-px w-px" />
      <header
        className={
          // Only colour is transitioned. `transition-all` used to animate
          // backdrop-filter over 500ms, which made the blur visibly crawl in on
          // every scroll: that was the "weird" part, and animated filters are
          // expensive besides.
          "fixed top-0 inset-x-0 z-50 transition-colors duration-300 " +
          (scrolled
            ? "supports-[backdrop-filter]:backdrop-blur-md bg-background/80 border-b border-border"
            : "bg-transparent border-b border-transparent")
        }
      >
        <nav className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-6">
          <a href="#top" className="font-display text-xl tracking-tight shrink-0">
            Maulana<span className="text-accent">.</span>
          </a>
          <ul className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="hover:text-foreground transition-colors duration-200 whitespace-nowrap"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="hidden md:inline-flex shrink-0 items-center gap-2 text-xs uppercase tracking-[0.18em] border border-border px-4 py-2 rounded-full whitespace-nowrap hover:bg-foreground hover:text-background transition-colors duration-200"
          >
            Let&rsquo;s talk <span aria-hidden>&rarr;</span>
          </a>
        </nav>
      </header>
    </>
  );
}
