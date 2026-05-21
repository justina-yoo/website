/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Shared UI primitives for the new editorial portfolio design.
 */

import React, { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';

/* ─── Reveal on scroll ────────────────────────────────────────── */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add('in'), delay);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/* ─── Icons (simple 1.5px stroke line icons) ────────────────────── */
export const Icon = {
  Arrow: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  ArrowUpRight: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  ),
  Mail: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
  FileText: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  ),
  LinkedIn: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Users: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Clock: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  Click: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M9 9l5 12 1.8-5.2L21 14z" />
      <path d="M7.2 2.2l1 2.6M2.2 7.2l2.6 1M6.7 6.7l-1.5-1.5M4.8 10.8l-2.6 1" />
    </svg>
  ),
  News: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M4 6h16v14H4z" />
      <path d="M4 10h16M8 14h8M8 18h5" />
    </svg>
  ),
  Trend: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  ),
  Msg: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Bulb: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12c1 1 2 2 2 4h4c0-2 1-3 2-4a7 7 0 0 0-4-12z" />
    </svg>
  ),
  Target: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Bar: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 20V10M18 20V4M6 20v-6" />
    </svg>
  ),
  Globe: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </svg>
  ),
  Zap: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9z" />
    </svg>
  ),
} as const;

export type IconName = keyof typeof Icon;

/* ─── TopNav (shared across home + case studies) ──────────────── */
export type NavProps = {
  onHome: () => void;
  onScrollTo?: (id: string) => void;
  lang?: 'en' | 'kr';
  onToggleLang?: () => void;
  tFn?: (en: string, kr: string) => string;
};

export function TopNav({ onHome, onScrollTo, lang, onToggleLang, tFn }: NavProps) {
  const t = tFn ?? ((en: string, _kr: string) => en);
  return (
    <nav
      className="sticky top-0 z-40 border-b hairline"
      style={{ background: 'rgba(250,248,244,0.85)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">
        <button onClick={onHome} className="flex items-baseline gap-2 group">
          <span className="font-serif-display text-[20px]" style={{ color: 'var(--ink)' }}>
            Justina Yoo
          </span>
          <span className="font-mono-tech text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--ink-3)' }}>
            — AI PM
          </span>
        </button>
        <div className="flex items-center gap-2 md:gap-5">
          {onScrollTo && (
            <div className="hidden md:flex items-center gap-5 mr-2">
              <button
                onClick={() => onScrollTo('featured-work')}
                className="nav-link text-[13px]"
                style={{ color: 'var(--ink-2)' }}
              >
                {t('Featured Work', '주요 프로젝트')}
              </button>
<button
                onClick={() => onScrollTo('career')}
                className="nav-link text-[13px]"
                style={{ color: 'var(--ink-2)' }}
              >
                {t('Career', '경력')}
              </button>
            </div>
          )}
          {lang && onToggleLang && (
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1 px-3 py-1.5 border hairline rounded-full font-mono-tech text-[11px] font-semibold glass hover:bg-white/80 transition-all"
            >
              <span style={{ color: lang === 'en' ? 'var(--accent)' : 'var(--ink-3)' }}>EN</span>
              <span style={{ color: 'var(--ink-3)' }}>·</span>
              <span style={{ color: lang === 'kr' ? 'var(--accent)' : 'var(--ink-3)' }}>KR</span>
            </button>
          )}
          <a
            href="https://www.linkedin.com/in/justina-ji-yeon-yoo/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center border hairline rounded-full hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors glass"
            style={{ color: 'var(--ink-2)' } as CSSProperties}
          >
            <Icon.LinkedIn />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center border hairline rounded-full hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors glass"
            style={{ color: 'var(--ink-2)' } as CSSProperties}
          >
            <Icon.FileText />
          </a>
          <a href="mailto:justina.yoo@gmail.com" className="btn-primary">
            {t('Contact', '문의')} <Icon.Mail />
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── Footer ──────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="border-t hairline py-10 mt-0">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 flex flex-wrap items-center justify-between gap-4">
        <div className="font-serif-display text-[18px]">Justina Yoo</div>
        <div
          className="font-mono-tech text-[10px] tracking-widest uppercase"
          style={{ color: 'var(--ink-3)' }}
        >
          © 2026 — All rights reserved
        </div>
        <div
          className="font-mono-tech text-[10px] tracking-widest uppercase"
          style={{ color: 'var(--ink-3)' }}
        >
          Shanghai · Pennsylvania · Seoul
        </div>
      </div>
    </footer>
  );
}

/* ─── Shared section helpers used by case studies ─────────────── */
export function SectionLabel({
  eyebrow,
  title,
  kicker,
}: {
  eyebrow: string;
  title: ReactNode;
  kicker?: string;
}) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="eyebrow mb-3" style={{ color: 'var(--acc)' } as CSSProperties}>
        {eyebrow}
      </div>
      <h2 className="font-serif-display text-[30px] md:text-[44px] leading-[1.02] tracking-tight max-w-[20ch]">
        {title}
      </h2>
      {kicker && (
        <p className="mt-4 text-[15px] max-w-[56ch]" style={{ color: 'var(--ink-3)' }}>
          {kicker}
        </p>
      )}
    </div>
  );
}

