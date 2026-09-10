import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero video behaviour and the section-title reveals.
 *
 * WHAT CHANGED, AND WHY
 *
 * This file held four of the page's per-scroll-frame costs:
 *
 *  1. The hero video was scrubbed by assigning `video.currentTime` on every
 *     scroll frame. Seeking an encoded video per frame makes the decoder chase
 *     keyframes and is one of the most expensive things a page can do. The video
 *     now plays as ambient loop and pauses when the hero leaves the viewport, so
 *     it also stops decoding entirely once you scroll past it.
 *  2. A CSS `filter` containing `blur()` was scrubbed across that same video.
 *     Blurring a decoded video frame every frame is very costly, and the
 *     gradient overlays already darken the hero as it leaves. Removed.
 *  3. Every section title scrubbed `letterSpacing`, which is a layout property,
 *     so each scroll frame relaid out text. It also animated `blur()` and
 *     `clipPath`. Replaced with an opacity and transform reveal that plays once
 *     on entry: compositor-only, and it reads better when scrolling fast.
 *  4. A root-level CSS variable was rewritten every frame, invalidating style
 *     for the whole document. The grain now gets one fixed value.
 *
 * What is left is scroll-driven where scroll actually drives it, and free
 * otherwise.
 */
export function HeroTimeline() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const hero = document.querySelector<HTMLElement>("[data-hero-section]");
    const video = document.querySelector<HTMLVideoElement>("[data-hero-video]");

    // Ambient playback, stopped while offscreen. Decoding a video nobody can
    // see is pure cost, and it is the single biggest idle drain on this page.
    let io: IntersectionObserver | undefined;
    if (hero && video) {
      video.loop = true;
      video.muted = true;
      if (reduce) {
        video.pause();
      } else {
        io = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) void video.play().catch(() => {});
            else video.pause();
          },
          { threshold: 0.01 },
        );
        io.observe(hero);
      }
    }

    // One fixed grain value rather than a scrubbed custom property.
    document.documentElement.style.setProperty("--grain-intensity", "0.07");
    document.documentElement.style.setProperty("--grain-intensity-noise", "0.09");

    const ctx = gsap.context(() => {
      if (reduce) return;

      gsap.utils.toArray<HTMLElement>("[data-section-reveal]").forEach((section) => {
        const title = section.querySelector<HTMLElement>("[data-section-title]");
        if (!title) return;

        gsap.fromTo(
          title,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          },
        );
      });
    });

    return () => {
      io?.disconnect();
      ctx.revert();
    };
  }, []);

  return null;
}
