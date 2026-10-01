import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  // The bar reports position, so it stays. The spring is decorative lag, so it
  // goes: under reduced-motion the bar tracks scroll exactly.
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.4 });
  const x = reduce ? scrollYProgress : smooth;
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: x, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[90] shadow-[0_0_20px_rgba(255,180,80,0.8)]"
    />
  );
}
