import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CinematicScroll wires GSAP ScrollTrigger to elements that opt in via
 * data attributes. It also drives pinned cinematic transitions for major
 * sections without altering DOM structure or content.
 *
 *   [data-parallax-bg]   → slow background drift (yPercent: -15 by default)
 *   [data-parallax-fg]   → foreground lift (yPercent 30 → 0 on enter)
 *   [data-cinematic-in]  → camera-style scale + fade as the element enters
 *   [data-pin-fade]      → section pins briefly, cross-fades / scales
 *
 * All values soften via ScrollTrigger.matchMedia() on mobile.
 */
export function CinematicScroll() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = ScrollTrigger.matchMedia ?? null;

      const build = (intensity: number) => {
        const triggers: ScrollTrigger[] = [];

        // 1. Background parallax (slow drift)
        gsap.utils.toArray<HTMLElement>("[data-parallax-bg]").forEach((el) => {
          const amount = Number(el.dataset.parallaxBg || -15) * intensity;
          const tween = gsap.fromTo(
            el,
            { yPercent: 0, force3D: true },
            {
              yPercent: amount,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
        });

        // 2. Foreground lift
        gsap.utils.toArray<HTMLElement>("[data-parallax-fg]").forEach((el) => {
          const amount = Number(el.dataset.parallaxFg || 30) * intensity;
          const tween = gsap.fromTo(
            el,
            { yPercent: amount, force3D: true },
            {
              yPercent: 0,
              ease: "power1.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                end: "top 40%",
                scrub: 1,
              },
            }
          );
          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
        });

        // 3. Cinematic camera-in (scale + opacity scrub)
        gsap.utils.toArray<HTMLElement>("[data-cinematic-in]").forEach((el) => {
          const tween = gsap.fromTo(
            el,
            { scale: 1 + 0.06 * intensity, opacity: 0.55, force3D: true },
            {
              scale: 1,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 95%",
                end: "top 55%",
                scrub: 1,
              },
            }
          );
          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
        });

        // 4. Pinned cinematic section transitions
        gsap.utils
          .toArray<HTMLElement>("[data-pin-fade]")
          .forEach((section) => {
            const layers = section.querySelectorAll<HTMLElement>(
              "[data-pin-layer]"
            );
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=80%",
                pin: true,
                pinSpacing: true,
                scrub: 1,
                anticipatePin: 1,
              },
            });
            tl.to(section, {
              scale: 1 - 0.04 * intensity,
              opacity: 0.9,
              ease: "none",
            });
            if (layers.length) {
              tl.to(
                layers,
                {
                  yPercent: -10 * intensity,
                  opacity: 0,
                  ease: "power1.in",
                  stagger: 0.05,
                },
                0
              );
            }
            if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
          });

        return () => {
          triggers.forEach((t) => t.kill());
        };
      };

      if (mm) {
        ScrollTrigger.matchMedia({
          "(min-width: 768px)": () => build(1),
          "(max-width: 767px)": () => build(0.45),
        });
      } else {
        build(window.innerWidth >= 768 ? 1 : 0.45);
      }

      // Refresh once fonts/images settle.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const t = window.setTimeout(refresh, 600);
      return () => {
        window.removeEventListener("load", refresh);
        window.clearTimeout(t);
      };
    });

    return () => ctx.revert();
  }, []);

  return null;
}
