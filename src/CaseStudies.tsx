/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Case study pages — NewsChat / AEKO / ATTN.
 * Each accepts `t` (translator) and `onBack` so it can be embedded inside the App shell
 * with the password gate + EN/KR toggle preserved.
 */

import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Reveal,
  Icon,
  TopNav,
  Footer,
  SectionLabel,
  TimelineList,
  CardGrid,
  ContextBlock,
  CTASection,
  PageMeta,
  type IconName,
} from './ui';

type T = (en: string, kr: string) => string;

/* ─── Shared case-study chrome ─────────────────────────── */
function CaseStudyShell({
  children,
  accentClass,
  onBack,
  lang,
  onToggleLang,
  t,
  pageTitle,
  pageDescription,
}: {
  children: ReactNode;
  accentClass: string;
  onBack: () => void;
  lang: 'en' | 'kr';
  onToggleLang: () => void;
  t: T;
  pageTitle?: string;
  pageDescription?: string;
}) {
  return (
    <div className={`canvas-tint ${accentClass}`} style={{ position: 'relative', zIndex: 2 }}>
      {pageTitle && pageDescription && <PageMeta title={pageTitle} description={pageDescription} />}
      <TopNav onHome={onBack} lang={lang} onToggleLang={onToggleLang} tFn={t} />
      {children}
      <Footer />
    </div>
  );
}

