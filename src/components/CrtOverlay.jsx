import React from 'react'

export default function CrtOverlay() {
  return (
    <div
      className="crt-overlay-root pointer-events-none fixed inset-0 z-50 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Layer 1: Consolidated Static CRT Surface (Micro-Tiled Scanlines, RGB Grille, Bayer Dither & Vignette in 1 GPU Layer) */}
      <div className="crt-static-surface absolute inset-0" />

      {/* Layer 2: Compositor-Only Rolling Vertical Sync Bar (GPU-Promoted Transform Layer) */}
      <div className="crt-rollbar absolute inset-x-0 top-0" />

      {/* Layer 3: Pure DOM Brutalist Bezel Frame, Static Chromatic Edge Fringe & Corner Fiducials */}
      <div className="crt-bezel-frame absolute inset-2 sm:inset-3 border border-[#e0e0e0]/15">
        <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-[#d80027]" />
        <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-[#39ff14]" />
        <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-[#39ff14]" />
        <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-[#d80027]" />
      </div>
    </div>
  )
}
