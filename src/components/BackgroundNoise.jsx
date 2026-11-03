import React from 'react'

const ERROR_FRAGMENTS = [
  {
    id: 'err-1',
    code: 'STOP: 0x0000007E (0xC0000005, 0xF77392B4, 0xF78DA208, 0xF78D9F04)',
    label: 'SYSTEM_THREAD_EXCEPTION_NOT_HANDLED // NT_DYWKSYCKS.SYS',
    posClass: 'top-[7%] left-[3%]',
    color: 'text-[#d80027]',
    border: 'border-[#d80027]/40',
  },
  {
    id: 'err-2',
    code: '0x0000001A :: MEMORY_MANAGEMENT_FAULT',
    label: 'PAGE_FAULT_IN_NONPAGED_AREA [ADDR: 0xDEAD777E]',
    posClass: 'top-[14%] right-[4%]',
    color: 'text-[#39ff14]',
    border: 'border-[#39ff14]/35',
  },
  {
    id: 'err-3',
    code: '[CORRUPTED AUDIO BUFFER // 44.1kHz -> 4bit RAW_PCM]',
    label: 'RINGBUFFER_UNDERRUN :: AMEN_SHRED_OVERFLOW (+18.4dBFS CLIP)',
    posClass: 'bottom-[19%] left-[4%]',
    color: 'text-[#e0e0e0]',
    border: 'border-[#e0e0e0]/30',
  },
  {
    id: 'err-4',
    code: 'IRQ_NOT_LESS_OR_EQUAL // 0x0000000A',
    label: 'DSP_VOICE_ALLOCATION_COLLAPSE :: DUMPING PHYSICAL MEMORY',
    posClass: 'bottom-[11%] right-[5%]',
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
    posClass: 'top-[18%] left-[8%] -rotate-3',
    sizeClass: 'kanji-size-xl',
    colorClass: 'text-[#d80027]/15',
    fontClass: 'font-mincho',
  },
  {
    text: '脳内破壊 // 虚無',
    sub: 'AUDITORY_HEMORRHAGE',
    posClass: 'top-[54%] right-[6%] rotate-2',
    sizeClass: 'kanji-size-lg',
    colorClass: 'text-[#39ff14]/12',
    fontClass: 'font-gothic',
  },
  {
    text: '神経回路切断',
    sub: 'NEURAL_BUS_SEVERED',
    posClass: 'bottom-[24%] left-[36%] -rotate-1',
    sizeClass: 'kanji-size-md',
    colorClass: 'text-[#e0e0e0]/10',
    fontClass: 'font-mincho',
  },
  {
    text: '暴走噪音弐百八拾',
    sub: '280BPM_TERRORCORE_INDEX',
    posClass: 'top-[8%] left-[44%]',
    sizeClass: 'kanji-size-sm',
    colorClass: 'text-[#00f0ff]/10',
    fontClass: 'font-gothic',
  },
]

const HEX_DUMP_ROWS = [
  '0x0007E000: 4E 54 ▓▒ 44 59 57 4B 53 ░█',
  '0x0007E010: DE AD BE EF 00 7E FF 1A ▄▀',
  '0x0007E020: C0 00 00 05 F7 73 92 B4 ■□',
  '0x0007E030: 80 01 99 FF 3A 00 C0 13 ▓░',
  '0x0007E040: FF FF F8 00 00 00 00 7E █▒',
  '0x0007E050: 39 FF 14 D8 00 27 05 05 ☣✕',
  '0x0007E060: 7F 45 4C 46 02 01 01 00 ▒▓',
  '0x0007E070: 00 00 00 00 DEAD C0DE 7E ██',
]

const WAVEFORM_BARS = [
  0.35, 0.92, 0.48, 1.0, 0.22, 0.86, 0.95, 0.3,
  0.78, 1.0, 0.42, 0.88, 0.18, 0.96, 0.64, 1.0,
  0.28, 0.91, 0.52, 0.98, 0.36, 0.84, 1.0, 0.4,
  0.74, 0.94, 0.25, 1.0, 0.62, 0.89, 0.45, 0.97,
]

