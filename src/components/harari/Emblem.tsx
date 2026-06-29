'use client'

// Harari PCC Portal — Emblem & Loader
// Inspired by traditional Ethiopian institutional emblems (dove, balance scale,
// castle, sun, gear, branches) and reimagined with the portal's Harari color
// palette: royal purple, gold, terracotta, cream, and Islamic green.

// Round to 4 decimal places to avoid hydration mismatches between
// Node.js (server) and the browser (client) due to floating-point
// serialization differences in Math.cos / Math.sin results.
const r4 = (n: number) => Math.round(n * 10000) / 10000

interface EmblemProps {
  size?: number
  className?: string
  /** Show "Harari PCC Portal" wordmark below the emblem */
  withWordmark?: boolean
}

// ============================================================
// STATIC EMBLEM — for logos, headers, certificates
// ============================================================
export function HarariEmblem({ size = 96, className = '', withWordmark = false }: EmblemProps) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Harari PCC Portal emblem"
      >
        <defs>
          <linearGradient id="emb-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5B2A86" />
            <stop offset="100%" stopColor="#1E3A5F" />
          </linearGradient>
          <linearGradient id="emb-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F4D061" />
            <stop offset="100%" stopColor="#D4A537" />
          </linearGradient>
          <linearGradient id="emb-green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3D9B72" />
            <stop offset="100%" stopColor="#2E7A5A" />
          </linearGradient>
        </defs>

        {/* Outer gear teeth (12 teeth) */}
        <g fill="url(#emb-gold)">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30) - 90
            const rad = (angle * Math.PI) / 180
            const cx = r4(100 + Math.cos(rad) * 92)
            const cy = r4(100 + Math.sin(rad) * 92)
            return (
              <rect
                key={i}
                x={r4(cx - 4)}
                y={r4(cy - 8)}
                width={8}
                height={16}
                rx={2}
                transform={`rotate(${angle + 90} ${cx} ${cy})`}
              />
            )
          })}
        </g>

        {/* Outer ring */}
        <circle cx="100" cy="100" r="84" fill="url(#emb-bg)" stroke="#D4A537" strokeWidth="2" />
        <circle cx="100" cy="100" r="78" fill="none" stroke="#FBF3E2" strokeWidth="1" opacity="0.4" />

        {/* Decorative dot ring */}
        <g fill="#D4A537" opacity="0.5">
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15) * Math.PI / 180
            return (
              <circle
                key={i}
                cx={r4(100 + Math.cos(angle) * 74)}
                cy={r4(100 + Math.sin(angle) * 74)}
                r={1.2}
              />
            )
          })}
        </g>

        {/* 8-pointed star at top (Harari motif) */}
        <g transform="translate(100, 42)">
          <path
            d="M0,-18 L5,-6 L18,-6 L8,3 L13,15 L0,8 L-13,15 L-8,3 L-18,-6 L-5,-6 Z"
            fill="url(#emb-gold)"
            stroke="#B5471A"
            strokeWidth="0.5"
          />
          <circle r="3" fill="#5B2A86" />
        </g>

        {/* Balance scale (justice) — middle section */}
        <g transform="translate(100, 78)">
          {/* Vertical post */}
          <rect x="-1.5" y="-8" width="3" height="22" fill="#FBF3E2" />
          {/* Horizontal beam */}
          <rect x="-22" y="-10" width="44" height="3" rx="1" fill="#FBF3E2" />
          {/* Left pan strings */}
          <line x1="-20" y1="-7" x2="-20" y2="0" stroke="#FBF3E2" strokeWidth="0.8" />
          <line x1="-14" y1="-7" x2="-14" y2="0" stroke="#FBF3E2" strokeWidth="0.8" />
          {/* Left pan */}
          <path d="M-24,0 Q-20,5 -16,0 Z" fill="#B5471A" />
          <path d="M-24,0 L-16,0" stroke="#FBF3E2" strokeWidth="0.8" />
          {/* Right pan strings */}
          <line x1="14" y1="-7" x2="14" y2="0" stroke="#FBF3E2" strokeWidth="0.8" />
          <line x1="20" y1="-7" x2="20" y2="0" stroke="#FBF3E2" strokeWidth="0.8" />
          {/* Right pan */}
          <path d="M12,0 Q16,5 20,0 Z" fill="#B5471A" />
          <path d="M12,0 L20,0" stroke="#FBF3E2" strokeWidth="0.8" />
          {/* Top knob */}
          <circle cx="0" cy="-10" r="2" fill="#D4A537" />
        </g>

        {/* Sun rays above castle */}
        <g transform="translate(100, 108)">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30) - 90
            const rad = (angle * Math.PI) / 180
            return (
              <line
                key={i}
                x1={r4(Math.cos(rad) * 6)}
                y1={r4(Math.sin(rad) * 6)}
                x2={r4(Math.cos(rad) * 10)}
                y2={r4(Math.sin(rad) * 10)}
                stroke="#D4A537"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            )
          })}
          <circle r="4" fill="#D4A537" />
        </g>

        {/* Castle / Harar Jugol wall (heritage) — bottom */}
        <g transform="translate(100, 138)">
          {/* Crenellated wall */}
          <path
            d="M-26,0 L-26,-6 L-22,-6 L-22,-2 L-18,-2 L-18,-6 L-14,-6 L-14,-2 L-10,-2 L-10,-6 L-6,-6 L-6,-2 L-2,-2 L-2,-6 L2,-6 L2,-2 L6,-2 L6,-6 L10,-6 L10,-2 L14,-2 L14,-6 L18,-6 L18,-2 L22,-2 L22,-6 L26,-6 L26,0 Z"
            fill="#FBF3E2"
          />
          {/* Wall body */}
          <rect x="-26" y="0" width="52" height="10" fill="#FBF3E2" />
          {/* Arched gateway (Harar Jugol gate) */}
          <path d="M-4,10 L-4,3 Q0,-2 4,3 L4,10 Z" fill="#1E3A5F" />
          {/* Wall base */}
          <rect x="-28" y="10" width="56" height="2" fill="#D4A537" />
        </g>

        {/* Branches on either side */}
        <g fill="url(#emb-green)">
          {/* Left branch */}
          <g transform="translate(40, 110) rotate(-20)">
            <path d="M0,0 Q-3,-8 0,-16 Q3,-8 0,0" />
            <ellipse cx="-4" cy="-4" rx="3" ry="2" transform="rotate(-30 -4 -4)" />
            <ellipse cx="4" cy="-12" rx="3" ry="2" transform="rotate(30 4 -12)" />
          </g>
          {/* Right branch */}
          <g transform="translate(160, 110) rotate(20)">
            <path d="M0,0 Q3,-8 0,-16 Q-3,-8 0,0" />
            <ellipse cx="4" cy="-4" rx="3" ry="2" transform="rotate(30 4 -4)" />
            <ellipse cx="-4" cy="-12" rx="3" ry="2" transform="rotate(-30 -4 -12)" />
          </g>
        </g>

        {/* Small berries on branches */}
        <g fill="#B5471A">
          <circle cx="36" cy="98" r="1.5" />
          <circle cx="164" cy="98" r="1.5" />
        </g>
      </svg>

      {withWordmark && (
        <div className="mt-2 text-center">
          <p
            className="font-bold tracking-tight text-[#1E3A5F] leading-tight"
            style={{ fontWeight: 600, fontSize: size * 0.18 }}
          >
            Harari PCC Portal
          </p>
          <p className="text-[#6B5B73] leading-tight" style={{ fontSize: size * 0.09 }}>
            Professional Competence Certificate
          </p>
        </div>
      )}
    </div>
  )
}

