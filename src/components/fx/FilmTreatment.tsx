import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

/**
 * Fixed full-viewport cinematic overlay:
 *  - Animated letterbox bars that breathe in/out with scroll
 *  - Subtle chromatic aberration (RGB split) that intensifies with scroll velocity
 *  - Vignette that pulses with a slow heartbeat + scroll
 *  - Global desaturation/contrast grading that deepens as you scroll
 */
export function FilmTreatment() {
  const { scrollYProgress, scrollY } = useScroll();
  const sp = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.4 });

  // Letterbox: 6vh at top, breathes to 10vh mid-scroll, eases back to 7vh
  const barH = useTransform(sp, [0, 0.5, 1], ["6vh", "10vh", "7vh"]);

  // Desaturation + contrast grading
  const filter = useTransform(
    sp,
    [0, 0.5, 1],
    [
      "saturate(0.92) contrast(1.02)",
      "saturate(0.78) contrast(1.08)",
      "saturate(0.7) contrast(1.12)",
    ]
  );

  // Vignette intensity (combined with pulse animation)
  const vignette = useTransform(
    sp,
    [0, 1],
    [
      "inset 0 0 220px 40px oklch(0 0 0 / 0.55)",
      "inset 0 0 320px 90px oklch(0 0 0 / 0.85)",
    ]
  );

  // Chromatic aberration tracks scroll velocity
  const [aberration, setAberration] = useState(0);
  const lastY = useRef(0);
  const lastT = useRef(performance.now());
  const decayRef = useRef<number | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const now = performance.now();
    const dt = Math.max(16, now - lastT.current);
    const v = Math.abs(y - lastY.current) / dt; // px/ms
    lastY.current = y;
    lastT.current = now;
    setAberration((prev) => Math.min(6, Math.max(prev, v * 2.2)));
  });

  useEffect(() => {
    const tick = () => {
      setAberration((p) => (p > 0.05 ? p * 0.9 : 0));
      decayRef.current = requestAnimationFrame(tick);
    };
    decayRef.current = requestAnimationFrame(tick);
    return () => {
      if (decayRef.current) cancelAnimationFrame(decayRef.current);
    };
  }, []);

  return (
    <>
      {/* Global color grading layer — fixed, behind everything visible but above content's natural colors via mix-blend on a clone is overkill.
          Instead we apply via a body-class-free fixed overlay that filters via backdrop-filter. */}
      <motion.div
        aria-hidden
        style={{ backdropFilter: filter, WebkitBackdropFilter: filter as unknown as string }}
        className="pointer-events-none fixed inset-0 z-[70]"
      />

      {/* Chromatic aberration — two thin colored copies of a noise/edge tint */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[71] mix-blend-screen"
        animate={{
          x: aberration,
          opacity: Math.min(0.35, 0.08 + aberration * 0.05),
        }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        style={{
          boxShadow: "inset 0 0 0 1px oklch(0.65 0.25 25 / 0.18)",
          background:
            "radial-gradient(ellipse at center, transparent 55%, oklch(0.6 0.28 25 / 0.06) 100%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[71] mix-blend-screen"
        animate={{
          x: -aberration,
          opacity: Math.min(0.35, 0.08 + aberration * 0.05),
        }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, oklch(0.6 0.28 230 / 0.06) 100%)",
        }}
      />

      {/* Vignette pulse */}
      <motion.div
        aria-hidden
        style={{ boxShadow: vignette }}
        className="pointer-events-none fixed inset-0 z-[72] animate-[vignettePulse_6s_ease-in-out_infinite]"
      />

      {/* Letterbox bars */}
      <motion.div
        aria-hidden
        style={{ height: barH }}
        className="pointer-events-none fixed top-0 inset-x-0 z-[75] bg-background"
      >
        <div className="absolute bottom-0 inset-x-0 h-px bg-foreground/10" />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ height: barH }}
        className="pointer-events-none fixed bottom-0 inset-x-0 z-[75] bg-background"
      >
        <div className="absolute top-0 inset-x-0 h-px bg-foreground/10" />
      </motion.div>
    </>
  );
}
