import React, { useEffect, useRef } from 'react';
import './AfroslangSignature.css';

export const AfroslangSignature: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const elements = Array.from(svg.querySelectorAll<SVGPathElement | SVGCircleElement | SVGRectElement>('path, circle, rect'));
    if (elements.length === 0) return;

    const initialize = () => {
      let delay = 0;
      let previousStrokeLength = 0;

      for (const element of elements) {
        const getTotalLength = (element as any).getTotalLength as undefined | (() => number);
        const length = typeof getTotalLength === 'function' ? getTotalLength.call(element) : 0;
        const speed = length < 100 ? 20 : Math.floor(length);

        delay += previousStrokeLength + 100;
        previousStrokeLength = speed;

        element.style.transition = 'none';
        element.setAttribute('data-length', String(length));
        element.setAttribute('data-speed', String(speed));
        element.setAttribute('data-delay', String(delay));
        element.setAttribute('stroke-dashoffset', String(length));
        element.setAttribute('stroke-dasharray', `${length},${length}`);
      }

      // Force layout so the browser applies the initial dash styles
      svg.getBoundingClientRect();
    };

    const animate = () => {
      for (const element of elements) {
        const length = element.getAttribute('data-length') || '0';
        const speed = element.getAttribute('data-speed') || '0';
        const delay = element.getAttribute('data-delay') || '0';

        element.style.transition = `stroke-dashoffset ${speed}ms ${delay}ms linear`;
        element.setAttribute('stroke-dashoffset', '0');
        // Keep the length referenced so the browser doesn't optimize it away
        element.setAttribute('stroke-dasharray', `${length},${length}`);
      }
    };

    initialize();
    const timeoutId = window.setTimeout(() => {
      animate();
    }, 500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="afSigContainer">
      <div className="afSigSignature">
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 980 200"
          aria-label="Afroslang"
          role="img"
        >
          <defs>
            <linearGradient id="afSigGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--brand-green, #35b729)" />
              <stop offset="80%" stopColor="var(--brand-green, #35b729)" />
              <stop offset="100%" stopColor="var(--brand-red, #b00020)" />
            </linearGradient>

            <filter id="afSig3D" x="-20%" y="-40%" width="140%" height="180%">
              <feDropShadow dx="0" dy="10" stdDeviation="6" floodColor="rgba(0,0,0,0.55)" />
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="rgba(53,183,41,0.35)" />
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="rgba(176,0,32,0.18)" />
            </filter>
          </defs>
          <g filter="url(#afSig3D)" className="afSigWordmark" transform="translate(0 0)">
            {/* Extrude/back layer for 3D depth */}
            <text x="72" y="142" className="afSigText afSigTextExtrude">Afroslang</text>
            {/* Mid shadow to add thickness */}
            <text x="66" y="136" className="afSigText afSigTextShadow">Afroslang</text>
            {/* Main readable layer */}
            <text x="60" y="132" className="afSigText afSigTextMain">Afroslang</text>
            {/* Subtle highlight stroke */}
            <text x="60" y="132" className="afSigText afSigTextHighlight">Afroslang</text>
          </g>
        </svg>
      </div>
    </div>
  );
};