// ============================================================
// ANIMATED LOADER — for loading states
// ============================================================
interface LoaderProps {
  size?: number
  label?: string
  className?: string
}

export function HarariLoader({ size = 120, label = 'Loading', className = '' }: LoaderProps) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Loading"
      >
        <defs>
          <linearGradient id="ld-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5B2A86" />
            <stop offset="100%" stopColor="#1E3A5F" />
          </linearGradient>
          <linearGradient id="ld-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F4D061" />
            <stop offset="100%" stopColor="#D4A537" />
          </linearGradient>
          <linearGradient id="ld-green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3D9B72" />
            <stop offset="100%" stopColor="#2E7A5A" />
          </linearGradient>
        </defs>

        {/* Rotating outer gear teeth — animated */}
        <g fill="url(#ld-gold)" style={{ transformOrigin: '100px 100px', animation: 'harari-spin 8s linear infinite' }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30) - 90
            const rad = (angle * Math.PI) / 180
            const cx = r4(100 + Math.cos(rad) * 92)
            const cy = r4(100 + Math.sin(rad) * 92)
            return (
              <rect
                key={i}
                x={r4(cx - 4)}
                y={r4(cy - 8)}
                width={8}
                height={16}
                rx={2}
                transform={`rotate(${angle + 90} ${cx} ${cy})`}
              />
            )
          })}
        </g>

        {/* Static outer ring */}
        <circle cx="100" cy="100" r="84" fill="url(#ld-bg)" stroke="#D4A537" strokeWidth="2" />

        {/* Animated progress arc — fills as the page loads */}
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke="#D4A537"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="490"
          strokeDashoffset="490"
          transform="rotate(-90 100 100)"
          style={{ animation: 'harari-progress 2s ease-in-out infinite' }}
        />

        {/* 8-pointed star — pulses gently */}
        <g
          transform="translate(100, 42)"
          style={{ transformOrigin: '100px 42px', animation: 'harari-pulse 1.8s ease-in-out infinite' }}
        >
          <path
            d="M0,-18 L5,-6 L18,-6 L8,3 L13,15 L0,8 L-13,15 L-8,3 L-18,-6 L-5,-6 Z"
            fill="url(#ld-gold)"
          />
          <circle r="3" fill="#5B2A86" />
        </g>

        {/* Balance scale (static) */}
        <g transform="translate(100, 78)">
          <rect x="-1.5" y="-8" width="3" height="22" fill="#FBF3E2" />
          <rect x="-22" y="-10" width="44" height="3" rx="1" fill="#FBF3E2" />
          <line x1="-20" y1="-7" x2="-20" y2="0" stroke="#FBF3E2" strokeWidth="0.8" />
          <line x1="-14" y1="-7" x2="-14" y2="0" stroke="#FBF3E2" strokeWidth="0.8" />
          <path d="M-24,0 Q-20,5 -16,0 Z" fill="#B5471A" />
          <path d="M-24,0 L-16,0" stroke="#FBF3E2" strokeWidth="0.8" />
          <line x1="14" y1="-7" x2="14" y2="0" stroke="#FBF3E2" strokeWidth="0.8" />
          <line x1="20" y1="-7" x2="20" y2="0" stroke="#FBF3E2" strokeWidth="0.8" />
          <path d="M12,0 Q16,5 20,0 Z" fill="#B5471A" />
          <path d="M12,0 L20,0" stroke="#FBF3E2" strokeWidth="0.8" />
          <circle cx="0" cy="-10" r="2" fill="#D4A537" />
        </g>

        {/* Sun rays — rotates */}
        <g
          transform="translate(100, 108)"
          style={{ transformOrigin: '100px 108px', animation: 'harari-spin 6s linear infinite' }}
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30) - 90
            const rad = (angle * Math.PI) / 180
            return (
              <line
                key={i}
                x1={r4(Math.cos(rad) * 6)}
                y1={r4(Math.sin(rad) * 6)}
                x2={r4(Math.cos(rad) * 10)}
                y2={r4(Math.sin(rad) * 10)}
                stroke="#D4A537"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            )
          })}
          <circle r="4" fill="#D4A537" />
        </g>

        {/* Castle / Harar Jugol wall (static) */}
        <g transform="translate(100, 138)">
          <path
            d="M-26,0 L-26,-6 L-22,-6 L-22,-2 L-18,-2 L-18,-6 L-14,-6 L-14,-2 L-10,-2 L-10,-6 L-6,-6 L-6,-2 L-2,-2 L-2,-6 L2,-6 L2,-2 L6,-2 L6,-6 L10,-6 L10,-2 L14,-2 L14,-6 L18,-6 L18,-2 L22,-2 L22,-6 L26,-6 L26,0 Z"
            fill="#FBF3E2"
          />
          <rect x="-26" y="0" width="52" height="10" fill="#FBF3E2" />
          <path d="M-4,10 L-4,3 Q0,-2 4,3 L4,10 Z" fill="#1E3A5F" />
          <rect x="-28" y="10" width="56" height="2" fill="#D4A537" />
        </g>

        {/* Branches — sway gently */}
        <g
          fill="url(#ld-green)"
          style={{ transformOrigin: '40px 110px', animation: 'harari-sway-left 3s ease-in-out infinite' }}
        >
          <g transform="translate(40, 110) rotate(-20)">
            <path d="M0,0 Q-3,-8 0,-16 Q3,-8 0,0" />
            <ellipse cx="-4" cy="-4" rx="3" ry="2" transform="rotate(-30 -4 -4)" />
            <ellipse cx="4" cy="-12" rx="3" ry="2" transform="rotate(30 4 -12)" />
          </g>
        </g>
        <g
          fill="url(#ld-green)"
          style={{ transformOrigin: '160px 110px', animation: 'harari-sway-right 3s ease-in-out infinite' }}
        >
          <g transform="translate(160, 110) rotate(20)">
            <path d="M0,0 Q3,-8 0,-16 Q-3,-8 0,0" />
            <ellipse cx="4" cy="-4" rx="3" ry="2" transform="rotate(30 4 -4)" />
            <ellipse cx="-4" cy="-12" rx="3" ry="2" transform="rotate(-30 -4 -12)" />
          </g>
        </g>
        <g fill="#B5471A">
          <circle cx="36" cy="98" r="1.5" />
          <circle cx="164" cy="98" r="1.5" />
        </g>
      </svg>

      {label && (
        <p
          className="text-sm text-[#5B2A86] font-medium mt-3 tracking-wide"
          style={{ animation: 'harari-fade 1.5s ease-in-out infinite' }}
        >
          {label}
          <span style={{ animation: 'harari-dots 1.5s steps(4) infinite', display: 'inline-block', width: '1.5em', textAlign: 'left' }}></span>
        </p>
      )}
    </div>
  )
}
