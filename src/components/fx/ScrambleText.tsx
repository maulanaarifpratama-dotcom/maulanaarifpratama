import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________ABCDEFGHJKLMNPQRSTUVWXYZ";

export function ScrambleText({
  text,
  className,
  duration = 1200,
  trigger = "mount",
}: {
  text: string;
  className?: string;
  duration?: number;
  trigger?: "mount" | "hover";
}) {
  const [display, setDisplay] = useState(text);
  const raf = useRef<number>(0);

  const run = () => {
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const reveal = Math.floor(p * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (i < reveal || text[i] === " ") {
          out += text[i];
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplay(out);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (trigger === "mount") run();
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const handlers =
    trigger === "hover" ? { onPointerEnter: run, onFocus: run } : {};

  return (
    <span className={className} {...handlers}>
      {display}
    </span>
  );
}
