import React, { useId, useRef, useEffect } from 'react';

/* ------------------------------------------------------------------ */
/*  Palette                                                            */
/* ------------------------------------------------------------------ */

type GradientStop = [offset: string, color: string, opacity: number];

interface TorusPalette {
  label: string;
  haloAnim: string;
  haloAnimMid: string;
  base: GradientStop[];
  sheen: GradientStop[];
  midHi: GradientStop[];
  midShadow: GradientStop[];
  halo: GradientStop[];
  specA: GradientStop[];
  specB: GradientStop[];
}

const TORUS_PALETTES: Record<string, TorusPalette> = {
  iris: {
    label: 'IRIS',
    haloAnim: '0deg',
    haloAnimMid: '60deg',
    base: [
      ['0%', '#7060E0', 1],
      ['35%', '#4A3CC0', 1],
      ['70%', '#312596', 1],
      ['100%', '#1F1670', 1],
    ],
    sheen: [
      ['0%', '#FF7BD1', 0],
      ['22%', '#FF7BD1', 0.45],
      ['45%', '#7DE8FF', 0.65],
      ['62%', '#B988FF', 0.55],
      ['82%', '#FFFFFF', 0.3],
      ['100%', '#7DE8FF', 0],
    ],
    midHi: [
      ['0%', '#E9DFFF', 0.95],
      ['35%', '#A3CCFF', 0.85],
      ['60%', '#9F86FF', 0.55],
      ['100%', '#5A4BD4', 0],
    ],
    midShadow: [
      ['0%', '#1A0F5A', 0],
      ['45%', '#1A0F5A', 0.25],
      ['100%', '#0A0530', 0.65],
    ],
    halo: [
      ['0%', '#9E84FF', 0.7],
      ['60%', '#5A4BD4', 0.35],
      ['100%', '#3A3AAE', 0],
    ],
    specA: [
      ['0%', '#FFFFFF', 0.95],
      ['45%', '#E3D9FF', 0.5],
      ['100%', '#E3D9FF', 0],
    ],
    specB: [
      ['0%', '#C8FFFF', 0.85],
      ['55%', '#7DE8FF', 0.35],
      ['100%', '#7DE8FF', 0],
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const Stops: React.FC<{ stops: GradientStop[] }> = ({ stops }) => (
  <>
    {stops.map(([off, col, op = 1], i) => (
      <stop key={i} offset={off} stopColor={col} stopOpacity={op} />
    ))}
  </>
);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface MorphBlobProps {
  palette?: string;
  holeScale?: number;
  showLabel?: boolean;
  blobOnly?: boolean;
}

const MorphBlob: React.FC<MorphBlobProps> = ({
  palette = 'iris',
  holeScale = 0.46,
  showLabel = false,
  blobOnly = false,
}) => {
  const uidRaw = useId();
  const uid = uidRaw.replace(/:/g, '_');
  const id = (name: string) => `${name}_${uid}`;
  const url = (name: string) => `url(#${id(name)})`;

  const pal = TORUS_PALETTES[palette] || TORUS_PALETTES.iris;

  const pathRef = useRef<SVGPathElement>(null);
  const haloRef = useRef<SVGPathElement>(null);
  const castRef = useRef<SVGPathElement>(null);
  const midRef = useRef<SVGPathElement>(null);
  const midDarkRef = useRef<SVGPathElement>(null);
  const midHotRef = useRef<SVGPathElement>(null);
  const ringClipRef = useRef<SVGPathElement>(null);
  const hi1Ref = useRef<SVGEllipseElement>(null);
  const hi2Ref = useRef<SVGEllipseElement>(null);
  const labelRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    const cx = 200,
      cy = 180,
      baseR = 118;
    const N = 96;

    const stages = blobOnly
      ? [{ name: 'BLOB', hold: 4000, morph: 0 }]
      : [
          { name: 'BLOB', hold: 1200, morph: 1600 },
          { name: 'CIRCLE', hold: 700, morph: 1100 },
          { name: 'DIAMOND', hold: 700, morph: 1100 },
          { name: 'HEXAGON', hold: 700, morph: 1100 },
          { name: 'TRIANGLE', hold: 700, morph: 1100 },
        ];
    const totalCycle = stages.reduce((s, x) => s + x.hold + x.morph, 0);

    const polyR = (theta: number, K: number, R: number): number => {
      const seg = (Math.PI * 2) / K;
      const phase = ((theta % seg) + seg) % seg - seg / 2;
      return (R * Math.cos(Math.PI / K)) / Math.cos(phase);
    };

    const blobR = (theta: number, time: number, amp: number = 1): number =>
      baseR +
      Math.sin(theta * 3 + time * 0.0007) * 14 * amp +
      Math.sin(theta * 5 - time * 0.0005) * 10 * amp +
      Math.cos(theta * 2 + time * 0.0009) * 8 * amp;

    const shapeR = (
      name: string,
      theta: number,
      time: number,
      spin: number,
      amp: number = 1,
    ): number => {
      switch (name) {
        case 'BLOB':
          return blobR(theta, time, amp);
        case 'CIRCLE':
          return baseR + 14;
        case 'DIAMOND':
          return polyR(theta + spin, 4, baseR * 1.18);
        case 'HEXAGON':
          return polyR(theta + spin + Math.PI / 6, 6, baseR * 1.06);
        case 'TRIANGLE':
          return polyR(theta + spin - Math.PI / 2, 3, baseR * 1.32);
        default:
          return baseR;
      }
    };

    const ease = (x: number): number => x * x * (3 - 2 * x);

    const buildSubpath = (
      radii: number[],
      ox: number,
      oy: number,
      reverse: boolean,
    ): string => {
      const pts = radii.map((r, i) => {
        const a = (i / N) * Math.PI * 2 - Math.PI / 2;
        return [ox + Math.cos(a) * r, oy + Math.sin(a) * r];
      });
      if (reverse) pts.reverse();
      let d = '';
      for (let i = 0; i < N; i++) {
        const p0 = pts[(i - 1 + N) % N];
        const p1 = pts[i];
        const p2 = pts[(i + 1) % N];
        const p3 = pts[(i + 2) % N];
        if (i === 0) d += `M${p1[0].toFixed(2)},${p1[1].toFixed(2)} `;
        const c1x = p1[0] + (p2[0] - p0[0]) / 6;
        const c1y = p1[1] + (p2[1] - p0[1]) / 6;
        const c2x = p2[0] - (p3[0] - p1[0]) / 6;
        const c2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += `C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)} `;
      }
      return d + 'Z';
    };

    let raf: number;
    const t0 = performance.now();

    const tick = (now: number) => {
      const elapsed = now - t0;
      const local = elapsed % totalCycle;
      let acc = 0;
      let fromName = stages[0].name,
        toName = stages[0].name,
        progress = 0;

      for (let i = 0; i < stages.length; i++) {
        const s = stages[i];
        if (local < acc + s.hold) {
          fromName = toName = s.name;
          progress = 1;
          break;
        }
        if (local < acc + s.hold + s.morph) {
          const next = stages[(i + 1) % stages.length];
          fromName = s.name;
          toName = next.name;
          progress = (local - acc - s.hold) / s.morph;
          break;
        }
        acc += s.hold + s.morph;
      }

      const e = ease(progress);
      const spin = elapsed * 0.00018;

      const holeCycleLen = 14000;
      const hp = (elapsed % holeCycleLen) / holeCycleLen;
      const holeMul = (1 - Math.cos(hp * Math.PI * 2)) / 2;
      const liveHole = holeMul * holeScale;

      const outerR = new Array<number>(N);
      for (let i = 0; i < N; i++) {
        const theta = (i / N) * Math.PI * 2;
        const ra = shapeR(fromName, theta, now, spin, 1);
        const rb = shapeR(toName, theta, now, spin, 1);
        outerR[i] = ra + (rb - ra) * e;
      }

      const innerSpin = -elapsed * 0.00026;
      const innerR_ = new Array<number>(N);
      for (let i = 0; i < N; i++) {
        const theta = (i / N) * Math.PI * 2;
        const ra = shapeR(fromName, theta, now, innerSpin, 0.6);
        const rb = shapeR(toName, theta, now, innerSpin, 0.6);
        innerR_[i] = (ra + (rb - ra) * e) * liveHole;
      }

      const ix = cx + Math.sin(elapsed * 0.0006) * 8;
      const iy = cy + Math.cos(elapsed * 0.0008) * 6;

      const outerD = buildSubpath(outerR, cx, cy, false);
      const hasHole = holeMul > 0.04;
      const innerD = hasHole ? buildSubpath(innerR_, ix, iy, true) : '';
      const combined = hasHole ? outerD + ' ' + innerD : outerD;

      const midR = new Array<number>(N);
      for (let i = 0; i < N; i++) {
        const ro = outerR[i];
        const ri = innerR_[i];
        midR[i] = (ro + (ri + Math.hypot(ix - cx, iy - cy))) / 2;
      }

      const offset = (dx: number, dy: number) =>
        buildSubpath(midR, cx + dx, cy + dy, false);
      const midD = buildSubpath(midR, cx, cy, false);
      const midHotD = offset(-3, -6);
      const midDarkD = offset(3, 7);

      if (pathRef.current) pathRef.current.setAttribute('d', combined);
      if (haloRef.current) haloRef.current.setAttribute('d', outerD);
      if (castRef.current) castRef.current.setAttribute('d', outerD);
      if (ringClipRef.current) ringClipRef.current.setAttribute('d', combined);
      if (midRef.current) midRef.current.setAttribute('d', midD);
      if (midHotRef.current) {
        midHotRef.current.setAttribute('d', midHotD);
        midHotRef.current.setAttribute(
          'stroke-opacity',
          (0.18 * holeMul).toFixed(3),
        );
      }
      if (midDarkRef.current) {
        midDarkRef.current.setAttribute('d', midDarkD);
        midDarkRef.current.setAttribute(
          'stroke-opacity',
          (0.45 * holeMul).toFixed(3),
        );
      }

      const sampleR = (radii: number[], theta: number): number => {
        let tt = theta + Math.PI / 2;
        tt = ((tt % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const idx = (tt / (Math.PI * 2)) * N;
        const i0 = Math.floor(idx) % N;
        const i1 = (i0 + 1) % N;
        const frac = idx - Math.floor(idx);
        return radii[i0] * (1 - frac) + radii[i1] * frac;
      };

      const setStreak = (
        ref: React.RefObject<SVGEllipseElement | null>,
        ang: number,
        rx: number,
        ry: number,
        rot: number,
      ) => {
        if (!ref.current) return;
        const rInner = sampleR(innerR_, ang);
        const r = rInner + 4;
        const x = ix + Math.cos(ang) * r;
        const y = iy + Math.sin(ang) * r;
        ref.current.setAttribute('cx', x.toFixed(2));
        ref.current.setAttribute('cy', y.toFixed(2));
        ref.current.setAttribute('rx', rx.toFixed(2));
        ref.current.setAttribute('ry', ry.toFixed(2));
        ref.current.setAttribute('opacity', holeMul.toFixed(3));
        ref.current.setAttribute(
          'transform',
          `rotate(${rot.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)})`,
        );
      };

      const a1 = elapsed * 0.00045 - Math.PI / 3;
      const a2 = -elapsed * 0.00038 + Math.PI;
      setStreak(hi1Ref, a1, 56, 18, (a1 * 180) / Math.PI + 90);
      setStreak(hi2Ref, a2, 42, 12, (a2 * 180) / Math.PI + 90);

      if (labelRef.current)
        labelRef.current.textContent = e < 0.5 ? fromName : toName;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [holeScale]);

  const animA = `torusHueShift_${uid}`;
  const animH = `torusHaloShift_${uid}`;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <style>{`
        @keyframes ${animA} {
          0%   { filter: hue-rotate(0deg)   saturate(1.05); }
          50%  { filter: hue-rotate(45deg)  saturate(1.15); }
          100% { filter: hue-rotate(0deg)   saturate(1.05); }
        }
        @keyframes ${animH} {
          0%   { opacity: 0.20; filter: hue-rotate(0deg)  blur(2px); }
          50%  { opacity: 0.30; filter: hue-rotate(45deg) blur(2px); }
          100% { opacity: 0.20; filter: hue-rotate(0deg)  blur(2px); }
        }
        .torus-color-${uid} { animation: ${animA} 16s ease-in-out infinite; transform-origin: center; }
        .torus-halo-${uid}  { animation: ${animH} 16s ease-in-out infinite; }
      `}</style>

      <svg
        viewBox="0 0 400 360"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={id('chromeBase')} x1="0.3" y1="0" x2="0.7" y2="1">
            <Stops stops={pal.base} />
          </linearGradient>
          <linearGradient id={id('chromeSheen')} x1="0" y1="1" x2="1" y2="0">
            <Stops stops={pal.sheen} />
          </linearGradient>
          <linearGradient id={id('midHi')} x1="0.5" y1="0" x2="0.5" y2="1">
            <Stops stops={pal.midHi} />
          </linearGradient>
          <linearGradient id={id('midShadow')} x1="0.5" y1="0" x2="0.5" y2="1">
            <Stops stops={pal.midShadow} />
          </linearGradient>
          <radialGradient id={id('torusHalo')} cx="0.5" cy="0.5" r="0.6">
            <Stops stops={pal.halo} />
          </radialGradient>
          <radialGradient id={id('castShadow')} cx="0.5" cy="0.5" r="0.55">
            <stop offset="0%" stopColor="#000" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#000" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={id('specA')} cx="0.5" cy="0.5" r="0.5">
            <Stops stops={pal.specA} />
          </radialGradient>
          <radialGradient id={id('specB')} cx="0.5" cy="0.5" r="0.5">
            <Stops stops={pal.specB} />
          </radialGradient>
          <filter id={id('torusShadow')} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <filter id={id('castBlur')} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          <filter id={id('specBlur')} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter
            id={id('midShadowBlur')}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id={id('midHiBlur')} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <clipPath id={id('ringClip')} clipRule="evenodd">
            <path ref={ringClipRef} d="" />
          </clipPath>
        </defs>

        {/* Cast shadow */}
        <g style={{ opacity: 0.55 }}>
          <path
            ref={castRef}
            d=""
            fill={url('castShadow')}
            filter={url('castBlur')}
            transform="translate(10 28) scale(1.02 0.96)"
            style={{ transformOrigin: '200px 180px' }}
          />
        </g>

        {/* Halo glow */}
        <g className={`torus-halo-${uid}`} style={{ transformOrigin: 'center' }}>
          <path
            ref={haloRef}
            d=""
            fill={url('torusHalo')}
            filter={url('torusShadow')}
            transform="translate(4 8) scale(1.04)"
            style={{ transformOrigin: '200px 180px' }}
          />
        </g>

        {/* Main torus body */}
        <g className={`torus-color-${uid}`} style={{ transformOrigin: 'center' }}>
          <path ref={pathRef} d="" fill={url('chromeBase')} fillRule="evenodd" />

          <g clipPath={url('ringClip')} style={{ mixBlendMode: 'screen' }}>
            <rect x="0" y="0" width="400" height="360" fill={url('chromeSheen')} opacity="0.95" />
          </g>

          <g
            clipPath={url('ringClip')}
            filter={url('midShadowBlur')}
            style={{ mixBlendMode: 'multiply' }}
          >
            <path
              ref={midDarkRef}
              d=""
              fill="none"
              stroke={url('midShadow')}
              strokeWidth="22"
              strokeOpacity="0.45"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>

          <g
            clipPath={url('ringClip')}
            filter={url('midHiBlur')}
            style={{ mixBlendMode: 'screen' }}
          >
            <path
              ref={midHotRef}
              d=""
              fill="none"
              stroke={url('midHi')}
              strokeWidth="10"
              strokeOpacity="0.18"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>

          <g
            clipPath={url('ringClip')}
            filter={url('specBlur')}
            style={{ mixBlendMode: 'screen' }}
          >
            <ellipse ref={hi1Ref} cx="200" cy="120" rx="56" ry="18" fill={url('specA')} />
            <ellipse ref={hi2Ref} cx="200" cy="240" rx="42" ry="12" fill={url('specB')} />
          </g>
        </g>

        {/* Optional shape label */}
        {showLabel && (
          <text
            ref={labelRef}
            x="200"
            y="344"
            textAnchor="middle"
            fill="#fff"
            opacity="0.5"
            fontSize="11"
            fontFamily="monospace"
          />
        )}
      </svg>
    </div>
  );
};

export default MorphBlob;