function CaseStudyHero({
  brandLabel,
  subLabels = [],
  title,
  tagline,
  subtitle,
  meta,
  metrics,
  logoSrc,
  heroRight,
  productColor,
  t,
}: {
  brandLabel: string;
  subLabels?: string[];
  title: ReactNode;
  tagline?: string;
  subtitle: string;
  meta?: { label: string; value: string }[];
  metrics?: { v: string; l: string }[];
  logoSrc?: string;
  heroRight?: ReactNode;
  productColor?: string;
  t: T;
}) {
  return (
    <section className="border-b hairline" style={{ minHeight: 'calc(100svh - 60px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 pt-20 pb-16 md:pt-28 md:pb-24" style={{ width: '100%' }}>
        <div className={heroRight ? 'lg:grid lg:items-center' : ''} style={heroRight ? { gridTemplateColumns: 'minmax(0,1fr) auto', gap: 48 } : {}}>
        <div>
        <Reveal delay={120}>
          <div className="flex items-center gap-4 mb-5">
            {logoSrc && <img src={logoSrc} alt={brandLabel} className="h-14 md:h-20 lg:h-28 w-auto" />}
            <h1
              className="font-serif-display text-[34px] md:text-[64px] lg:text-[80px] leading-[0.92] tracking-tight"
              style={{ color: 'var(--ink)' }}
            >
              {title}
              <span style={{ color: 'var(--acc)' } as React.CSSProperties}>.</span>
            </h1>
          </div>
        </Reveal>
        {tagline && (
          <Reveal delay={240}>
            <p className="font-mono-tech text-[13px] tracking-widest uppercase mb-8" style={{ color: productColor ?? 'var(--acc)' }}>
              {tagline}
            </p>
          </Reveal>
        )}
        <Reveal delay={280}>
          <p
            className="font-serif-display text-[18px] md:text-[24px] leading-snug max-w-[40ch] mb-10"
            style={{ color: 'var(--ink-3)', whiteSpace: 'pre-line' }}
          >
            {subtitle}
          </p>
        </Reveal>
        {metrics && (
          <Reveal delay={340}>
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-[1px] rounded-sm overflow-hidden border hairline mb-8"
              style={{ background: 'var(--rule)' }}
            >
              {metrics.map((m, i) => (
                <div key={i} className="metric" style={{ border: 'none' }}>
                  <span className="n" style={{ color: productColor ?? '#F8CD48' }}>{m.v}</span>
                  <span className="font-mono-tech text-[11px] tracking-widest uppercase" style={{ color: productColor ?? '#F8CD48' }}>{m.l}</span>
                </div>
              ))}
            </div>
          </Reveal>
        )}
        {meta && (
          <Reveal delay={360}>
            <div className="flex flex-wrap gap-8 border-t hairline pt-6">
              {meta.map((m, i) => (
                <div key={i}>
                  <div className="eyebrow mb-1">{m.label}</div>
                  <div className="text-[14px]" style={{ color: 'var(--ink-2)' }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}
        </div>
        {heroRight && (
          <div className="hidden lg:block flex-shrink-0">
            <Reveal delay={200}>{heroRight}</Reveal>
          </div>
        )}
        </div>
      </div>
    </section>
  );
}

/* ─── NewsChat Hero Phone ───────────────────────────────── */
function NewsChatHeroPhone() {
  return (
    <>
      <style>{`
        @keyframes ncBubbleIn{0%,11%{opacity:0;transform:translateY(10px) scale(.97)}17%{opacity:1;transform:translateY(0) scale(1)}74%{opacity:1;transform:translateY(0) scale(1)}82%,100%{opacity:0;transform:translateY(0) scale(1)}}
        @keyframes ncTyping{0%,16%{opacity:0}21%{opacity:1}28%{opacity:1}32%,100%{opacity:0}}
        @keyframes ncDot{0%,75%,100%{transform:translateY(0);opacity:.45}38%{transform:translateY(-4px);opacity:1}}
        @keyframes ncReveal{0%,24%{clip-path:inset(0 0 100% 0);opacity:0}28%{opacity:1}58%{clip-path:inset(0 0 0 0)}74%{clip-path:inset(0 0 0 0);opacity:1}82%,100%{clip-path:inset(0 0 100% 0);opacity:0}}
        @keyframes ncGlow{0%,100%{filter:drop-shadow(0 0 0 rgba(248,205,72,0))}50%{filter:drop-shadow(0 8px 26px rgba(248,205,72,.5))}}
        @keyframes ncIntro{0%,2%{transform:translate(0,-214px) scale(1);opacity:1;filter:blur(0)}9%{transform:translate(0,-214px) scale(1.07);opacity:0;filter:blur(7px)}82%{transform:translate(0,-214px) scale(1.07);opacity:0;filter:blur(7px)}82.5%{transform:translate(0,-214px) scale(1);opacity:1;filter:blur(0)}100%{transform:translate(0,-214px) scale(1);opacity:1;filter:blur(0)}}
        @keyframes ncAnchorIn{0%,11%{opacity:0;transform:translateY(6px)}18%{opacity:1;transform:translateY(0)}74%{opacity:1;transform:translateY(0)}82%,100%{opacity:0;transform:translateY(0)}}
      `}</style>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* glow */}
        <div style={{ position: 'absolute', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle,rgba(248,205,72,.13) 0%,rgba(248,205,72,0) 68%)', filter: 'blur(8px)', zIndex: 0 }} />
        {/* phone shell */}
        <div style={{ position: 'relative', zIndex: 1, width: 400, padding: 12, background: 'linear-gradient(155deg,#2a2d33 0%,#141519 60%)', borderRadius: 56, boxShadow: '0 50px 100px -28px rgba(0,0,0,.85),0 0 0 1px rgba(255,255,255,.04),inset 0 1px 1px rgba(255,255,255,.14)', WebkitMaskImage: 'linear-gradient(180deg,#000 60%,rgba(0,0,0,0) 96%)', maskImage: 'linear-gradient(180deg,#000 60%,rgba(0,0,0,0) 96%)' }}>
          <div style={{ position: 'relative', width: '100%', height: 520, background: '#0a0a0c', borderRadius: 46, overflow: 'hidden' }}>
            {/* dynamic island */}
            <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 80, height: 22, background: '#000', borderRadius: 14, zIndex: 12, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10233a', boxShadow: 'inset 0 0 3px rgba(80,140,220,.7)' }} />
            </div>
            {/* chat content */}
            <div style={{ padding: '52px 18px 0', fontFamily: "Pretendard,'Apple SD Gothic Neo',sans-serif" }}>
              {/* user question */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
                <div style={{ maxWidth: '83%', background: '#F8CD48', color: '#2b2400', padding: '12px 16px', borderRadius: '16px 16px 5px 16px', fontSize: 15.5, fontWeight: 600, lineHeight: 1.42, boxShadow: '0 8px 18px -8px rgba(248,205,72,.55)', animation: 'ncBubbleIn 8s ease-in-out infinite' }}>아이돌과 소속사 간 갈등 사례에 대해 알려줘</div>
              </div>
              {/* anchor */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, animation: 'ncAnchorIn 8s ease-in-out infinite' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#141519', border: '1px solid rgba(248,205,72,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="11" height="11" viewBox="0 0 114.097 114.097"><path d="M111.013 107.334C112.538 110.358 110.342 113.938 106.939 113.949L71.5736 114.097C69.8326 114.097 68.251 113.131 67.4658 111.574L15.5209 8.16032C14.7471 6.60327 13.1541 5.63722 11.4245 5.63722H2.82198C1.26306 5.63722 0 4.37566 0 2.81861C0 1.26155 1.26306 0 2.82198 0H54.3231C56.0641 0 57.6344 0.97742 58.4196 2.52311L111.013 107.323V107.334ZM53.8111 107.471L8.65938 17.2867C6.49738 12.9792 0 14.5136 0 19.3325V109.528C0 112.051 2.04821 114.097 4.57434 114.097H49.726C53.1283 114.097 55.3359 110.528 53.8225 107.482L53.8111 107.471ZM109.545 0.113654H84.5115C81.9967 0.113654 79.9599 2.14805 79.9599 4.65979V24.3673C79.9599 26.8791 81.9967 28.9135 84.5115 28.9135H99.0993C101.409 28.9135 103.355 30.641 103.617 32.9368L104.288 38.7331C104.345 39.2218 104.959 39.415 105.278 39.04C110.956 32.5049 114.085 24.1514 114.085 15.5023V4.65979C114.085 2.14805 112.049 0.113654 109.534 0.113654H109.545Z" fill="#F8CD48"/></svg>
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#e6e8ec' }}>뉴스챗</span>
              </div>
              {/* typing + answer */}
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: 2, left: 0, display: 'flex', animation: 'ncTyping 8s ease-in-out infinite' }}>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center', background: '#17181c', padding: '7px 10px', borderRadius: 11 }}>
                    {[0, 0.18, 0.36].map((delay, i) => (
                      <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#9aa0aa', animation: `ncDot 1.1s ease-in-out ${delay}s infinite` }} />
                    ))}
                  </div>
                </div>
                <div style={{ maxHeight: 160, overflow: 'hidden', WebkitMaskImage: 'linear-gradient(180deg,#000 50%,transparent 100%)', maskImage: 'linear-gradient(180deg,#000 50%,transparent 100%)', animation: 'ncReveal 8s ease-in-out infinite' }}>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.72, color: '#dfe2e7' }}>아이돌과 소속사 간의 갈등은 <b style={{ color: '#fff' }}>K-pop</b> 업계에서 꽤 자주 있는 일인데요, 최근 주목할 만한 사례 몇 가지를 정리해 드리겠습니다.</p>
                  <p style={{ margin: '12px 0 6px', fontSize: 15, fontWeight: 800, color: '#ffffff' }}>뉴진스와 어도어 간의 전속계약 분쟁</p>
                  <div style={{ display: 'flex', gap: 7, fontSize: 13.5, lineHeight: 1.7, color: '#cfd3d9' }}>
                    <span style={{ color: '#7b8089' }}>•</span>
                    <span><b style={{ color: '#eef0f3', fontWeight: 700 }}>사건 개요:</b> 4세대 대표 아이돌 그룹 뉴진스와 소속사 어도어 사이의 전속계약 분쟁이 법정까지 가게 됐습니다.</span>
                  </div>
                </div>
              </div>
            </div>
            {/* brand lockup */}
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'ncIntro 8s ease-in-out infinite' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <svg width="36" height="36" viewBox="0 0 114.097 114.097" style={{ flexShrink: 0, animation: 'ncGlow 3.6s ease-in-out infinite' }}>
                  <path d="M111.013 107.334C112.538 110.358 110.342 113.938 106.939 113.949L71.5736 114.097C69.8326 114.097 68.251 113.131 67.4658 111.574L15.5209 8.16032C14.7471 6.60327 13.1541 5.63722 11.4245 5.63722H2.82198C1.26306 5.63722 0 4.37566 0 2.81861C0 1.26155 1.26306 0 2.82198 0H54.3231C56.0641 0 57.6344 0.97742 58.4196 2.52311L111.013 107.323V107.334ZM53.8111 107.471L8.65938 17.2867C6.49738 12.9792 0 14.5136 0 19.3325V109.528C0 112.051 2.04821 114.097 4.57434 114.097H49.726C53.1283 114.097 55.3359 110.528 53.8225 107.482L53.8111 107.471ZM109.545 0.113654H84.5115C81.9967 0.113654 79.9599 2.14805 79.9599 4.65979V24.3673C79.9599 26.8791 81.9967 28.9135 84.5115 28.9135H99.0993C101.409 28.9135 103.355 30.641 103.617 32.9368L104.288 38.7331C104.345 39.2218 104.959 39.415 105.278 39.04C110.956 32.5049 114.085 24.1514 114.085 15.5023V4.65979C114.085 2.14805 112.049 0.113654 109.534 0.113654H109.545Z" fill="#F8CD48"/>
                </svg>
                <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1, color: '#ffffff', lineHeight: 1, fontFamily: "Pretendard,'Apple SD Gothic Neo',sans-serif" }}>NewsChat</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#8b9199', fontFamily: "Pretendard,'Apple SD Gothic Neo',sans-serif" }}>뉴스를 읽고도 궁금해? 뉴스챗에게 물어봐!</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AekoBannerHero({ lang }: { lang: 'en' | 'kr' }) {
  const [i, setI] = useState(0);
  const brands = [
    { name: 'Gemini', color: '#4285f4' },
    { name: 'ChatGPT', color: '#0d0d0d' },
    { name: 'Claude', color: '#d97757' },
    { name: 'Grok', color: '#111111' },
    { name: 'Perplexity', color: '#20808d' },
  ];
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % brands.length), 2200);
    return () => clearInterval(t);
  }, []);
  const b = brands[i];
  const swapAnim = `akSwap 0.55s cubic-bezier(.2,.7,.2,1)`;

  const productCards = lang === 'kr'
    ? [
        { name: '다슈', desc: '그루밍 헤어 토닉', fill: '#e0b06a', shape: 'bottle1' },
        { name: '그라펜', desc: '루트 부스터 스칼프 토닉', fill: '#cf9089', shape: 'bottle2' },
        { name: '아로마티카', desc: '퓨리파잉 스칼프 토닉', fill: '#93a0e2', shape: 'bottle3' },
        { name: 'TS', desc: '헤어 토닉 볼륨 케어', fill: '#9dc283', shape: 'bottle4' },
      ]
    : [
        { name: 'Dashu', desc: 'Grooming Hair Tonic', fill: '#e0b06a', shape: 'bottle1' },
        { name: 'Grafen', desc: 'Root Booster Scalp Tonic', fill: '#cf9089', shape: 'bottle2' },
        { name: 'Aromatica', desc: 'Purifying Scalp Tonic', fill: '#93a0e2', shape: 'bottle3' },
        { name: 'TS', desc: 'Hair Tonic Volume Care', fill: '#9dc283', shape: 'bottle4' },
      ];
  const allCards = [...productCards, ...productCards];

  const bottleSvg = (shape: string, fill: string) => {
    if (shape === 'bottle1') return <svg width="52" height="118" viewBox="0 0 60 130" fill={fill}><rect x="22" y="2" width="16" height="14" rx="3"/><rect x="14" y="16" width="32" height="112" rx="12"/></svg>;
    if (shape === 'bottle2') return <svg width="52" height="120" viewBox="0 0 60 130" fill={fill}><rect x="8" y="2" width="26" height="9" rx="3"/><rect x="26" y="9" width="8" height="14"/><rect x="12" y="22" width="34" height="106" rx="10"/></svg>;
    if (shape === 'bottle3') return <svg width="50" height="122" viewBox="0 0 60 130" fill={fill}><rect x="27" y="0" width="6" height="16"/><rect x="20" y="4" width="10" height="6" rx="2"/><path d="M12 42 Q12 22 30 22 Q48 22 48 42 L48 128 L12 128 Z"/></svg>;
    return <svg width="56" height="104" viewBox="0 0 60 120" fill={fill}><rect x="16" y="6" width="28" height="14" rx="4"/><rect x="8" y="20" width="44" height="98" rx="16"/></svg>;
  };

  const starSvg = <svg width="48" height="48" viewBox="0 0 40 40" style={{ flex: 'none' }}><path d="M20 1 C21.5 11 29 18.5 39 20 C29 21.5 21.5 29 20 39 C18.5 29 11 21.5 1 20 C11 18.5 18.5 11 20 1 Z" fill={b.color}/></svg>;

  return (
    <>
      <style>{`
        @keyframes akWaveA{0%,100%{d:path("M-160,470 C 260,430 520,320 800,280 C 1060,243 1240,210 1780,150")}50%{d:path("M-160,500 C 260,470 520,360 800,320 C 1060,285 1240,250 1780,192")}}
        @keyframes akWaveB{0%,100%{d:path("M-160,440 C 260,405 520,300 800,258 C 1060,220 1240,188 1780,128")}50%{d:path("M-160,475 C 260,445 520,340 800,300 C 1060,262 1240,228 1780,170")}}
        @keyframes akMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes akSwap{0%{opacity:0;transform:translateY(9px) scale(.9)}55%{opacity:1;transform:translateY(0) scale(1.05)}100%{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes akCardIn{from{opacity:0;transform:translateX(-50%) translateY(26px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zoom: 0.5, WebkitMaskImage: 'linear-gradient(180deg,#000 60%,rgba(0,0,0,0) 98%)', maskImage: 'linear-gradient(180deg,#000 60%,rgba(0,0,0,0) 98%)' }}>
        {/* MacBook screen */}
        <div style={{ width: 980, background: 'linear-gradient(160deg,#2e3038 0%,#17181c 60%,#0b0c0e 100%)', borderRadius: 24, padding: '24px 15px 15px', boxShadow: '0 60px 120px -30px rgba(20,24,45,.8), 0 0 0 2px rgba(255,255,255,.13), inset 0 1px 0 rgba(255,255,255,.18)', position: 'relative' }}>
          <span style={{ position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)', width: 7, height: 7, borderRadius: '50%', background: '#26282d', boxShadow: 'inset 0 0 2px rgba(120,150,200,.5)' }} />
          {/* Display */}
          <div style={{ borderRadius: 8, overflow: 'hidden', background: '#fff', position: 'relative', height: 860 }}>
            <img src="/aeko-ribbon-bg.png" alt="" style={{ position: 'absolute', left: '-5%', top: '2%', width: '110%', opacity: 0.42, zIndex: 0, pointerEvents: 'none' }} />
            {/* Logo */}
            <div style={{ position: 'absolute', top: 24, left: 30, zIndex: 4, display: 'flex', alignItems: 'center', gap: 9 }}>
              <img src="/aeko-icon.png" alt="AEKO" style={{ width: 50, height: 50, objectFit: 'contain' }} />
              <span style={{ fontSize: 26, fontWeight: 800, color: '#5b4be0', letterSpacing: '-.5px' }}>AEKO</span>
            </div>
            {/* Headline */}
            <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: lang === 'kr' ? '64px 36px 0' : '64px 60px 0' }}>
              {lang === 'kr' ? (
                <h1 style={{ margin: 0, textAlign: 'center', fontSize: 46, fontWeight: 800, lineHeight: 1.34, letterSpacing: '-1.4px', color: '#111629', whiteSpace: 'nowrap' }}>
                  국내·해외 어디서든,<br />
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, verticalAlign: 'middle', animation: swapAnim }}>
                    {starSvg}{b.name}
                  </span>가 나의 상품을 추천할 수 있도록.
                </h1>
              ) : (
                <h1 style={{ margin: 0, textAlign: 'center', fontSize: 50, fontWeight: 800, lineHeight: 1.36, letterSpacing: '-1.4px', color: '#111629', whiteSpace: 'nowrap' }}>
                  Echo your brand into{' '}
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 13, verticalAlign: 'middle', animation: swapAnim }}>
                    {starSvg}{b.name}
                  </span>
                </h1>
              )}
            </div>
            {/* Chat card */}
            <div style={{ position: 'absolute', left: '50%', top: 296, transform: 'translateX(-50%)', width: 900, zIndex: 3, animation: 'akCardIn 0.8s cubic-bezier(.2,.7,.2,1) 0.15s both' }}>
              <div style={{ position: 'absolute', top: -92, right: 26, background: '#e6ecfb', color: '#404b6e', fontSize: 25, fontWeight: 600, padding: '16px 28px', borderRadius: 22, boxShadow: '0 10px 26px -14px rgba(60,74,140,.24)' }}>
                {lang === 'kr' ? '국내 그루밍 토닉 제품 추천해줘' : 'Recommend a Korean grooming tonic'}
              </div>
              <div style={{ background: '#f3f4f7', borderRadius: 30, padding: 30, boxShadow: '0 34px 70px -26px rgba(30,36,60,.35)' }}>
                <p style={{ margin: '0 0 24px', fontSize: 26, lineHeight: 1.62, color: '#474d5c' }}>
                  {lang === 'kr'
                    ? '데일리 스타일링부터 두피 케어까지, 평이 좋은 한국 그루밍 토닉과 헤어 토닉을 몇 가지 추천해 드립니다. 원하시는 마무리감과 모발 타입을 알려주시면 더 맞춤형으로 골라드릴 수 있어요.'
                    : 'From daily styling to scalp care, here are a few well-reviewed Korean grooming and hair tonics. Tell me your preferred finish and hair type, and I can tailor the picks for you.'}
                </p>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ display: 'flex', width: 'max-content', animation: 'akMarquee 34s linear infinite' }}>
                    {allCards.map((card, idx) => (
                      <div key={idx} style={{ flex: '0 0 250px', marginRight: 20, background: '#fff', borderRadius: 18, padding: 16, boxShadow: '0 8px 18px -10px rgba(30,36,60,.18)' }}>
                        <div style={{ fontSize: 23, fontWeight: 800, color: '#1a1c22' }}>{card.name}</div>
                        <div style={{ fontSize: 19, color: '#8a90a0', marginTop: 4 }}>{card.desc}</div>
                        <div style={{ height: 150, borderRadius: 12, background: '#f1f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 14 }}>
                          {bottleSvg(card.shape, card.fill)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* MacBook base */}
        <div style={{ width: 1046, height: 24, background: 'linear-gradient(180deg,#d0d4db 0%,#b0b5be 46%,#8e949e 100%)', borderRadius: '0 0 18px 18px', boxShadow: '0 26px 44px -14px rgba(20,24,45,.6), inset 0 1px 0 rgba(255,255,255,.6)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 158, height: 13, background: '#a9adb6', borderRadius: '0 0 13px 13px', boxShadow: 'inset 0 -1px 2px rgba(0,0,0,.12)' }} />
        </div>
      </div>
    </>
  );
}

/* ─── AEKO Visibility Dashboard ────────────────────────── */
const AEKO_STRINGS = {
  en: {
    scoreTitle: 'How visible is my brand to AI?',
    personaTitle: 'Who is looking for my brand?',
    keywordsTitle: 'Key persona keywords',
    mMention: 'Mentions',
    mCitation: 'Citations',
    mSource: 'Sources',
    axes: ['Price-sensitive', 'Brand', 'Quality', 'Ingredients', 'Usage'],
    legend: ['My Brand', 'Competitor 1', 'Competitor 2'],
    chips: ['20s-30s', 'female', 'sensitive-skin', 'budget-conscious', 'K-beauty-aware'],
  },
  kr: {
    scoreTitle: '내 브랜드의 AI 가시성 점수는?',
    personaTitle: '내 브랜드를 찾는 페르소나는?',
    keywordsTitle: '주요 페르소나 키워드',
    mMention: '멘션',
    mCitation: '인용',
    mSource: '소스',
    axes: ['가격 민감형', '브랜드', '품질 중시', '성분 관심', '소비형'],
    legend: ['내 브랜드', '경쟁사 1', '경쟁사 2'],
    chips: ['20-30대', '여성', '민감성 피부', '가성비 중시', 'K-뷰티 관심'],
  },
} as const;

const CHIP_STYLES = [
  { bg: '#eaf7e7', fg: '#4d9e3a' },
  { bg: '#e4f0fb', fg: '#2b7fd4' },
  { bg: '#f1f3f6', fg: '#8a97a6' },
  { bg: '#fdf4e0', fg: '#c98a13' },
  { bg: '#fbe8f1', fg: '#d13b8a' },
];

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function radarPoint(cx: number, cy: number, R: number, angleDeg: number, fraction: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + R * fraction * Math.cos(rad), y: cy + R * fraction * Math.sin(rad) };
}

function radarPolygon(cx: number, cy: number, R: number, values: number[]) {
  const n = values.length;
  return values
    .map((v, i) => {
      const angle = -90 + i * (360 / n);
      const pt = radarPoint(cx, cy, R, angle, v);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');
}

function AekoVisibilityDashboard({ lang }: { lang: 'en' | 'kr' }) {
  const s = AEKO_STRINGS[lang];
  const fmt = (n: number) => n.toLocaleString('en-US');

  // Animation state: p goes 0→1 in intro, then oscillates through waypoints
  const [p, setP] = useState(0);
  const t0Ref = useRef<number>(0);
  const tidRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseRef = useRef<'intro' | 'tween'>('intro');
  const waypointRef = useRef(0);

  const INTRO = 1600;
  const TWEEN = 2600;
  const HOLD = 1100;
  const WAYPOINTS = [1, 0.62, 0.88, 0.34, 0.72, 1];

  useEffect(() => {
    t0Ref.current = performance.now();
    phaseRef.current = 'intro';
    waypointRef.current = 0;

    const frame = () => {
      const now = performance.now();
      const elapsed = now - t0Ref.current;

      if (phaseRef.current === 'intro') {
        const raw = Math.min(elapsed / INTRO, 1);
        setP(easeOut(raw));
        if (raw >= 1) {
          phaseRef.current = 'tween';
          waypointRef.current = 0;
          t0Ref.current = performance.now() + HOLD;
        }
        tidRef.current = setTimeout(frame, 16);
      } else {
        // tween phase
        if (now < t0Ref.current) {
          // still in hold
          tidRef.current = setTimeout(frame, 16);
          return;
        }
        const tweenElapsed = now - t0Ref.current;
        const raw = Math.min(tweenElapsed / TWEEN, 1);
        const wi = waypointRef.current;
        const from = WAYPOINTS[(wi - 1 + WAYPOINTS.length) % WAYPOINTS.length];
        const to = WAYPOINTS[wi];
        setP(from + (to - from) * easeOut(raw));

        if (raw >= 1) {
          waypointRef.current = (wi + 1) % WAYPOINTS.length;
          t0Ref.current = performance.now() + HOLD;
        }
        tidRef.current = setTimeout(frame, 16);
      }
    };

    tidRef.current = setTimeout(frame, 16);
    return () => {
      if (tidRef.current !== null) clearTimeout(tidRef.current);
    };
  }, []);

  // Gauge
  const SCORE = Math.round(87 * p);
  const CIRCUMFERENCE = 515;
  const dashOffset = CIRCUMFERENCE * (1 - SCORE / 100);
  const gaugeColor = SCORE >= 70 ? '#16b981' : SCORE >= 40 ? '#f59e0b' : '#ef4444';

  // Metrics
  const mentions = Math.round(1284 * p);
  const citations = Math.round(847 * p);
  const sources = Math.round(156 * p);

  // Radar
  const CX = 210, CY = 210, R = 130;
  const N = 5;
  const mineVals = [0.88, 0.82, 0.7, 0.6, 0.78].map(v => v * p);
  const comp1Vals = [0.6, 0.55, 0.72, 0.5, 0.45].map(v => v * p);
  const comp2Vals = [0.45, 0.4, 0.5, 0.42, 0.55].map(v => v * p);

  const cardStyle: React.CSSProperties = {
    background: '#fff',
    border: '1px solid #edeef2',
    borderRadius: 24,
    boxShadow: '0 40px 80px -44px rgba(15,23,42,.32)',
  };

  // SVG icons
  const iconMention = (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
  const iconCitation = (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M10 11H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2-1 3.5-3 4" />
      <path d="M19 11h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2-1 3.5-3 4" />
    </svg>
  );
  const iconSource = (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="14" y2="17" />
    </svg>
  );

  return (
    <>
      <style>{`@keyframes chipIn{0%{opacity:0;transform:translateY(10px) scale(.94)}100%{opacity:1;transform:translateY(0) scale(1)}}`}</style>
      <div style={{ zoom: 0.58, transformOrigin: 'top left', width: 980 }}>
        {/* Single card matching original design */}
        <div style={{ ...cardStyle, padding: '34px 56px', display: 'flex', flexDirection: 'column', gap: 30 }}>

          {/* ROW 1: Score — gauge left + 3 metric cards right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <h3 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: '-0.01em', color: '#1e293b' }}>{s.scoreTitle}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,250px) repeat(3,minmax(0,1fr))', gap: 20, alignItems: 'stretch' }}>
              {/* Gauge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px 0' }}>
                <div style={{ position: 'relative', width: 214, height: 214 }}>
                  <svg width="214" height="214" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="82" fill="none" stroke="#eef1f5" strokeWidth="20" />
                    <circle
                      cx="100" cy="100" r="82"
                      fill="none"
                      stroke={gaugeColor}
                      strokeWidth="20"
                      strokeLinecap="round"
                      strokeDasharray={CIRCUMFERENCE}
                      strokeDashoffset={dashOffset}
                      style={{ transformOrigin: '100px 100px', transform: 'rotate(-90deg)', transition: 'stroke .3s ease' }}
                    />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1, color: gaugeColor, letterSpacing: '-0.03em', fontFamily: 'system-ui,sans-serif' }}>{SCORE}</div>
                    <div style={{ fontSize: 18, color: '#94a3b8', fontWeight: 700, marginTop: 4, fontFamily: 'system-ui,sans-serif' }}>/100</div>
                  </div>
                </div>
              </div>
              {/* Metric cards */}
              {[
                { icon: iconMention, value: fmt(mentions), label: s.mMention, color: '#7c6cf6' },
                { icon: iconCitation, value: fmt(citations), label: s.mCitation, color: '#ef4062' },
                { icon: iconSource, value: fmt(sources), label: s.mSource, color: '#16a34a' },
              ].map((m, i) => (
                <div key={i} style={{ minWidth: 0, background: '#f8f9fb', border: '1px solid #eef0f4', borderRadius: 18, padding: '24px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                  <div style={{ color: m.color }}>{m.icon}</div>
                  <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em', color: m.color, whiteSpace: 'nowrap', fontFamily: 'system-ui,sans-serif' }}>{m.value}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#94a3b8', fontFamily: 'system-ui,sans-serif' }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ROW 2: Persona — radar left + keywords right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h3 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: '-0.01em', color: '#1e293b' }}>{s.personaTitle}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 56, alignItems: 'center' }}>
              {/* Radar + legend */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                {/* Legend dots */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 22 }}>
                  {[
                    { color: '#6366f1', label: s.legend[0] },
                    { color: '#f43f74', label: s.legend[1] },
                    { color: '#cbd5e1', label: s.legend[2] },
                  ].map((l, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#475569', fontFamily: 'system-ui,sans-serif' }}>
                      <span style={{ width: 11, height: 11, borderRadius: '50%', background: l.color, display: 'inline-block' }} />
                      {l.label}
                    </div>
                  ))}
                </div>
                {/* Radar SVG */}
                <div style={{ position: 'relative', width: '100%', maxWidth: 420, aspectRatio: '1', alignSelf: 'center' }}>
                  <svg viewBox="0 0 420 420" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                    {[0.25, 0.5, 0.75, 1].map((frac, ri) => (
                      <polygon key={ri} points={radarPolygon(CX, CY, R, Array(N).fill(frac))} fill="none" stroke="#e7eaf0" strokeWidth="1.5" />
                    ))}
                    {Array.from({ length: N }, (_, i) => {
                      const angle = -90 + i * (360 / N);
                      const pt = radarPoint(CX, CY, R, angle, 1);
                      return <line key={i} x1={CX} y1={CY} x2={pt.x} y2={pt.y} stroke="#e7eaf0" strokeWidth="1.5" />;
                    })}
                    <polygon points={radarPolygon(CX, CY, R, comp2Vals)} fill="rgba(148,163,184,.10)" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 4" />
                    <polygon points={radarPolygon(CX, CY, R, comp1Vals)} fill="rgba(244,63,116,.08)" stroke="#f43f74" strokeWidth="2" strokeDasharray="5 4" />
                    <polygon points={radarPolygon(CX, CY, R, mineVals)} fill="rgba(99,102,241,.14)" stroke="#6366f1" strokeWidth="2.5" />
                    {s.axes.map((label, i) => {
                      const angle = -90 + i * (360 / N);
                      const pt = radarPoint(CX, CY, R + 30, angle, 1);
                      const anchors: React.SVGAttributes<SVGTextElement>['textAnchor'][] = ['middle', 'start', 'start', 'end', 'end'];
                      const baselines = ['auto', 'middle', 'hanging', 'hanging', 'middle'];
                      return (
                        <text key={i} x={pt.x} y={pt.y} textAnchor={anchors[i]} dominantBaseline={baselines[i]}
                          style={{ fontSize: 14, fontWeight: 600, fill: '#94a3b8', fontFamily: 'system-ui,sans-serif' }}>
                          {label}
                        </text>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Keywords */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignSelf: 'flex-start' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#64748b', fontFamily: 'system-ui,sans-serif' }}>{s.keywordsTitle}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {s.chips.map((chip, i) => (
                    <span key={i} style={{
                      fontSize: 15, fontWeight: 700, padding: '12px 20px', borderRadius: 14,
                      background: CHIP_STYLES[i].bg, color: CHIP_STYLES[i].fg,
                      fontFamily: 'system-ui,sans-serif',
                      animation: `chipIn .5s ease ${(0.15 + i * 0.14).toFixed(2)}s both`,
                    }}>{chip}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

function AekoOptimizeFlow({ lang }: { lang: 'en' | 'kr' }) {
  const [tick, setTick] = useState(0);
  const t0Ref = useRef<number>(0);
  const tidRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const LOOP = 12500;

  useEffect(() => {
    t0Ref.current = performance.now();
    const frame = () => {
      setTick((performance.now() - t0Ref.current) % LOOP);
      tidRef.current = setTimeout(frame, 16);
    };
    tidRef.current = setTimeout(frame, 16);
    return () => { if (tidRef.current) clearTimeout(tidRef.current); };
  }, []);

  const easeInOut = (u: number) => u < 0.5 ? 4*u*u*u : 1 - Math.pow(-2*u+2,3)/2;
  const lerpKF = (kf: [number,number,number][], tv: number): [number,number] => {
    if (tv <= kf[0][0]) return [kf[0][1], kf[0][2]];
    for (let i = 0; i < kf.length - 1; i++) {
      const [at,ax,ay] = kf[i], [bt,bx,by] = kf[i+1];
      if (tv <= bt) { const u = easeInOut((tv-at)/(bt-at)); return [ax+(bx-ax)*u, ay+(by-ay)*u]; }
    }
    const l = kf[kf.length-1]; return [l[1],l[2]];
  };

  const isKo = lang === 'kr';
  const tv = tick;

  const clicks = [1900, 3050, 4200];
  const applied = clicks.map(c => tv >= c);
  const nApplied = applied.filter(Boolean).length;
  const score = 65 + nApplied * 9;
  const scoreColor = score >= 85 ? '#16b981' : score >= 75 ? '#22c55e' : '#8577f8';

  const defs = isKo
    ? [
        { title: '상품 설명 보강', sub: '성분/효능 키워드 추가 권장' },
        { title: 'FAQ 페이지 생성', sub: '자주 묻는 질문 AI 답변 소스' },
        { title: '비교 컨텐츠 제작', sub: '경쟁사 대비 장점 컨텐츠' },
      ]
    : [
        { title: 'Enrich product copy', sub: 'Add ingredient & benefit keywords' },
        { title: 'Generate FAQ page', sub: 'AI answer source for common questions' },
        { title: 'Create comparison content', sub: 'Advantages vs. competitors' },
      ];

  const suggestions = defs.map((d, i) => {
    const on = applied[i];
    const pulsing = tv >= clicks[i] - 80 && tv < clicks[i] + 160;
    return {
      ...d, applied: on,
      btnText: on ? (isKo ? '적용됨' : 'Applied') : (isKo ? '적용' : 'Apply'),
      btnBg: on ? '#16b981' : '#e9f6ef',
      btnFg: on ? '#ffffff' : '#3fa06a',
      btnScale: pulsing ? 'scale(0.9)' : 'scale(1)',
    };
  });

  const bx = 512;
  const kf: [number,number,number][] = [
    [0, 545, 540],
    [clicks[0]-350, bx, 232], [clicks[0], bx, 232],
    [clicks[1]-350, bx, 350], [clicks[1], bx, 350],
    [clicks[2]-350, bx, 468], [clicks[2], bx, 468],
    [clicks[2]+700, 580, 545],
  ];
  const [cx, cy] = lerpKF(kf, tv);
  const clicking = clicks.some(c => tv >= c-80 && tv < c+160);
  const cursorTf = `translate(${cx.toFixed(1)}px,${cy.toFixed(1)}px) scale(${clicking ? 0.82 : 1})`;

  const termStart = 4700;
  const termOn = tv >= termStart;
  const term = {
    l1: tv >= termStart + 200,
    l2: tv >= termStart + 800,
    l3: tv >= termStart + 2100,
    progress: tv >= termStart+1700 ? '(1/3, 2/3, 3/3)' : tv >= termStart+1300 ? '(1/3, 2/3)' : '(1/3)',
  };

  const done = tv >= termStart + 2500;
  const siteFilter = done ? 'none' : 'grayscale(0.55) brightness(0.9) sepia(0.35)';
  const siteOverlay = done ? 'rgba(120,80,55,0)' : 'rgba(120,80,55,0.34)';
  const tagDefs = ['JSON-LD', 'llms.txt', 'Schema', 'robots.txt'];
  const tagStart = termStart + 2800;
  const tags = tagDefs.map((text, i) => {
    const vis = tv >= tagStart + i*200;
    return { text, opacity: vis?1:0, tf: vis?'translateY(0)':'translateY(6px)' };
  });
  const badge = Math.max(0, 3 - nApplied);

  const panelShadow = '0 34px 70px -40px rgba(15,23,42,.35)';
  const PANEL: React.CSSProperties = { position:'relative', width:620, height:600, background:'#fff', borderRadius:22, boxShadow:panelShadow, overflow:'hidden', display:'flex', flexDirection:'column' };
  const HEADER: React.CSSProperties = { height:66, flexShrink:0, background:'#6b9fff', display:'flex', alignItems:'center', gap:14, padding:'0 26px' };

  return (
    <>
      <style>{`@keyframes termBlink{0%,49%{opacity:1}50%,100%{opacity:0}}`}</style>
      <div style={{ zoom: 0.47, transformOrigin: 'top left' }}>
        <div style={{ display:'flex', gap:30, alignItems:'stretch' }}>

          {/* LEFT: AEKO plan panel */}
          <div style={PANEL}>
            <div style={HEADER}>
              <div style={{ display:'flex', alignItems:'center', gap:9, color:'#fff', fontWeight:800, fontSize:19, letterSpacing:'.01em' }}>
                <span style={{ width:22, height:22, borderRadius:'50%', background:'radial-gradient(circle at 32% 30%,#fff 0 30%,transparent 32%),#b7aef9', display:'inline-block' }} />
                AEKO
              </div>
              <div style={{ color:'rgba(255,255,255,.9)', fontWeight:700, fontSize:16 }}>
                {isKo ? '최적화 플랜' : 'Optimization Plan'}
              </div>
            </div>
            <div style={{ flex:1, padding:'22px 24px', display:'flex', flexDirection:'column', gap:18, minHeight:0 }}>
              {/* Notification row */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12 }}>
                <div style={{ position:'relative' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
                  </svg>
                  {badge > 0 && (
                    <span style={{ position:'absolute', top:-4, right:-6, minWidth:18, height:18, padding:'0 4px', borderRadius:9, background:'#ef4444', color:'#fff', fontSize:11, fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center' }}>{badge}</span>
                  )}
                </div>
                <div style={{ fontSize:18, fontWeight:800, color:'#1e293b' }}>
                  {isKo ? '새로운 상품 최적화 제안이 있습니다.' : 'New product optimization suggestions available.'}
                </div>
              </div>
              {/* Grid: product card + suggestions */}
              <div style={{ flex:1, display:'grid', gridTemplateColumns:'172px 1fr', gap:20, minHeight:0 }}>
                {/* Product card */}
                <div style={{ border:'1px solid #eceef3', borderRadius:16, padding:'20px 14px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14 }}>
                  <div style={{ width:104, height:128, borderRadius:12, background:'#f1f2f6', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="40" height="60" viewBox="0 0 40 60" fill="none" stroke="#b9c0cc" strokeWidth="2">
                      <rect x="12" y="2" width="16" height="8" rx="2" />
                      <path d="M10 12h20v44a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4z" />
                      <line x1="15" y1="26" x2="25" y2="26" />
                      <line x1="15" y1="33" x2="25" y2="33" />
                    </svg>
                  </div>
                  <div style={{ textAlign:'center', fontSize:15, fontWeight:700, color:'#334155', lineHeight:1.4 }}>
                    {isKo ? <>아쿠아 토너<br/>250ml</> : <>Aqua Toner<br/>250ml</>}
                  </div>
                  <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:8, alignItems:'center' }}>
                    <div style={{ width:'100%', height:7, borderRadius:4, background:'#eef0f4', overflow:'hidden' }}>
                      <div style={{ height:'100%', borderRadius:4, background:scoreColor, width:`${score}%`, transition:'width .5s ease,background .5s ease' }} />
                    </div>
                    <div style={{ fontSize:13.5, fontWeight:700, color:'#64748b' }}>AEO {score}{isKo ? '점' : ''}</div>
                  </div>
                </div>
                {/* Suggestions */}
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {suggestions.map((s, i) => (
                    <div key={i} style={{ flex:1, background:'#f8f9fb', border:'1px solid #eef0f4', borderRadius:14, padding:'14px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
                      <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                        <div style={{ fontSize:16, fontWeight:800, color:'#1e293b' }}>{s.title}</div>
                        <div style={{ fontSize:13, color:'#94a3b8' }}>{s.sub}</div>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, minWidth:74, height:38, borderRadius:10, fontSize:14, fontWeight:800, background:s.btnBg, color:s.btnFg, transition:'all .3s ease', transform:s.btnScale }}>
                        {s.applied && <span>✓</span>}{s.btnText}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Cursor */}
            <div style={{ position:'absolute', left:0, top:0, transform:cursorTf, pointerEvents:'none', filter:'drop-shadow(0 2px 3px rgba(0,0,0,.3))', zIndex:20 }}>
              <svg width="30" height="30" viewBox="0 0 24 24">
                <path d="M4 2 L4 20 L9 15 L12.5 22 L15.5 20.5 L12 14 L19 14 Z" fill="#1e293b" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* RIGHT: My website panel */}
          <div style={PANEL}>
            <div style={{ ...HEADER, gap:0 }}>
              <div style={{ color:'#fff', fontWeight:800, fontSize:18 }}>{isKo ? '내 웹사이트' : 'My Website'}</div>
            </div>
            <div style={{ position:'relative', flex:1, minHeight:0, overflow:'hidden' }}>
              {/* Site mock */}
              <div style={{ position:'absolute', inset:0, filter:siteFilter, transition:'filter .9s ease', display:'flex', flexDirection:'column' }}>
                <div style={{ height:64, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 30px', background:'#f4efe9' }}>
                  <div style={{ fontSize:22, fontWeight:800, color:'#3f3a45', letterSpacing:'-.01em' }}>Aeko Beauty</div>
                  <div style={{ display:'flex', gap:26, fontSize:12, fontWeight:700, letterSpacing:'.14em', color:'#8b8590' }}><span>SHOP</span><span>ABOUT</span><span>REVIEWS</span></div>
                </div>
                <div style={{ flex:1, display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:26, padding:'28px 30px', background:'#efe9e2' }}>
                  <div style={{ borderRadius:14, background:'repeating-linear-gradient(135deg,#e2d9cf,#e2d9cf 11px,#dacfc2 11px,#dacfc2 22px)' }} />
                  <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', gap:16 }}>
                    <div style={{ fontSize:22, fontWeight:800, color:'#4a4550', lineHeight:1.35 }}>
                      {isKo ? <>신규 세라믹 리뉴얼<br/>컴플렉스 0.05%</> : <>New Ceramide Renewal<br/>Complex 0.05%</>}
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                      {[90,78,84].map((w,i)=><span key={i} style={{ height:9, width:`${w}%`, borderRadius:5, background:'#ded5ca' }} />)}
                    </div>
                    <div style={{ marginTop:6, width:180, height:44, borderRadius:10, background:'#3a3330' }} />
                  </div>
                </div>
              </div>
              {/* Tint overlay */}
              <div style={{ position:'absolute', inset:0, background:siteOverlay, transition:'background .9s ease', pointerEvents:'none' }} />
              {/* Modal */}
              <div style={{ position:'absolute', left:'50%', top:'46%', transform:'translate(-50%,-50%)', width:340, background:'#fff', borderRadius:18, boxShadow:'0 30px 60px -22px rgba(15,23,42,.4)', padding:'26px 24px', textAlign:'center', zIndex:10 }}>
                {/* Warning */}
                <div style={{ opacity:done?0:1, transition:'opacity .4s ease', ...(done?{position:'absolute',inset:'26px 24px'}:{}) }}>
                  <div style={{ width:52, height:52, borderRadius:'50%', margin:'0 auto 14px', background:'#fef3e2', color:'#f59e0b', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, fontWeight:900 }}>!</div>
                  <div style={{ fontSize:19, fontWeight:800, color:'#1e293b', marginBottom:8 }}>{isKo ? 'AEO 최적화 필요' : 'AEO Needed'}</div>
                  <div style={{ fontSize:14, color:'#64748b' }}>
                    {isKo ? <>해당 웹사이트는 <b style={{color:'#334155'}}>AEO 최적화</b>가 필요합니다</> : <>This website isn&apos;t <b style={{color:'#334155'}}>optimized for AI answer engines</b> yet</>}
                  </div>
                </div>
                {/* Success */}
                <div style={{ opacity:done?1:0, transition:'opacity .4s ease', ...(!done?{position:'absolute',inset:'26px 24px'}:{}) }}>
                  <div style={{ width:52, height:52, borderRadius:'50%', margin:'0 auto 14px', background:'#e7f7ee', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16b981" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <div style={{ fontSize:19, fontWeight:800, color:'#1e293b', marginBottom:8 }}>{isKo ? '최적화 완료' : 'AEO Complete'}</div>
                  <div style={{ fontSize:14, color:'#64748b', marginBottom:16 }}>
                    {isKo ? <><b style={{color:'#334155'}}>AEO 최적화</b>가 적용되었습니다</> : <><b style={{color:'#334155'}}>AEO</b> has been applied to this website</>}
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center' }}>
                    {tags.map((tg,i)=>(
                      <span key={i} style={{ fontSize:12.5, fontWeight:700, color:'#3fa06a', background:'#e7f7ee', padding:'6px 12px', borderRadius:8, opacity:tg.opacity, transform:tg.tf, transition:'all .35s ease' }}>{tg.text}</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Terminal */}
              <div style={{ position:'absolute', left:0, right:0, bottom:0, height:150, background:'#1f2430', color:'#cbd5e1', fontFamily:"ui-monospace,'SF Mono',Menlo,monospace", fontSize:13.5, lineHeight:1.7, padding:'16px 22px', transform:termOn?'translateY(0)':'translateY(100%)', opacity:termOn?1:0, transition:'transform .5s ease,opacity .5s ease', zIndex:15 }}>
                {term.l1 && <div><span style={{color:'#fbbf24'}}>&gt; </span><span style={{color:'#e2e8f0'}}>/aeko optimize-page https://brand.com</span></div>}
                {term.l2 && <div style={{color:'#94a3b8'}}>Applying optimizations {term.progress}...</div>}
                {term.l3 && <div style={{color:'#34d399'}}>✓ Optimization complete!</div>}
                <span style={{ display:'inline-block', width:8, height:15, background:'#cbd5e1', verticalAlign:-2, animation:'termBlink 1s step-end infinite' }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

/* ─── Contextual Ad Explainer animation ────────────────── */
function AdExplainerPhone({
  question,
  workLine,
  workLineDone,
  answer,
  answerHeading,
}: {
  question: string;
  workLine: string;
  workLineDone: string;
  answer: string;
  answerHeading: string;
}) {
  const STEP = 40;
  const MS = 26;
  const TYPE_START = 3400;

  const [t, setT] = useState(0);
  const ivRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const cycleEnd = TYPE_START + answer.length * MS + 2000;
    ivRef.current = setInterval(() => {
      setT((prev) => {
        const next = prev + STEP;
        return next > cycleEnd ? 0 : next;
      });
    }, STEP);
    return () => { if (ivRef.current) clearInterval(ivRef.current); };
  }, [answer]);

  const ease = 'opacity .55s cubic-bezier(.22,.8,.24,1), transform .55s cubic-bezier(.22,.8,.24,1)';
  const appear = (on: boolean, dy = 12): React.CSSProperties => ({
    opacity: on ? 1 : 0,
    transform: on ? 'translateY(0) scale(1)' : `translateY(${dy}px) scale(.97)`,
    transition: ease,
  });

  const qOn = t >= 300;
  const workOn = t >= 1500;
  const adOn = t >= 2500;
  const typeEnd = TYPE_START + answer.length * MS;
  const typing = t >= TYPE_START && t < typeEnd;
  const answerDone = t >= typeEnd;
  const chars = t < TYPE_START ? 0 : Math.min(answer.length, Math.floor((t - TYPE_START) / MS));

  const displayWorkLine = answerDone ? workLineDone : workLine;

  return (
    <div style={{
      width: 320,
      boxSizing: 'border-box',
      background: '#ffffff',
      borderRadius: 24,
      boxShadow: '0 30px 70px -24px rgba(28,38,52,.32), 0 4px 16px rgba(28,38,52,.07)',
      padding: '24px 18px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      height: 480,
      overflow: 'hidden',
      fontFamily: "Pretendard, 'Apple SD Gothic Neo', sans-serif",
      position: 'relative',
    }}>
      {/* Question bubble */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{
          maxWidth: '80%',
          background: '#F8CD48',
          color: '#26303B',
          padding: '12px 16px',
          borderRadius: '18px 18px 5px 18px',
          fontSize: 14,
          fontWeight: 600,
          lineHeight: 1.45,
          boxShadow: '0 8px 20px -8px rgba(196,158,20,.55)',
          ...appear(qOn, 14),
        }}>
          {question}
        </div>
      </div>

      {/* Status line */}
      <div style={{
        color: '#3B4650',
        fontSize: 13,
        paddingLeft: 4,
        lineHeight: 1.4,
        ...appear(workOn, 8),
      }}>
        {displayWorkLine}
      </div>

      {/* Ad placeholder */}
      <div style={{ marginTop: 2, ...appear(adOn, 20) }}>
        <div style={{
          height: 160,
          background: '#d9e0e5',
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(92,110,122,.16) 0, rgba(92,110,122,.16) 2px, transparent 2px, transparent 13px)',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'SF Mono', ui-monospace, Menlo, monospace",
            fontSize: 11,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: 'rgba(70,85,96,.72)',
          }}>advertisement</span>
        </div>
      </div>

      {/* Answer */}
      <div style={{
        paddingLeft: 4,
        opacity: t >= TYPE_START - 150 ? 1 : 0,
        transition: 'opacity .4s ease',
      }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#242c34', lineHeight: 1.3, marginBottom: 6 }}>
          {answerHeading}
        </div>
        <p style={{ margin: 0, color: '#2A323B', fontSize: 13, lineHeight: 1.65 }}>
          <span>{answer.slice(0, chars)}</span>
          <span style={{
            display: typing ? 'inline-block' : 'none',
            color: '#1AA1C6',
            marginLeft: 2,
            fontWeight: 400,
            animation: 'acBlink 1s steps(1) infinite',
          }}>▌</span>
        </p>
      </div>
    </div>
  );
}

function ContextualAdDemo({ t, lang }: { t: T; lang: 'en' | 'kr' }) {
  return (
    <section className="border-b hairline">
      <style>{`@keyframes acBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16" style={{ alignItems: 'center' }}>
          {/* Left: text */}
          <Reveal>
            <div>
              <SectionLabel
                eyebrow={t('MONETIZATION', '수익화')}
                title={t('Contextual ads that earn without breaking UX', '경험을 해치지 않는 맥락 광고 모델')}
              />
              <p style={{ color: 'var(--fg-2)', fontSize: 15, marginTop: -8, lineHeight: 1.7 }}>
                {t(
                  'The AI thinking pause is dead time — we filled it with a contextually matched ad, then let it fade as the answer streamed in. Users never felt interrupted. The result: 10% CTR and a monetization model that protected UX instead of fighting it.',
                  'AI가 답변을 생성하는 2~3초의 공백을 맥락 광고로 채우고, 응답이 시작되면 자연스럽게 사라지게 설계했습니다. 유저는 방해받지 않았고, 결과는 CTR 10% — UX와 수익이 공존하는 모델이었습니다.',
                )}
              </p>
            </div>
          </Reveal>
          {/* Right: phone UI */}
          <Reveal delay={80}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              {lang === 'kr' ? (
                <AdExplainerPhone
                  question="한동훈 의원이 검사 시절 맡았던 주요 사건들은 뭐였을까?"
                  workLine="AI가 답변을 준비하는 동안 잠시만 기다려주세요.."
                  workLineDone="AI 답변 불러오기 완료!"
                  answerHeading="부동산 재무 기록 조회"
                  answer="한동훈 의원은 검사 시절 '대기업 저승사자'로 불렸어요. 현대차 비자금 사건으로 정몽구 회장을 구속했고, 2016년 국정농단 특검에서 삼성을 수사해 이재용 부회장을 구속 기소했습니다."
                />
              ) : (
                <AdExplainerPhone
                  question="What were the major cases Rep. Han Dong-hoon handled during his prosecutor years?"
                  workLine="Ad showing while AI is working…"
                  workLineDone="AI answer is ready!"
                  answerHeading="Estate Financial Records"
                  answer="Known as a 'grim reaper of big business,' he jailed Hyundai's Chung Mong-koo in the 2006 slush-fund case and led the 2016 Samsung probe that indicted Lee Jae-yong."
                />
              )}
              <span style={{ fontFamily: 'Pretendard, sans-serif', fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' as const, color: '#8592a0' }}>
                {t('Contextual Ad', '맥락 광고')}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── NewsChat contextual card UIs ─────────────────────── */

// Shared news article chrome used by all 3 cards
function NewsArticleChrome({ children }: { children: ReactNode }) {
  return (
    <div style={{
      width: '100%',
      maxWidth: 300,
      background: '#ffffff',
      borderRadius: 22,
      boxShadow: '0 34px 80px -28px rgba(24,32,45,.34), 0 4px 16px rgba(24,32,45,.06)',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: "Pretendard, 'Apple SD Gothic Neo', sans-serif",
    }}>
      {/* Nav bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 15px', borderBottom: '1px solid #eef0f3' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[0,1,2].map(i => <span key={i} style={{ width: 15, height: 2, background: '#20242b', borderRadius: 2, display: 'block' }} />)}
          </div>
          <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-.5px', color: '#16181d' }}>WIKITREE</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#6b727c' }}>사회</span>
        </div>
        <span style={{ fontSize: 11, color: '#6b727c' }}>🇰🇷 Korean ▼</span>
      </div>

      {/* Article body */}
      <div style={{ padding: '14px 18px 18px' }}>
        <div style={{ fontSize: 10.5, color: '#9aa0aa', marginBottom: 10 }}>홈 › 사회 › 일반</div>
        <h1 style={{ margin: 0, fontSize: 17, fontWeight: 800, lineHeight: 1.36, letterSpacing: '-.4px', color: '#15171c' }}>
          수감 중인 최순실, 10년 만의 첫 언론 인터뷰서 한동훈 정면 겨냥
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 10, fontSize: 11.5 }}>
          <span style={{ fontWeight: 700, color: '#2a2e35' }}>김민재 기자</span>
          <span style={{ color: '#c3c8cf' }}>·</span>
          <span style={{ color: '#8a909a' }}>reporter@dailybrief.co.kr</span>
        </div>
        <div style={{ marginTop: 4, fontSize: 10.5, color: '#a6acb5' }}>작성일 2026-07-07 10:10</div>
        {children}
      </div>
      {/* Scrim overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(28,32,38,0.52)', pointerEvents: 'none', zIndex: 4, borderRadius: 22 }} />
    </div>
  );
}

// Skeleton text lines
function SkeletonLines({ widths }: { widths: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
      {widths.map((w, i) => <span key={i} style={{ height: 11, borderRadius: 6, background: '#e6e9ee', width: w, display: 'block' }} />)}
    </div>
  );
}

// 1. AI question card — slides in from right
function NewsContextualCard() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setShown(true);
      const t2 = setTimeout(() => setShown(false), 4200);
      const iv = setInterval(() => {
        setShown(true);
        setTimeout(() => setShown(false), 4200);
      }, 6000);
      return () => { clearTimeout(t2); clearInterval(iv); };
    }, 1100);
    return () => clearTimeout(t1);
  }, []);

  return (
    <NewsArticleChrome>
      <img src="/nc-interview-photo.png" alt="" style={{ marginTop: 12, width: '100%', height: 132, objectFit: 'cover', objectPosition: 'center 20%', display: 'block', borderRadius: 11 }} />
      <div style={{ margin: '16px 0 4px' }}><SkeletonLines widths={['100%', '64%']} /></div>
      {/* Animated card slot */}
      <div style={{ overflow: 'hidden', height: 148, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 5 }}>
        <div style={{
          margin: '10px 0',
          padding: '13px 15px',
          background: '#ffffff',
          border: '1px solid #e7eaef',
          borderRadius: 13,
          boxShadow: '0 14px 30px -14px rgba(30,40,60,.22)',
          transform: shown ? 'translateX(0)' : 'translateX(80px)',
          opacity: shown ? 1 : 0,
          transition: 'transform .42s cubic-bezier(.2,.85,.25,1) .04s, opacity .32s ease .04s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 9 }}>
            <span style={{ color: '#F1B300', fontSize: 12, lineHeight: 1 }}>✦</span>
            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' as const, color: '#8a909a' }}>WIKITREE × AI</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, lineHeight: 1.45, color: '#20242b' }}>한동훈 의원이 검사 시절 맡았던 주요 사건들은 뭐였을까?</span>
            <span style={{ flexShrink: 0, width: 38, height: 38, borderRadius: '50%', background: '#F8CD48', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 14px -4px rgba(228,182,20,.7)' }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#3a2f00', lineHeight: 1 }}>→</span>
            </span>
          </div>
        </div>
      </div>
      <SkeletonLines widths={['100%', '78%']} />
    </NewsArticleChrome>
  );
}

// 2. Poll card — toggles active state between agree/oppose
function NewsContextualPoll() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setActive(a => a === 0 ? 1 : 0), 850);
    return () => clearInterval(iv);
  }, []);

  const btnBase: React.CSSProperties = { flex: 1, textAlign: 'center', padding: '11px 0', borderRadius: 10, fontSize: 13, fontWeight: 800, transition: 'transform .4s ease, box-shadow .4s ease, opacity .4s ease' };
  const agreeStyle: React.CSSProperties = { ...btnBase, background: '#F8CD48', border: '2px solid #E4B400', color: '#1a1500', ...(active === 0 ? { boxShadow: '0 8px 22px -6px rgba(228,182,20,.85)', transform: 'scale(1.05)', opacity: 1 } : { boxShadow: 'none', transform: 'scale(1)', opacity: 0.42 }) };
  const opposeStyle: React.CSSProperties = { ...btnBase, background: '#16181d', border: '2px solid #F8CD48', color: '#F8CD48', ...(active === 1 ? { boxShadow: '0 8px 22px -6px rgba(20,24,30,.75)', transform: 'scale(1.05)', opacity: 1 } : { boxShadow: 'none', transform: 'scale(1)', opacity: 0.42 }) };

  return (
    <NewsArticleChrome>
      <img src="/nc-interview-photo.png" alt="" style={{ marginTop: 12, width: '100%', height: 132, objectFit: 'cover', objectPosition: 'center 20%', display: 'block', borderRadius: 11 }} />
      <div style={{ margin: '16px 0 4px' }}><SkeletonLines widths={['100%', '64%']} /></div>
      {/* Poll slot */}
      <div style={{ overflow: 'hidden', height: 148, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 5 }}>
        <div style={{ margin: '10px 0', padding: '13px 15px', background: '#ffffff', border: '1px solid #e7eaef', borderRadius: 13, boxShadow: '0 14px 30px -14px rgba(30,40,60,.22)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ color: '#F1B300', fontSize: 12 }}>✦</span>
              <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' as const, color: '#8a909a' }}>WIKITREE × AI</span>
            </span>
            <span style={{ fontSize: 9.5, fontWeight: 700, color: '#8a909a' }}>투표 | 의견을 알려주세요!</span>
          </div>
          <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 800, color: '#1a1d23', letterSpacing: '-.3px', marginBottom: 13 }}>국정농단 사건 피고인 중 유일하게 수감 중인 최순실, 사면에 동의하나?</div>
          <div style={{ display: 'flex', gap: 9 }}>
            <span style={agreeStyle}>동의</span>
            <span style={opposeStyle}>반대</span>
          </div>
        </div>
      </div>
      <SkeletonLines widths={['100%', '78%']} />
    </NewsArticleChrome>
  );
}

// 3. Search bar — typewriter cycling through phrases
function NewsContextualSearch() {
  const phrases = ['최신 스포츠 소식 알려줘', '오늘의 뉴스 요약해줘', '역사 속 오늘의 뉴스 알려줘'];
  const [text, setText] = useState('');
  const stateRef = useRef({ pi: 0, ci: 0, deleting: false });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      const s = stateRef.current;
      const full = phrases[s.pi];
      if (!s.deleting) {
        s.ci++;
        setText(full.slice(0, s.ci));
        if (s.ci >= full.length) { s.deleting = true; timer = setTimeout(step, 900); return; }
        timer = setTimeout(step, 52);
      } else {
        s.ci--;
        setText(full.slice(0, s.ci));
        if (s.ci <= 0) { s.deleting = false; s.pi = (s.pi + 1) % phrases.length; timer = setTimeout(step, 200); return; }
        timer = setTimeout(step, 26);
      }
    };
    timer = setTimeout(step, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NewsArticleChrome>
      <img src="/nc-interview-photo.png" alt="" style={{ marginTop: 12, width: '100%', height: 132, objectFit: 'cover', objectPosition: 'center 20%', display: 'block', borderRadius: 11 }} />
      <div style={{ margin: '16px 0 4px' }}><SkeletonLines widths={['100%', '64%']} /></div>
      {/* Search slot */}
      <div style={{ height: 148, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 8px 7px 16px', background: '#ffffff', border: '1px solid #e3e6eb', borderRadius: 999, boxShadow: '0 12px 28px -14px rgba(30,40,60,.28)' }}>
          <span style={{ flex: 1, fontSize: 13.5, fontWeight: 500, color: '#20242b', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {text}<span style={{ color: '#2b7fff', fontWeight: 300, marginLeft: 1, animation: 'caretBlink 1s steps(1) infinite' }}>|</span>
          </span>
          <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: '#F8CD48', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 14px -4px rgba(228,182,20,.65)' }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#3a2f00', lineHeight: 1 }}>→</span>
          </span>
        </div>
      </div>
      <SkeletonLines widths={['100%', '78%']} />
    </NewsArticleChrome>
  );
}

/* ─── NewsChat ─────────────────────────────────────────── */
export function NewsChatCaseStudy({
  onBack,
  onNavigate,
  lang,
  onToggleLang,
  t,
}: {
  onBack: () => void;
  onNavigate?: (slug: string) => void;
  lang: 'en' | 'kr';
  onToggleLang: () => void;
  t: T;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const metrics = [
    { v: '1M', l: t('MAU in 5 months', '5개월 내 MAU') },
    { v: '250%', l: t('Increase in dwell time', '체류 시간 증가') },
    { v: '10%', l: t('Contextual ad CTR', '맥락 광고 CTR') },
  ];

  const timeline = [
    {
      phase: t('Solution Design', '솔루션 설계'),
      title: t('NewsChat: Ask anything about the story', 'NewsChat: 기사에 대해 무엇이든 물어보세요'),
      content: t(
        'Built a conversational layer embedded in news articles, grounded via RAG pipelines. Analyzed user groups, journeys, and behavior data to design the experience — then worked with ML and infra to hit <800ms latency with hallucination guardrails.',
        '유저 그룹, 여정, 행동 데이터를 분석해 뉴스 기사 내부에 RAG 기반 대화 레이어를 설계했습니다. ML·인프라 팀과 협업해 응답 시간 800ms 이하, 환각 방지 가드레일을 구현했습니다.',
      ),
      tags: ['GenAI / LLM', 'RAG Architecture', 'UX Design', 'Latency Optimization'],
    },
  ];

  const product: { icon: IconName; title: string; body: string }[] = [
    {
      icon: 'Msg',
      title: t('Interact mid-article', '기사 읽는 중 인터랙션'),
      body: t(
        'Readers engage mid-article through polls, suggested questions, comments, or by typing their own — each interaction triggers a contextual AI response grounded via RAG.',
        '독자는 기사를 읽는 도중 투표, 제안된 질문 클릭, 댓글, 또는 직접 질문 입력 등 다양한 방식으로 참여합니다. 각 인터랙션은 RAG 기반의 맥락 있는 AI 응답으로 이어집니다.',
      ),
    },
    {
      icon: 'News',
      title: t('Deeper context, instantly', '더 깊은 맥락, 즉시'),
      body: t(
        '"Who is this person?" "What happened last week?" — background questions are answered in-line without leaving the page. Session depth increases, bounce rate drops.',
        '"이 사람은 누구?" "지난주에 무슨 일이 있었지?" — 배경 질문에 페이지를 떠나지 않고 바로 답변합니다. 세션 깊이는 올라가고 이탈률은 떨어집니다.',
      ),
    },
    {
      icon: 'Trend',
      title: t('Monetize the conversation', '대화를 수익화'),
      body: t(
        'Sponsored content surfaces contextually at natural breakpoints in the conversation thread — matched to semantic intent, not page keywords. 10% CTR.',
        '스폰서 콘텐츠가 대화 흐름의 자연스러운 지점에 맥락에 맞게 노출됩니다. 페이지 키워드가 아닌 대화 의도에 매칭하여 10% CTR을 달성합니다.',
      ),
    },
  ];

  const learnings: { icon: IconName; title: string; body: string }[] = [
    {
      icon: 'Target',
      title: t('Users don\'t hate ads — they hate interruptions', '유저는 광고가 싫은 게 아니라, 흐름이 끊기는 게 싫다'),
      body: t(
        'As long as the ad feels justified — surfacing at a natural pause, not mid-thought — users tolerate it. The moment the AI starts generating an answer is the worst time to show an ad. The moment before it starts is the best.',
        '광고가 맥락에 맞게, 자연스러운 흐름 속에 등장하면 유저는 기꺼이 받아들입니다. AI가 답변을 생성하는 중에 광고를 끼워 넣는 건 최악의 타이밍이고, 생성이 시작되기 직전이 가장 자연스럽습니다.',
      ),
    },
    {
      icon: 'Bulb',
      title: t('The "after" moment is an untapped product surface', '기사를 다 읽고 난 그 순간 — 아직 아무도 건드리지 않은 영역'),
      body: t(
        'After reading an article, users have questions they want answered, emotions they want to express, opinions they want to share. Polls, follow-up questions, and search prompts aren\'t just features — they\'re the product response to what readers were already feeling but had no outlet for.',
        '기사를 다 읽고 나면, 독자에게는 묻고 싶은 것, 표현하고 싶은 감정, 나누고 싶은 의견이 남습니다. 투표, 후속 질문, 검색 프롬프트는 단순한 기능이 아니에요. 독자가 이미 느끼고 있었지만 쏟아낼 곳이 없었던 것들을 제품으로 풀어낸 겁니다.',
      ),
    },
    {
      icon: 'Bar',
      title: t('Multi-model AI is a cost and quality balancing act', '멀티 모델 AI는 비용과 품질 사이의 균형 게임이다'),
      body: t(
        'Not every model gives satisfying answers for every query type. We ran tests across models and learned to route differently by intent — balancing answer quality against per-query cost. A great user experience and a sustainable API bill don\'t have to be opposites, but you have to be deliberate about it.',
        '모델마다 잘 답하는 질문 유형이 다릅니다. 여러 모델을 테스트하며 질문의 의도에 따라 다르게 라우팅하는 방식을 찾아갔어요. 좋은 사용자 경험과 합리적인 API 비용, 둘 다 잡을 수 있지만 — 처음부터 의도적으로 설계하지 않으면 금세 무너집니다.',
      ),
    },
  ];

  return (
    <CaseStudyShell accentClass="acc-indigo" onBack={onBack} lang={lang} onToggleLang={onToggleLang} t={t} pageTitle="NewsChat Case Study — Justina Yoo" pageDescription="AI chat layer for news publishers. 1M MAU in 5 months.">
      <CaseStudyHero
        brandLabel="NewsChat"
        logoSrc="/newschat-icon.svg"
        subLabels={['GenAI · Media · Monetization', 'Azure · FastAPI · Vector DB · Multi-Model AI · Redis']}
        title="NewsChat"
        tagline={t("Korea's first conversational GenAI for news publishers", '뉴스챗 — 국내 언론사 최초의 대화형 생성형 AI')}
        subtitle={t(
          'Not a chatbot — an immersive AI experience triggered by polls, contextual cards, and search prompts embedded in the news reading flow.',
          '단순 챗봇이 아닙니다. 투표, 맥락 카드, 검색 프롬프트로 시작되는 몰입형 AI 뉴스 경험 — 뉴스 읽기 흐름 속에 자연스럽게 설계된 인터랙션입니다.',
        )}
        metrics={metrics}
        heroRight={<NewsChatHeroPhone />}
        productColor="#F8CD48"
        t={t}
      />

      {/* 1. Problem */}
      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <Reveal>
            <div className="eyebrow mb-4">{t('THE PROBLEM', '문제')}</div>
            <h2 className="font-serif-display text-[28px] md:text-[40px] leading-tight tracking-tight mb-10" style={{ color: 'var(--ink)' }}>
              {t('From market problem to PM scope', '매체사가 직면한 위기, PM의 과제 도출')}
            </h2>

            {/* Header zone: tight context block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3" style={{ marginBottom: 40 }}>
              <div style={{ padding: '18px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--rule)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase' as const, color: 'var(--acc)', marginBottom: 8 }}>
                  {t('Client Problem', '클라이언트 문제')}
                </div>
                <p style={{ margin: 0, fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.7 }}>
                  {t(
                    'Fast-paced social feeds cause high reader churn on traditional news sites — trapping publishers in a vicious cycle of low engagement and declining ad revenue.',
                    '숏폼 중심의 미디어 환경으로 인해 독자의 단발성 체류 및 이탈이 가속화되며 매체사의 인게이지먼트와 광고 수익이 하락하는 악순환 발생',
                  )}
                </p>
              </div>
              <div style={{ padding: '18px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--rule)', borderLeft: '3px solid var(--acc)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase' as const, color: 'var(--acc)', marginBottom: 8 }}>
                  {t('Our Team\'s Key Goal', '우리 팀의 핵심 목표')}
                </div>
                <p style={{ margin: 0, fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.7 }}>
                  {t(
                    'Pivot passive reading into interactive conversations to lock users into the platform and unlock next-gen monetization.',
                    '단방향 뉴스 소비를 대화형 인터랙션으로 전환하여 독자를 플랫폼 내에 락인(Lock-in)시키고 새로운 비즈니스 가치 창출',
                  )}
                </p>
              </div>
            </div>

            {/* Main focus zone: 2 core PM challenges */}
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.3px', marginBottom: 16 }}>
              {t('2 Core Pillars I Owned as PM', 'PM으로서 주도한 2가지 핵심 과제')}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: <Icon.Click width={20} height={20} />,
                  num: '01',
                  title: t('Retaining Users via Contextual AI Interactions', '체류 시간(Dwell Time) 극대화를 위한 유저 여정 설계'),
                  action: t(
                    'Designed non-intrusive UI triggers and seamless conversational user flows within the article view to maximize user dwell time and engagement.',
                    '기사 읽기 흐름을 해치지 않는 맥락 기반의 AI 인터랙션 레이어 및 진입 트리거 최적화로 단방향 독자를 인게이지드 유저로 전환',
                  ),
                },
                {
                  icon: <Icon.Trend width={20} height={20} />,
                  num: '02',
                  title: t('Engineering Next-Gen Media Monetization Models', '지속 가능한 매체사 비즈니스 모델(BM) 구축'),
                  action: t(
                    'Moved away from traditional page-view reliant ads by architecting a high-margin advertising model tied to real-time conversational context and proprietary data.',
                    'PV(조회수) 중심의 단발성 광고 한계를 극복하기 위해, AI 대화 맥락과 매체사 고유 데이터를 결합한 고부가가치 대화형 광고 모델 기획',
                  ),
                },
              ].map((item, i) => (
                <div key={i} style={{ padding: '28px 26px', borderRadius: 16, background: 'rgba(248,205,72,0.04)', border: '1px solid rgba(248,205,72,0.18)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 20, right: 22, fontSize: 64, fontWeight: 900, color: 'rgba(248,205,72,0.07)', lineHeight: 1, userSelect: 'none' as const }}>{item.num}</div>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(248,205,72,0.1)', border: '1px solid rgba(248,205,72,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F8CD48', marginBottom: 16 } as React.CSSProperties}>
                    {item.icon}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#F8CD48', lineHeight: 1.35, marginBottom: 14 }}>{item.title}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, fontSize: 10, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase' as const, color: '#F8CD48', paddingTop: 3 }}>Action</span>
                    <p style={{ margin: 0, fontSize: 13.5, color: 'var(--fg-2)', lineHeight: 1.65 }}>{item.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Solution — UX Design */}
      <section className="border-b hairline" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
        <style>{`@keyframes caretBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <Reveal>
            <div className="mb-6">
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' as const, color: 'var(--acc)', marginBottom: 8 }}>Strategy &amp; Execution 1</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.5px', lineHeight: 1.15, marginBottom: 6 }}>
                {t('UX Strategy', 'UX 전략')}
              </div>
              <div style={{ fontSize: 16, color: 'var(--fg-2)' }}>
                {t('Bringing interaction into a static reading experience', '정적인 뉴스 읽기 경험에 상호작용을 심다')}
              </div>
            </div>
            <p style={{ color: 'var(--fg-2)', fontSize: 15, marginTop: -8, marginBottom: 40, maxWidth: '60ch' }}>
              {t(
                <>Rather than asking readers to seek out a new product, we embedded contextual entry points directly inside the article — AI questions, polls, and search prompts that feel native to the page. Each card is designed to pull readers naturally into conversation, without breaking the flow of what they were already reading.<br /><br /><em>The content itself is fully automated: the moment an article is published, the system determines which format is most likely to drive engagement for that piece — and generates the question, poll options, or search prompt to match.</em></>,
                <>독자에게 새로운 제품을 찾아오라고 요구하는 대신, 기사 내부에 맥락형 진입점을 직접 심었습니다. AI 질문 카드, 투표, 검색 프롬프트 — 모두 페이지에 자연스럽게 녹아드는 형태로 설계되어, 독자가 읽던 흐름을 끊지 않고 대화로 자연스럽게 유입될 수 있도록 했습니다.<br /><br /><em>콘텐츠 생성은 완전히 자동화되어 있습니다. 기사가 발행되는 순간, 시스템이 해당 기사에 가장 적합한 포맷(질문·투표·검색 프롬프트)을 판단하고 내용까지 자동으로 생성해 함께 삽입합니다.</em></>,
              )}
            </p>
          </Reveal>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
            <Reveal delay={0}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <NewsContextualCard />
                <span style={{ fontFamily: 'Pretendard, sans-serif', fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' as const, color: '#8592a0' }}>{t('Follow-up Question', '후속 질문')}</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <NewsContextualPoll />
                <span style={{ fontFamily: 'Pretendard, sans-serif', fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' as const, color: '#8592a0' }}>{t('Poll', '투표')}</span>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <NewsContextualSearch />
                <span style={{ fontFamily: 'Pretendard, sans-serif', fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' as const, color: '#8592a0' }}>{t('General Search', '일반 검색')}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. Solution — Monetization */}
      <ContextualAdDemo t={t} lang={lang} />

      {/* 5. Product */}
      <section
        className="border-b hairline"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel
            eyebrow={t('PRODUCT', '프로덕트')}
            title={t('NewsChat in action', 'NewsChat의 작동 방식')}
          />
          <div className="rounded-sm overflow-hidden">
            <CardGrid items={product} />
          </div>
        </div>
      </section>

      {/* 6. Reflections */}
      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel eyebrow={t('REFLECTIONS', '회고')} title={t('Key takeaways', '핵심 인사이트')} />
          <CardGrid items={learnings} />
        </div>
      </section>

      {/* Also executed */}
      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 pt-10 pb-10">
          <Reveal>
            <div className="eyebrow mb-6">{t('ALSO EXECUTED', '그 외 실행한 것들')}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {[
                { en: 'Prompt testing & iteration', kr: '프롬프트 테스팅 및 반복 개선' },
                { en: 'Explore page design', kr: '익스플로어 페이지 설계' },
                { en: 'A/B testing on UI placements', kr: 'UI 배치 A/B 테스트' },
                { en: 'User feedback loops & product iteration', kr: '유저 피드백 수집 및 제품 반복 개선' },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 40}>
                  <span style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    border: '1px solid var(--rule)',
                    borderRadius: 999,
                    fontSize: 13,
                    color: 'var(--fg-2)',
                    background: 'rgba(255,255,255,0.03)',
                  }}>
                    {t(item.en, item.kr)}
                  </span>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Next project + CTA */}
      <section className="border-t hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40 }}>
              {/* Left: CTA */}
              <div style={{ maxWidth: '52ch' }}>
                <h2 className="font-serif-display text-[24px] md:text-[36px] leading-tight tracking-tight mb-8" style={{ color: 'var(--ink)' }}>
                  {t(
                    'Want to talk product strategy, AI monetization, or 0→1 builds? Reach out anytime.',
                    '해당 프로젝트와 같은 프로덕트 전략, AI 수익화, 0→1 제품 구축에 대해 언제든 연락주세요.',
                  )}
                </h2>
                <a href="mailto:justina.yoo@gmail.com" className="btn-primary">
                  {t('Get in touch', '연락하기')} <Icon.Mail />
                </a>
              </div>
              {/* Right: next project */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' as const, color: 'var(--ink-3)', marginBottom: 8 }}>
                  {t('Next Project', '다음 프로젝트')}
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.3px', marginBottom: 4 }}>AEKO</div>
                <div style={{ fontSize: 14, color: 'var(--fg-2)', marginBottom: 16 }}>
                  {t('AEO platform for cross-border e-commerce brands', '이커머스 브랜드를 위한 AEO 플랫폼')}
                </div>
                <button
                  onClick={() => onNavigate ? onNavigate('aeko') : onBack()}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 24px', borderRadius: 999, background: 'var(--acc)', border: 'none', cursor: 'pointer', color: '#fff', fontWeight: 700, fontSize: 15 }}
                >
                  {t('View case study', '케이스 스터디 보기')}
                  <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </CaseStudyShell>
  );
}

/* ─── AEKO ─────────────────────────────────────────────── */
export function AekoCaseStudy({
  onBack,
  onNavigate,
  lang,
  onToggleLang,
  t,
}: {
  onBack: () => void;
  onNavigate?: (page: string) => void;
  lang: 'en' | 'kr';
  onToggleLang: () => void;
  t: T;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const timeline = [
    {
      phase: t('Dashboard & Feature Design', '대시보드 & 기능 설계'),
      title: t(
        'Designing for e-commerce owners, not data analysts',
        '데이터 분석가가 아닌 이커머스 사업자를 위한 설계',
      ),
      content: t(
        <>Competitive research showed most AEO tools were built for data-fluent marketers. Interviews with cross-border sellers surfaced one core need: <em><strong>"am I showing up when buyers ask AI about my category?"</strong></em> That question shaped every decision — the AI Visibility Score became a single scannable number, prompt tracking was scoped to buyer-intent queries, and the dashboard was designed for a 60-second read without a guide.</>,
        <>기존 AEO 및 SEO 분석 도구들을 경쟁 조사했습니다. 대부분 데이터에 익숙한 마케터를 위해 만들어진 도구들이었습니다. 크로스보더 셀러들과의 인터뷰를 통해 명확한 패턴이 드러났습니다. 그들에게 필요한 건 더 많은 대시보드가 아니었습니다. 딱 하나였습니다 — <em><strong>"내 카테고리에서 AI가 나를 언급하고 있는가?"</strong></em> 이 인사이트가 모든 기능 결정을 이끌었습니다. AI Visibility Score는 한눈에 파악할 수 있는 단일 수치로 설계했습니다. 프롬프트 추적은 각 제품 카테고리와 시장에 특화된 구매 의도 쿼리로 범위를 좁혔습니다. 가이드를 읽지 않아도 60초 안에 자신의 현황을 파악할 수 있는 대시보드를 목표로 했습니다.</>,
      ),
      tags: ['Competitive Research', 'User Interviews', 'Feature Scoping', 'Dashboard Design'],
      visual: <AekoVisibilityDashboard lang={lang} />,
    },
    {
      phase: t('AEKO Agents (MCP)', 'AEKO 에이전트 (MCP)'),
      title: t(
        'Making AI execution accessible to non-technical sellers',
        '비기술 셀러도 AI를 실행할 수 있도록',
      ),
      content: t(
        'The hardest product problem wasn\'t building the MCP integration — it was making it usable for e-commerce business owners who have never heard of MCP. The insight from interviews: sellers trust AI tools, but they won\'t set them up if it feels like a developer task. AEKO Agents was designed so that optimization actions — rewriting product descriptions, adjusting content to improve AI citation rates — could be triggered directly from the dashboard with one click, running via Claude Desktop or Cursor in the background. The seller sees the outcome, not the infrastructure. The technical complexity is entirely abstracted away.',
        '가장 어려운 프로덕트 문제는 MCP 통합을 구축하는 것이 아니었습니다. MCP가 뭔지 모르는 이커머스 사업자도 쓸 수 있게 만드는 것이었습니다. 인터뷰에서 얻은 인사이트: 셀러들은 AI 도구를 신뢰하지만, 개발자 작업처럼 느껴지면 설정하지 않습니다. AEKO Agents는 최적화 액션 — 제품 설명 재작성, AI 인용률 향상을 위한 콘텐츠 조정 — 을 대시보드에서 클릭 한 번으로 실행할 수 있도록 설계했습니다. Claude Desktop이나 Cursor가 백그라운드에서 실행되지만, 셀러가 보는 건 결과뿐입니다. 기술적 복잡성은 완전히 추상화했습니다.',
      ),
      tags: ['MCP Integration', 'Agent Design', 'Accessibility'],
      visual: <AekoOptimizeFlow lang={lang} />,
      visualLeft: true,
    },
  ];

  const bets: { icon: IconName; title: string; body: string }[] = [
    {
      icon: 'Bulb',
      title: t('The aha moment has to be immediate', '"아하" 순간은 즉시 일어나야 한다'),
      body: t(
        "Our hypothesis: sellers need to see their AI Visibility Score within minutes of signing up — before we ask for any commitment. Showing a brand they have zero mentions while a competitor ranks in every query should be the conversion event. We're testing whether the score alone creates urgency.",
        '가설은 이렇습니다. 셀러는 가입 몇 분 내에 AI Visibility Score를 봐야 하고, 그 전에는 어떤 약속도 요구하지 않아야 합니다. 경쟁사가 모든 쿼리에 등장하는데 자사는 멘션이 0이라는 사실을 보여주는 것 자체가 전환 이벤트여야 합니다. 점수만으로 긴급성을 만들 수 있는지 검증하고 있습니다.',
      ),
    },
    {
      icon: 'Zap',
      title: t('MCP will be the highest-retention surface', 'MCP가 가장 높은 리텐션 서피스가 될 것'),
      body: t(
        "We're betting that the AEKO Agents integration — running optimization in Claude Desktop and Cursor — will anchor power users more than the dashboard alone. When the tool lives inside an existing workflow, churn friction drops. This is our top hypothesis to validate post-MVP.",
        'AEKO Agents 통합, 즉 Claude Desktop과 Cursor 안에서 최적화를 실행하는 것이 대시보드 단독보다 파워 유저 리텐션이 높을 것이라고 보고 있습니다. 도구가 기존 워크플로우 안에 있으면 이탈 마찰이 줄어듭니다. MVP 이후 가장 먼저 검증할 가설입니다.',
      ),
    },
    {
      icon: 'Globe',
      title: t('Cross-market parity is the real differentiator', '크로스 마켓 동시 비교가 진짜 차별화 포인트'),
      body: t(
        'Every comparable tool tracks one market. Our bet is that showing a Korean brand how they appear in US ChatGPT versus Japanese Perplexity in the same view is the feature that justifies premium pricing and enterprise conversations. Multi-region is the moat we\'re building toward.',
        '경쟁 제품은 모두 단일 시장만 추적합니다. 한국 브랜드가 미국 ChatGPT와 일본 Perplexity에서 어떻게 나타나는지를 한 화면에서 보여주는 기능이 프리미엄 가격과 엔터프라이즈 영업을 정당화할 것이라고 보고 있습니다. 멀티 리전이야말로 저희가 쌓아가고 있는 해자입니다.',
      ),
    },
  ];

  return (
    <CaseStudyShell accentClass="acc-violet" onBack={onBack} lang={lang} onToggleLang={onToggleLang} t={t} pageTitle="AEKO Case Study — Justina Yoo" pageDescription="AEO platform for cross-border e-commerce brands.">
      <CaseStudyHero
        brandLabel="AEKO"
        logoSrc="/aeko-icon.svg"
        title="AEKO"
        tagline={t('AEO Intelligence · AI Visibility · Cross-Border E-commerce', 'AEO 인텔리전스 · AI 가시성 · 크로스보더 이커머스')}
        subtitle={t(
          'The analytics to execution layer for e-commerce businesses in the AI search era.',
          'AI 검색 시대,\n이커머스 비즈니스를 위한 분석에서 실행까지의 레이어.',
        )}
        productColor="#6b9fff"
        metrics={[
          { v: '5', l: t('AI Engines', 'AI 엔진') },
          { v: '4', l: t('Global Markets', '글로벌 시장') },
          { v: 'MCP', l: t('Integration', '통합') },
          { v: '0→1', l: t('Build', '빌드') },
        ]}
        heroRight={<AekoBannerHero lang={lang} />}
        t={t}
      />


      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <ContextBlock
            eyebrow={t('THE SHIFT', '변화')}
            headline={t(
              'Search has already moved to AI. The tools haven\'t caught up.',
              '검색은 이미 AI로 넘어갔습니다. 도구들은 아직 따라오지 못했습니다.',
            )}
            body={t(
              'Product discovery has shifted — shoppers no longer start on Google. They ask ChatGPT, Claude, and Perplexity. A handful of AEO analytics tools exist globally, but none with meaningful traction in Korea, and none built specifically for e-commerce brands selling cross-border. AEKO fills that gap.',
              '제품 탐색의 무게중심이 바뀌었습니다. 소비자들은 더 이상 구글에서 시작하지 않습니다. ChatGPT, Claude, Perplexity에 묻습니다. AEO 분석 도구들이 글로벌하게 등장하고 있지만, 한국에서 유의미한 점유율을 가진 곳은 없고, 크로스보더 이커머스 브랜드를 위해 특화된 도구는 더더욱 없습니다. AEKO는 그 공백을 채웁니다.',
            )}
          />
          <div className="grid md:grid-cols-2 gap-6 mt-14">
            <Reveal>
              <div style={{ padding: '28px', borderRadius: 16, background: 'var(--surface)', border: '1px solid var(--hairline)' }}>
                <div className="eyebrow mb-3">{t('Discovery', '리서치')}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 12, lineHeight: 1.3 }}>{t("The SEO playbook doesn't work for AI search", 'SEO 플레이북은 AI 검색에서 더 이상 통하지 않는다')}</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)', margin: 0 }}>{t('Interviewed cross-border e-commerce sellers who noticed their AI-era traffic was unpredictable and unattributable. The core finding: sellers had zero visibility into how ChatGPT, Claude, and Perplexity were recommending (or not recommending) their products. The same brand got completely different AI treatment depending on the market and language — and nobody knew why.', 'AI 시대 트래픽이 예측 불가능하고 추적이 안 된다는 점을 인지한 크로스보더 이커머스 셀러들과 인터뷰를 진행했습니다. 핵심 발견: 셀러들은 ChatGPT, Claude, Perplexity가 자사 제품을 어떻게 추천하는지 전혀 파악하지 못하고 있었습니다. 같은 브랜드가 시장과 언어에 따라 완전히 다른 AI 응답을 받았지만, 아무도 그 이유를 몰랐습니다.')}</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ padding: '28px', borderRadius: 16, background: 'var(--surface)', border: '1px solid var(--hairline)' }}>
                <div className="eyebrow mb-3">{t('Problem Framing', '문제 정의')}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 12, lineHeight: 1.3 }}>{t('Brands are flying blind in AI-driven search', '브랜드들은 AI 검색 환경에서 깜깜이로 운영 중')}</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)', margin: 0 }}>{t('AI engines have taken over top-of-funnel discovery for millions of shoppers, but there are no analytics tools built for it. Search Console exists for traditional SEO. There is no equivalent for AEO — Answer Engine Optimization. This gap is sharpest for cross-border sellers, where language and market context dramatically change AI outputs.', 'AI 엔진이 수백만 쇼퍼의 초기 제품 탐색을 장악했지만, 이를 위한 분석 도구는 존재하지 않습니다. 전통 SEO에는 Search Console이 있지만 AEO(답변 엔진 최적화)에는 동등한 도구가 없습니다. 언어와 시장 맥락에 따라 AI 결과가 크게 달라지는 크로스보더 셀러에게 이 격차가 가장 심각합니다.')}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel eyebrow={t('PROCESS', '프로세스')} title={t('Strategy & execution', '전략과 실행')} />
          <TimelineList steps={timeline} />
        </div>
      </section>

      <section
        className="border-b hairline"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel eyebrow={t('HYPOTHESES', '가설')} title={t('Key product bets', '핵심 제품 베팅')} />
          <CardGrid items={bets} />
        </div>
      </section>

      {/* Next project + CTA */}
      <section className="border-t hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-10">
              {/* Left: CTA */}
              <div style={{ maxWidth: '52ch' }}>
                <h2 className="font-serif-display text-[24px] md:text-[36px] leading-tight tracking-tight mb-8" style={{ color: 'var(--ink)' }}>
                  {t(
                    'Curious about AEKO or want to talk AEO strategy? Reach out anytime.',
                    '전략, AEO 카테고리, 얼리 유저에게서 배우고 있는 것에 대해 언제든 연락주세요.',
                  )}
                </h2>
                <a href="mailto:justina.yoo@gmail.com" className="btn-primary">
                  {t('Get in touch', '연락하기')} <Icon.Mail />
                </a>
              </div>
              {/* Right: next project */}
              <div className="text-left md:text-right">
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' as const, color: 'var(--ink-3)', marginBottom: 8 }}>
                  {t('Next Project', '다음 프로젝트')}
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.3px', marginBottom: 4 }}>ATTN</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 16 }}>
                  {t('US market intelligence for Korean investors', '한국 투자자를 위한 미국 시장 인텔리전스')}
                </div>
                <button
                  onClick={() => onNavigate ? onNavigate('attn') : onBack()}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 24px', borderRadius: 999, background: 'var(--acc)', border: 'none', cursor: 'pointer', color: '#fff', fontWeight: 700, fontSize: 15 }}
                >
                  {t('View case study', '케이스 스터디 보기')}
                  <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </CaseStudyShell>
  );
}

/* ─── ATTN Hero Publishing UI ───────────────────────────── */
function AttnHeroPublishing({ lang }: { lang: 'en' | 'kr' }) {
  const isKo = lang === 'kr';
  const canvasRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const t0Ref = useRef<number>(0);

  useEffect(() => {
    const LOOP = isKo ? 11500 : 9800;
    const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
    const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
    const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
    const fade = (T: number, s: number, d: number) => clamp((T - s) / d);
    const commas = (n: number) => Math.round(n).toLocaleString('en-US');
    const type = (full: string, T: number, s: number, cps: number) => {
      if (T < s) return { txt: '', active: false, started: false };
      const n = Math.floor((T - s) / 1000 * cps);
      const end = s + (full.length / cps) * 1000;
      return { txt: full.slice(0, Math.min(n, full.length)), active: T < end + 550, started: true };
    };

    const headStr = isKo
      ? '밴티코 클라우드 홀딩스(VNTQ), 7.39% 급락… 시총 약 93.7억 달러 증발'
      : 'Vantiqo Cloud Holdings (VNTQ) Plummets 7.39%, Market Cap Shrinks ~$9.37B';
    const HEAD_CPS = isKo ? 18 : 52;
    const bodyStr = isKo
      ? '밴티코 클라우드 홀딩스(NYSE: VNTQ)는 이번 거래일에 130.44달러로 마감하며 전일 대비 7.39% 하락했다. 이에 따라 시가총액은 약 136억 1천만 달러로 줄어, 하루 만에 약 9억 3,700만 달러가 증발했다. 이날 거래량은 1,311,134주를 기록했다. 규제 공시나 별도 발표에서 이번 급락의 특별한 촉매는 확인되지 않았다.'
      : 'Vantiqo Cloud Holdings (NYSE: VNTQ) closed at $130.44, down 7.39% on the session. Its market capitalization fell to roughly $13.61 billion, erasing about $937 million in a single day. Trading volume reached 1,311,134 shares. No specific catalyst for the decline has been identified in regulatory filings.';
    const BODY_CPS = isKo ? 44 : 130;
    const BODY_START = 5000;
    const bodyEnd = BODY_START + (bodyStr.length / BODY_CPS) * 1000;

    const factLabels = isKo
      ? ['주가', '등락률', '거래량', '시가총액']
      : ['Price', 'Change', 'Volume', 'Market Cap'];

    const tick = (now: number) => {
      if (!t0Ref.current) t0Ref.current = now;
      const T = (now - t0Ref.current) % LOOP;
      const el = canvasRef.current;
      if (!el) { rafRef.current = requestAnimationFrame(tick); return; }

      // logo
      const p = easeOut(clamp((T - 1200) / 480));
      const logoLeft = lerp(180, 56, p);
      const logoTop = lerp(232, 30, p);
      const logoScale = lerp(3, 1, p);
      const logo = el.querySelector<HTMLElement>('.attn-logo');
      if (logo) logo.style.cssText = `position:absolute;left:${logoLeft}px;top:${logoTop}px;transform:scale(${logoScale});transform-origin:left top;z-index:6;`;

      // candlestick bars
      const grow = (delay: number) => {
        const g = easeOut(clamp((T - 250 - delay) / 360));
        return `transform-box:fill-box;transform-origin:center bottom;transform:scaleY(${g});opacity:${g}`;
      };
      const barIds = ['g47','g48','g50','g51','g53','g54','g56','g57','g59','g60'];
      const barDelays: Record<string,number> = { g47:0,g48:0,g50:90,g51:90,g53:210,g54:210,g56:330,g57:330,g59:450,g60:450 };
      barIds.forEach(id => {
        const bar = el.querySelector<SVGElement>(`.${id}`);
        if (bar) bar.style.cssText = grow(barDelays[id]);
      });

      // chrome
      const chromeO = fade(T, 1500, 450);
      el.querySelectorAll<HTMLElement>('.attn-chrome').forEach(e => { e.style.opacity = String(chromeO); });

      // meta
      const metaO = fade(T, 1700, 400);
      const metaEl = el.querySelector<HTMLElement>('.attn-meta');
      if (metaEl) { metaEl.style.opacity = String(metaO); metaEl.style.transform = `translateY(${lerp(6,0,metaO)}px)`; }

      // headline
      const head = type(headStr, T, 1900, HEAD_CPS);
      const headEl = el.querySelector<HTMLElement>('.attn-head');
      if (headEl) {
        const ht = headEl.querySelector<HTMLElement>('.attn-head-text');
        if (ht) ht.textContent = head.txt;
        const caret = headEl.querySelector<HTMLElement>('.attn-caret');
        if (caret) caret.style.display = head.started && head.active ? 'inline-block' : 'none';
      }

      // byline
      const byO = fade(T, 4300, 450);
      const byEl = el.querySelector<HTMLElement>('.attn-byline');
      if (byEl) { byEl.style.opacity = String(byO); byEl.style.transform = `translateY(${lerp(5,0,byO)}px)`; }

      // facts
      const FS = 4550;
      const cnt = (target: number, i: number) => target * easeOut(clamp((T - FS - i * 170) / 950));
      const factVals = [
        { v: '$' + cnt(130.44, 0).toFixed(2), c: '#161512' },
        { v: '−' + cnt(7.39, 1).toFixed(2) + '%', c: '#C6203E' },
        { v: commas(cnt(1311134, 2)), c: '#161512' },
        { v: '$' + cnt(13.61, 3).toFixed(2) + 'B', c: '#161512' },
      ];
      el.querySelectorAll<HTMLElement>('.attn-fact').forEach((f, i) => {
        const o = fade(T, FS + i * 170, 350);
        f.style.opacity = String(o);
        f.style.transform = `translateY(${lerp(12,0,o)}px)`;
        const val = f.querySelector<HTMLElement>('.attn-fact-val');
        if (val) { val.textContent = factVals[i].v; val.style.color = factVals[i].c; }
      });

      // body
      const bodyT2 = type(bodyStr, T, BODY_START, BODY_CPS);
      const bodyEl = el.querySelector<HTMLElement>('.attn-body');
      if (bodyEl) {
        const bt = bodyEl.querySelector<HTMLElement>('.attn-body-text');
        if (bt) bt.textContent = bodyT2.txt;
        const caret = bodyEl.querySelector<HTMLElement>('.attn-caret');
        if (caret) caret.style.display = bodyT2.started && bodyT2.active ? 'inline-block' : 'none';
      }

      // committed
      const commEl = el.querySelector<HTMLElement>('.attn-committed');
      if (commEl) commEl.style.opacity = String(fade(T, bodyEnd + 300, 500));

      // progress
      const published = T > bodyEnd + 250;
      const pStart = 1200;
      const pct = Math.round(clamp((T - pStart) / (bodyEnd - pStart)) * 100);
      const progPct = published ? 100 : pct;
      const progColor = published ? '#5ACE81' : '#C6203E';
      const progLabel = published
        ? (isKo ? '발행 완료 ✓' : 'Published ✓')
        : (T < pStart ? (isKo ? '초기화 중' : 'Initializing') : (isKo ? `생성 중 ${pct}%` : `Generating ${pct}%`));
      const progBar = el.querySelector<HTMLElement>('.attn-prog-bar');
      if (progBar) { progBar.style.width = progPct + '%'; progBar.style.background = progColor; }
      const progLabelEl = el.querySelector<HTMLElement>('.attn-prog-label');
      if (progLabelEl) { progLabelEl.textContent = progLabel; progLabelEl.style.color = progColor; }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isKo]);

  const factLabels = isKo ? ['주가','등락률','거래량','시가총액'] : ['Price','Change','Volume','Market Cap'];
  const navItems = isKo ? ["오늘의 ATTN","SEC 공시","미국 정부 신호"] : ["Today's ATTN","SEC Filings","US Gov Signals"];
  const byline = isKo ? 'ATTN 데스크' : 'By ATTN Desk';
  const committed = isKo ? 'attn.today에 발행 완료 · 기사 ID 2026-07-10-VNTQ' : 'committed to attn.today · article id 2026-07-10-VNTQ';
  const statusLabel = isKo ? '자동 뉴스룸' : 'Automated Newsroom';
  const timestamp = isKo ? '2026년 7월 10일 · 오후 9:05 (ET)' : 'July 10, 2026 · 09:05 PM ET';
  const headFont = isKo ? "'Noto Serif KR','Newsreader',serif" : "'Newsreader',serif";

  return (
    <>
      <style>{`
        @keyframes attnBlink{0%,49%{opacity:1}50%,100%{opacity:0}}
        @keyframes attnPulse{0%,100%{opacity:.35;transform:scale(1)}50%{opacity:1;transform:scale(1.35)}}
        .attn-caret{display:inline-block;width:3px;height:.92em;background:#111;vertical-align:-2px;margin-left:2px;animation:attnBlink 1s step-end infinite;}
      `}</style>
      <div ref={canvasRef} style={{ position: 'relative', width: 720, background: '#fdfcfa', borderRadius: 6, boxShadow: '0 40px 90px -32px rgba(40,32,20,.5),0 2px 0 rgba(0,0,0,.04),0 0 0 1px rgba(20,16,10,.06)', overflow: 'hidden', fontFamily: "'IBM Plex Sans',sans-serif" }}>
        {/* status strip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 30px', background: '#111114', color: '#c9c6bf', fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#5ACE81', display: 'inline-block', animation: 'attnPulse 1.5s ease-in-out infinite' }} />
            <span>{statusLabel}</span>
          </div>
          <div className="attn-prog-label" style={{ fontWeight: 500, color: '#C6203E' }}>Initializing</div>
        </div>
        {/* progress bar */}
        <div style={{ height: 2, background: '#eceae4' }}>
          <div className="attn-prog-bar" style={{ height: '100%', width: '0%', background: '#C6203E' }} />
        </div>
        {/* article sheet */}
        <div style={{ position: 'relative', padding: '34px 56px 52px', height: 660, boxSizing: 'border-box' }}>
          {/* logo */}
          <div className="attn-logo" style={{ position: 'absolute', left: 180, top: 232, transformOrigin: 'left top', zIndex: 6 }}>
            <svg width="120" viewBox="0 0 62 18" fill="none">
              <rect y="3.788" width="3" height="14.211" rx="0.2" fill="#111"/>
              <rect x="10" y="3.788" width="3" height="14.211" rx="0.2" fill="#111"/>
              <rect x="3" y="3.788" width="2.842" height="7" rx="0.2" transform="rotate(-90 3 3.788)" fill="#111"/>
              <rect x="3" y="13.262" width="2.842" height="7" transform="rotate(-90 3 13.262)" fill="#111"/>
              <rect x="36.5" y="1.895" width="3" height="16.105" rx="0.2" fill="#111"/>
              <rect x="31" y="3.788" width="2.842" height="14" rx="0.2" transform="rotate(-90 31 3.788)" fill="#111"/>
              <rect x="20.5" y="1.895" width="3" height="16.105" rx="0.2" fill="#111"/>
              <rect x="15" y="3.788" width="2.842" height="14" rx="0.2" transform="rotate(-90 15 3.788)" fill="#111"/>
              <rect className="g51" x="51" y="0" width="1" height="6.632" rx="0.2" fill="#C6203E"/>
              <rect className="g54" x="54" y="3.789" width="1" height="6.632" rx="0.2" fill="#C6203E"/>
              <rect className="g57" x="57" y="7.579" width="1" height="6.632" rx="0.2" fill="#C6203E"/>
              <rect className="g48" x="48" y="0" width="1" height="18" rx="0.2" fill="#5ACE81"/>
              <rect className="g60" x="60" y="0" width="1" height="18" rx="0.2" fill="#5ACE81"/>
              <rect className="g50" x="50" y="0.947" width="3" height="4.737" rx="0.2" fill="#C6203E"/>
              <rect className="g53" x="53" y="4.737" width="3" height="4.737" rx="0.2" fill="#C6203E"/>
              <rect className="g56" x="56" y="8.526" width="3" height="4.737" rx="0.2" fill="#C6203E"/>
              <rect className="g59" x="59" y="0.947" width="3" height="16.105" rx="0.2" fill="#5ACE81"/>
              <rect className="g47" x="47" y="0.947" width="3" height="16.105" rx="0.2" fill="#5ACE81"/>
            </svg>
          </div>
          {/* masthead nav */}
          <div className="attn-chrome" style={{ opacity: 0, position: 'absolute', top: 40, right: 56, display: 'flex', gap: 22, fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: '.06em', color: '#54514a' }}>
            {navItems.map((n, i) => <span key={i}>{n}</span>)}
          </div>
          <div className="attn-chrome" style={{ opacity: 0, position: 'absolute', top: 74, left: 56, right: 56, height: 1, background: '#e9e6df' }} />
          <div className="attn-chrome" style={{ opacity: 0, position: 'absolute', top: 73, left: 56, display: 'flex', gap: 2 }}>
            <span style={{ width: 14, height: 3, background: '#C6203E', display: 'inline-block' }} />
            <span style={{ width: 8, height: 3, background: '#111', display: 'inline-block' }} />
            <span style={{ width: 20, height: 3, background: '#5ACE81', display: 'inline-block' }} />
          </div>
          {/* article body */}
          <div style={{ paddingTop: 78 }}>
            {/* meta row */}
            <div className="attn-meta" style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, fontFamily: "'IBM Plex Mono',monospace" }}>
              <span style={{ padding: '3px 9px', background: '#111114', color: '#fff', fontSize: 11, fontWeight: 500, letterSpacing: '.1em', borderRadius: 3 }}>NYSE</span>
              <span style={{ fontSize: 15, fontWeight: 600, color: '#111', letterSpacing: '.04em' }}>VNTQ</span>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#C6203E', display: 'inline-block' }} />
              <span style={{ fontSize: 12, color: '#8a857a', letterSpacing: '.04em' }}>{timestamp}</span>
            </div>
            {/* headline */}
            <h1 className="attn-head" style={{ margin: '0 0 16px', fontFamily: headFont, fontWeight: 500, fontSize: 41, lineHeight: 1.12, letterSpacing: '-.01em', color: '#161512', maxWidth: 760 }}>
              <span className="attn-head-text"></span>
              <span className="attn-caret" style={{ display: 'none' }} />
            </h1>
            {/* byline */}
            <div className="attn-byline" style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 30, fontSize: 13, color: '#77726a' }}>
              <span style={{ fontWeight: 600, color: '#4a463f' }}>{byline}</span>
            </div>
            {/* key facts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid #eceae4', borderBottom: '1px solid #eceae4', marginBottom: 32 }}>
              {factLabels.map((label, i) => (
                <div key={i} className="attn-fact" style={{ opacity: 0, padding: '18px 20px', borderLeft: '1px solid #f1efe9' }}>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase', color: '#a29c90', marginBottom: 8 }}>{label}</div>
                  <div className="attn-fact-val" style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 23, fontWeight: 500, letterSpacing: '-.01em', color: '#161512' }}>—</div>
                </div>
              ))}
            </div>
            {/* body copy */}
            <p className="attn-body" style={{ margin: 0, fontFamily: headFont, fontSize: 19, lineHeight: 1.66, color: '#2c2a25', maxWidth: 720 }}>
              <span className="attn-body-text"></span>
              <span className="attn-caret" style={{ display: 'none' }} />
            </p>
            {/* footer */}
            <div className="attn-committed" style={{ opacity: 0, marginTop: 34, display: 'flex', alignItems: 'center', gap: 9, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, letterSpacing: '.05em', color: '#8a857a' }}>
              <span style={{ color: '#5ACE81' }}>✓</span>
              <span>{committed}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── ATTN ─────────────────────────────────────────────── */
export function AttnCaseStudy({
  onBack,
  lang,
  onToggleLang,
  t,
}: {
  onBack: () => void;
  lang: 'en' | 'kr';
  onToggleLang: () => void;
  t: T;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const pillars: { icon: IconName; title: string; body: string }[] = [
    {
      icon: 'Trend',
      title: t('Market news', '시장 뉴스'),
      body: t(
        'Breaking US market coverage translated and delivered to Korean investors within minutes — fast enough to inform intraday decisions on small-cap stocks and earnings plays.',
        '미국 시장 속보를 수분 내에 한국어로 번역하여 전달합니다 — 스몰캡 종목과 실적 관련 당일 매매 의사결정에 충분한 속도입니다.',
      ),
    },
    {
      icon: 'News',
      title: t('SEC filing analysis', 'SEC 공시 분석'),
      body: t(
        'SEC disclosures are dense and in English. ATTN extracts the signal — material changes, insider moves, risk flags — and surfaces them in structured Korean-language summaries.',
        'SEC 공시는 밀도 높은 영문 문서입니다. ATTN은 여기서 중대 변경, 내부자 거래, 리스크 신호 등 핵심 시그널을 추출하여 구조화된 한국어 요약으로 제공합니다.',
      ),
    },
    {
      icon: 'Globe',
      title: t('US government signals', '미국 정부 시그널'),
      body: t(
        "Policy shifts, Fed communications, and regulatory moves that affect US markets. ATTN tracks and translates these signals so Korean investors aren't the last to know.",
        '정책 변화, Fed 커뮤니케이션, 미국 시장에 영향을 주는 규제 움직임을 다룹니다. ATTN이 이러한 시그널을 추적하고 번역하여 한국 투자자가 뒤늦게 알게 되는 일을 방지합니다.',
      ),
    },
  ];

  const timeline = [
    {
      phase: t('Product Strategy', '프로덕트 전략'),
      title: t('Sourcing signals Korean investors can\'t access', '한국 투자자가 접근하기 어려운 정보를 직접 수집'),
      content: t(
        'Identified the core information gap: SEC filings, earnings signals, company updates from LinkedIn, and US market news were all publicly available — but entirely in English, scattered across sources Korean investors had no workflow to monitor. ATTN was designed to aggregate these sources, extract what\'s market-relevant, and curate it into readable Korean articles.',
        '핵심 정보 격차를 정의했습니다. SEC 공시, 실적 시그널, LinkedIn의 기업 업데이트, 미국 시장 뉴스는 모두 공개된 정보지만, 전부 영어로 흩어져 있어 한국 투자자가 체계적으로 모니터링하기 어렵습니다. ATTN은 이 소스들을 수집하고, 시장에 유의미한 내용을 추려, 읽기 쉬운 한국어 아티클로 큐레이션하도록 설계했습니다.',
      ),
      tags: ['Product Strategy', 'Content Architecture', 'Source Aggregation'],
    },
    {
      phase: t('Build', '빌드'),
      title: t(
        'AI pipeline from raw source to Korean article',
        '원문 소스에서 한국어 아티클까지',
      ),
      content: t(
        'Built an AI-native pipeline using multi-model orchestration and MCP servers to ingest English-language financial sources — SEC filings, market news, LinkedIn company signals — extract what\'s relevant, and produce structured Korean-language articles. Multi-model orchestration handles each step: extraction, summarization, translation, and editorial formatting.',
        '멀티 모델 오케스트레이션과 MCP 서버를 활용해 영문 금융 소스(SEC 공시, 시장 뉴스, LinkedIn 기업 시그널)를 수집하고, 유의미한 내용을 추출하여 구조화된 한국어 아티클로 변환하는 AI 파이프라인을 구축했습니다. 추출, 요약, 번역, 편집 포맷팅 각 단계를 목적에 맞는 모델이 처리합니다.',
      ),
      tags: ['Multi-Model AI', 'MCP Server', 'Docker', '3rd Party APIs', 'AI Orchestration'],
    },
    {
      phase: t('Outcome', '성과'),
      title: t(
        "South Korea's #1 US stock market information media",
        '한국 1위 미국 주식 시장 정보 미디어',
      ),
      content: t(
        "ATTN established itself as the leading Korean-language platform for US market intelligence. The platform covers SEC filings, government signals, and market news — closing the information gap that had left Korean investors at a structural disadvantage in US markets.",
        'ATTN은 미국 시장 인텔리전스 분야의 대표 한국어 플랫폼으로 자리 잡았습니다. SEC 공시, 정부 시그널, 시장 뉴스를 빠르게 전달하며, 한국 투자자가 미국 주식 시장에서 겪던 구조적 정보 격차를 해소하고 있습니다.',
      ),
      tags: ['Product Launch', 'Market Leadership', 'SEO', 'Growth'],
    },
  ];

  const learnings: { icon: IconName; title: string; body: string }[] = [
    {
      icon: 'Bulb',
      title: t('Speed is the product', '속도가 곧 제품'),
      body: t(
        'In financial information, a 10-minute lag is the same as no information. Every infrastructure decision — from MCP server design to deployment architecture — was made to minimize time from source to reader.',
        '금융 정보에서 10분 지연은 정보가 없는 것과 마찬가지입니다. MCP 서버 설계부터 배포 아키텍처까지, 모든 인프라 결정은 소스에서 독자까지의 시간을 최소화하는 데 초점을 맞췄습니다.',
      ),
    },
    {
      icon: 'Target',
      title: t('Translation is more than language', '번역은 단순한 언어 변환 이상'),
      body: t(
        "Accurate Korean translation wasn't enough. We had to localize financial terminology, contextualize US market conventions, and adapt formatting for how Korean investors read and act on information.",
        '정확한 한국어 번역만으로는 부족했습니다. 금융 용어를 현지화하고, 미국 시장 관행에 맥락을 더하고, 한국 투자자가 정보를 읽고 행동으로 옮기는 방식에 맞게 포맷을 조정해야 했습니다.',
      ),
    },
    {
      icon: 'Zap',
      title: t('The narrower the niche, the clearer the product', '니치가 명확할수록 제품이 선명해진다'),
      body: t(
        'Targeting Korean retail investors in US stocks — not "global investors" — forced every content decision to be specific. Which sources to pull, what to surface, how to frame it. A vague audience produces a vague product.',
        '미국 주식에 투자하는 한국 개인 투자자를 타깃으로 좁히자, 모든 콘텐츠 결정이 구체적으로 바뀌었습니다. 어떤 소스를 수집하고, 무엇을 노출하고, 어떻게 전달할지. 타깃이 흐리면 제품도 흐려집니다.',
      ),
    },
  ];

  return (
    <CaseStudyShell accentClass="acc-sky" onBack={onBack} lang={lang} onToggleLang={onToggleLang} t={t} pageTitle="ATTN Case Study — Justina Yoo" pageDescription="US market intelligence for Korean investors.">
      <CaseStudyHero
        brandLabel="ATTN"
        title="ATTN"
        tagline={t('US Market Intelligence · AI Translation · Korean Investors', '미국 시장 인텔리전스 · AI 번역 · 한국 투자자')}
        subtitle={t(
          'Closing the information gap between Korean investors and US markets — SEC filings, government signals, and market news, translated and delivered fast enough to act on.',
          '한국 투자자와 미국 시장 간 정보 격차 해소 — SEC 공시, 정부 시그널, 시장 뉴스를 빠르게 번역해 실행 가능한 형태로 전달.',
        )}
        productColor="#5ACE81"
        metrics={[
          { v: 'Fast', l: t('Delivery', '빠른 전달') },
          { v: 'SEC + Gov', l: t('Signal Sources', '시그널 소스') },
          { v: '0→1', l: t('Build', '빌드') },
        ]}
        heroRight={
          <div className="hidden lg:block" style={{ zoom: 0.55, transformOrigin: 'top center' }}>
            <AttnHeroPublishing lang={lang} />
          </div>
        }
        t={t}
      />

      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <ContextBlock
            eyebrow={t('THE PROBLEM', '문제')}
            headline={t(
              'Korean investors are the last to know about US market moves.',
              '한국 투자자는 미국 시장 움직임을 가장 늦게 알게 된다.',
            )}
            body={t(
              'SEC filings, earnings calls, and government policy signals move small-cap stocks within minutes of publication. All of it is in English, scattered across dozens of sources. By the time Korean investors found and parsed the information, the trade window had already closed.',
              'SEC 공시, 실적 발표, 정부 정책 시그널은 발표 수분 내에 스몰캡 종목을 움직입니다. 이 모든 정보가 영문으로 수십 개 소스에 흩어져 있습니다. 한국 투자자가 이 정보를 찾아 분석할 때쯤이면 매매 기회는 이미 사라진 뒤였습니다.',
            )}
            rows={[
              { label: t('Language barrier to US financial sources', '미국 금융 소스 언어 장벽'), value: t('Severe', '심각') },
              { label: t('SEC filings available in Korean', '한국어로 제공되는 SEC 공시'), value: t('Zero', '없음') },
              { label: t('Time to act on US small-cap news', '미국 스몰캡 뉴스 실행 시간'), value: t('Minutes', '수분') },
              { label: t('Korean retail investors in US equities', '미국 주식 한국 개인 투자자'), value: t('Growing fast', '급증 중') },
            ]}
          />
        </div>
      </section>

      <section
        className="border-b hairline"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel
            eyebrow={t('PRODUCT', '프로덕트')}
            title={t('Three pillars of US market intelligence', '미국 시장 인텔리전스의 세 축')}
          />
          <CardGrid items={pillars} />
        </div>
      </section>

      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel eyebrow={t('PROCESS', '프로세스')} title={t('Planning & Execution', '기획과 구현')} />
          <TimelineList steps={timeline} />
        </div>
      </section>

      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel eyebrow={t('REFLECTIONS', '회고')} title={t('Key takeaways', '핵심 인사이트')} />
          <CardGrid items={learnings} />
        </div>
      </section>

      <CTASection
        title={t('Want to talk through this?', '이 프로젝트에 관심 있으시다면 문의 주세요.')}
        body={t(
          'Happy to go deeper on the AI pipeline, financial media strategy, or what it takes to build for speed-sensitive markets.',
          'AI 파이프라인, 금융 미디어 전략, 속도가 중요한 시장을 위한 제품 구축에 대해 더 자세히 이야기 나눌 수 있습니다.',
        )}
        ctaLabel={t('Get in touch', '연락하기')}
      />
    </CaseStudyShell>
  );
}

/* ─── AI Workflow Stack ──────────────────────────────────── */
export function WorkflowCaseStudy({
  onBack,
  lang,
  onToggleLang,
  t,
}: {
  onBack: () => void;
  lang: 'en' | 'kr';
  onToggleLang: () => void;
  t: T;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const agents: { icon: IconName; title: string; body: string }[] = [
    {
      icon: 'Zap',
      title: t('Sales & Marketing Agent', '세일즈 & 마케팅 에이전트'),
      body: t(
        'Built a Claude-powered MCP plugin for AEKO that automates outbound sales research, generates personalized pitch decks, drafts outreach emails, and tracks brand leads — replacing hours of manual prospecting with a single conversational workflow.',
        'AEKO용 Claude 기반 MCP 플러그인을 구축했습니다. 아웃바운드 세일즈 리서치 자동화, 맞춤형 피치덱 생성, 아웃리치 이메일 작성, 브랜드 리드 추적까지 — 수시간의 수동 영업 준비를 하나의 대화형 워크플로우로 대체했습니다.',
      ),
    },
    {
      icon: 'Users',
      title: t('Junior PM Agent', '주니어 PM 에이전트'),
      body: t(
        'A Claude Code skill that acts as a junior PM for day-to-day product work — writes PRDs, drafts user stories, builds feature specs, updates roadmaps, and prioritizes backlogs. Designed to handle the execution layer so I can focus on strategy and decisions.',
        'Claude Code 스킬로 구축한 주니어 PM 에이전트입니다. PRD 작성, 유저 스토리 초안, 기능 스펙 작성, 로드맵 업데이트, 백로그 우선순위 정리를 담당합니다. 실행 레이어를 자동화하여 전략과 의사결정에 집중할 수 있도록 설계했습니다.',
      ),
    },
    {
      icon: 'Globe',
      title: t('Content & Research Automation', '콘텐츠 & 리서치 자동화'),
      body: t(
        'End-to-end content pipeline agents — from topic research and SEO/AEO scoring to bilingual article writing, fact-checking, and publishing. Each agent is a modular Claude Code skill that chains into the next, replacing a multi-person editorial workflow.',
        '주제 리서치와 SEO/AEO 스코어링부터 이중 언어 기사 작성, 팩트체킹, 발행까지 전 과정을 아우르는 콘텐츠 파이프라인 에이전트입니다. 각 에이전트는 모듈형 Claude Code 스킬로 다음 단계로 연결되며, 여러 명이 필요했던 편집 워크플로우를 대체합니다.',
      ),
    },
  ];

  const principles: { icon: IconName; title: string; body: string }[] = [
    {
      icon: 'Bulb',
      title: t('Agents as teammates, not tools', '에이전트는 도구가 아닌 팀원'),
      body: t(
        'Each agent is designed with a specific role and judgment scope — not just a prompt wrapper. The junior PM agent knows when to draft vs. when to ask for direction. The sales agent adapts tone by market.',
        '각 에이전트는 단순 프롬프트 래퍼가 아닌 특정 역할과 판단 범위를 갖도록 설계했습니다. 주니어 PM 에이전트는 초안을 작성할 때와 방향을 물어볼 때를 스스로 구분합니다. 세일즈 에이전트는 시장별로 톤을 조정합니다.',
      ),
    },
    {
      icon: 'Target',
      title: t('MCP as the integration layer', 'MCP를 통합 레이어로'),
      body: t(
        'MCP server integrations let agents operate inside existing tools — Claude Desktop, Cursor, the terminal — rather than requiring a separate UI. This keeps agents embedded in the workflow where decisions happen.',
        'MCP 서버 통합으로 에이전트가 별도 UI 없이 기존 도구(Claude Desktop, Cursor, 터미널) 안에서 작동합니다. 의사결정이 일어나는 워크플로우 안에 에이전트를 내장하는 것이 핵심입니다.',
      ),
    },
    {
      icon: 'Bar',
      title: t('Compounding leverage', '복리적 레버리지'),
      body: t(
        'Each agent built frees up capacity to build the next one. The junior PM agent freed hours per week, which went into building the sales agent. The content pipeline freed editorial time to focus on product. This is the real ROI of agentic tooling.',
        '에이전트를 하나 만들 때마다 다음 에이전트를 만들 여유가 생깁니다. 주니어 PM 에이전트로 주당 수시간을 확보하여 세일즈 에이전트를 구축했습니다. 콘텐츠 파이프라인으로 편집 시간을 절약하여 프로덕트에 집중할 수 있었습니다. 이것이 에이전틱 툴링의 진정한 ROI입니다.',
      ),
    },
  ];

  return (
    <CaseStudyShell accentClass="acc-violet" onBack={onBack} lang={lang} onToggleLang={onToggleLang} t={t} pageTitle="Workflow Case Study — Justina Yoo" pageDescription="AI-powered workflow automation.">
      <CaseStudyHero
        brandLabel={t('AI Workflow Stack', 'AI 워크플로우 스택')}
        subLabels={[t('Agentic · MCP · Claude', '에이전틱 · MCP · Claude'), 'Panomix & AEKO Intelligence']}
        title={t('AI Workflow Stack', 'AI 워크플로우 스택')}
        subtitle={t(
          'Custom AI agents and MCP integrations built on Claude at Panomix / AEKO Intelligence — replacing manual workflows with autonomous, composable tooling.',
          'Panomix / AEKO Intelligence에서 Claude 기반으로 구축한 커스텀 AI 에이전트와 MCP 통합입니다. 수동 워크플로우를 자율적이고 조합 가능한 툴링으로 대체합니다.',
        )}
        meta={[
          { label: t('Platform', '플랫폼'), value: 'Claude · Claude Code · MCP' },
          { label: t('Context', '맥락'), value: 'Panomix & AEKO Intelligence' },
        ]}
        t={t}
      />

      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel
            eyebrow={t('AGENTS', '에이전트')}
            title={t('What I built', '무엇을 만들었는가')}
            kicker={t(
              'Three agent systems built on Claude to automate the work that used to take a team.',
              'Claude 기반으로 구축한 세 가지 에이전트 시스템으로, 팀이 하던 일을 자동화합니다.',
            )}
          />
          <CardGrid items={agents} />
        </div>
      </section>

      <section
        className="border-b hairline"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel
            eyebrow={t('APPROACH', '접근')}
            title={t('How I think about agents', '에이전트에 대한 사고방식')}
          />
          <CardGrid items={principles} />
        </div>
      </section>

      <CTASection
        title={t('Want to talk agentic workflows?', '에이전틱 워크플로우 도입에 관심 있으시다면 문의 주세요.')}
        body={t(
          'Happy to share how I build and ship with AI agents — from architecture to daily use.',
          'AI 에이전트로 어떻게 제품을 만들고 운영하는지 공유할 수 있습니다 — 아키텍처부터 일상 활용까지.',
        )}
        ctaLabel={t('Get in touch', '연락하기')}
      />
    </CaseStudyShell>
  );
}

/* ─── NewsChat Preview Card ─────────────────────────────── */
function NewsChatPreviewCard({ lang }: { lang: 'en' | 'kr' }) {
  const isKo = lang === 'kr';
  return (
    <div className="preview-card" style={{ position: 'relative', width: '100%', maxWidth: 540, borderRadius: 20, background: '#18191f', padding: '36px 36px 28px', boxShadow: '0 32px 80px -20px rgba(0,0,0,.6)', fontFamily: "Pretendard,'Apple SD Gothic Neo',sans-serif", transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease', border: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Outlink icon */}
      <svg style={{ position: 'absolute', top: 24, right: 24, opacity: 0.35 }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
      {/* Logo row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        <img src="/newschat-icon.svg" alt="NewsChat" style={{ width: 52, height: 52 }} />
        <span style={{ fontSize: 36, fontWeight: 800, color: '#ffffff', letterSpacing: -1.2, lineHeight: 1 }}>
          NewsChat<span style={{ color: '#7c70d8' }}>.</span>
        </span>
      </div>
      {/* Tagline */}
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.8, textTransform: 'uppercase' as const, color: '#8b9199', marginBottom: 20 }}>
        {isKo ? '국내 언론사 최초의 대화형 생성형 AI' : "Korea's first conversational GenAI for news publishers"}
      </div>
      {/* Body */}
      <p style={{ margin: '0 0 28px', fontSize: 16, fontWeight: 600, lineHeight: 1.6, color: '#dfe2e7' }}>
        {isKo
          ? '단순 챗봇이 아닙니다. 투표, 맥락 카드, 검색 프롬프트로 시작되는 몰입형 AI 뉴스 경험.'
          : 'Not a chatbot — an immersive AI experience triggered by polls, contextual cards, and search prompts embedded in the news reading flow.'}
      </p>
      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {[
          { v: '1M',   l: isKo ? 'MAU 5개월 달성' : 'MAU in 5 months' },
          { v: '250%', l: isKo ? '체류 시간 증가' : 'Increase in dwell time' },
          { v: '10%',  l: isKo ? '맥락 광고 CTR' : 'Contextual ad CTR' },
        ].map(({ v, l }, i) => (
          <div key={i} style={{ padding: '20px 16px 12px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: '#F8CD48', lineHeight: 1, marginBottom: 8 }}>{v}</div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase' as const, color: '#8b9199', lineHeight: 1.4 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── AEKO Preview Card ─────────────────────────────────── */
function AekoPreviewCard({ lang }: { lang: 'en' | 'kr' }) {
  const isKo = lang === 'kr';
  return (
    <div className="preview-card" style={{ position: 'relative', width: '100%', maxWidth: 540, borderRadius: 20, background: '#18191f', padding: '36px 36px 28px', boxShadow: '0 32px 80px -20px rgba(0,0,0,.6)', fontFamily: "Pretendard,'Apple SD Gothic Neo',sans-serif", transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease', border: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Outlink icon */}
      <svg style={{ position: 'absolute', top: 24, right: 24, opacity: 0.35 }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
      {/* Logo row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        <img src="/aeko-icon.svg" alt="AEKO" style={{ width: 52, height: 52 }} />
        <span style={{ fontSize: 36, fontWeight: 800, color: '#ffffff', letterSpacing: -1.2, lineHeight: 1 }}>
          AEKO<span style={{ color: '#6b9fff' }}>.</span>
        </span>
      </div>
      {/* Tagline */}
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.8, textTransform: 'uppercase' as const, color: '#8b9199', marginBottom: 20 }}>
        {isKo ? 'AEO 인텔리전스 · AI 가시성 · 크로스보더 이커머스' : 'AEO Intelligence · AI Visibility · Cross-Border E-commerce'}
      </div>
      {/* Body */}
      <p style={{ margin: '0 0 28px', fontSize: 16, fontWeight: 600, lineHeight: 1.6, color: '#dfe2e7' }}>
        {isKo
          ? 'AI 검색 시대, 이커머스 비즈니스를 위한 분석에서 실행까지의 레이어.'
          : 'The analytics to execution layer for e-commerce businesses in the AI search era.'}
      </p>
      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {[
          { v: '5',    l: isKo ? 'AI 엔진' : 'AI Engines' },
          { v: '4',    l: isKo ? '글로벌 시장' : 'Global Markets' },
          { v: 'MCP',  l: isKo ? '통합' : 'Integration' },
          { v: '0→1',  l: isKo ? '빌드' : 'Build' },
        ].map(({ v, l }, i) => (
          <div key={i} style={{ padding: '20px 12px 12px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#6b9fff', lineHeight: 1, marginBottom: 8 }}>{v}</div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase' as const, color: '#8b9199', lineHeight: 1.4 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Product Strategy & 0→1 ───────────────────────────── */
export function StrategyCaseStudy({
  onBack,
  onNavigate,
  lang,
  onToggleLang,
  t,
}: {
  onBack: () => void;
  onNavigate?: (page: string) => void;
  lang: 'en' | 'kr';
  onToggleLang: () => void;
  t: T;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const examples: { icon: IconName; logo?: string; title: string; body: string }[] = [
    {
      icon: 'Zap',
      logo: '/aeko-icon.svg',
      title: 'AEKO',
      body: t(
        'Owned end-to-end from concept to MVP as sole PM — vision, feature scoping, prototype, engineering/design leadership.',
        '유일한 PM으로서 컨셉부터 MVP까지 전 과정을 주도했습니다 — 비전 수립, 기능 범위 설정, 프로토타입, 엔지니어링/디자인 리더십.',
      ),
    },
    {
      icon: 'Trend',
      logo: '/newschat-logo.svg',
      title: 'NewsChat',
      body: t(
        'Led from hypothesis to 1M MAU in 5 months — user interviews, problem framing, PMF signals, publisher partnerships.',
        '가설에서 5개월 만에 100만 MAU까지 이끌었습니다 — 사용자 인터뷰, 문제 정의, PMF 신호 포착, 퍼블리셔 파트너십.',
      ),
    },
    {
      icon: 'Target',
      logo: '/attn-logo.svg',
      title: 'ATTN',
      body: t(
        'Defined the 3-pillar content strategy (SEC filings, gov signals, market news) that became the product\'s core differentiator.',
        '제품의 핵심 차별화 요소가 된 3축 콘텐츠 전략(SEC 공시, 정부 시그널, 시장 뉴스)을 정의했습니다.',
      ),
    },
    {
      icon: 'FileText',
      title: t('Sales & Investor Decks', '상품소개서 & 투자 덱'),
      body: t(
        'Created product introduction decks (상품소개서) for client-facing sales and investor decks for fundraising — translating product vision and traction into narratives tailored to each audience.',
        '클라이언트 세일즈용 상품소개서와 투자 유치용 덱을 제작했습니다 — 제품 비전과 성과를 각 대상에 맞는 내러티브로 전환했습니다.',
      ),
    },
  ];

  const principles: { icon: IconName; title: string; body: string }[] = [
    {
      icon: 'Bulb',
      title: t('Start with the activation loop', '활성화 루프부터 설계'),
      body: t(
        'Design the path from signup to aha moment before anything else.',
        '가입에서 "아하" 순간까지의 경로를 다른 무엇보다 먼저 설계합니다.',
      ),
    },
    {
      icon: 'Bar',
      title: t('Validate with behavior, not surveys', '설문이 아닌 행동으로 검증'),
      body: t(
        'PMF signals come from correlated behavior clusters, not stated preferences.',
        'PMF 신호는 사용자의 진술이 아닌 상관된 행동 클러스터에서 나옵니다.',
      ),
    },
    {
      icon: 'Target',
      title: t('Ship the smallest thing that teaches', '배울 수 있는 가장 작은 것을 출시'),
      body: t(
        "The goal of v1 isn't to be complete, it's to generate the data that shapes v2.",
        'v1의 목표는 완성이 아니라, v2를 만들어줄 데이터를 생성하는 것입니다.',
      ),
    },
  ];

  return (
    <CaseStudyShell accentClass="acc-indigo" onBack={onBack} lang={lang} onToggleLang={onToggleLang} t={t} pageTitle="Product Strategy & 0→1 — Justina Yoo" pageDescription="From zero to product-market fit. AEKO, NewsChat, and ATTN case studies.">
      <CaseStudyHero
        brandLabel={t('Product Strategy & 0→1', '프로덕트 전략 & 0→1')}
        title={t('Product Strategy & 0→1', '프로덕트 전략 & 0→1')}
        tagline={t('0→1 · Product-Market Fit · Cross-functional Leadership', '0→1 · 프로덕트-마켓 핏 · 크로스펑셔널 리더십')}
        subtitle={t(
          'From zero to product-market fit — defining what to build, for whom, and how to win.',
          '제로에서 프로덕트-마켓 핏까지 — 무엇을 만들고, 누구를 위해, 어떻게 이길지 정의합니다.',
        )}
        t={t}
      />

      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <style>{`
            .preview-card-btn:hover .preview-card {
              transform: translateY(-6px);
              box-shadow: 0 48px 100px -20px rgba(0,0,0,.8), 0 0 0 1px rgba(255,255,255,0.12);
              border-color: rgba(255,255,255,0.14) !important;
            }
            .preview-card-btn:hover .preview-card svg {
              opacity: 0.8 !important;
            }
          `}</style>
          <SectionLabel eyebrow={t('CASE STUDY VISUALS', '케이스 스터디 비주얼')} title={t('In practice', '실제 제품에서')} />

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 md:pt-14">
              {/* NewsChat column */}
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-serif-display text-[20px] md:text-[26px] leading-tight tracking-tight mb-3" style={{ color: 'var(--ink)' }}>
                    {t('Turning passive reading into interaction', '정적인 읽기를 상호작용으로')}
                  </h3>
                  <p className="text-[14px] leading-relaxed mb-4" style={{ color: 'var(--ink-2)' }}>
                    {t(
                      'Embedded AI follow-up questions, polls, and search prompts directly inside articles — contextual entry points that drove 250% dwell time and 10% CTR without interrupting the reading experience.',
                      '기사 내부에 AI 후속 질문, 투표, 검색 프롬프트를 직접 심어 체류 시간 250%, CTR 10%를 달성했습니다. 독자의 흐름을 끊지 않는 맥락형 진입점 설계.',
                    )}
                  </p>
                </div>
                <button
                  className="preview-card-btn"
                  onClick={() => onNavigate ? onNavigate('newschat') : onBack()}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'block', textAlign: 'left' }}
                  aria-label={t('View NewsChat case study', 'NewsChat 케이스 스터디 보기')}
                >
                  <NewsChatPreviewCard lang={lang} />
                </button>
              </div>
              {/* AEKO column */}
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-serif-display text-[20px] md:text-[26px] leading-tight tracking-tight mb-3" style={{ color: 'var(--ink)' }}>
                    {t('In the AI era, what do sellers actually want to know?', 'AI 시대, 셀러들이 진짜 궁금한 건 뭘까?')}
                  </h3>
                  <p className="text-[14px] leading-relaxed mb-4" style={{ color: 'var(--ink-2)' }}>
                    {t(
                      'User interviews revealed sellers didn\'t need more dashboards — they needed to know one thing: am I showing up in AI? The AI Visibility Score distills that into a single, scannable number.',
                      '셀러 인터뷰에서 드러난 핵심: 더 많은 대시보드가 아니라 "AI가 나를 언급하고 있는가?"라는 하나의 질문이었습니다. AI Visibility Score는 그 답을 한눈에 보이는 숫자로 만들었습니다.',
                    )}
                  </p>
                </div>
                <button
                  className="preview-card-btn"
                  onClick={() => onNavigate ? onNavigate('aeko') : onBack()}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'block', textAlign: 'left' }}
                  aria-label={t('View AEKO case study', 'AEKO 케이스 스터디 보기')}
                >
                  <AekoPreviewCard lang={lang} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="border-b hairline"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel
            eyebrow={t('APPROACH', '접근')}
            title={t('How I think about strategy', '전략에 대한 사고방식')}
          />
          <CardGrid items={principles} />
        </div>
      </section>

      <CTASection
        title={t('Want to talk strategy?', '전략 수립이나 협업에 관심 있으시다면 연락 주세요.')}
        body={t(
          "I'm always happy to go deeper on 0→1 builds, product-market fit, or early-stage product decisions.",
          '0→1 제품 구축, 프로덕트-마켓 핏, 초기 단계 프로덕트 의사결정에 대해 언제든 이야기 나눌 수 있습니다.',
        )}
        ctaLabel={t('Get in touch', '연락하기')}
      />
    </CaseStudyShell>
  );
}

/* ─── AI Systems & Infrastructure ──────────────────────── */
export function AISystemsCaseStudy({
  onBack,
  lang,
  onToggleLang,
  t,
}: {
  onBack: () => void;
  lang: 'en' | 'kr';
  onToggleLang: () => void;
  t: T;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const examples: { icon: IconName; title: string; body: string }[] = [
    {
      icon: 'Msg',
      title: t('NewsChat AI Evaluation', 'NewsChat AI 평가'),
      body: t(
        'Benchmarked GPT, Claude, and other LLMs to determine optimal model-task fit for each feature. Led prompt engineering and systematic testing — defining evaluation criteria, comparing output quality, latency, and cost across models to ship the best-performing configuration.',
        'GPT, Claude 등 LLM을 벤치마킹하여 각 기능에 최적화된 모델-태스크 조합을 도출했습니다. 프롬프트 엔지니어링과 체계적 테스팅을 주도하며 평가 기준을 정의하고, 모델별 출력 품질·레이턴시·비용을 비교해 최적 구성으로 출시했습니다.',
      ),
    },
    {
      icon: 'Zap',
      title: 'ADK (AI-Driven Kit)',
      body: t(
        'Designed an embeddable SDK that auto-generates contextual AI features — follow-up Q&A, summaries, keyword tagging, polls, and floating chat — directly within article content. One-line script deployment with zero dev resources required from publishers.',
        '기사 콘텐츠 안에 맥락형 AI 기능(후속 Q&A, 요약, 키워드 태깅, 투표, 플로팅 채팅)을 자동 생성하는 임베더블 SDK를 설계했습니다. 퍼블리셔 측 개발 리소스 없이 스크립트 한 줄로 배포할 수 있습니다.',
      ),
    },
    {
      icon: 'Globe',
      title: t('AEKO Visibility Scoring', 'AEKO 가시성 스코어링'),
      body: t(
        'Built composite AI Visibility Score (mentions, citations, share of voice) across ChatGPT/Claude/Perplexity, segmented by market and language.',
        'ChatGPT/Claude/Perplexity 전반에 걸쳐 멘션, 인용, 점유율을 종합한 AI Visibility Score를 구축하고 시장·언어별로 세분화했습니다.',
      ),
    },
  ];

  const principles: { icon: IconName; title: string; body: string }[] = [
    {
      icon: 'Bulb',
      title: t('Latency is a product decision', '레이턴시는 프로덕트 결정'),
      body: t(
        'Every 100ms matters. Architecture choices flow from the UX requirement, not the other way around.',
        '100ms 하나하나가 중요합니다. 아키텍처 선택은 UX 요구사항에서 출발해야 하며, 그 반대가 아닙니다.',
      ),
    },
    {
      icon: 'Target',
      title: t('Guardrails before features', '기능보다 가드레일 먼저'),
      body: t(
        'Hallucination prevention, source attribution, and graceful degradation are table stakes, not nice-to-haves.',
        '환각 방지, 출처 표기, 우아한 성능 저하는 있으면 좋은 것이 아니라 기본 요건입니다.',
      ),
    },
    {
      icon: 'Bar',
      title: t('Multi-model by default', '멀티 모델이 기본'),
      body: t(
        "No single model does everything well. Orchestrate specialists, don't force a generalist.",
        '단일 모델로 모든 것을 잘할 수는 없습니다. 제너럴리스트를 강제하지 말고 스페셜리스트를 오케스트레이션해야 합니다.',
      ),
    },
  ];

  return (
    <CaseStudyShell accentClass="acc-violet" onBack={onBack} lang={lang} onToggleLang={onToggleLang} t={t} pageTitle="AI Systems & Infrastructure — Justina Yoo" pageDescription="RAG pipelines, ADK, visibility scoring, and MCP integrations.">
      <CaseStudyHero
        brandLabel={t('AI Systems & Infrastructure', 'AI 시스템 & 인프라')}
        subLabels={[t('Role-Level Case Study', '역할 기반 케이스 스터디')]}
        title={t('AI Systems & Infrastructure', 'AI 시스템 & 인프라')}
        subtitle={t(
          'Designing the AI architecture that makes the product work — from RAG pipelines to embeddable SDKs.',
          '제품을 작동시키는 AI 아키텍처 설계 — RAG 파이프라인부터 임베더블 SDK까지.',
        )}
        t={t}
      />

      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel
            eyebrow={t('IN PRACTICE', '실전 사례')}
            title={t('Where I applied it', '어디에 적용했는가')}
          />
          <CardGrid items={examples} />
        </div>
      </section>

      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel eyebrow={t('VISUALS', '비주얼')} title={t('System Architecture', '시스템 아키텍처')} />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'NewsChat RAG Pipeline', desc: 'Architecture diagram showing retrieval flow: article content → vector DB → LLM → source-attributed response (<800ms)' },
              { title: 'ADK Integration Flow', desc: 'Diagram showing how the one-line SDK script generates contextual AI features (Q&A, polls, summaries) within publisher articles' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="border-2 border-dashed rounded-sm p-8 md:p-12 flex flex-col items-center justify-center text-center gap-3 min-h-[200px]" style={{ borderColor: 'var(--rule)' }}>
                  <div className="eyebrow">{item.title}</div>
                  <p className="text-[13px] max-w-[36ch]" style={{ color: 'var(--ink-3)' }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-b hairline"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel
            eyebrow={t('APPROACH', '접근')}
            title={t('How I think about AI systems', 'AI 시스템에 대한 사고방식')}
          />
          <CardGrid items={principles} />
        </div>
      </section>

      <CTASection
        title={t('Interested in product strategy or AI workflow automation? Feel free to reach out.', '프로덕트 전략이나 AI 워크플로우 자동화에 관심 있으시다면 문의 주세요.')}
        body={t(
          'Happy to share what I\'ve learned building ATTN — from content pipeline design to what early users in a niche market actually need.',
          'ATTN을 만들며 배운 것들을 나눌 수 있어요. 콘텐츠 파이프라인 설계부터 니치 마켓 얼리 유저가 실제로 필요로 하는 것까지.',
        )}
        ctaLabel={t('Get in touch', '연락하기')}
      />
    </CaseStudyShell>
  );
}

/* ─── Monetization & Growth ─────────────────────────────── */
export function MonetizationCaseStudy({
  onBack,
  lang,
  onToggleLang,
  t,
}: {
  onBack: () => void;
  lang: 'en' | 'kr';
  onToggleLang: () => void;
  t: T;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const examples: { icon: IconName; title: string; body: string }[] = [
    {
      icon: 'Trend',
      title: t('NewsChat Contextual Ads', 'NewsChat 맥락 광고'),
      body: t(
        'Monetization was ad-driven, so the core challenge was inserting ads without breaking the reading experience. I focused on context and UX — ads appeared only at natural conversation breakpoints, matched to the semantic intent of the discussion rather than generic page keywords. Never mid-sentence, never intrusive. Ran A/B tests on placement timing, prompt engineering for intent matching, and ad format variations to optimize performance. This UX-first constraint is what drove the 10% CTR: users experienced ads as relevant content, not interruption. 3.5x ARPU.',
        '수익화는 광고 기반이었기에, 핵심 과제는 읽기 경험을 해치지 않으면서 광고를 삽입하는 것이었습니다. 맥락과 UX에 집중했습니다 — 광고는 대화의 자연스러운 전환 지점에만, 일반 페이지 키워드가 아닌 대화의 의미 의도에 매칭되어 노출됩니다. 배치 타이밍, 의도 매칭을 위한 프롬프트 엔지니어링, 광고 포맷 변형에 대한 A/B 테스트를 실시해 성과를 최적화했습니다. 문장 중간에 끼어들지 않고 방해하지 않는 이 UX 우선 제약이 10% CTR을 만들었습니다. 사용자가 광고를 방해가 아닌 관련 콘텐츠로 느꼈기 때문입니다. ARPU 3.5배 달성.',
      ),
    },
    {
      icon: 'Zap',
      title: t('AEKO Freemium', 'AEKO 프리미엄'),
      body: t(
        'Designed activation-first pricing — free visibility score to create urgency, paid tiers for prompt tracking and optimization guidance.',
        '활성화 우선 가격 모델을 설계했습니다 — 무료 가시성 점수로 긴급성을 만들고, 프롬프트 추적과 최적화 가이던스는 유료 티어로 제공합니다.',
      ),
    },
    {
      icon: 'Globe',
      title: t('NewsChat Product-Match Ads', 'NewsChat 상품 매칭 광고'),
      body: t(
        'Built a second contextual ad format — product-match ads powered by Coupang integration. The system searched for products most relevant to the article or conversation context and surfaced them as native shopping recommendations. A separate monetization layer from the conversational ads, designed to feel like a natural extension of the reading experience.',
        'Coupang 연동 기반의 두 번째 맥락 광고 포맷인 상품 매칭 광고를 구축했습니다. 기사나 대화 맥락에 가장 관련 높은 상품을 검색해 네이티브 쇼핑 추천으로 노출합니다. 대화형 광고와는 별도의 수익화 레이어로, 읽기 경험의 자연스러운 확장처럼 느껴지도록 설계했습니다.',
      ),
    },
  ];

  const principles: { icon: IconName; title: string; body: string }[] = [
    {
      icon: 'Bulb',
      title: t('Design monetization in from day one', '수익화는 첫날부터 설계'),
      body: t(
        'Revenue model shapes data schemas, UX, and infrastructure. Bolting it on later creates debt.',
        '수익 모델은 데이터 스키마, UX, 인프라를 결정합니다. 나중에 붙이면 기술 부채가 됩니다.',
      ),
    },
    {
      icon: 'Target',
      title: t('The aha moment is the conversion event', '"아하" 순간이 곧 전환 이벤트'),
      body: t(
        'Show users the problem (or the value) before asking for commitment.',
        '사용자에게 약속을 요구하기 전에 문제(또는 가치)를 먼저 보여줘야 합니다.',
      ),
    },
    {
      icon: 'Bar',
      title: t('Distribution > acquisition', '유통 > 획득'),
      body: t(
        'Build products that grow through the channels they\'re embedded in, not through ad spend.',
        '광고비가 아닌 제품이 내장된 채널을 통해 성장하는 제품을 만들어야 합니다.',
      ),
    },
  ];

  return (
    <CaseStudyShell accentClass="acc-sky" onBack={onBack} lang={lang} onToggleLang={onToggleLang} t={t} pageTitle="Monetization & Growth — Justina Yoo" pageDescription="10% ad CTR, 3.5x ARPU, minimal CAC. Revenue-first product thinking.">
      <CaseStudyHero
        brandLabel={t('Monetization & Growth', '수익화 & 성장')}
        subLabels={[t('Role-Level Case Study', '역할 기반 케이스 스터디')]}
        title={t('Monetization & Growth', '수익화 & 성장')}
        subtitle={t(
          'Ad-driven monetization as the core business model — balancing revenue targets with user experience through contextual placement, A/B testing, and product decisions that protect the reading experience.',
          '광고 기반 수익화를 핵심 비즈니스 모델로 운영 — 맥락형 배치, A/B 테스팅, 읽기 경험을 보호하는 프로덕트 의사결정을 통해 매출 목표와 사용자 경험의 균형을 설계합니다.',
        )}
        t={t}
      />

      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel
            eyebrow={t('IN PRACTICE', '실전 사례')}
            title={t('Where I applied it', '어디에 적용했는가')}
          />

          {/* NewsChat contextual ads — full spotlight with UI */}
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center pt-10 pb-14 border-b hairline">
              <div>
                <div className="font-mono-tech text-[11px] tracking-widest uppercase mb-3" style={{ color: 'var(--acc)' }}>NewsChat · Contextual Ads</div>
                <h3 className="font-serif-display text-[22px] md:text-[30px] leading-tight tracking-tight mb-4" style={{ color: 'var(--ink)' }}>
                  {t('Contextual ads that earn without breaking UX', '경험을 해치지 않는 맥락 광고 모델')}
                </h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--ink-2)' }}>
                  {t(
                    'The AI thinking pause is dead time — we filled it with a contextually matched ad, then let it fade as the answer streamed in. Users never felt interrupted. The result: 10% CTR and a monetization model that protected UX instead of fighting it.',
                    'AI가 답변을 생성하는 2~3초의 공백을 맥락 광고로 채우고, 응답이 시작되면 자연스럽게 사라지게 설계했습니다. 유저는 방해받지 않았고, 결과는 CTR 10% — UX와 수익이 공존하는 모델이었습니다.',
                  )}
                </p>
                <p className="text-[14px] leading-relaxed" style={{ color: 'var(--ink-3)' }}>
                  {t('3.5x ARPU · 10% contextual ad CTR', '3.5배 ARPU · 맥락 광고 CTR 10%')}
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                {lang === 'kr' ? (
                  <AdExplainerPhone
                    question="한동훈 의원이 검사 시절 맡았던 주요 사건들은 뭐였을까?"
                    workLine="AI가 답변을 준비하는 동안 잠시만 기다려주세요.."
                    workLineDone="AI 답변 불러오기 완료!"
                    answerHeading="부동산 재무 기록 조회"
                    answer="한동훈 의원은 검사 시절 '대기업 저승사자'로 불렸어요. 현대차 비자금 사건으로 정몽구 회장을 구속했고, 2016년 국정농단 특검에서 삼성을 수사해 이재용 부회장을 구속 기소했습니다."
                  />
                ) : (
                  <AdExplainerPhone
                    question="What were the major cases Rep. Han Dong-hoon handled during his prosecutor years?"
                    workLine="Ad showing while AI is working…"
                    workLineDone="AI answer is ready!"
                    answerHeading="Estate Financial Records"
                    answer="Known as a 'grim reaper of big business,' he jailed Hyundai's Chung Mong-koo in the 2006 slush-fund case and led the 2016 Samsung probe that indicted Lee Jae-yong."
                  />
                )}
                <span className="font-mono-tech text-[11px] tracking-widest uppercase" style={{ color: 'var(--ink-3)' }}>
                  {t('Contextual Ad', '맥락 광고')}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Other examples */}
          <div className="pt-10">
            <CardGrid items={examples.filter((_, i) => i !== 0)} />
          </div>
        </div>
      </section>

      <section
        className="border-b hairline"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel
            eyebrow={t('APPROACH', '접근')}
            title={t('How I think about monetization', '수익화에 대한 사고방식')}
          />
          <CardGrid items={principles} />
        </div>
      </section>

      <CTASection
        title={t('Want to talk monetization?', '수익화 전략 설계에 관심 있으시다면 문의 주세요.')}
        body={t(
          'Happy to go deeper on revenue strategy, pricing architecture, or growth without paid acquisition.',
          '수익 전략, 가격 설계, 유료 획득 없는 성장에 대해 더 자세히 이야기 나눌 수 있습니다.',
        )}
        ctaLabel={t('Get in touch', '연락하기')}
      />
    </CaseStudyShell>
  );
}

/* ─── Agent UI Components ───────────────────────────────── */
const AGENT_KF = `
  @keyframes cwBlink{0%,49%{opacity:1}50%,100%{opacity:0}}
  @keyframes cwPulse{0%,100%{transform:scale(1);opacity:.55}50%{transform:scale(1.55);opacity:1}}
  @keyframes cwFade{0%,100%{opacity:.45}50%{opacity:1}}
  @keyframes cwShimmer{0%{background-position:-260px 0}100%{background-position:260px 0}}
`;
const A_LOAD = [300, 850, 1400, 1950];
const A_LOAD_D = 520;
const A_DONE = 2470;
function skSt(T:number,i:number):'queued'|'loading'|'ready'{const s=A_LOAD[i];if(T>=s+A_LOAD_D)return'ready';if(T>=s)return'loading';return'queued';}

function AgentLeftPanel({accent,glow,emoji,name,role,cmd,arg,skills,T,stageLabel,stageColor,progPct,progColor,consoleLog}:{accent:string;glow:string;emoji:string;name:string;role:string;cmd:string;arg:string;skills:{icon:string;title:string;sub?:string}[];T:number;stageLabel:string;stageColor:string;progPct:number;progColor:string;consoleLog:string}) {
  const FF="Pretendard,'Apple SD Gothic Neo',sans-serif";
  const FM="'JetBrains Mono',monospace";
  const clamp=(x:number,a=0,b=1)=>Math.max(a,Math.min(b,x));
  const fade=(s:number,d:number)=>clamp((T-s)/d);
  const AMBER='#d99a3a';
  const skillsReadyCount=skills.filter((_,i)=>skSt(T,i)==='ready').length;
  return (
    <div style={{width:392,background:'#0f1319',borderRight:'1px solid rgba(255,255,255,0.06)',display:'flex',flexDirection:'column',padding:'28px 24px',flexShrink:0}}>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:24}}>
        <div style={{width:54,height:54,borderRadius:16,background:`linear-gradient(150deg,${glow},${accent})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,flexShrink:0}}>{emoji}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:3}}>
            <span style={{fontSize:15,fontWeight:700,color:'#e8eaf0',letterSpacing:-0.2,fontFamily:FF}}>{name}</span>
            <span style={{fontSize:10,fontWeight:700,letterSpacing:0.8,background:glow+'22',color:glow,padding:'2px 7px',borderRadius:6,fontFamily:FM}}>AI</span>
          </div>
          <div style={{fontSize:12,color:'#6b7280',letterSpacing:0.1,fontFamily:FF}}>{role}</div>
        </div>
      </div>
      <div style={{background:'#0b0d10',borderRadius:10,padding:'12px 14px',marginBottom:20}}>
        <div style={{fontFamily:FM,fontSize:11.5,color:'#4a5568',marginBottom:8}}>
          <span style={{color:'#3a4a5c'}}>$ </span><span style={{color:'#7c8fa8'}}>{cmd}</span><span style={{color:'#4a5568'}}> --topic </span><span style={{color:glow}}>"{arg}"</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8,fontFamily:FM,fontSize:11}}>
          <span style={{width:6,height:6,borderRadius:'50%',background:T<A_DONE?AMBER:accent,display:'inline-block',animation:T<A_DONE?'cwFade 1s ease-in-out infinite':'none',opacity:T<A_DONE?undefined:0.8}}/>
          <span style={{color:'#6b7280'}}>{consoleLog}</span>
          {skillsReadyCount>0&&<span style={{marginLeft:'auto',color:'#4a5568',fontSize:10}}>{skillsReadyCount}/4</span>}
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:8,flex:1}}>
        {skills.map((sk,i)=>{
          const status=skSt(T,i);
          const o=clamp((T-(A_LOAD[i]-100))/200);
          return (
            <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',background:'rgba(255,255,255,0.03)',borderRadius:9,opacity:o,transform:`translateY(${(1-o)*8}px)`}}>
              <span style={{fontSize:16,opacity:status==='queued'?0.35:1}}>{sk.icon}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:12.5,color:status==='ready'?'#c8d0e0':'#6b7280',fontWeight:status==='ready'?600:400,fontFamily:FF}}>{sk.title}</div>
                {sk.sub&&<div style={{fontSize:10.5,color:'#4a5568',fontFamily:FF,marginTop:1}}>{sk.sub}</div>}
              </div>
              <span style={{fontFamily:FM,fontSize:10,padding:'2px 8px',borderRadius:6,background:status==='ready'?accent+'22':status==='loading'?AMBER+'22':'rgba(255,255,255,0.06)',color:status==='ready'?accent:status==='loading'?AMBER:'#4a5568',animation:status==='loading'?'cwFade 0.9s ease-in-out infinite':'none',flexShrink:0}}>
                {status==='ready'?'ready':status==='loading'?'loading':'queued'}
              </span>
            </div>
          );
        })}
      </div>
      <div style={{marginTop:24}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
          <span style={{fontFamily:FM,fontSize:10.5,color:stageColor,fontWeight:600,letterSpacing:0.5}}>{stageLabel}</span>
          <span style={{fontFamily:FM,fontSize:10.5,color:'#4a5568'}}>{Math.round(progPct)}%</span>
        </div>
        <div style={{height:6,background:'rgba(255,255,255,0.07)',borderRadius:99,overflow:'hidden'}}>
          <div style={{height:'100%',width:progPct+'%',background:progColor,borderRadius:99,transition:'width 0.3s ease,background 0.3s'}}/>
        </div>
      </div>
    </div>
  );
}

