import React, { useEffect, useState } from 'react'

const ERROR_FRAGMENTS = [
  {
    id: 'err-1',
    code: 'STOP: 0x0000007E (0xC0000005, 0xF77392B4, 0xF78DA208, 0xF78D9F04)',
    label: 'SYSTEM_THREAD_EXCEPTION_NOT_HANDLED // NT_DYWKSYCKS.SYS',
    top: '7%',
    left: '3%',
    color: 'text-[#d80027]',
    border: 'border-[#d80027]/40',
  },
  {
    id: 'err-2',
    code: '0x0000001A :: MEMORY_MANAGEMENT_FAULT',
    label: 'PAGE_FAULT_IN_NONPAGED_AREA [ADDR: 0xDEAD777E]',
    top: '14%',
    right: '4%',
    color: 'text-[#39ff14]',
    border: 'border-[#39ff14]/35',
  },
  {
    id: 'err-3',
    code: '[CORRUPTED AUDIO BUFFER // 44.1kHz -> 4bit RAW_PCM]',
    label: 'RINGBUFFER_UNDERRUN :: AMEN_SHRED_OVERFLOW (+18.4dBFS CLIP)',
    bottom: '19%',
    left: '4%',
    color: 'text-[#e0e0e0]',
    border: 'border-[#e0e0e0]/30',
  },
  {
    id: 'err-4',
    code: 'IRQ_NOT_LESS_OR_EQUAL // 0x0000000A',
    label: 'DSP_VOICE_ALLOCATION_COLLAPSE :: DUMPING PHYSICAL MEMORY',
    bottom: '11%',
    right: '5%',
    color: 'text-[#00f0ff]',
    border: 'border-[#00f0ff]/35',
  },
]

const ASCII_BLOCKS = [
  `╔══════════════════════════════════════╗
║ ▓▒░ 0x0000007E // DUMP_STREAM_00 ░▒▓ ║
╠══════════════════════════════════════╣
║ 0040: 4E 54 20 44 59 57 4B 53  NT DYWKS║
║ 0048: 59 43 4B 53 00 FF 7E 00  YCKS..~.║
║ 0050: DE AD BE EF 00 00 7E F0  ......~.║
║ 0058: 80 01 99 FF 3A 00 C0 13  ....:...║
╚══════════════════════════════════════╝`,
  `[SYS_TRACE // 275.0_BPM_CLOCK_DESYNC]
█▀▀█ █▀▄▀█ █▀▀ █▀▀▄   █▀▀█ █░░ █▀▄▀█
█▄▄█ █░▀░█ █▀▀ █░░█   █░░█ █░░ █░▀░█
▀░░▀ ▀░░░▀ ▀▀▀ ▀░░▀   ▀▀▀▀ ▀▀▀ ▀░░░▀
░░▒▒▓▓██ [BUFFER_LACERATION] ██▓▓▒▒░░
>> SIGSEGV (11) @ 0x00007FFF9A01B4C0`,
  `┌──────────────────────────────────┐
│ ▒▒▓██ KERNEL_PANIC_DUMP ██▓▒▒    │
│ PID: 0000  TASK: NTDYWKSYCKS_DSP │
│ CR2: 000000000000007E            │
│ DR0: 0000000000000000            │
│ [!] MASTER BUS LIMITER DESTROYED │
│ [!] +32.9dB THERMAL FEEDBACK     │
└──────────────────────────────────┘`,
]

const KANJI_GHOSTS = [
  {
    text: '信号喪失',
    sub: 'SIGNAL_EXTINCTION',
    top: '18%',
    left: '8%',
    size: 'clamp(3.2rem, 8vw, 7.5rem)',
    color: 'rgba(216, 0, 39, 0.16)',
    rotate: '-4deg',
    font: 'mincho',
  },
  {
    text: '脳内破壊 // 虚無',
    sub: 'AUDITORY_HEMORRHAGE',
    top: '54%',
    right: '6%',
    size: 'clamp(2.5rem, 6.5vw, 6rem)',
    color: 'rgba(57, 255, 20, 0.12)',
    rotate: '2.5deg',
    font: 'gothic',
  },
  {
    text: '神経回路切断',
    sub: 'NEURAL_BUS_SEVERED',
    bottom: '24%',
    left: '36%',
    size: 'clamp(2.2rem, 5.5vw, 5.2rem)',
    color: 'rgba(224, 224, 224, 0.08)',
    rotate: '-1.5deg',
    font: 'mincho',
  },
  {
    text: '暴走噪音弐百八拾',
    sub: '280BPM_TERRORCORE_INDEX',
    top: '8%',
    left: '44%',
    size: 'clamp(1.8rem, 4vw, 3.8rem)',
    color: 'rgba(0, 240, 255, 0.1)',
    rotate: '0deg',
    font: 'gothic',
  },
]

