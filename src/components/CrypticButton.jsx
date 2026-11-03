import React, { useCallback, useEffect, useRef, useState } from 'react'

export const TARGET_YOUTUBE_URL = 'https://www.youtube.com/@NT_DYWKSYCKS'

// Singleton AudioContext + cooldown guard prevents hardware context exhaustion & hover-jitter audio spam
let sharedAudioCtx = null
let lastBurstTimestamp = 0
const AUDIO_COOLDOWN_MS = 120

function triggerGlitchBurstSound() {
  const nowMs = typeof performance !== 'undefined' ? performance.now() : Date.now()
  if (nowMs - lastBurstTimestamp < AUDIO_COOLDOWN_MS) return
  lastBurstTimestamp = nowMs

  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
      sharedAudioCtx = new AudioCtx()
    }
    const ctx = sharedAudioCtx
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
      if (ctx.state === 'suspended') return
    }

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(92, now)
    osc.frequency.exponentialRampToValueAtTime(1480, now + 0.035)
    osc.frequency.setValueAtTime(55, now + 0.04)

    gain.gain.setValueAtTime(0.035, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.07)
    osc.onended = () => {
      osc.disconnect()
      gain.disconnect()
    }
  } catch {
    // Silent fallback if browser blocks Web Audio prior to user gesture
  }
}

const SAFE_MARGIN_X = 14
const SAFE_MARGIN_TOP = 32
const SAFE_MARGIN_BOTTOM = 32

function computeBoundedCoords(seed, btnWidth = 320, btnHeight = 122) {
  if (typeof window === 'undefined') {
    return { x: 24, y: 380, tilt: -1.4 }
  }
  const vw = window.visualViewport?.width || window.innerWidth
  const vh = window.visualViewport?.height || window.innerHeight
  const isNarrow = vw < 640

  const desiredLeftRatio = isNarrow ? 0.04 + seed.rx * 0.04 : 0.19 + seed.rx * 0.12
  const desiredTopRatio = isNarrow ? 0.58 + seed.ry * 0.08 : 0.64 + seed.ry * 0.08

  const maxX = Math.max(SAFE_MARGIN_X, vw - btnWidth - SAFE_MARGIN_X)
  const maxY = Math.max(SAFE_MARGIN_TOP, vh - btnHeight - SAFE_MARGIN_BOTTOM)

  return {
    x: Math.round(Math.min(maxX, Math.max(SAFE_MARGIN_X, vw * desiredLeftRatio))),
    y: Math.round(Math.min(maxY, Math.max(SAFE_MARGIN_TOP, vh * desiredTopRatio))),
    tilt: seed.tilt,
  }
}

export default function CrypticButton({ url = TARGET_YOUTUBE_URL }) {
  const buttonRef = useRef(null)
  const sizeRef = useRef({ width: 320, height: 122 })
  const rafIdRef = useRef(0)

  const [seed] = useState(() => ({
    rx: Math.random(),
    ry: Math.random(),
    tilt: Number((Math.random() * 2.8 - 1.4).toFixed(2)),
  }))

  // Lazy initializer computes exact bounded coordinates on first render (zero CLS jump)
  const [coords, setCoords] = useState(() => computeBoundedCoords(seed))

  const updateCoordsFromCachedSize = useCallback(() => {
    const { width, height } = sizeRef.current
    setCoords((prev) => {
      const next = computeBoundedCoords(seed, width, height)
      if (prev.x === next.x && prev.y === next.y && prev.tilt === next.tilt) {
        return prev
      }
      return next
    })
  }, [seed])

  const scheduleViewportClamp = useCallback(() => {
    if (rafIdRef.current) return
    rafIdRef.current = window.requestAnimationFrame(() => {
      rafIdRef.current = 0
      updateCoordsFromCachedSize()
    })
  }, [updateCoordsFromCachedSize])

  useEffect(() => {
    const el = buttonRef.current
    if (el) {
      sizeRef.current = {
        width: el.offsetWidth || 320,
        height: el.offsetHeight || 122,
      }
      updateCoordsFromCachedSize()
    }

    window.addEventListener('resize', scheduleViewportClamp, { passive: true })
    window.visualViewport?.addEventListener('resize', scheduleViewportClamp, { passive: true })

    let ro = null
    if (typeof ResizeObserver !== 'undefined' && el) {
      ro = new ResizeObserver((entries) => {
        const entry = entries[0]
        if (!entry) return
        const borderBox = entry.borderBoxSize?.[0]
        sizeRef.current = {
          width: borderBox ? borderBox.inlineSize : entry.contentRect.width,
          height: borderBox ? borderBox.blockSize : entry.contentRect.height,
        }
        scheduleViewportClamp()
      })
      ro.observe(el)
    }

    return () => {
      window.removeEventListener('resize', scheduleViewportClamp)
      window.visualViewport?.removeEventListener('resize', scheduleViewportClamp)
      ro?.disconnect()
      if (rafIdRef.current) {
        window.cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = 0
      }
    }
  }, [scheduleViewportClamp, updateCoordsFromCachedSize])

  const handlePointerEnter = (e) => {
    if (e.pointerType === 'mouse') {
      triggerGlitchBurstSound()
    }
  }

  return (
    <div
      onPointerEnter={handlePointerEnter}
      className="cryptic-trap-anchor absolute top-0 left-0 z-40"
      style={{
        translate: `${coords.x}px ${coords.y}px 0`,
        '--trap-tilt': `${coords.tilt}deg`,
      }}
    >
      <a
        ref={buttonRef}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={triggerGlitchBurstSound}
        aria-label="External signal detected: open NT DYWKSYCKS YouTube channel in new tab"
        className="cryptic-trap-button inline-block text-left font-mono cursor-crosshair"
      >
        {/* Top X11 / Win98 Brutalist Fault Header Bar */}
        <div className="trap-titlebar flex items-center justify-between px-2 py-0.5 bg-[#d80027] text-[#050505] text-[10px] font-bold tracking-widest border-b border-[#050505]">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 bg-[#050505]" />
            <span>SYS_FAULT // 0x0000007E</span>
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
              <div
                className="trap-glitch-headline text-[11px] sm:text-xs font-bold tracking-wider uppercase leading-snug"
                data-text="[ERROR: EXTERNAL SIGNAL DETECTED - CLICK TO PURGE]"
              >
                [ERROR: EXTERNAL SIGNAL DETECTED - CLICK TO PURGE]
              </div>
              <div className="text-[10px] opacity-80 tracking-widest">
                TARGET_URI :: YOUTUBE.COM/@NT_DYWKSYCKS
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
      </a>
    </div>
  )
}