function SalesAgentUI({ lang = 'en' }: { lang?: 'en' | 'kr' }) {
  const KO = lang === 'kr';
  const ACC='#6D5EF5',GLOW='#9B8CFF',AMBER='#d99a3a',GREEN='#1c8a5a';
  const FF="Pretendard,'Apple SD Gothic Neo',sans-serif";
  const FM="'JetBrains Mono',monospace";
  const SUBJECT=KO?"Dewy Lab 재구매율을 높일 간단한 아이디어":"Quick idea for Dewy Lab's retention numbers";
  const BODY=KO
    ?"안녕하세요 Mia 님,\n\n지난달 Dewy Lab의 세포라 입점 축하드립니다 — 젤 모이스처라이저 포지셔닝이 인상적이었어요.\n\n저희와 함께한 DTC 스킨케어 브랜드 대부분이 약한 구매 후 플로우 때문에 재구매 매출의 20~30%를 놓치고 있었습니다. Glow Theory는 한 분기 만에 재구매를 34% 올렸어요.\n\n같은 방식이 Dewy Lab에도 맞을지, 다음 주에 15분만 통화 가능하실까요?\n\n감사합니다,\nAlex 드림"
    :"Hi Mia,\n\nCongrats on Dewy Lab's Sephora launch last month — the gel-moisturizer positioning is sharp.\n\nMost DTC skincare brands we work with were leaving 20–30% of repeat revenue on the table from weak post-purchase flows. We helped Glow Theory lift repeat orders 34% in one quarter.\n\nWorth a quick 15-min call next week?\n\nBest,\nAlex";
  const prospects=[
    {ini:'MC',bg:ACC,name:'Mia Chen',role:KO?'창업자 & CEO · Dewy Lab':'Founder & CEO · Dewy Lab'},
    {ini:'JP',bg:'#0A66C2',name:'Jordan Park',role:KO?'성장 총괄 · Skinly':'VP Growth · Skinly'},
    {ini:'RA',bg:'#12b3a6',name:'Rae Adigun',role:KO?'이커머스 리드 · Lumé Co':'Head of eComm · Lumé Co'},
    {ini:'ST',bg:'#e0245e',name:'Sara Tan',role:KO?'창업자 · Bare Ritual':'Founder · Bare Ritual'},
    {ini:'DK',bg:'#d99a3a',name:'Dan Kim',role:'CMO · Hydra House'},
  ];
  const skills=KO?[
    {icon:'🔎',title:'잠재고객 검색'},
    {icon:'🎯',title:'ICP & 리드 검증'},
    {icon:'🧩',title:'개인화 리서치'},
    {icon:'✍️',title:'이메일 카피라이팅'},
  ]:[
    {icon:'🔎',title:'Prospect search'},
    {icon:'🎯',title:'ICP & lead qualification'},
    {icon:'🧩',title:'Personalization research'},
    {icon:'✍️',title:'Email copywriting'},
  ];
  const [T,setT]=useState(0);
  const [sent,setSent]=useState(false);
  const sentAt=useRef(0);
  useEffect(()=>{
    const iv=setInterval(()=>{
      if(sent){if(performance.now()-sentAt.current>3200){setSent(false);setT(0);}return;}
      setT(p=>p>=18000?0:p+50);
    },50);
    return()=>clearInterval(iv);
  },[sent]);
  const clamp=(x:number,a=0,b=1)=>Math.max(a,Math.min(b,x));
  const fade=(s:number,d:number)=>clamp((T-s)/d);
  const typeText=(full:string,s:number,cps:number)=>{
    if(T<s)return{txt:'',typing:false,end:s};
    const end=s+(full.length/cps)*1000;
    const n=Math.floor((T-s)/1000*cps);
    return{txt:full.slice(0,Math.min(n,full.length)),typing:T<end,end};
  };
  const SEARCH=A_DONE+200,PROS_START=A_DONE+550,PROS_STEP=260;
  const prospectsDone=PROS_START+4*PROS_STEP+250;
  const G=prospectsDone+250;
  const subj=typeText(SUBJECT,G,38);
  const body=typeText(BODY,subj.end+250,78);
  useEffect(()=>{if(!sent&&body.end>0&&T>body.end+950){setSent(true);sentAt.current=performance.now();}},[ T,sent,body.end]);
  let stageLabel=KO?'스킬 로딩 중':'Loading skills',stageColor=AMBER,progPct=0,progColor=AMBER;
  if(T<A_DONE){let p=0;for(let i=0;i<4;i++)p+=25*clamp((T-A_LOAD[i])/A_LOAD_D);progPct=Math.min(100,p);}
  else if(T<G){stageLabel=KO?'잠재고객 탐색 중':'Finding prospects';progPct=50+50*clamp((T-A_DONE)/(G-A_DONE))*0.5;progColor=AMBER;stageColor=AMBER;}
  else if(!sent){stageLabel=T>=body.end?(KO?'발송 준비 완료':'Ready to send'):(KO?'이메일 작성 중':'Drafting email');stageColor=ACC;progColor=ACC;progPct=50+50*clamp((T-G)/(body.end+500-G));}
  if(sent){stageLabel=KO?'발송 완료':'Sent';stageColor=GREEN;progColor=GREEN;progPct=100;}
  const consoleLog=T<SEARCH?(KO?'→ 스킬 불러오는 중…':'→ resolving skills…'):T<G?(KO?'→ 잠재고객 검색 중…':'→ searching prospects…'):T<body.end?(KO?'→ 이메일 작성 중…':'→ drafting email…'):sent?(KO?'→ 이메일 발송 완료 ✓':'→ email sent ✓'):(KO?'→ 초안 준비 완료 ✓':'→ draft ready ✓');
  return (
    <div style={{width:1120,height:820,background:'#14181f',borderRadius:18,boxShadow:'0 40px 90px -34px rgba(20,16,10,.6),0 0 0 1px rgba(20,25,32,.9)',display:'flex',overflow:'hidden',fontFamily:FF,flexShrink:0}}>
      <style>{AGENT_KF}</style>
      <AgentLeftPanel accent={ACC} glow={GLOW} emoji="📨" name={KO?'영업 아웃리치':'Sales Outreach'} role={KO?'자율 영업 아웃리치 에이전트':'Autonomous sales outreach agent'} cmd="sales.outreach" arg="skincare-brands" skills={skills} T={T} stageLabel={stageLabel} stageColor={stageColor} progPct={progPct} progColor={progColor} consoleLog={consoleLog}/>
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
        <div style={{height:42,background:'#0e1116',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',paddingLeft:16,gap:8,flexShrink:0}}>
          {['#ff5f57','#febc2e','#28c840'].map((c,i)=><span key={i} style={{width:12,height:12,borderRadius:'50%',background:c,display:'inline-block'}}/>)}
          <span style={{flex:1,textAlign:'center',fontFamily:FM,fontSize:11.5,color:'#4a5568',paddingRight:52}}>{KO?'아웃리치 — 새 메일':'Outreach — New Message'}</span>
        </div>
        <div style={{flex:1,display:'flex',overflow:'hidden'}}>
          <div style={{width:246,background:'#f7f8fa',borderRight:'1px solid #dfe3e8',display:'flex',flexDirection:'column',overflow:'hidden',flexShrink:0}}>
            <div style={{padding:'14px 16px 10px',display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontSize:14}}>📁</span>
              <span style={{fontSize:12,fontWeight:700,color:'#374151'}}>{KO?'잠재고객 데이터베이스':'Prospect database'}</span>
            </div>
            <div style={{margin:'0 12px 10px',background:'#fff',border:'1px solid #e5e7eb',borderRadius:7,padding:'6px 10px',display:'flex',alignItems:'center',gap:6}}>
              <span style={{fontSize:11,color:'#9ca3af'}}>🔍</span>
              <span style={{fontFamily:FM,fontSize:10.5,color:'#9ca3af'}}>{KO?'창업자 · 스킨케어 · DTC':'Search prospects…'}</span>
            </div>
            <div style={{padding:'0 16px 8px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontSize:11,color:'#9ca3af',fontFamily:FM}}>{KO?'5명':'5 prospects'}</span>
              <span style={{fontSize:10,background:ACC+'22',color:ACC,padding:'2px 7px',borderRadius:99,fontFamily:FM,fontWeight:600}}>{KO?'ICP':'ICP match'}</span>
            </div>
            <div style={{flex:1,overflowY:'auto'}}>
              {prospects.map((p,i)=>{
                const o=fade(PROS_START+i*PROS_STEP,250);
                return(
                  <div key={i} style={{padding:'10px 14px',display:'flex',alignItems:'center',gap:10,background:i===0?ACC+'11':'transparent',borderLeft:i===0?`3px solid ${ACC}`:'3px solid transparent',opacity:o,transform:`translateY(${(1-o)*6}px)`}}>
                    <div style={{width:34,height:34,borderRadius:'50%',background:p.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,color:'#fff',flexShrink:0}}>{p.ini}</div>
                    <div style={{minWidth:0}}>
                      <div style={{fontSize:12.5,fontWeight:600,color:'#1f2937',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p.name}</div>
                      <div style={{fontSize:11,color:'#9ca3af',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p.role}</div>
                    </div>
                    {sent&&i===0&&<span style={{fontSize:12,marginLeft:'auto',color:GREEN}}>✓</span>}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{flex:1,background:'#fff',display:'flex',flexDirection:'column',overflow:'hidden'}}>
            <div style={{padding:'18px 24px 14px',borderBottom:'1px solid #f0f0f0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontSize:15,fontWeight:700,color:'#111827'}}>{KO?'새 아웃리치 이메일':'New outreach email'}</span>
              {!sent&&<span style={{fontFamily:FM,fontSize:10,padding:'3px 10px',borderRadius:99,background:T>=body.end?ACC+'22':AMBER+'15',color:T>=body.end?ACC:AMBER}}>{T<G?(KO?'대기':'Queued'):T>=body.end?(KO?'초안 준비됨':'Draft ready'):(KO?'작성 중…':'Drafting…')}</span>}
            </div>
            <div style={{padding:'12px 24px',borderBottom:'1px solid #f8f8f8',display:'flex',alignItems:'center',gap:10,opacity:fade(PROS_START,300)}}>
              <span style={{fontFamily:FM,fontSize:11,color:'#9ca3af',width:32}}>{KO?'받는사람':'To:'}</span>
              <div style={{display:'flex',alignItems:'center',gap:6,background:ACC+'11',padding:'4px 10px',borderRadius:99}}>
                <div style={{width:18,height:18,borderRadius:'50%',background:ACC,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'#fff'}}>MC</div>
                <span style={{fontSize:12,fontWeight:600,color:'#374151'}}>Mia Chen</span>
                <span style={{fontSize:11,color:'#9ca3af'}}>mia@dewylab.com</span>
              </div>
            </div>
            <div style={{padding:'12px 24px',borderBottom:'1px solid #f8f8f8',display:'flex',alignItems:'baseline',gap:10,opacity:fade(G-100,300)}}>
              <span style={{fontFamily:FM,fontSize:11,color:'#9ca3af',width:52,flexShrink:0}}>{KO?'제목':'Subject:'}</span>
              <span style={{fontSize:13.5,color:'#111827',fontWeight:500,flex:1}}>
                {subj.txt}{subj.typing&&<span style={{display:'inline-block',width:2,height:'1em',background:'#111',verticalAlign:'-2px',marginLeft:1,animation:'cwBlink 1s step-end infinite'}}/>}
              </span>
            </div>
            <div style={{flex:1,padding:'16px 24px',overflowY:'auto',opacity:fade(subj.end,300)}}>
              <pre style={{margin:0,fontFamily:FF,fontSize:13.5,lineHeight:1.7,color:'#374151',whiteSpace:'pre-wrap',wordBreak:'break-word'}}>
                {body.txt}{body.typing&&<span style={{display:'inline-block',width:2,height:'1em',background:'#111',verticalAlign:'-2px',marginLeft:1,animation:'cwBlink 1s step-end infinite'}}/>}
              </pre>
            </div>
            <div style={{padding:'12px 24px',borderTop:'1px solid #f0f0f0',display:'flex',alignItems:'center'}}>
              {sent?(
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <span style={{fontSize:16,color:GREEN}}>✓</span>
                  <div>
                    <div style={{fontSize:13,fontWeight:600,color:GREEN}}>{KO?'Mia Chen 님에게 발송됨':'Email sent to Mia Chen'}</div>
                    <div style={{fontSize:11,color:'#9ca3af',fontFamily:FM}}>{KO?'방금 · Gmail':'just now · via Gmail'}</div>
                  </div>
                </div>
              ):(
                <button onClick={()=>{setSent(true);sentAt.current=performance.now();}} style={{padding:'8px 20px',borderRadius:8,border:'none',cursor:T>=body.end?'pointer':'default',background:T>=body.end?ACC:'rgba(109,94,245,0.12)',color:T>=body.end?'#fff':ACC,fontSize:13,fontWeight:600,fontFamily:FF,transition:'background 0.3s'}}>
                  {T<body.end?(KO?'작성 중…':'Drafting…'):(KO?'보내기':'Send')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketingAgentUI({ lang = 'en' }: { lang?: 'en' | 'kr' }) {
  const KO = lang === 'kr';
  const ACC='#1596BC',GLOW='#4FC3E8',AMBER='#d99a3a',GREEN='#1c8a5a';
  const FF="Pretendard,'Apple SD Gothic Neo',sans-serif";
  const FM="'JetBrains Mono',monospace";
  const POST_TEXT=KO
    ?"지성 피부라 보습 건너뛰세요? 그게 오히려 번들거림을 키워요 💦\n\n수분이 부족한 피부는 유분을 과다 분비해요 — 가벼운 젤로 유분 없이 수분만 채우세요."
    :"Oily skin? Skipping moisturizer is quietly making it worse. 💦\n\nDehydrated skin overproduces oil to compensate — a lightweight gel hydrates without the grease.";
  const HASHTAGS=KO?"#스킨케어 #지성피부 #스킨케어팁 #dewylab":"#skincare #oilyskin #skintok #dewylab";
  const feedPosts=KO?[
    {av:'🧴',name:'스킨케어 데일리',handle:'@skincaredaily',txt:'리마인더: 자외선 차단제 바른 날엔 밤에 이중 세안 필수예요 🌙',r:6,rp:14,l:88},
    {av:'💧',name:'더마 노트',handle:'@dermnotes',txt:'피부를 벗겨내기보다 나이아신아마이드 + 순한 보습이 언제나 이겨요.',r:19,rp:43,l:260},
    {av:'🌿',name:'글로우 저널',handle:'@glowjournal',txt:'지성 피부 과세안을 멈췄더니 일주일 만에 진정됐어요.',r:27,rp:96,l:740},
    {av:'🧑‍⚕️',name:'피부과 상담소',handle:'@askaderm',txt:'유분 ≠ 수분. 대부분의 \'지성\' 피부는 사실 수분 부족이에요 — 유분이 아니라 수분을 잡으세요.',r:38,rp:112,l:1100},
  ]:[
    {av:'🧴',name:'Skincare Daily',handle:'@skincaredaily',txt:'Reminder: if you wear SPF, double cleansing at night isn\'t optional 🌙',r:6,rp:14,l:88},
    {av:'💧',name:'Derm Notes',handle:'@dermnotes',txt:'Niacinamide + gentle hydration beats stripping your skin, every single time.',r:19,rp:43,l:260},
    {av:'🌿',name:'Glow Journal',handle:'@glowjournal',txt:'POV: you finally stopped over-washing your oily skin and it calmed down in a week.',r:27,rp:96,l:740},
    {av:'🧑‍⚕️',name:'Ask a Derm',handle:'@askaderm',txt:'Oily ≠ hydrated. Most "oily" skin is actually dehydrated — fix the water, not the oil.',r:38,rp:112,l:1100},
  ];
  const skills=KO?[
    {icon:'🛡️',title:'브랜드 보이스 가드레일'},
    {icon:'📈',title:'트렌드 & 오디언스 리서치'},
    {icon:'✍️',title:'후킹 & 카피라이팅'},
    {icon:'🖼️',title:'비주얼 & 해시태그'},
  ]:[
    {icon:'🛡️',title:'Brand voice & guardrails'},
    {icon:'📈',title:'Trend & audience research'},
    {icon:'✍️',title:'Hook & copywriting'},
    {icon:'🖼️',title:'Visuals & hashtags'},
  ];
  const [T,setT]=useState(0);
  const [published,setPublished]=useState(false);
  const pubAt=useRef(0);
  const [ep,setEp]=useState(0);
  useEffect(()=>{
    const iv=setInterval(()=>{
      if(published){
        const elapsed=performance.now()-pubAt.current;
        setEp(Math.min(1,elapsed/1200));
        if(elapsed>3200){setPublished(false);setT(0);setEp(0);}
        return;
      }
      setT(p=>p>=18000?0:p+50);
    },50);
    return()=>clearInterval(iv);
  },[published]);
  const clamp=(x:number,a=0,b=1)=>Math.max(a,Math.min(b,x));
  const fade=(s:number,d:number)=>clamp((T-s)/d);
  const easeOut=(x:number)=>1-Math.pow(1-x,3);
  const typeText=(full:string,s:number,cps:number)=>{
    if(T<s)return{txt:'',typing:false,end:s};
    const end=s+(full.length/cps)*1000;
    const n=Math.floor((T-s)/1000*cps);
    return{txt:full.slice(0,Math.min(n,full.length)),typing:T<end,end};
  };
  const fmt=(n:number)=>{n=Math.round(n);if(n>=1000)return(n/1000).toFixed(1).replace(/\.0$/,'')+'K';return String(n);};
  const G=2750;
  const post=typeText(POST_TEXT,G,62);
  const postEnd=post.end;
  const imgO=fade(postEnd+100,350);
  const draftReady=imgO>=1;
  useEffect(()=>{if(!published&&draftReady&&T>postEnd+900){setPublished(true);pubAt.current=performance.now();}},[ T,published,draftReady,postEnd]);
  let stageLabel=KO?'스킬 로딩 중':'Loading skills',stageColor=AMBER,progPct=0,progColor=AMBER;
  if(T<A_DONE){let p=0;for(let i=0;i<4;i++)p+=25*clamp((T-A_LOAD[i])/A_LOAD_D);progPct=Math.min(100,p);}
  else if(T<postEnd){stageLabel=KO?'포스트 작성 중':'Drafting post';stageColor=ACC;progColor=ACC;progPct=50+50*clamp((T-A_DONE)/(postEnd-A_DONE));}
  else if(!published){stageLabel=KO?'게시 준비 완료':'Ready to post';stageColor=GREEN;progColor=GREEN;progPct=100;}
  if(published){stageLabel=KO?'게시 완료':'Posted';stageColor=GREEN;progColor=GREEN;progPct=100;}
  const consoleLog=T<A_DONE?(KO?'→ 스킬 불러오는 중…':'→ resolving skills…'):T<postEnd?(KO?'→ 포스트 작성 중…':'→ drafting post…'):published?(KO?'→ 게시 완료 ✓':'→ posted ✓'):(KO?'→ 초안 준비 완료 ✓':'→ draft ready ✓');
  const ep2=easeOut(ep);
  return (
    <div style={{width:1120,height:820,background:'#14181f',borderRadius:18,boxShadow:'0 40px 90px -34px rgba(20,16,10,.6),0 0 0 1px rgba(20,25,32,.9)',display:'flex',overflow:'hidden',fontFamily:FF,flexShrink:0}}>
      <style>{AGENT_KF}</style>
      <AgentLeftPanel accent={ACC} glow={GLOW} emoji="🎯" name={KO?'소셜 마케팅':'Social Marketing'} role={KO?'자율 캠페인 에이전트':'Autonomous campaign agent'} cmd="campaign.post" arg="oily-skin" skills={skills} T={T} stageLabel={stageLabel} stageColor={stageColor} progPct={progPct} progColor={progColor} consoleLog={consoleLog}/>
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',background:'#0f1319',padding:'24px 32px'}}>
        <div style={{width:340,background:'#1a1f28',borderRadius:46,padding:10,boxShadow:'0 0 0 1px rgba(255,255,255,0.07)',flexShrink:0}}>
          <div style={{background:'#fff',borderRadius:38,overflow:'hidden',height:720}}>
            <div style={{padding:'14px 20px 10px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #f0f0f0'}}>
              <div style={{width:30,height:30,borderRadius:'50%',background:'#d8dde2'}}/>
              <div style={{width:27,height:27,borderRadius:8,background:ACC,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:14,fontWeight:700}}>✷</div>
              <span style={{fontSize:16,color:'#374151'}}>⚙</span>
            </div>
            <div style={{display:'flex',borderBottom:'1px solid #f0f0f0'}}>
              {(KO?['추천','팔로우 중']:['For you','Following']).map((tab,i)=>(
                <div key={i} style={{flex:1,padding:'10px 0',textAlign:'center',fontSize:13,fontWeight:i===0?700:400,color:i===0?'#0f1419':'#6b7280',borderBottom:i===0?`2px solid #0f1419`:'2px solid transparent'}}>{tab}</div>
              ))}
            </div>
            <div style={{overflowY:'auto',height:'calc(100% - 110px)'}}>
              <div style={{padding:'14px 16px',background:'#eff9fc',borderBottom:'1px solid #e0f0f6'}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
                  <div style={{width:36,height:36,borderRadius:'50%',background:ACC,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:700,color:'#fff',flexShrink:0}}>D</div>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',alignItems:'center',gap:4}}>
                      <span style={{fontSize:13,fontWeight:700,color:'#0f1419'}}>Dewy Lab</span>
                      <span style={{fontSize:11,color:ACC}}>✓</span>
                    </div>
                    <div style={{fontSize:11,color:'#6b7280'}}>{KO?'@dewylab · 방금':'@dewylab · now'}</div>
                  </div>
                  {!published&&<span style={{fontFamily:FM,fontSize:9,padding:'2px 7px',borderRadius:99,background:draftReady?ACC+'22':AMBER+'20',color:draftReady?ACC:AMBER,animation:!draftReady&&T>G?'cwFade 1s ease-in-out infinite':'none'}}>{draftReady?(KO?'초안 준비됨':'Draft ready'):(KO?'작성 중…':'Drafting…')}</span>}
                  {published&&<span style={{fontFamily:FM,fontSize:9,padding:'2px 7px',borderRadius:99,background:GREEN+'22',color:GREEN}}>{KO?'게시됨 ✓':'Posted ✓'}</span>}
                </div>
                <div style={{fontSize:13.5,lineHeight:1.55,color:'#0f1419',marginBottom:10,whiteSpace:'pre-line'}}>
                  {post.txt}{post.typing&&<span style={{display:'inline-block',width:2,height:'1em',background:'#0f1419',verticalAlign:'-2px',marginLeft:1,animation:'cwBlink 1s step-end infinite'}}/>}
                </div>
                {post.txt.length>20&&(
                  <div style={{fontSize:13,color:ACC,marginBottom:10}}>{HASHTAGS}</div>
                )}
                <div style={{height:140,borderRadius:12,overflow:'hidden',marginBottom:10,opacity:imgO,background:'linear-gradient(135deg,#e8f4f8,#c8e8f0,#d0eef6)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {imgO>0.5&&<div style={{textAlign:'center'}}>
                    <div style={{fontSize:28,marginBottom:4}}>🧴</div>
                    <div style={{fontFamily:FM,fontSize:10,color:'#1596BC',opacity:0.7}}>✓ Pexels</div>
                  </div>}
                </div>
                {!published?(
                  <div style={{display:'flex',gap:8}}>
                    <button onClick={()=>{setPublished(true);pubAt.current=performance.now();}} style={{flex:1,padding:'8px 0',borderRadius:8,border:'none',cursor:draftReady?'pointer':'default',background:draftReady?ACC:'rgba(21,150,188,0.12)',color:draftReady?'#fff':ACC,fontSize:13,fontWeight:600,fontFamily:FF}}>
                      {draftReady?(KO?'게시하기':'Post'):(KO?'작성 중…':'Drafting…')}
                    </button>
                  </div>
                ):(
                  <div style={{display:'flex',gap:16,fontSize:12,color:'#6b7280',fontFamily:FM}}>
                    {[{l:'💬',v:fmt(18*ep2)},{l:'🔁',v:fmt(47*ep2)},{l:'❤️',v:fmt(312*ep2)},{l:'👁',v:fmt(6200*ep2)}].map((s,i)=>(
                      <span key={i}>{s.l} {s.v}</span>
                    ))}
                  </div>
                )}
              </div>
              {feedPosts.map((fp,i)=>(
                <div key={i} style={{padding:'12px 16px',borderBottom:'1px solid #f0f0f0'}}>
                  <div style={{display:'flex',gap:10}}>
                    <span style={{fontSize:22,flexShrink:0}}>{fp.av}</span>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:3}}>
                        <span style={{fontSize:12,fontWeight:700,color:'#0f1419'}}>{fp.name}</span>
                        <span style={{fontSize:11,color:'#6b7280'}}>{fp.handle}</span>
                      </div>
                      <div style={{fontSize:12.5,color:'#374151',lineHeight:1.45,marginBottom:8}}>{fp.txt}</div>
                      <div style={{display:'flex',gap:14,fontSize:11,color:'#6b7280',fontFamily:FM}}>
                        <span>💬 {fp.r}</span><span>🔁 {fp.rp}</span><span>❤️ {fp.l>=1000?fmt(fp.l):fp.l}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentWriterAgentUI({ lang = 'en' }: { lang?: 'en' | 'kr' }) {
  const KO = lang === 'kr';
  const ACC='#2E7C5E',GLOW='#5BCB97',AMBER='#d99a3a';
  const FF="Pretendard,'Apple SD Gothic Neo',sans-serif";
  const FM="'JetBrains Mono',monospace";
  const SERIF=KO?"'Noto Serif KR',serif":"'Newsreader',serif";
  const HEADLINE=KO?'지성 피부도 보습해야 할까? 안 하면 오히려 더 번들거려요.':'Should You Moisturize Oily Skin? Skipping It Is Probably Making Things Worse.';
  const SUMMARY=KO?'요약 — 네, 지성 피부도 보습제가 필요해요. 건너뛰면 수분 부족 피부가 보상하기 위해 피지를 과잉 생산하는 리바운드 효과가 생겨요. 가벼운 수분 젤 보습제가 유분 추가 없이 수분을 공급해요.':'TL;DR — Yes, oily skin needs moisturizer. Skipping it triggers a rebound effect where dehydrated skin overproduces sebum to compensate. A lightweight, water-based gel hydrates without adding oil.';
  const SECTION=KO?'보습을 건너뛰면 지성 피부가 왜 더 번들거릴까?':'Why Does Skipping Moisturizer Make Oily Skin Oilier?';
  const BODY=KO?'메커니즘이 직관에 반하지만 잘 문서화되어 있어요. 피부에는 두 종류의 수분이 있어요: 수분(보습, 각질층에 유지)과 유분(피지, 피지선에서 생산). 이건 다른 시스템이에요. 지성 피부는 피지가 충분하지만 수분은 부족할 수 있어요.':'The mechanism is counterintuitive but well-documented. When you skip hydration, the skin barrier senses dehydration and signals the sebaceous glands to overproduce oil as a protective response — leaving skin both dry and greasy.';
  const skills=KO?[
    {icon:'⚖️',title:'법적·규제 준수',sub:'규제 한도 대비 주장 검수'},
    {icon:'🔍',title:'주제 리서치',sub:'출처 수집·종합'},
    {icon:'✍️',title:'후킹 & 글쓰기',sub:'헤드라인·흐름·톤 설계'},
    {icon:'🖼️',title:'이미지 소싱',sub:'출처 표기 이미지 확보'},
  ]:[
    {icon:'⚖️',title:'Legal & compliance',sub:'Screens claims against regulatory limits'},
    {icon:'🔍',title:'Topic research',sub:'Fetches & synthesizes sources'},
    {icon:'✍️',title:'Hook & writing craft',sub:'Structures headline, flow & voice'},
    {icon:'🖼️',title:'Image sourcing',sub:'Finds visuals with attribution'},
  ];
  const LOOP=10600;
  const [T,setT]=useState(0);
  useEffect(()=>{
    const iv=setInterval(()=>setT(p=>(p+50)>=LOOP?0:p+50),50);
    return()=>clearInterval(iv);
  },[]);
  const clamp=(x:number,a=0,b=1)=>Math.max(a,Math.min(b,x));
  const fade=(s:number,d:number)=>clamp((T-s)/d);
  const typeText=(full:string,s:number,cps:number)=>{
    if(T<s)return{txt:'',typing:false,done:false,end:s};
    const end=s+(full.length/cps)*1000;
    const n=Math.floor((T-s)/1000*cps);
    return{txt:full.slice(0,Math.min(n,full.length)),typing:T<end,done:T>=end,end};
  };
  const G=2750;
  const head=typeText(HEADLINE,G,48);
  const sum=typeText(SUMMARY,4350,92);
  const sec=typeText(SECTION,6300,36);
  const bod=typeText(BODY,6900,124);
  const bodyEnd=bod.end;
  const published=T>=bodyEnd+200;
  let stageLabel=KO?'스킬 로딩 중':'Loading skills',stageColor=AMBER,progPct=0,progColor=AMBER;
  if(T<A_DONE){let p=0;for(let i=0;i<4;i++)p+=25*clamp((T-A_LOAD[i])/A_LOAD_D);progPct=Math.min(100,p);}
  else if(T<bodyEnd){stageLabel=KO?'글 작성 중':'Writing article';stageColor=ACC;progColor=ACC;progPct=50+50*clamp((T-A_DONE)/(bodyEnd-A_DONE));}
  else{stageLabel=KO?'발행 완료':'Published';stageColor=GLOW;progColor=GLOW;progPct=100;}
  const consoleLog=T<A_DONE?(KO?'→ 스킬 불러오는 중…':'→ resolving skills…'):T<bodyEnd?(KO?'→ 초안 작성 중…':'→ composing draft…'):(KO?'→ 발행 완료 ✓':'→ published ✓');
  const catO=fade(G-150,250),headO=fade(G-50,250),metaO=fade(4250,300),sumO=fade(4200,350),imgO=fade(5300,350),capO=fade(5850,300),secO=fade(6200,250),bodO=fade(6800,250);
  return (
    <div style={{width:1120,height:820,background:'#14181f',borderRadius:18,boxShadow:'0 40px 90px -34px rgba(20,16,10,.6),0 0 0 1px rgba(20,25,32,.9)',display:'flex',overflow:'hidden',fontFamily:FF,flexShrink:0}}>
      <style>{AGENT_KF}</style>
      <AgentLeftPanel accent={ACC} glow={GLOW} emoji="📝" name={KO?'SEO/AEO 콘텐츠 작가':'SEO/AEO Content Writer'} role={KO?'자율 글쓰기 에이전트':'Autonomous writing agent'} cmd="writer.compose" arg="oily-skin" skills={skills} T={T} stageLabel={stageLabel} stageColor={stageColor} progPct={progPct} progColor={progColor} consoleLog={consoleLog}/>
      <div style={{flex:1,background:'#fbf9f2',overflow:'hidden',position:'relative',WebkitMaskImage:'linear-gradient(180deg,#000 87%,transparent 100%)',maskImage:'linear-gradient(180deg,#000 87%,transparent 100%)'}}>
        <div style={{padding:'34px 40px',overflowY:'auto',height:'100%',boxSizing:'border-box'}}>
          <div style={{opacity:catO,transform:`translateY(${(1-catO)*8}px)`,fontSize:12,fontWeight:800,letterSpacing:'0.16em',color:ACC,textTransform:'uppercase' as const,marginBottom:14,fontFamily:FM}}>{KO?'스킨케어':'SKINCARE'}</div>
          <h2 style={{opacity:headO,transform:`translateY(${(1-headO)*8}px)`,margin:'0 0 16px',fontFamily:SERIF,fontSize:30,fontWeight:500,lineHeight:1.16,letterSpacing:'-0.01em',color:'#1c1812'}}>
            {head.txt}{head.typing&&<span style={{display:'inline-block',width:2,height:'1em',background:'#1c1812',verticalAlign:'-2px',marginLeft:1,animation:'cwBlink 1s step-end infinite'}}/>}
          </h2>
          <div style={{opacity:metaO,transform:`translateY(${(1-metaO)*6}px)`,display:'flex',alignItems:'center',gap:8,marginBottom:20,fontSize:13.5,color:'#9a9384'}}>
            <span style={{width:13,height:13,borderRadius:'50%',border:'1.5px solid #b7b0a0',display:'inline-block'}}/>
            <span>{KO?'6분 읽기   ·   June 18, 2026':'6 min read · June 18, 2026'}</span>
          </div>
          <div style={{opacity:sumO,transform:`translateY(${(1-sumO)*12}px)`,background:'#e7e0d2',border:'1px solid #dbd2c0',borderRadius:16,padding:'18px 22px',marginBottom:24}}>
            <div style={{display:'flex',gap:10,alignItems:'flex-start'}}>
              <span style={{fontSize:20,flexShrink:0}}>💦</span>
              <div>
                <span style={{fontWeight:700,color:'#2b261e',fontSize:14}}>{KO?'요약: ':'Summary: '}</span>

                <span style={{fontSize:14,lineHeight:1.6,color:'#3a352d'}}>
                  {sum.txt}{sum.typing&&<span style={{display:'inline-block',width:2,height:'1em',background:'#3a352d',verticalAlign:'-2px',marginLeft:1,animation:'cwBlink 1s step-end infinite'}}/>}
                </span>
              </div>
            </div>
          </div>
          <div style={{opacity:imgO,transform:`translateY(${(1-imgO)*16}px)`,height:200,borderRadius:16,overflow:'hidden',marginBottom:16,background:'linear-gradient(135deg,#e8f5ee,#c8e8d8,#d8f0e4)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            {imgO>0.5&&<div style={{textAlign:'center'}}>
              <div style={{fontSize:36,marginBottom:6}}>🧴</div>
              <div style={{fontFamily:FM,fontSize:11,color:ACC,opacity:0.7}}>{KO?'출처 Pexels':'Woman applying facial cream · Pexels'}</div>
            </div>}
          </div>
          <div style={{opacity:capO,fontSize:11.5,color:'#9a9384',fontFamily:FM,marginBottom:20,display:'flex',alignItems:'center',gap:6}}>
            <span style={{color:ACC}}>{KO?'✓ 출처 확인':'✓ Cited'}</span><span>{KO?'· 출처 표기 이미지 확보':'· Woman applying facial cream during skincare routine · Pexels'}</span>
          </div>
          <h3 style={{opacity:secO,transform:`translateY(${(1-secO)*8}px)`,margin:'0 0 14px',fontFamily:SERIF,fontSize:22,fontWeight:600,color:'#1c1812'}}>
            {sec.txt}{sec.typing&&<span style={{display:'inline-block',width:2,height:'1em',background:'#1c1812',verticalAlign:'-2px',marginLeft:1,animation:'cwBlink 1s step-end infinite'}}/>}
          </h3>
          <p style={{opacity:bodO,transform:`translateY(${(1-bodO)*8}px)`,margin:0,fontSize:15.5,lineHeight:1.66,color:'#3a352d'}}>
            {bod.txt}{bod.typing&&<span style={{display:'inline-block',width:2,height:'1em',background:'#3a352d',verticalAlign:'-2px',marginLeft:1,animation:'cwBlink 1s step-end infinite'}}/>}
          </p>
          {published&&<div style={{marginTop:24,display:'flex',alignItems:'center',gap:8,fontFamily:FM,fontSize:11.5,color:'#9a9384'}}><span style={{color:ACC}}>✓</span><span>{KO?'ana2me.com에 발행됨 · article id 2026-06-18-moisturizer':'published to ana2me.com · article id 2026-06-18-moisturizer'}</span></div>}
        </div>
      </div>
    </div>
  );
}

/* ─── Agentic Tooling ──────────────────────────────────── */
function AgentCarousel({ t, lang }: { t: T; lang: 'en' | 'kr' }) {
  const [active, setActive] = useState(0);

  const slides: { accent: string; eyebrow: string; title: string; body: string; replaces: string; UI: React.ComponentType<{ lang?: 'en' | 'kr' }> }[] = [
    {
      accent: '#6D5EF5',
      eyebrow: t('Sales Agent', '세일즈 에이전트'),
      title: t('Outbound research and outreach, automated end-to-end', '아웃바운드 리서치부터 아웃리치까지 자동화'),
      body: t('Claude MCP plugin that automates prospect research, ICP qualification, personalization, and email drafting — replacing hours of manual prospecting with a single conversational workflow.', 'Claude MCP 플러그인으로 잠재 고객 리서치, 리드 검증, 개인화, 이메일 초안 작성을 자동화합니다. 수시간이 걸리던 수동 영업을 대화 한 번으로 처리합니다.'),
      replaces: t('Replaces: Sales rep', '대체: 영업 담당자'),
      UI: SalesAgentUI,
    },
    {
      accent: '#1596BC',
      eyebrow: t('Social Marketing Agent', '소셜 마케팅 에이전트'),
      title: t('Brand-safe social content, drafted and posted autonomously', '브랜드 소셜 콘텐츠, 초안부터 게시까지 자동화'),
      body: t('Researches trending topics, drafts on-brand posts, sources visuals, and publishes — with brand voice guardrails built in. Turns a multi-step content workflow into one command.', '트렌드 리서치, 브랜드 톤에 맞는 포스트 초안, 비주얼 소싱, 자동 게시. 브랜드 보이스 가드레일을 내장했습니다. 여러 단계의 콘텐츠 작업을 명령 하나로 처리합니다.'),
      replaces: t('Replaces: Social media manager', '대체: 소셜 미디어 매니저'),
      UI: MarketingAgentUI,
    },
    {
      accent: '#2E7C5E',
      eyebrow: t('Content Writer Agent', '콘텐츠 라이터 에이전트'),
      title: t('SEO/AEO articles researched, written, and published automatically', 'SEO/AEO 아티클 자동 리서치·작성·발행'),
      body: t('End-to-end content pipeline — compliance screening, topic research, bilingual writing, image sourcing, and publishing to ana2me.com. Replaced a multi-person editorial team.', '컴플라이언스 검토부터 주제 리서치, 한영 이중 언어 작성, 이미지 소싱, 발행까지 전 과정 자동화. 여러 명이 필요하던 편집팀 역할을 대체합니다.'),
      replaces: t('Replaces: Editorial team', '대체: 편집팀'),
      UI: ContentWriterAgentUI,
    },
  ];

  const tabLabels = [
    t('Sales Agent', '세일즈 에이전트'),
    t('Marketing Agent', '마케팅 에이전트'),
    t('Content Writer', '콘텐츠 라이터'),
  ];

  useEffect(() => {
    const timer = setInterval(() => setActive(a => (a + 1) % 3), 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding: '8px 18px',
              borderRadius: 6,
              border: `1px solid ${active === i ? s.accent : 'var(--rule)'}`,
              background: active === i ? `${s.accent}18` : 'transparent',
              color: active === i ? s.accent : 'var(--ink-3)',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              cursor: 'pointer',
              transition: 'all 0.25s',
            }}
          >
            {tabLabels[i]}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div style={{ overflow: 'hidden' }}>
        <div style={{
          display: 'flex',
          transition: 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: `translateX(-${active * 100}%)`,
          willChange: 'transform',
          alignItems: 'flex-start',
        }}>
          {slides.map((s, i) => (
            <div key={i} style={{ minWidth: '100%', display: 'flex', gap: 48, alignItems: 'center' }}>
              {/* Description left */}
              <div style={{ flex: '0 0 340px' }}>
                <div className="font-mono-tech text-[11px] tracking-widest uppercase mb-3" style={{ color: s.accent }}>{s.eyebrow}</div>
                <h3 className="font-serif-display text-[22px] md:text-[28px] leading-tight tracking-tight mb-4" style={{ color: 'var(--ink)' }}>{s.title}</h3>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: 'var(--ink-2)' }}>{s.body}</p>
                <span className="font-mono-tech text-[10px] tracking-widest uppercase" style={{ color: s.accent, opacity: 0.7 }}>{s.replaces}</span>
              </div>
              {/* UI right */}
              <div style={{ flex: 1, overflow: 'hidden', display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ zoom: 0.6, flexShrink: 0, transformOrigin: 'top right' }}>
                  <s.UI lang={lang} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: active === i ? 24 : 6,
              height: 6,
              borderRadius: 3,
              background: active === i ? s.accent : 'var(--rule)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function AgentsCaseStudy({
  onBack,
  lang,
  onToggleLang,
  t,
}: {
  onBack: () => void;
  lang: 'en' | 'kr';
  onToggleLang: () => void;
  t: T;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const examples: { icon: IconName; title: string; body: string; replaces: string }[] = [
    {
      icon: 'Zap',
      title: t('Sales & Marketing Agent', '세일즈 & 마케팅 에이전트'),
      body: t(
        'Claude MCP plugin for AEKO — automates outbound research, personalized pitches, outreach drafting, and lead tracking. Replaced hours of manual prospecting with a single conversational workflow.',
        'AEKO용 Claude MCP 플러그인입니다. 아웃바운드 리서치, 맞춤형 피치, 아웃리치 초안 작성, 리드 추적을 자동화하여 수시간의 수동 영업 준비를 하나의 대화형 워크플로우로 대체했습니다.',
      ),
      replaces: t('Replaces: Sales rep', '대체 역할: 영업 담당자'),
    },
    {
      icon: 'News',
      title: t('Research & News Agent', '리서치 & 뉴스 에이전트'),
      body: t(
        'Automated competitive research, market monitoring, and news aggregation across industries. Pulls from multiple sources, synthesizes insights, and delivers structured briefings — turning a daily manual process into an always-on intelligence feed.',
        '경쟁사 리서치, 시장 모니터링, 업계 뉴스 수집을 자동화했습니다. 다양한 소스에서 정보를 수집하고 인사이트를 종합하여 구조화된 브리핑을 제공합니다. 매일 수동으로 하던 작업을 상시 가동되는 인텔리전스 피드로 전환했습니다.',
      ),
      replaces: t('Replaces: Research analyst', '대체 역할: 리서치 애널리스트'),
    },
    {
      icon: 'Globe',
      title: t('Content Pipeline → ana2me', '콘텐츠 파이프라인 → ana2me'),
      body: t(
        'End-to-end content automation — topic research, SEO/AEO scoring, bilingual writing, fact-checking, and publishing. Powers ana2me (ana2me.com), a Korean beauty & ingredient database. Each agent is a modular skill that chains into the next, replacing a multi-person editorial workflow.',
        '주제 리서치, SEO/AEO 스코어링, 이중 언어 작성, 팩트체킹, 발행까지 전 과정을 아우르는 콘텐츠 자동화 에이전트입니다. 한국 뷰티 & 성분 데이터베이스 ana2me(ana2me.com)를 운영합니다. 각 에이전트는 모듈형 스킬로 연결되어 여러 명이 필요했던 편집 워크플로우를 대체합니다.',
      ),
      replaces: t('Replaces: Editorial team', '대체 역할: 편집 팀'),
    },
  ];

  const principles: { icon: IconName; title: string; body: string }[] = [
    {
      icon: 'Bulb',
      title: t('Agents as teammates, not tools', '에이전트는 도구가 아닌 팀원'),
      body: t(
        'Each agent has a specific role and judgment scope, not just a prompt wrapper.',
        '각 에이전트에는 단순 프롬프트 래퍼가 아닌, 고유한 역할과 판단 범위가 있습니다.',
      ),
    },
    {
      icon: 'Target',
      title: t('MCP as the integration layer', 'MCP를 통합 레이어로'),
      body: t(
        'Agents operate inside existing tools (Claude Desktop, Cursor, terminal), not separate UIs.',
        '별도 UI 없이, 이미 쓰는 도구(Claude Desktop, Cursor, 터미널) 안에서 바로 작동합니다.',
      ),
    },
    {
      icon: 'Bar',
      title: t('Compounding leverage', '누적되는 레버리지'),
      body: t(
        'Each agent frees capacity to build the next one. The real ROI is cumulative.',
        '에이전트 하나를 만들수록 다음 에이전트를 만들 여유가 생깁니다. 진짜 ROI는 누적에서 나옵니다.',
      ),
    },
  ];

  return (
    <CaseStudyShell accentClass="acc-violet" onBack={onBack} lang={lang} onToggleLang={onToggleLang} t={t} pageTitle="Agentic Tooling — Justina Yoo" pageDescription="Claude-powered agents for sales, PM workflows, and content automation.">
      <CaseStudyHero
        brandLabel={t('Agentic Tooling', '에이전틱 툴링')}
        tagline={t('Agents · MCP · Workflow Automation', '에이전트 · MCP · 워크플로우 자동화')}
        title={t('Agentic Tooling', '에이전틱 툴링')}
        subtitle={t(
          'If a function can be automated, I build an agent for it — turning headcount constraints into a workflow problem, then solving the workflow.',
          '자동화할 수 있는 기능은 에이전트로 만듭니다. 인력 제약을 워크플로우 문제로 바꾸고, 직접 해결합니다.',
        )}
        metrics={[
          { v: '3+', l: t('Agents in production', '운영 중인 에이전트') },
          { v: 'MCP', l: t('Integration layer', '통합 레이어') },
          { v: '0→1', l: t('Solo execution', '직접 구축') },
        ]}
        t={t}
      />

      {/* Context block */}
      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
              <div>
                <div className="eyebrow mb-4">{t('THE PROBLEM', '문제')}</div>
                <h2 className="font-serif-display text-[28px] md:text-[38px] leading-tight tracking-tight mb-0" style={{ color: 'var(--ink)' }}>
                  {t('There are only so many hours. And only so many people.', '시간도, 인력도 한정되어 있다.')}
                </h2>
              </div>
              <div style={{ paddingTop: 4 }}>
                <p className="text-[16px] leading-relaxed mb-5" style={{ color: 'var(--ink-2)' }}>
                  {t(
                    'Whether you\'re a lean startup, a small product team, or moving fast on a new initiative — there are always more functions to cover than people to cover them. Sales research, competitive monitoring, content production, operations. These things don\'t stop needing to happen just because headcount is limited.',
                    '린 스타트업이든, 소규모 프로덕트 팀이든, 새 이니셔티브를 빠르게 추진하는 팀이든 마찬가지입니다. 인력보다 담당해야 할 기능이 항상 더 많습니다. 영업 리서치, 경쟁사 모니터링, 콘텐츠 제작, 운영. 인력이 부족해도 이 일들은 없어지지 않습니다.',
                  )}
                </p>
                <p className="text-[16px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                  {t(
                    'My approach: if a function can be automated, I build an agent for it. Each agent is infrastructure — not a shortcut — that compounds over time and lets the team focus on what only humans can do.',
                    '내 접근법: 자동화할 수 있는 기능이면 에이전트로 만듭니다. 각 에이전트는 지름길이 아니라 인프라입니다. 시간이 쌓일수록 가치가 커집니다. 사람만 할 수 있는 일에 팀이 집중할 수 있게 해줍니다.',
                  )}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel
            eyebrow={t('WHAT I BUILT', '무엇을 만들었는가')}
            title={t('Agent systems in production', '운영 중인 에이전트 시스템')}
          />

          <AgentCarousel t={t} lang={lang} />
        </div>
      </section>

      <section
        className="border-b hairline"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel
            eyebrow={t('APPROACH', '접근 방식')}
            title={t('How I think about agents', '에이전트를 설계하는 원칙')}
          />
          <CardGrid items={principles} />
        </div>
      </section>

      <CTASection
        title={t('Want to talk agentic tooling?', '에이전트 구축이나 도입에 관심 있으시다면 문의 주세요.')}
        body={t(
          'Happy to share how I design, build, and chain AI agents — from MCP architecture to compounding leverage.',
          'AI 에이전트 설계·구축·연결 방식을 공유할 수 있어요. MCP 아키텍처부터 레버리지 설계 전반을 다룹니다.',
        )}
        ctaLabel={t('Get in touch', '연락하기')}
      />
    </CaseStudyShell>
  );
}
