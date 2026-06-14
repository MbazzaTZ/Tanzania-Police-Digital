// Tanzania Police Force official badge SVG
export default function PoliceBadge({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100"
      style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.5))', flexShrink: 0 }}>
      {/* Outer circle – navy */}
      <circle cx="50" cy="50" r="48" fill="#1a237e" stroke="#F57C00" strokeWidth="2.5"/>
      {/* White ring */}
      <circle cx="50" cy="50" r="40" fill="white"/>
      {/* Inner navy */}
      <circle cx="50" cy="50" r="35" fill="#1a237e"/>
      {/* Crossed axes / spears */}
      <line x1="33" y1="27" x2="67" y2="73" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="67" y1="27" x2="33" y2="73" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
      {/* Vertical spear */}
      <line x1="50" y1="22" x2="50" y2="78" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      {/* Center shield dot */}
      <circle cx="50" cy="50" r="5.5" fill="#F57C00"/>
      {/* Flame on top */}
      <ellipse cx="50" cy="12" rx="7" ry="10" fill="#E65100"/>
      <ellipse cx="49" cy="15" rx="4.5" ry="6.5" fill="#FF6F00"/>
      <ellipse cx="50" cy="17" rx="2.8" ry="4" fill="#FFC107"/>
      {/* Bottom ribbon text area */}
      <path d="M 20 72 Q 50 86 80 72" stroke="#F57C00" strokeWidth="1.5" fill="none"/>
      {/* Text */}
      <text x="50" y="42" textAnchor="middle" fontSize="6" fontWeight="800"
        fill="white" letterSpacing="2">TANZANIA</text>
      <text x="50" y="62" textAnchor="middle" fontSize="7.5" fontWeight="900"
        fill="white" letterSpacing="1.5">POLISI</text>
      <text x="50" y="79" textAnchor="middle" fontSize="3.8" fontWeight="700"
        fill="#F57C00" letterSpacing=".8">USALAMA WA RAIA</text>
    </svg>
  )
}
