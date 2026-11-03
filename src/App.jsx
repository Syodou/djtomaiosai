import React from 'react'
import CrtOverlay from './components/CrtOverlay.jsx'
import BackgroundNoise from './components/BackgroundNoise.jsx'
import CrypticButton from './components/CrypticButton.jsx'

const FRAGMENTED_TRACK_SLOGANS = [
  '01 // AMEN_VIVISECTION_285BPM_[RAW_CLIP].WAV',
  '02 // SUB_HARMONIC_LACERATION_0x0000007E',
  '03 // VENETIAN_SNARE_CORRUPTION_DUMP_v9.FLAC',
  '04 // GABBER_KICK_THERMAL_OVERLOAD_[+24dB]',
  '05 // NULL_POINTER_NIHILISM // DEAD_CHANNEL',
]

export default function App() {
  return (
    <div className="nt-viewport-shell w-screen h-screen overflow-hidden relative select-none bg-[#080808] text-[#e0e0e0]">
      {/* Pure CSS + GPU-Composited Scanlines, Chromatic Fringe & Bezel Overlay */}
      <CrtOverlay />

      {/* Pure DOM + Tailwind Multi-Layered ASCII, Kanji, Wireframe & System Error Background */}
      <BackgroundNoise />

      {/* Central / Scattered Non-Interactive Brutalist Typography Installation */}
      <main
        className="nt-main-jitter pointer-events-none relative z-20 w-full h-full flex flex-col justify-between p-6 sm:p-10"
        aria-label="NT DYWKSYCKS visual installation"
      >
        {/* Upper Irregular Telemetry Header Fragment */}
        <header className="flex flex-wrap items-start justify-between gap-4 pt-4">
          <div className="telemetry-box bg-[#050505]/90 border border-[#e0e0e0]/25 px-3 py-2 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase">
            <div className="text-[#d80027] font-bold flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#d80027] animate-pulse" />
              <span>NODE_ID :: NT_DYWKSYCKS // VOID_INSTALLATION</span>
            </div>
            <div className="text-[#e0e0e0]/70 mt-0.5">
              MEM_OFFSET: 0x007E9A1C // DSP_CLIP: +19.8dBFS [60FPS_GPU_COMPOSITED]
            </div>
          </div>

          <div className="hidden sm:block telemetry-box bg-[#050505]/90 border border-[#39ff14]/40 px-3 py-1.5 font-mono text-[10px] text-[#39ff14] tracking-[0.3em] uppercase">
            [NO_PORTFOLIO // NO_COMMERCE // PURE_SIGNAL_DECAY]
          </div>
        </header>

        {/* Center Harsh Typographic Monolith & Scattered Slogans */}
        <section className="my-auto flex flex-col items-center justify-center relative">
          {/* Irregular Brutalist Framing Box */}
          <div className="monolith-frame relative bg-[#050505]/88 border-2 border-[#e0e0e0] px-5 py-6 sm:px-10 sm:py-8 max-w-4xl w-full">
            {/* Corner Technical Markers */}
            <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.3em] text-[#d80027] border-b border-[#e0e0e0]/25 pb-2 mb-4">
              <span>FATAL_AUDIO_EXCEPTION // 0x0000007E</span>
              <span className="text-[#39ff14]">[240-320 BPM // HARDCORE_NOISE]</span>
            </div>

            {/* Glitching Main Title with GPU Chromatic Aberration Pseudo-Layers */}
            <h1
              className="nt-glitch-title font-pixel uppercase text-[#e0e0e0] tracking-[0.16em] sm:tracking-[0.22em] leading-[0.92] select-none"
              data-text="NT DYWKSYCKS"
            >
              NT DYWKSYCKS
            </h1>

            {/* Harsh Sub-Slogan Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 bg-[#d80027] text-[#050505] px-2.5 py-1 font-mono text-xs sm:text-sm font-bold tracking-[0.28em] uppercase">
              <span>CYBER-NIHILISM // EXTREME DIGITAL DECAY</span>
              <span className="bg-[#050505] text-[#39ff14] px-1.5 py-0.5 text-[10px]">
                信号喪失 // 0xDEAD
              </span>
            </div>

            {/* Scattered Fragmented Breakcore Track Phrases */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] text-[#e0e0e0]/75">
              {FRAGMENTED_TRACK_SLOGANS.map((line, index) => (
                <div
                  key={line}
                  className={`truncate px-2 py-1 border ${
                    index % 2 === 0
                      ? 'border-[#e0e0e0]/20 bg-[#080808]'
                      : 'border-[#d80027]/35 bg-[#d80027]/5 text-[#e0e0e0]'
                  }`}
                >
                  {line}
                </div>
              ))}
              <div className="truncate px-2 py-1 border border-[#39ff14]/40 bg-[#39ff14]/10 text-[#39ff14] font-bold">
                &gt;&gt; STATUS: [CORRUPTED AUDIO BUFFER]
              </div>
            </div>

            {/* Asymmetric Floating Warning Stamp */}
            <div className="hidden md:block absolute -right-4 -top-5 bg-[#e0e0e0] text-[#050505] border-2 border-[#d80027] px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.25em] uppercase rotate-2">
              RAW_PCM_OVERDRIVE // +19.8dBFS
            </div>
          </div>
        </section>

        {/* Bottom Irregular Diagnostic Readout */}
        <footer className="pb-4 flex items-end justify-between font-mono text-[10px] tracking-[0.25em] text-[#e0e0e0]/45 uppercase">
          <div>
            SYS_KERNEL: NT_DYWKSYCKS_BUILD_777 // CRT_SYNC: 59.94Hz_INTERLACED
          </div>
          <div className="text-[#d80027]/80">
            [DO_NOT_ADJUST_GAIN // PERMANENT_BUFFER_DAMAGE]
          </div>
        </footer>
      </main>

      {/* THE ONLY INTERACTIVE ELEMENT: The Trap / Exit Point */}
      <CrypticButton />
    </div>
  )
}
