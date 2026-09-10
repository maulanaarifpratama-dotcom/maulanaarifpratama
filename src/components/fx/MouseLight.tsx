import { useEffect, useRef } from "react";

/**
 * A soft light that follows the pointer across the parent section.
 *
 * Two changes for cost: the custom-property write is coalesced into one
 * `requestAnimationFrame` per frame rather than firing on every pointermove
 * event (a fast mouse emits several per frame, and each write invalidates
 * style), and the whole thing is skipped on touch, where it can never be seen
 * and the listener would only cost scroll performance.
 */
export function MouseLight({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let nx = 0;
    let ny = 0;

    const flush = () => {
      raf = 0;
      ref.current?.style.setProperty("--mx", `${nx}px`);
      ref.current?.style.setProperty("--my", `${ny}px`);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      nx = e.clientX - r.left;
      ny = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(flush);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
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
