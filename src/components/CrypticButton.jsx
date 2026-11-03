import React, { useEffect, useState } from 'react'

export const TARGET_YOUTUBE_URL = 'https://www.youtube.com/@NTDYWKSYCKS'

function triggerGlitchBurstSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(92, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(1480, ctx.currentTime + 0.035)
    osc.frequency.setValueAtTime(55, ctx.currentTime + 0.04)

    gain.gain.setValueAtTime(0.035, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.065)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.07)
    osc.onended = () => ctx.close().catch(() => {})
  } catch {
    // Silent fallback if browser blocks Web Audio prior to user gesture
  }
}

export default function CrypticButton({ url = TARGET_YOUTUBE_URL }) {
  // Default to the prompt's signature non-standard coordinate (top: 68%, left: 23%)
  // with subtle semi-random micro-variance calculated on mount
  const [coords, setCoords] = useState({ top: 68, left: 23, tilt: -1.4 })
  const [isHovered, setIsHovered] = useState(false)
  const [hexAddr, setHexAddr] = useState('0x0000007E')

  useEffect(() => {
    // Semi-chaotic offset around top: 68%, left: 23% while staying safe on smaller viewports
    const isNarrow = window.innerWidth < 640
    const baseTop = isNarrow ? 64 : 68
    const baseLeft = isNarrow ? 8 : 23
    const deltaTop = (Math.random() * 8 - 4).toFixed(2)
    const deltaLeft = (Math.random() * (isNarrow ? 6 : 12) - (isNarrow ? 2 : 4)).toFixed(2)
    const tiltAngle = (Math.random() * 3.2 - 1.6).toFixed(2)

    setCoords({
      top: Math.min(76, Math.max(54, Number(baseTop) + Number(deltaTop))),
      left: Math.min(isNarrow ? 14 : 58, Math.max(4, Number(baseLeft) + Number(deltaLeft))),
      tilt: Number(tiltAngle),
    })
  }, [])

  useEffect(() => {
    if (!isHovered) return
    const timer = setInterval(() => {
      const randHex = Math.floor(Math.random() * 0xffffffff)
        .toString(16)
        .toUpperCase()
        .padStart(8, '0')
      setHexAddr(`0x${randHex}`)
    }, 90)
    return () => clearInterval(timer)
  }, [isHovered])

  const handlePurgeClick = () => {
    triggerGlitchBurstSound()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className="cryptic-trap-anchor absolute z-40"
      style={{
        top: `${coords.top}%`,
        left: `${coords.left}%`,
        '--trap-tilt': `${coords.tilt}deg`,
      }}
    >
      <button
        type="button"
        onClick={handlePurgeClick}
        onMouseEnter={() => {
          setIsHovered(true)
          triggerGlitchBurstSound()
        }}
        onMouseLeave={() => {
          setIsHovered(false)
          setHexAddr('0x0000007E')
        }}
        aria-label="External signal detected: open NT DYWKSYCKS YouTube channel in new tab"
        className="cryptic-trap-button group text-left font-mono cursor-crosshair focus:outline-none"
      >
        {/* Top X11 / Win98 Brutalist Fault Header Bar */}
        <div className="trap-titlebar flex items-center justify-between px-2 py-0.5 bg-[#d80027] text-[#050505] text-[10px] font-bold tracking-widest border-b border-[#050505]">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 bg-[#050505]" />
            <span>SYS_FAULT // {hexAddr}</span>
          </span>
          <span className="px-1 bg-[#c0c0c0] text-[#050505] border border-[#050505] leading-none">
            [X]
          </span>
        </div>

        {/* Main Raw Bevel Body */}
        <div className="trap-body px-3 py-2.5 sm:px-3.5 sm:py-3">
          <div className="flex items-start gap-2.5">
            {/* Harsh ASCII Hazard Marker */}
            <div
              className="trap-hazard-glyph shrink-0 px-1.5 py-0.5 border border-current text-xs font-bold leading-tight"
              aria-hidden="true"
            >
              [!]
              <br />
              ERR
            </div>

            <div className="space-y-1">
              <div className="text-[11px] sm:text-xs font-bold tracking-wider uppercase leading-snug">
                [ERROR: EXTERNAL SIGNAL DETECTED - CLICK TO PURGE]
              </div>
              <div className="text-[10px] opacity-80 tracking-widest">
                TARGET_URI :: YOUTUBE.COM/@NTDYWKSYCKS
              </div>
              <div className="trap-prompt-line pt-1 flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#39ff14]">
                <span>&gt; [ENTER_TERMINAL_FEED]</span>
                <span className="trap-cursor inline-block w-2 h-3.5 bg-current" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="trap-statusbar flex items-center justify-between px-2 py-0.5 text-[9px] tracking-widest border-t border-current/30 opacity-85">
          <span>PID: 0x7E_AUDIO_STREAM</span>
          <span>[EXEC: _BLANK]</span>
        </div>
      </button>
    </div>
  )
}

