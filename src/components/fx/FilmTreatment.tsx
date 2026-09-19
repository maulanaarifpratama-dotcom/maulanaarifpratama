/**
 * Fixed cinematic overlay: grain and a vignette.
 *
 * THE LETTERBOX BARS ARE GONE, DELIBERATELY
 *
 * They were `fixed`, `6vh` tall, at `z-[75]`. The navigation bar is `fixed`,
 * 64px tall, at `z-50`. On any viewport shorter than about 1070px the top bar
 * therefore covered the nav outright, and on taller ones it sliced off its upper
 * half; once the nav gained a background on scroll you could see the two
 * stacked. That was the reported collision, and no z-index change fixes it,
 * because two opaque fixed bars were competing for the same 64px of screen.
 *
 * Removing them rather than reordering them is the right call twice over: the
 * pair also ate 12vh of every viewport for the whole length of the page, which
 * on a laptop is roughly 100px of permanently black screen on a document people
 * are meant to read. The vignette and grain below carry the cinematic treatment
 * on their own, and the hero still has its colour grade, scanlines and sweep.
 *
 * What is left composites once and costs nothing per frame. See the git history
 * of this file for the four per-frame effects removed on 2026-09-10.
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
            "radial-gradient(ellipse 92% 78% at 50% 50%, transparent 48%, oklch(0 0 0 / 0.5) 100%)",
        }}
      />
    </>
  );
}
