import React from 'react';

const Logo = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 320 100"
      preserveAspectRatio="xMinYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glow Filter for LAED (White/Indigo) */}
        <filter id="glow-laed" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="var(--primary-blue)" floodOpacity="0.6" result="glowColor" />
          <feComposite in="glowColor" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Glow Filter for Supplements (Neon Green) */}
        <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feFlood floodColor="hsla(96, 93%, 12%, 1.00)" floodOpacity="0.8" result="glowColor" />
          <feComposite in="glowColor" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* LAED Text */}
      <text
        x="0"
        y="65"
        fontFamily="'Inter', sans-serif"
        fontSize="75"
        fontWeight="900"
        fontStyle="italic"
        fill="var(--primary-blue)"
        filter="url(#glow-laed)"
        letterSpacing="-3"
      >
        LAED
      </text>

      {/* Supplements Text */}
      <text
        x="5"
        y="95"
        fontFamily="'Inter', sans-serif"
        fontSize="32"
        fontWeight="800"
        fontStyle="italic"
        fill="var(--primary-green)"
        filter="url(#glow-green)"
        letterSpacing="1"
      >
        Supplements
      </text>
    </svg>
  );
};

export default Logo;


