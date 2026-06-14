// Tanzania Police Force – Official Badge SVG
// Colors: Navy #1E3A6E, White, Gold torch #F57C00/#FFC107
export default function PoliceBadge({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 220"
      style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.45))', flexShrink: 0 }}>

      {/* ── TORCH / FLAME ── */}
      {/* Torch cup – gold */}
      <ellipse cx="100" cy="36" rx="10" ry="6" fill="#F9A825"/>
      <rect x="93" y="36" width="14" height="10" rx="2" fill="#F9A825"/>
      {/* Flame layers */}
      <ellipse cx="100" cy="22" rx="9" ry="16" fill="#E65100"/>
      <ellipse cx="98"  cy="20" rx="6" ry="11" fill="#F57C00"/>
      <ellipse cx="100" cy="18" rx="4" ry="8"  fill="#FFC107"/>
      <ellipse cx="101" cy="17" rx="2" ry="5"  fill="#FFF176"/>

      {/* ── OUTER NAVY RING ── */}
      <circle cx="100" cy="118" r="78" fill="#1E3A6E"/>
      {/* White gap ring */}
      <circle cx="100" cy="118" r="70" fill="white"/>
      {/* Inner navy circle */}
      <circle cx="100" cy="118" r="62" fill="#1E3A6E"/>
      {/* Inner white field for weapons */}
      <circle cx="100" cy="118" r="54" fill="white"/>

      {/* ── WEAPONS: Sword (vertical) + 2 Axes (crossed) ── */}
      {/* Left axe handle */}
      <line x1="68" y1="88" x2="100" y2="145" stroke="#1E3A6E" strokeWidth="3" strokeLinecap="round"/>
      {/* Left axe blade */}
      <path d="M 60 82 Q 55 90 68 88 Q 65 78 60 82 Z" fill="#1E3A6E"/>
      <path d="M 60 82 Q 70 76 68 88 Z" fill="#1E3A6E"/>
      {/* Right axe handle */}
      <line x1="132" y1="88" x2="100" y2="145" stroke="#1E3A6E" strokeWidth="3" strokeLinecap="round"/>
      {/* Right axe blade */}
      <path d="M 140 82 Q 145 90 132 88 Q 135 78 140 82 Z" fill="#1E3A6E"/>
      <path d="M 140 82 Q 130 76 132 88 Z" fill="#1E3A6E"/>

      {/* Center sword – vertical */}
      {/* Blade */}
      <polygon points="100,72 96,110 100,115 104,110" fill="#1E3A6E"/>
      {/* Guard / crossguard */}
      <rect x="90" y="110" width="20" height="4" rx="2" fill="#1E3A6E"/>
      {/* Grip */}
      <rect x="97" y="114" width="6" height="16" rx="2" fill="#1E3A6E"/>
      {/* Pommel */}
      <circle cx="100" cy="132" r="4" fill="#1E3A6E"/>
      {/* Drop below pommel */}
      <circle cx="100" cy="140" r="2.5" fill="#1E3A6E"/>

      {/* ── TEXT ON RING ── */}
      {/* TANZANIA – top arc */}
      <path id="topArc" d="M 32,118 A 68,68 0 0,1 168,118" fill="none"/>
      <text fontSize="13" fontWeight="800" fill="white" letterSpacing="3.5" fontFamily="Arial,sans-serif">
        <textPath href="#topArc" startOffset="12%">TANZANIA</textPath>
      </text>

      {/* POLISI – bottom arc */}
      <path id="botArc" d="M 38,130 A 68,68 0 0,0 162,130" fill="none"/>
      <text fontSize="13" fontWeight="800" fill="white" letterSpacing="4" fontFamily="Arial,sans-serif">
        <textPath href="#botArc" startOffset="18%">POLISI</textPath>
      </text>

      {/* ── BOTTOM RIBBON / BANNER ── */}
      {/* Main ribbon body */}
      <path d="M 28,178 Q 100,168 172,178 Q 170,192 100,188 Q 30,192 28,178 Z" fill="#1E3A6E"/>
      {/* Left ribbon tail */}
      <path d="M 28,178 L 14,188 L 22,184 L 26,196 L 34,182 Z" fill="#1E3A6E"/>
      {/* Right ribbon tail */}
      <path d="M 172,178 L 186,188 L 178,184 L 174,196 L 166,182 Z" fill="#1E3A6E"/>
      {/* USALAMA WA RAIA text */}
      <text x="100" y="187" textAnchor="middle" fontSize="9.5" fontWeight="800"
        fill="white" letterSpacing="1.2" fontFamily="Arial,sans-serif">USALAMA WA RAIA</text>

      {/* ── SIDE HORSE HEADS (simplified) ── */}
      {/* Left horse head */}
      <path d="M 22,158 Q 15,148 18,138 Q 22,130 30,132 Q 26,140 28,152 Z" fill="#1E3A6E"/>
      <circle cx="20" cy="152" r="5" fill="#1E3A6E"/>
      {/* Right horse head */}
      <path d="M 178,158 Q 185,148 182,138 Q 178,130 170,132 Q 174,140 172,152 Z" fill="#1E3A6E"/>
      <circle cx="180" cy="152" r="5" fill="#1E3A6E"/>
    </svg>
  )
}
