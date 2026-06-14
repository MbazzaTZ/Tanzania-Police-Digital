export default function PoliceBadge({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#1B5E20" stroke="#FFC107" strokeWidth="3"/>
      <circle cx="50" cy="50" r="38" fill="white"/>
      <circle cx="50" cy="50" r="34" fill="#1B5E20"/>
      {/* Crossed spears */}
      <line x1="36" y1="28" x2="64" y2="72" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      <line x1="64" y1="28" x2="36" y2="72" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      {/* Center circle */}
      <circle cx="50" cy="50" r="5" fill="#FFC107"/>
      {/* Flame */}
      <ellipse cx="50" cy="15" rx="6" ry="10" fill="#FF6F00"/>
      <ellipse cx="50" cy="18" rx="3.5" ry="5.5" fill="#FFC107"/>
      {/* Bottom ribbon */}
      <path d="M22 82 Q50 90 78 82" stroke="#FFC107" strokeWidth="2" fill="none"/>
    </svg>
  )
}
