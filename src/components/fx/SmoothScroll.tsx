import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  useEffect(() => {
    // Interpolated scrolling is the single most motion-sickness-prone effect on
    // this page, because it applies to every scroll the visitor makes rather
    // than to one element. Under reduced-motion we never construct Lenis at all
    // and leave the browser's own scrolling alone; ScrollTrigger keeps working
    // off native scroll events.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Organic, cinematic easing. Damping ~1.2.
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      lerp: 0.085, // ≈ damping 1.2
    });

    // Bridge Lenis ↔ ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
  return null;
}