export function TimelineList({
  steps,
}: {
  steps: { phase: string; title: string; content: string; tags: string[] }[];
}) {
  return (
    <div>
      {steps.map((s, i) => (
        <Reveal key={i} delay={i * 60}>
          <div className="border-t hairline py-8 md:py-10 grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <div
                className="font-mono-tech text-[11px] tracking-widest uppercase"
                style={{ color: 'var(--acc)' } as CSSProperties}
              >
                {s.phase}
              </div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h3 className="font-serif-display text-[22px] md:text-[28px] leading-tight tracking-tight mb-3">
                {s.title}
              </h3>
              <p className="text-[15px] leading-relaxed max-w-[68ch]" style={{ color: 'var(--ink-2)' }}>
                {s.content}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-5">
                {s.tags.map((t, j) => (
                  <span
                    key={j}
                    className="font-mono-tech text-[10px] tracking-wider uppercase px-2 py-1 border hairline"
                    style={{ color: 'var(--ink-3)' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      ))}
      <div className="border-t hairline" />
    </div>
  );
}

export function CardGrid({
  items,
  iconKey = 'Bulb',
}: {
  items: { icon?: IconName; title: string; body: string }[];
  iconKey?: IconName;
}) {
  return (
    <div className="grid md:grid-cols-3 gap-[1px] rounded-sm overflow-hidden" style={{ background: 'var(--rule)' }}>
      {items.map((item, i) => {
        const IconComp = Icon[item.icon ?? iconKey];
        return (
          <Reveal key={i} delay={i * 60}>
            <div
              className="p-7 md:p-8 h-full flex flex-col gap-4"
              style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(10px)' }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-8 h-8 border hairline rounded-full flex items-center justify-center"
                  style={{ color: 'var(--acc)' } as CSSProperties}
                >
                  <IconComp />
                </div>
                <span
                  className="font-mono-tech text-[10px] tracking-widest"
                  style={{ color: 'var(--ink-3)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-serif-display text-[18px] md:text-[22px] leading-snug tracking-tight">
                {item.title}
              </h3>
              <p className="text-[14px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                {item.body}
              </p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export function ContextBlock({
  eyebrow,
  headline,
  body,
  rows,
  rowAccent = 'var(--acc)',
}: {
  eyebrow: string;
  headline: string;
  body: string;
  rows: { label: string; value: string }[];
  rowAccent?: string;
}) {
  return (
    <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
      <div className="md:col-span-6">
        <div className="eyebrow mb-3">{eyebrow}</div>
        <h2 className="font-serif-display text-[30px] md:text-[44px] leading-[1.03] tracking-tight mb-6">
          {headline}
        </h2>
        <p className="text-[15px] leading-relaxed max-w-[56ch]" style={{ color: 'var(--ink-2)' }}>
          {body}
        </p>
      </div>
      <div className="md:col-span-6">
        <div className="border hairline glass rounded-sm">
          {rows.map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-5 py-4 border-b hairline last:border-0"
            >
              <span className="text-[14px]" style={{ color: 'var(--ink-2)' }}>
                {r.label}
              </span>
              <span
                className="font-mono-tech text-[12px] tracking-widest uppercase"
                style={{ color: rowAccent }}
              >
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CTASection({
  title,
  body,
  mailto = 'mailto:justina.yoo@gmail.com',
  ctaLabel = 'Get in touch',
}: {
  title: string;
  body: string;
  mailto?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="border-t hairline">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
        <Reveal>
          <h2 className="font-serif-display text-[36px] md:text-[56px] leading-[1] tracking-tight mb-6">
            {title}
          </h2>
          <p className="max-w-[48ch] mx-auto text-[15px] mb-10" style={{ color: 'var(--ink-3)' }}>
            {body}
          </p>
          <a href={mailto} className="btn-primary">
            {ctaLabel} <Icon.Mail />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── HorizonTracker ──────────────────────────────────────────── */
const locations = [
  { city: 'Shanghai', country: 'China', flag: '🇨🇳', pct: 8 },
  { city: 'Pennsylvania', country: 'United States', flag: '🇺🇸', pct: 50 },
  { city: 'Seoul', country: 'South Korea', flag: '🇰🇷', pct: 92 },
];

export function HorizonTracker({ label = 'Lived in' }: { label?: string }) {
  const [active, setActive] = React.useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % locations.length), 2600);
    return () => clearInterval(id);
  }, []);
  const dotPct = locations[active].pct;
  return (
    <div className="flex flex-col gap-3 w-full">
      <span className="eyebrow">{label}</span>
      <div className="relative w-full pt-4 pb-10" style={{ height: 80 }}>
        <div
          className="absolute left-0 right-0 top-[22px] h-px border-t border-dashed"
          style={{ borderColor: 'var(--rule)' }}
        />
        <div
          className="absolute left-0 top-[22px] h-px transition-all duration-[1100ms]"
          style={{ width: `${dotPct}%`, background: 'var(--ink)' }}
        />
        {locations.map((loc, i) => (
          <div
            key={loc.city}
            className="absolute flex flex-col items-center"
            style={{ left: `${loc.pct}%`, transform: 'translateX(-50%)', top: 0 }}
          >
            <div
              className="w-2 h-2 mt-[18px] transition-all duration-500"
              style={{
                background: active === i ? 'var(--ink)' : 'var(--paper)',
                border: `1px solid var(--ink)`,
                borderRadius: '50%',
                transform: active === i ? 'scale(1.6)' : 'scale(1)',
              }}
            />
            <div
              className="mt-3 text-center transition-opacity duration-500"
              style={{ opacity: active === i ? 1 : 0.3 }}
            >
              <div
                className="font-mono-tech text-[10px] tracking-widest uppercase"
                style={{ color: 'var(--ink-3)' }}
              >
                {loc.flag}&nbsp;&nbsp;{loc.city}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Small marquee strip ─────────────────────────────────────── */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div
      className="overflow-hidden border-y hairline py-3"
      style={{ background: 'var(--ink)', color: 'var(--paper)' }}
    >
      <div className="flex whitespace-nowrap marquee-track font-mono-tech text-[11px] tracking-[0.3em] uppercase">
        {row.map((it, i) => (
          <span key={i} className="px-8 flex items-center gap-8">
            {it}
            <span style={{ opacity: 0.35 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
