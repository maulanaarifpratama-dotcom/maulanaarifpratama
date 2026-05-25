import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function Tilt({
  children,
  className,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 200, damping: 20 });
  const spy = useSpring(py, { stiffness: 200, damping: 20 });
  const rx = useTransform(spy, [-0.5, 0.5], [max, -max]);
  const ry = useTransform(spx, [-0.5, 0.5], [-max, max]);
  const bg = useTransform([spx, spy], (v: number[]) => {
    const gxv = `${(v[0] + 0.5) * 100}%`;
    const gyv = `${(v[1] + 0.5) * 100}%`;
    return `radial-gradient(circle at ${gxv} ${gyv}, rgba(255,210,140,0.5), transparent 55%)`;
  });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className={className}
    >
      <div style={{ transform: "translateZ(0)" }} className="relative h-full w-full">
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-70"
          style={{ background: bg }}
        />
      </div>
    </motion.div>
  );
}

