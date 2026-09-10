import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<"default" | "hover" | "drag">("default");
  const [label, setLabel] = useState("");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const ringX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.6 });
  const visible = useRef(false);

  useEffect(() => {
    // Fine pointers only. On touch this used to skip the listeners but still
    // render a fixed mix-blend-difference layer, which costs compositing for a
    // cursor that can never appear.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible.current) visible.current = true;
    };
    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a, button, [data-cursor], [role='button']"
      );
      if (target) {
        setVariant("hover");
        setLabel(target.dataset.cursor || "");
      } else {
        setVariant("default");
        setLabel("");
      }
    };
    const down = () => setVariant("drag");
    const up = () => setVariant("default");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.style.cursor = "none";
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.style.cursor = "";
    };
  }, [x, y]);

  if (!enabled) return null;
  const isHover = variant === "hover";
  const isDrag = variant === "drag";

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      >
        <motion.div
          animate={{ scale: isDrag ? 0.6 : isHover ? 0 : 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="w-2 h-2 rounded-full bg-accent shadow-[0_0_18px_rgba(255,180,80,0.9)]"
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[99] -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference"
      >
        <motion.div
          animate={{
            width: isHover ? 88 : 36,
            height: isHover ? 88 : 36,
            borderColor: isHover ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
          }}
          transition={{ type: "spring", stiffness: 250, damping: 22 }}
          className="rounded-full border flex items-center justify-center text-[10px] font-mono uppercase tracking-[0.2em] text-white"
        >
          {isHover && label}
        </motion.div>
      </motion.div>
    </>
  );
}
