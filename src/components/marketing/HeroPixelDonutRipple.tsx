"use client";

import { useId } from "react";

const RIPPLE_DUR_S = 5.8;

/**
 * Exalt-style halftone ripple: fixed-size pixel grid + radial mask (hole, dense ring, soft outer fade).
 * SMIL animates mask radius only — dots do not scale; the ring grows smoothly and fades at the end.
 */
export function HeroPixelDonutRipple() {
  const uid = useId().replace(/:/g, "");
  const pxId = `${uid}-px`;
  const gradId = `${uid}-rg`;
  const maskId = `${uid}-msk`;

  return (
    <div className="hero-exalt-center-ripple">
      <svg className="hero-exalt-ripple-svg" viewBox="0 0 100 100">
        <defs>
          <pattern id={pxId} width="0.88" height="0.88" patternUnits="userSpaceOnUse">
            <rect className="hero-exalt-ripple-pixel" x="0.14" y="0.14" width="0.46" height="0.46" rx="0.03" ry="0.03" />
          </pattern>
          <radialGradient id={gradId} cx="50" cy="50" r="16" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#000" />
            <stop offset="40%" stopColor="#000" />
            <stop offset="43%" stopColor="#fff" stopOpacity={0.08} />
            <stop offset="45.5%" stopColor="#fff" stopOpacity={0.32} />
            <stop offset="47%" stopColor="#fff" stopOpacity={0.26} />
            <stop offset="52%" stopColor="#fff" stopOpacity={0.12} />
            <stop offset="60%" stopColor="#fff" stopOpacity={0.04} />
            <stop offset="68%" stopColor="#fff" stopOpacity={0} />
            <stop offset="69%" stopColor="#000" />
            <stop offset="100%" stopColor="#000" />
            <animate
              attributeName="r"
              values="14;56"
              dur={`${RIPPLE_DUR_S}s`}
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.2 0.05 0.05 1"
            />
          </radialGradient>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
            <rect width="100" height="100" fill={`url(#${gradId})`} />
          </mask>
        </defs>
        <g className="hero-exalt-ripple-layer">
          <animate
            attributeName="opacity"
            values="0;0.6;0.6;0"
            keyTimes="0;0.06;0.5;1"
            dur={`${RIPPLE_DUR_S}s`}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.33 0 0.2 1;0 0 1 1;0.2 0 0.45 1"
          />
          <rect width="100" height="100" fill={`url(#${pxId})`} mask={`url(#${maskId})`} />
        </g>
      </svg>
    </div>
  );
}
