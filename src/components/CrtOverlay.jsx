import React from 'react'

export default function CrtOverlay() {
  return (
    <div
      className="crt-overlay-root pointer-events-none fixed inset-0 z-50 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Inline SVG Noise Filter for Phosphor Decay & Static Grain */}
      <svg className="hidden" width="0" height="0">
        <defs>
          <filter id="nt-static-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.14 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Layer 1: Static Grain & Weathering Mask */}
      <div className="crt-grain-layer absolute inset-0" />

      {/* Layer 2: Horizontal Scanlines & RGB Subpixel Grating */}
      <div className="crt-scanlines absolute inset-0" />

      {/* Layer 3: Rolling Vertical Sync Hum Bar */}
      <div className="crt-rollbar absolute inset-x-0" />

      {/* Layer 4: Chromatic Aberration Edge Fringe & Tube Vignette */}
      <div className="crt-vignette absolute inset-0" />

      {/* Layer 5: Harsh Brutalist Bezel Frame & Corner Diagnostics */}
      <div className="crt-bezel-frame absolute inset-2 sm:inset-3 border border-[#e0e0e0]/15">
        <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-[#d80027]" />
        <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-[#39ff14]" />
        <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-[#39ff14]" />
        <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-[#d80027]" />
      </div>
    </div>
  )
}

