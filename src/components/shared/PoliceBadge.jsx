// Tanzania Police Force – Official Badge SVG (accurate replica)
export default function PoliceBadge({ size = 40 }) {
  const id = `pb_${Math.random().toString(36).slice(2,7)}`
  return (
    <svg
      width={size}
      height={Math.round(size * 1.15)}
      viewBox="0 0 200 230"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: 'block' }}
    >
      {/* ── TORCH TOP ── */}
      {/* Torch base / cup */}
      <path d="M88,55 Q88,48 100,46 Q112,48 112,55 L110,65 L90,65 Z" fill="#F9A825"/>
      {/* Flame – outer dark orange */}
      <ellipse cx="100" cy="34" rx="11" ry="20" fill="#BF360C"/>
      {/* Flame – mid orange */}
      <ellipse cx="99"  cy="30" rx="8"  ry="15" fill="#E65100"/>
      {/* Flame – bright orange */}
      <ellipse cx="100" cy="27" rx="6"  ry="11" fill="#F57C00"/>
      {/* Flame – yellow core */}
      <ellipse cx="100" cy="24" rx="4"  ry="8"  fill="#FFC107"/>
      {/* Flame – white tip */}
      <ellipse cx="100" cy="21" rx="2"  ry="4"  fill="#FFF9C4"/>

      {/* ── OUTER NAVY RING ── */}
      <circle cx="100" cy="128" r="80" fill="#1E3A6E"/>
      {/* White spacer */}
      <circle cx="100" cy="128" r="71" fill="#FFFFFF"/>
      {/* Inner navy disc */}
      <circle cx="100" cy="128" r="63" fill="#1E3A6E"/>
      {/* White weapon field */}
      <circle cx="100" cy="128" r="55" fill="#FFFFFF"/>

      {/* ── WEAPONS ── */}
      {/* === LEFT AXE === */}
      {/* Handle */}
      <line x1="72" y1="95" x2="97" y2="155"
        stroke="#1E3A6E" strokeWidth="3.5" strokeLinecap="round"/>
      {/* Blade – curved axe shape */}
      <path d="M58,82 C54,92 62,100 72,95 C66,88 62,80 58,82 Z"
        fill="#1E3A6E"/>
      <path d="M58,82 C68,76 76,84 72,95 C68,86 62,80 58,82 Z"
        fill="#C0C0C0" opacity="0.6"/>

      {/* === RIGHT AXE === */}
      {/* Handle */}
      <line x1="128" y1="95" x2="103" y2="155"
        stroke="#1E3A6E" strokeWidth="3.5" strokeLinecap="round"/>
      {/* Blade */}
      <path d="M142,82 C146,92 138,100 128,95 C134,88 138,80 142,82 Z"
        fill="#1E3A6E"/>
      <path d="M142,82 C132,76 124,84 128,95 C132,86 138,80 142,82 Z"
        fill="#C0C0C0" opacity="0.6"/>

      {/* === CENTER SWORD (vertical, pointing up) === */}
      {/* Blade – narrow triangle */}
      <polygon points="100,80 97,118 103,118" fill="#1E3A6E"/>
      {/* Blade fuller (lighter strip) */}
      <line x1="100" y1="83" x2="100" y2="116"
        stroke="#C0C0C0" strokeWidth="1" opacity="0.5"/>
      {/* Crossguard */}
      <rect x="89" y="118" width="22" height="5" rx="2.5" fill="#1E3A6E"/>
      {/* Grip */}
      <rect x="97.5" y="123" width="5" height="15" rx="2" fill="#1E3A6E"/>
      {/* Pommel round */}
      <circle cx="100" cy="141" r="5" fill="#1E3A6E"/>
      {/* Pommel drop */}
      <ellipse cx="100" cy="150" rx="2.5" ry="3.5" fill="#1E3A6E"/>

      {/* ── TEXT ON RING ── */}
      {/* Top arc path */}
      <defs>
        <path id={`${id}_top`} d="M 26,128 A 74,74 0 0,1 174,128"/>
        <path id={`${id}_bot`} d="M 34,142 A 74,74 0 0,0 166,142"/>
      </defs>
      <text fontSize="14" fontWeight="900" fill="white"
        letterSpacing="4" fontFamily="Arial Black,Arial,sans-serif">
        <textPath href={`#${id}_top`} startOffset="10%">TANZANIA</textPath>
      </text>
      <text fontSize="14" fontWeight="900" fill="white"
        letterSpacing="5" fontFamily="Arial Black,Arial,sans-serif">
        <textPath href={`#${id}_bot`} startOffset="20%">POLISI</textPath>
      </text>

      {/* ── RIBBON BANNER ── */}
      {/* Left tail pointing left-down */}
      <path d="M 30,192 L 16,204 L 24,198 L 20,210 L 34,200 Z" fill="#1E3A6E"/>
      {/* Right tail */}
      <path d="M 170,192 L 184,204 L 176,198 L 180,210 L 166,200 Z" fill="#1E3A6E"/>
      {/* Main ribbon body */}
      <path d="M 30,192 Q 100,182 170,192 Q 168,208 100,205 Q 32,208 30,192 Z"
        fill="#1E3A6E"/>
      {/* Ribbon text */}
      <text x="100" y="200" textAnchor="middle"
        fontSize="10" fontWeight="800" fill="white"
        letterSpacing="1.5" fontFamily="Arial,sans-serif">
        USALAMA WA RAIA
      </text>

      {/* ── HORSE HEAD DECORATIONS ── */}
      {/* Left horse */}
      <path d="M26,175 Q18,165 20,155 Q22,145 30,147 Q27,155 28,165 Q28,172 30,178 Z"
        fill="#1E3A6E"/>
      <path d="M20,155 Q16,148 22,144 Q26,141 30,147 Z" fill="#1E3A6E"/>
      {/* Right horse */}
      <path d="M174,175 Q182,165 180,155 Q178,145 170,147 Q173,155 172,165 Q172,172 170,178 Z"
        fill="#1E3A6E"/>
      <path d="M180,155 Q184,148 178,144 Q174,141 170,147 Z" fill="#1E3A6E"/>
    </svg>
  )
}