export default function BackgroundNoise() {
  return (
    <div
      className="background-noise-layer pointer-events-none absolute inset-0 overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* Layer 1: Pure CSS Orthogonal & Sub-Grid Wireframe */}
      <div className="wireframe-grid-bg absolute inset-0" />

      {/* Layer 2: Pure DOM Wireframe Axis Traces & Target Reticles (Zero SVG / Zero Canvas) */}
      <div className="absolute inset-0 opacity-35">
        {/* Horizontal & Vertical Brutalist Axis Slices */}
        <div className="absolute inset-x-0 top-[15%] h-px bg-[#d80027]/60" />
        <div className="absolute inset-x-0 bottom-[16%] h-px bg-[#39ff14]/50" />
        <div className="absolute inset-y-0 left-[19%] w-px bg-[#e0e0e0]/20" />
        <div className="absolute inset-y-0 right-[19%] w-px bg-[#e0e0e0]/20" />

        {/* Pure DOM Top-Left Target Reticle */}
        <div className="absolute top-[15%] left-[19%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-dashed border-[#d80027] flex items-center justify-center">
          <div className="w-7 h-7 border border-[#e0e0e0]/70" />
          <div className="absolute inset-x-[-14px] top-1/2 h-px bg-[#d80027]" />
          <div className="absolute inset-y-[-14px] left-1/2 w-px bg-[#d80027]" />
        </div>

        {/* Pure DOM Bottom-Right Target Reticle */}
        <div className="absolute bottom-[16%] right-[19%] translate-x-1/2 translate-y-1/2 w-16 h-16 border border-[#39ff14] flex items-center justify-center">
          <div className="w-4 h-4 bg-[#39ff14]/20 border border-[#39ff14]" />
          <div className="absolute inset-x-[-12px] top-1/2 h-px bg-[#39ff14]" />
          <div className="absolute inset-y-[-12px] left-1/2 w-px bg-[#39ff14]" />
        </div>

        {/* Pure DOM GPU-Composited Breakcore PCM Clipping Waveform Strip */}
        <div className="pcm-waveform-strip absolute inset-x-[8%] top-1/2 -translate-y-1/2 h-36 flex items-center justify-between gap-1 opacity-55">
          {WAVEFORM_BARS.map((peak, idx) => (
            <div
              key={idx}
              className={`pcm-bar flex-1 h-full ${
                idx % 3 === 0
                  ? 'bg-[#d80027]'
                  : idx % 5 === 0
                    ? 'bg-[#39ff14]'
                    : 'bg-[#e0e0e0]/50'
              }`}
              style={{
                '--bar-scale': peak,
                '--bar-delay': `${(idx % 7) * -0.18}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Layer 3: Distorted Overlapping Japanese Gothic / Mincho Characters with Chromatic Aberration */}
      {KANJI_GHOSTS.map((item, idx) => (
        <div
          key={idx}
          className={`kanji-ghost absolute leading-none tracking-tighter ${item.fontClass} ${item.posClass} ${item.sizeClass} ${item.colorClass}`}
        >
          <div className="chromatic-kanji-text" data-text={item.text}>
            {item.text}
          </div>
          <div className="text-[10px] font-mono tracking-[0.35em] text-[#e0e0e0]/25 mt-1">
            //{item.sub}
          </div>
        </div>
      ))}

      {/* Layer 4: Abstract ASCII Noise Blocks & GPU-Animated Hex Memory Dump */}
      <div className="hidden md:block absolute top-14 left-6 font-mono text-[10px] leading-[1.15] text-[#39ff14]/45 whitespace-pre">
        {ASCII_BLOCKS[0]}
      </div>

      <div className="hidden lg:block absolute top-28 right-8 font-mono text-[10px] leading-[1.15] text-[#e0e0e0]/35 whitespace-pre">
        {ASCII_BLOCKS[1]}
      </div>

      <div className="hidden md:block absolute bottom-24 right-12 font-mono text-[10px] leading-[1.15] text-[#d80027]/50 whitespace-pre">
        {ASCII_BLOCKS[2]}
      </div>

      {/* Pure CSS Flickering Hex Memory Dump Strip on Left Edge */}
      <div className="hidden sm:flex flex-col absolute top-1/3 left-3 font-mono text-[10px] leading-tight text-[#00f0ff]/35">
        <span className="text-[#d80027]/75 font-bold mb-1">
          [RAW_CORE_DUMP // 0x0000007E]
        </span>
        {HEX_DUMP_ROWS.map((row, idx) => (
          <span
            key={row}
            className={`tracking-wider ${idx % 2 === 0 ? 'hex-row-glitch-a' : 'hex-row-glitch-b'}`}
          >
            {row}
          </span>
        ))}
      </div>

      {/* Layer 5: Raw System Error Fragments (Isolated Paint Containment) */}
      {ERROR_FRAGMENTS.map((frag) => (
        <div
          key={frag.id}
          className={`system-error-box absolute px-2.5 py-1.5 bg-[#050505]/90 border ${frag.border} ${frag.posClass} font-mono text-[10px] sm:text-[11px] max-w-[290px] sm:max-w-none`}
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

      {/* Layer 6: Top & Bottom GPU-Composited Marquee Telemetry Strips */}
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
