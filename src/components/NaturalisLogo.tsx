import React from 'react';

interface NaturalisLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  variant?: 'badge' | 'compact' | 'full';
}

export const NaturalisLogo: React.FC<NaturalisLogoProps> = ({
  className = '',
  size = 48,
  showText = true,
  variant = 'badge',
}) => {
  // Generate the 24 scalloped petal points for the outer seal badge
  const numPetals = 24;
  const outerR = 190;
  const innerR = 175;
  const cx = 200;
  const cy = 200;

  // Build SVG path for scalloped circular badge
  let scallopPath = '';
  for (let i = 0; i < numPetals; i++) {
    const angle1 = (i * 2 * Math.PI) / numPetals;
    const angle2 = ((i + 1) * 2 * Math.PI) / numPetals;
    const midAngle = (angle1 + angle2) / 2;

    const x1 = cx + innerR * Math.cos(angle1);
    const y1 = cy + innerR * Math.sin(angle1);

    const xMid = cx + outerR * Math.cos(midAngle);
    const yMid = cy + outerR * Math.sin(midAngle);

    const x2 = cx + innerR * Math.cos(angle2);
    const y2 = cy + innerR * Math.sin(angle2);

    if (i === 0) {
      scallopPath += `M ${x1} ${y1} Q ${xMid} ${yMid}, ${x2} ${y2}`;
    } else {
      scallopPath += ` Q ${xMid} ${yMid}, ${x2} ${y2}`;
    }
  }
  scallopPath += ' Z';

  // 28 perimeter dots around inner circle
  const numDots = 28;
  const dotsR = 142;
  const dots = [];
  for (let i = 0; i < numDots; i++) {
    const angle = (i * 2 * Math.PI) / numDots - Math.PI / 2;
    const dx = cx + dotsR * Math.cos(angle);
    const dy = cy + dotsR * Math.sin(angle);
    dots.push({ x: dx, y: dy, key: i });
  }

  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={`shrink-0 select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Naturalis Gourmet Logo"
    >
      <defs>
        {/* Soft shadow for depth */}
        <filter id="logoShadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.25" floodColor="#0d2813" />
        </filter>
        {/* Subtle leaf gradient */}
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8CC63F" />
          <stop offset="100%" stopColor="#5E9628" />
        </linearGradient>
      </defs>

      {/* Main outer scalloped badge */}
      <path
        d={scallopPath}
        fill="#23542B"
        filter="url(#logoShadow)"
      />

      {/* Outer concentric orange ring */}
      <circle
        cx="200"
        cy="200"
        r="164"
        fill="none"
        stroke="#E05B24"
        strokeWidth="9"
      />

      {/* Inner fine dark ring border */}
      <circle
        cx="200"
        cy="200"
        r="156"
        fill="none"
        stroke="#1E3F28"
        strokeWidth="2.5"
      />

      {/* Inner dark forest green background */}
      <circle
        cx="200"
        cy="200"
        r="154"
        fill="#24582E"
      />

      {/* Inner dotted decorative ring */}
      {dots.map((d) => (
        <circle
          key={d.key}
          cx={d.x}
          cy={d.y}
          r="3.5"
          fill="#E05B24"
        />
      ))}

      {/* Three Stars at the top */}
      <g fill="#FFFFFF">
        {/* Left Star */}
        <polygon
          points="175,110 178,118 186,118 180,123 182,131 175,126 168,131 170,123 164,118 172,118"
          transform="rotate(-12 175 120) scale(0.95)"
        />
        {/* Center Star (slightly larger and elevated) */}
        <polygon
          points="200,95 204,106 215,106 206,112 209,122 200,116 191,122 194,112 185,106 196,106"
        />
        {/* Right Star */}
        <polygon
          points="225,110 228,118 236,118 230,123 232,131 225,126 218,131 220,123 214,118 222,118"
          transform="rotate(12 225 120) scale(0.95)"
        />
      </g>

      {/* Leaf icon on top of the 'N' / 'a' */}
      <g transform="translate(122, 134) scale(0.95)">
        <path
          d="M 2 18 C 6 4, 26 -2, 38 4 C 36 18, 22 26, 4 22 C 2 21, 1 19, 2 18 Z"
          fill="url(#leafGrad)"
        />
        <path
          d="M 4 21 Q 20 12, 36 5"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeOpacity="0.85"
          fill="none"
        />
        <path
          d="M 16 15 Q 22 18, 26 19"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeOpacity="0.7"
          fill="none"
        />
        <path
          d="M 24 11 Q 28 8, 31 7"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeOpacity="0.7"
          fill="none"
        />
      </g>

      {/* Main Text: "Naturalis" */}
      <text
        x="195"
        y="186"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="'Playfair Display', Georgia, 'Times New Roman', serif"
        fontWeight="800"
        fontSize="54"
        letterSpacing="-1"
      >
        Naturalis
      </text>

      {/* Orange dot for the 'i' in Naturalis */}
      <circle
        cx="280"
        cy="150"
        r="7.5"
        fill="#E05B24"
      />

      {/* Subtitle: "Gourmet" */}
      <text
        x="200"
        y="218"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="500"
        fontSize="24"
        letterSpacing="1.5"
      >
        Gourmet
      </text>

      {/* Bottom Instagram handle section */}
      <g transform="translate(132, 276)">
        {/* Instagram camera rounded box */}
        <rect
          x="0"
          y="0"
          width="16"
          height="16"
          rx="4.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.8"
        />
        {/* Instagram lens circle */}
        <circle
          cx="8"
          cy="8"
          r="4"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.6"
        />
        {/* Instagram flash dot */}
        <circle
          cx="12.5"
          cy="3.5"
          r="0.9"
          fill="#FFFFFF"
        />
        {/* Handle Text */}
        <text
          x="22"
          y="13"
          fill="#FFFFFF"
          fontFamily="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="600"
          fontSize="15"
          letterSpacing="0.2"
        >
          @naturalisgourmet
        </text>
      </g>
    </svg>
  );
};
