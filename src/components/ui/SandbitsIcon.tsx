import React from 'react';

interface SandbitsIconProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export function SandbitsIcon({ className = '', size = 20, style }: SandbitsIconProps) {
  return (
    <img
      src="/sandbits.png"
      width={size}
      height={size}
      alt="Sandbits"
      className={className}
      style={{ objectFit: 'cover', display: 'inline-block', verticalAlign: 'middle', borderRadius: '50%', ...style }}
      draggable={false}
    />
  );
}
