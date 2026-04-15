import React from 'react';

interface SandbitsIconProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export function SandbitsIcon({ className = '', size = 20, style }: SandbitsIconProps) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        verticalAlign: 'middle',
        boxShadow: `0 1px 0 rgba(255,255,255,0.18) inset, 0 ${Math.max(1, Math.round(size * 0.08))}px 0 rgba(0,0,0,0.45), 0 0 0 ${Math.max(1, Math.round(size * 0.06))}px rgba(255,200,50,0.35)`,
        ...style,
      }}
    >
      <img
        src="/sandbits.png"
        width={size}
        height={size}
        alt="Sandbits"
        draggable={false}
        style={{ objectFit: 'cover', display: 'block', borderRadius: '50%' }}
      />
    </span>
  );
}
