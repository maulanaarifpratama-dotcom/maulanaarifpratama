import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroTimeline — a single, scroll-driven cinematic timeline.
 *
 * Drives:
 *  1. Hero <video data-hero-video> playback as a scrubbed timeline
 *     (currentTime is mapped to scroll position across the hero section)
 *     plus a CSS `filter` ramp (blur / saturate / brightness) tied to scroll.
 *  2. Global grain intensity via the `--grain-intensity` and
 *     `--grain-intensity-noise` CSS vars on `:root`, modulated by overall
 *     document scroll progress.
 *  3. Section reveal timing for any [data-section-reveal] block with a
 *     synchronized typography transition on [data-section-title]
 *     (clip-path, y-offset, letter-spacing, weight axis).
 *
 * All intensities soften on mobile via ScrollTrigger.matchMedia().
 */
export function HeroTimeline() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const root = document.documentElement;

      const build = (intensity: number) => {
        const triggers: ScrollTrigger[] = [];

        /* ---------- 1. Hero video scrubbed timeline ---------- */
        const hero = document.querySelector<HTMLElement>("[data-hero-section]");
        const video = document.querySelector<HTMLVideoElement>("[data-hero-video]");

        if (hero && video) {
          // Take manual control: pause ambient autoplay and scrub instead.
          const wireScrub = () => {
            try {
              video.pause();
              video.loop = false;
              video.muted = true;
            } catch {}

            const duration = video.duration || 1;
            const state = { t: 0 };

            const tween = gsap.to(state, {
              t: duration,
              ease: "none",
              onUpdate: () => {
                // Guard against seek storms on slow decoders.
                if (Math.abs(video.currentTime - state.t) > 0.04) {
                  video.currentTime = Math.min(duration - 0.05, Math.max(0, state.t));
                }
              },
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            });
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);

            // Cinematic filter ramp (sharp → soft/desaturated as you scroll past)
            const filterTween = gsap.fromTo(
              video,
              { filter: "saturate(1.05) contrast(1.05) brightness(1) blur(0px)" },
              {
                filter: `saturate(${0.55 - 0.05 * intensity}) contrast(1.12) brightness(0.78) blur(${
                  4 * intensity
                }px)`,
                ease: "none",
                scrollTrigger: {
                  trigger: hero,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.8,
                },
              }
            );
            if (filterTween.scrollTrigger) triggers.push(filterTween.scrollTrigger);
          };

          if (video.readyState >= 1 && !Number.isNaN(video.duration)) {
            wireScrub();
          } else {
            video.addEventListener("loadedmetadata", wireScrub, { once: true });
          }
        }

        /* ---------- 2. Global grain intensity ---------- */
        const grainTween = gsap.fromTo(
          root,
          {
            "--grain-intensity": 0.04,
            "--grain-intensity-noise": 0.05,
          },
          {
            "--grain-intensity": 0.14 * intensity + 0.04,
            "--grain-intensity-noise": 0.18 * intensity + 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.2,
            },
          }
        );
        if (grainTween.scrollTrigger) triggers.push(grainTween.scrollTrigger);

        /* ---------- 3. Section reveal + typography transitions ---------- */
        gsap.utils
          .toArray<HTMLElement>("[data-section-reveal]")
          .forEach((section) => {
            const title = section.querySelector<HTMLElement>("[data-section-title]");
            const body = section.querySelectorAll<HTMLElement>(
              "[data-section-body], p, li"
            );

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "top 35%",
                scrub: 1,
              },
            });

            if (title) {
              tl.fromTo(
                title,
                {
                  yPercent: 18 * intensity,
                  opacity: 0,
                  letterSpacing: `${0.18 * intensity}em`,
                  fontWeight: 300,
                  clipPath: "inset(0 0 100% 0)",
                  filter: "blur(6px)",
                },
                {
                  yPercent: 0,
                  opacity: 1,
                  letterSpacing: "-0.02em",
                  fontWeight: 500,
                  clipPath: "inset(0 0 0% 0)",
                  filter: "blur(0px)",
                  ease: "power2.out",
                },
                0
              );
            }

            if (body.length) {
              tl.fromTo(
                body,
                { y: 24 * intensity, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.04, ease: "power1.out" },
                0.1
              );
            }

            if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
          });

        return () => triggers.forEach((t) => t.kill());
      };

      if (typeof ScrollTrigger.matchMedia === "function") {
        ScrollTrigger.matchMedia({
          "(min-width: 768px)": () => build(1),
          "(max-width: 767px)": () => build(0.45),
        });
      } else {
        build(window.innerWidth >= 768 ? 1 : 0.45);
      }

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const t = window.setTimeout(refresh, 800);
      return () => {
        window.removeEventListener("load", refresh);
        window.clearTimeout(t);
      };
    });

    return () => ctx.revert();
  }, []);

  return null;
}
