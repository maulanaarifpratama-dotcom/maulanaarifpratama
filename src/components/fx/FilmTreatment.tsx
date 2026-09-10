/**
 * Fixed cinematic overlay: letterbox bars and a vignette.
 *
 * WHAT THIS USED TO DO, AND WHY IT NO LONGER DOES
 *
 * The previous version cost more than the rest of the page combined:
 *
 *  - A full-viewport `backdrop-filter: saturate() contrast()` at z-70. A
 *    backdrop-filter spanning the whole viewport forces the compositor to
 *    re-filter every pixel behind it on every frame, for the life of the page.
 *    The grade it produced was a few percent of saturation; it is now baked into
 *    the palette instead, for free.
 *  - Two more full-viewport layers with `mix-blend-screen` for a chromatic
 *    aberration tied to scroll velocity.
 *  - A `requestAnimationFrame` loop that ran forever and called `setState` on
 *    every frame while scrolling, re-rendering this component at 60fps.
 *  - Letterbox bars animating `height`, which is a layout property, so every
 *    scroll frame triggered layout on the whole document.
 *  - A vignette animating `box-shadow` with a 320px blur radius, plus an
 *    infinite CSS pulse, so it rasterised continuously.
 *
 * What survives is the part you actually see: the bars and the vignette. Both
 * are static, composited once, and cost nothing per frame. The bars keep their
 * exact resting size, so the framing is unchanged.
 */
export function FilmTreatment() {
  return (
    <>
      {/* The page's single grain layer. Fixed, so it composites once and never
          moves; previously each grained section carried its own blended
          pseudo-element that re-blended as the section scrolled. */}
      <div aria-hidden className="grain-layer pointer-events-none fixed inset-0 z-[69]" />

      {/* Vignette. A radial gradient rasterises far cheaper than a 320px-blur
          box-shadow and is visually equivalent at this opacity. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[72]"
        style={{
          background:
            "radial-gradient(ellipse 90% 75% at 50% 50%, transparent 45%, oklch(0 0 0 / 0.55) 100%)",
        }}
      />

      {/* Letterbox bars, fixed at their resting height. */}
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 inset-x-0 z-[75] h-[6vh] bg-background"
      >
        <div className="absolute bottom-0 inset-x-0 h-px bg-foreground/10" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-0 inset-x-0 z-[75] h-[6vh] bg-background"
      >
        <div className="absolute top-0 inset-x-0 h-px bg-foreground/10" />
      </div>
    </>
  );
}
