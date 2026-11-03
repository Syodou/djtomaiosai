import React from 'react'

export default function CrtOverlay() {
  return (
    <div
      className="crt-overlay-root pointer-events-none fixed inset-0 z-50 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Layer 1: Pure CSS Bayer Dither Static Matrix (Zero SVG feTurbulence / Zero Canvas) */}
      <div className="crt-dither-grain absolute inset-0" />

      {/* Layer 2: GPU-Composited Horizontal Scanlines & RGB Subpixel Phosphor Grille */}
      <div className="crt-scanlines absolute inset-0" />

      {/* Layer 3: GPU-Accelerated Chromatic Aberration Edge Fringe */}
      <div className="crt-chromatic-fringe absolute inset-0" />

      {/* Layer 4: Compositor-Only Rolling Vertical Sync Bar (translate3d / translate) */}
      <div className="crt-rollbar absolute inset-x-0" />

      {/* Layer 5: Curved CRT Tube Vignette */}
      <div className="crt-vignette absolute inset-0" />

      {/* Layer 6: Pure DOM Brutalist Bezel Frame & Corner Fiducials */}
      <div className="crt-bezel-frame absolute inset-2 sm:inset-3 border border-[#e0e0e0]/15">
        <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-[#d80027]" />
        <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-[#39ff14]" />
        <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-[#39ff14]" />
        <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-[#d80027]" />
      </div>
    </div>
  )
}