const HEX_GLYPHS = '0123456789ABCDEF▓▒░█▄▀■□∷☣✕'

function generateCorruptedHexRow(seed) {
  let out = `0x000${(seed * 4096).toString(16).toUpperCase().slice(0, 4)}: `
  for (let i = 0; i < 18; i++) {
    const idx = (seed * 17 + i * 31) % HEX_GLYPHS.length
    out += HEX_GLYPHS[idx]
    if (i % 2 === 1) out += ' '
  }
  return out
}

export default function BackgroundNoise() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    // Low-frequency tick (2.5 Hz) to stay safely below the 3Hz photosensitivity threshold
    const interval = setInterval(() => {
      setTick((prev) => (prev + 1) % 256)
    }, 420)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* Layer 1: Perspective & Orthogonal Brutalist Wireframe Grid */}
      <div className="wireframe-grid-bg absolute inset-0" />

      {/* Layer 2: SVG Technical Crosshairs, Radar Traces & Clipped Audio Waveform */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        {/* Diagonal brutalist vector slice lines */}
        <line x1="0" y1="140" x2="1440" y2="140" stroke="#d80027" strokeWidth="0.75" strokeDasharray="8 6" />
        <line x1="0" y1="760" x2="1440" y2="760" stroke="#39ff14" strokeWidth="0.75" strokeDasharray="3 9" />
        <line x1="280" y1="0" x2="280" y2="900" stroke="#e0e0e0" strokeWidth="0.5" strokeOpacity="0.25" />
        <line x1="1160" y1="0" x2="1160" y2="900" stroke="#e0e0e0" strokeWidth="0.5" strokeOpacity="0.25" />
        <line x1="0" y1="900" x2="1440" y2="0" stroke="#d80027" strokeWidth="0.5" strokeOpacity="0.22" />

        {/* Target Reticle Top-Left */}
        <g transform="translate(280, 140)">
          <circle cx="0" cy="0" r="42" fill="none" stroke="#d80027" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="0" cy="0" r="14" fill="none" stroke="#e0e0e0" strokeWidth="0.75" />
          <line x1="-58" y1="0" x2="58" y2="0" stroke="#d80027" strokeWidth="1" />
          <line x1="0" y1="-58" x2="0" y2="58" stroke="#d80027" strokeWidth="1" />
        </g>

        {/* Target Reticle Bottom-Right */}
        <g transform="translate(1160, 760)">
          <rect x="-36" y="-36" width="72" height="72" fill="none" stroke="#39ff14" strokeWidth="1" />
          <line x1="-52" y1="0" x2="52" y2="0" stroke="#39ff14" strokeWidth="0.8" />
          <line x1="0" y1="-52" x2="0" y2="52" stroke="#39ff14" strokeWidth="0.8" />
        </g>

        {/* Harsh Clipped Breakcore / Noise Oscilloscope Trace */}
        <polyline
          fill="none"
          stroke="#d80027"
          strokeWidth="1.4"
          strokeOpacity="0.55"
          points={Array.from({ length: 72 }, (_, idx) => {
            const x = idx * 20
            const spike = ((idx * 13 + tick * 7) % 19) - 9
            const y = 450 + (idx % 3 === 0 ? spike * 18 : spike * 4)
            return `${x},${Math.max(310, Math.min(590, y))}`
          }).join(' ')}
        />
      </svg>

      {/* Layer 3: Distorted Overlapping Japanese Gothic / Mincho Characters */}
      {KANJI_GHOSTS.map((item, idx) => (
        <div
          key={idx}
          className={`kanji-ghost absolute leading-none tracking-tighter ${
            item.font === 'mincho' ? 'font-mincho' : 'font-gothic'
          }`}
          style={{
            top: item.top,
            bottom: item.bottom,
            left: item.left,
            right: item.right,
            fontSize: item.size,
            color: item.color,
            rotate: item.rotate,
          }}
        >
          <div className="glitch-kanji-text">{item.text}</div>
          <div className="text-[10px] font-mono tracking-[0.35em] text-[#e0e0e0]/25 mt-1">
            //{item.sub}
          </div>
        </div>
      ))}

      {/* Layer 4: Abstract ASCII Noise Blocks & Mutating Memory Columns */}
      <div className="hidden md:block absolute top-14 left-6 font-mono text-[10px] leading-[1.15] text-[#39ff14]/45 whitespace-pre">
        {ASCII_BLOCKS[0]}
      </div>

      <div className="hidden lg:block absolute top-28 right-8 font-mono text-[10px] leading-[1.15] text-[#e0e0e0]/35 whitespace-pre">
        {ASCII_BLOCKS[1]}
      </div>

      <div className="hidden md:block absolute bottom-24 right-12 font-mono text-[10px] leading-[1.15] text-[#d80027]/50 whitespace-pre">
        {ASCII_BLOCKS[2]}
      </div>

      {/* Live Mutating Hex Memory Dump Strip on Left Edge */}
      <div className="hidden sm:flex flex-col absolute top-1/3 left-3 font-mono text-[10px] leading-tight text-[#00f0ff]/35">
        <span className="text-[#d80027]/70 font-bold mb-1">
          [RAW_CORE_DUMP // 0x{(tick + 0x7e00).toString(16).toUpperCase()}]
        </span>
        {Array.from({ length: 8 }, (_, row) => (
          <span key={row} className="tracking-wider">
            {generateCorruptedHexRow(tick + row * 3)}
          </span>
        ))}
      </div>

      {/* Layer 5: Raw System Error Fragments */}
      {ERROR_FRAGMENTS.map((frag) => (
        <div
          key={frag.id}
          className={`system-error-box absolute px-2.5 py-1.5 bg-[#050505]/90 border ${frag.border} font-mono text-[10px] sm:text-[11px] max-w-[290px] sm:max-w-none`}
          style={{
            top: frag.top,
            bottom: frag.bottom,
            left: frag.left,
            right: frag.right,
          }}
        >
          <div className={`font-bold tracking-wider ${frag.color} flex items-center gap-1.5`}>
            <span className="inline-block w-1.5 h-1.5 bg-current animate-pulse" />
            <span>{frag.code}</span>
          </div>
          <div className="text-[#e0e0e0]/65 text-[9px] sm:text-[10px] tracking-widest mt-0.5">
            {frag.label}
          </div>
        </div>
      ))}

      {/* Layer 6: Top & Bottom Harsh Marquee Telemetry Strips */}
      <div className="marquee-strip marquee-top absolute top-0 inset-x-0 h-6 bg-[#d80027] text-[#050505] font-mono text-[11px] font-bold flex items-center overflow-hidden border-b border-[#e0e0e0]/40">
        <div className="marquee-track marquee-fast whitespace-nowrap">
          <span>
            /// NT DYWKSYCKS /// 0x0000007E /// [CORRUPTED AUDIO BUFFER] /// MEMORY_MANAGEMENT_FAULT ///
            BREAKCORE_VIVISECTION_280BPM /// NO_COMMERCIAL_PAYLOAD /// SIGNAL_DECAY_100% /// FATAL_EXCEPTION_0E ///
            NT DYWKSYCKS /// 0x0000007E /// [CORRUPTED AUDIO BUFFER] /// MEMORY_MANAGEMENT_FAULT ///
            BREAKCORE_VIVISECTION_280BPM /// NO_COMMERCIAL_PAYLOAD /// SIGNAL_DECAY_100% /// FATAL_EXCEPTION_0E ///
          </span>
        </div>
      </div>

      <div className="marquee-strip marquee-bottom absolute bottom-0 inset-x-0 h-6 bg-[#050505] text-[#39ff14] font-mono text-[11px] flex items-center overflow-hidden border-t border-[#39ff14]/45">
        <div className="marquee-track marquee-reverse whitespace-nowrap">
          <span>
            [TRACK_DUMP: 01_amen_shredder_0x7E.raw] // [02_sub_bass_hemorrhage_265bpm.wav] // [03_null_pointer_gabber_kick.flac] //
            [WARNING: EXTERNAL_SIGNAL_LOCKED_ON_PORT_666] // [PCM_OVERFLOW_DETECTED] // [信号喪失 // 脳内汚染] //
            [TRACK_DUMP: 01_amen_shredder_0x7E.raw] // [02_sub_bass_hemorrhage_265bpm.wav] // [03_null_pointer_gabber_kick.flac] //
            [WARNING: EXTERNAL_SIGNAL_LOCKED_ON_PORT_666] // [PCM_OVERFLOW_DETECTED] // [信号喪失 // 脳内汚染] //
          </span>
        </div>
      </div>
    </div>
  )
}

