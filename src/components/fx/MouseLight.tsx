import { useEffect, useRef } from "react";

export function MouseLight({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ref.current?.style.setProperty("--mx", `${e.clientX - r.left}px`);
      ref.current?.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 opacity-70 ${className}`}
      style={{
        background:
          "radial-gradient(420px circle at var(--mx,50%) var(--my,30%), oklch(0.78 0.15 65 / 0.18), transparent 65%)",
      }}
    />
  );
}
