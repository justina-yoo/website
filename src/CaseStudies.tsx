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
    <section className="border-b hairline">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 pt-20 pb-16 md:pt-28 md:pb-24">
        <div style={heroRight ? { display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 48, alignItems: 'center' } : {}}>
        <div>
        <Reveal delay={120}>
          <div className="flex items-center gap-4 mb-5">
            {logoSrc && <img src={logoSrc} alt={brandLabel} className="h-14 md:h-20 lg:h-28 w-auto" />}
            <h1
              className="font-serif-display text-[40px] md:text-[64px] lg:text-[80px] leading-[0.92] tracking-tight"
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
        {heroRight && <Reveal delay={200}>{heroRight}</Reveal>}
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
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 64, alignItems: 'center' }}>
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
      width: 300,
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
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 12, marginBottom: 40 }}>
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
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 16 }}>
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
                'Rather than asking readers to seek out a new product, we embedded contextual entry points directly inside the article — AI questions, polls, and search prompts that feel native to the page. Each card is designed to pull readers naturally into conversation, without breaking the flow of what they were already reading.',
                '독자에게 새로운 제품을 찾아오라고 요구하는 대신, 기사 내부에 맥락형 진입점을 직접 심었습니다. AI 질문 카드, 투표, 검색 프롬프트 — 모두 페이지에 자연스럽게 녹아드는 형태로 설계되어, 독자가 읽던 흐름을 끊지 않고 대화로 자연스럽게 유입될 수 있도록 했습니다.',
              )}
            </p>
          </Reveal>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>
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
      phase: '01 — ' + t('Dashboard & Feature Design', '대시보드 & 기능 설계'),
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
      phase: '02 — ' + t('AEKO Agents (MCP)', 'AEKO 에이전트 (MCP)'),
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
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40 }}>
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
              <div style={{ textAlign: 'right' }}>
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
      title: t('Real-time market news', '실시간 시장 뉴스'),
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
      phase: '01 — ' + t('Discovery', '리서치'),
      title: t(
        'Korean investors are flying blind on US markets',
        '한국 투자자들은 미국 시장 정보 없이 투자하고 있다',
      ),
      content: t(
        'Korean retail investors were increasingly active in US equities, but the information gap was severe. Earnings releases, SEC filings, and government policy signals move US small-cap stocks within minutes — yet Korean investors had no reliable, translated source to act on them in time. By the time news filtered through, the trade was gone.',
        '한국 개인 투자자의 미국 주식 활동이 급증했지만, 정보 격차는 심각했습니다. 실적 발표, SEC 공시, 정부 정책 시그널은 수분 안에 미국 스몰캡 종목을 움직입니다. 하지만 한국 투자자에게는 이를 제때 행동으로 옮길 수 있는 신뢰할 만한 번역 소스가 없었습니다. 뉴스가 한국어로 도착할 때쯤이면 매매 기회는 이미 지나간 뒤였습니다.',
      ),
      tags: ['User Research', 'Market Analysis', 'Opportunity Sizing', 'Competitive Landscape'],
    },
    {
      phase: '02 — ' + t('Problem Framing', '문제 정의'),
      title: t(
        "The bottleneck isn't information — it's speed and language",
        '병목은 정보 자체가 아닌 속도와 언어',
      ),
      content: t(
        "The problem wasn't that US market data didn't exist. It was that nothing aggregated SEC filings, government signals, and breaking market news in one place and made them accessible in Korean, fast enough to act on. We framed the product opportunity as: build the intelligence layer Korean investors need to move at the speed of US markets.",
        '문제는 미국 시장 데이터가 없다는 것이 아니었습니다. SEC 공시, 정부 시그널, 속보를 한곳에 모아 한국어로 실행 가능한 속도로 제공하는 도구가 없었던 것입니다. 제품 기회를 다음과 같이 정의했습니다: 한국 투자자가 미국 시장 속도에 맞춰 움직일 수 있는 인텔리전스 레이어를 구축하자.',
      ),
      tags: ['Problem Statement', 'Jobs-to-be-Done', 'TAM Sizing'],
    },
    {
      phase: '03 — ' + t('Product Strategy', '프로덕트 전략'),
      title: t('Three-pillar intelligence platform', '세 축의 인텔리전스 플랫폼'),
      content: t(
        'Designed ATTN around three core content pillars: real-time market news, SEC filing analysis, and US government policy signals. Each pillar feeds a distinct investor need — from intraday traders reacting to earnings to longer-horizon investors tracking regulatory shifts. Multi-model AI handles translation, summarization, and signal extraction at scale.',
        'ATTN을 세 개의 핵심 콘텐츠 축으로 설계했습니다: 실시간 시장 뉴스, SEC 공시 분석, 미국 정부 정책 시그널. 각 축은 실적에 반응하는 단기 트레이더부터 규제 변화를 추적하는 장기 투자자까지 서로 다른 수요를 충족합니다. 멀티 모델 AI가 번역, 요약, 시그널 추출을 대규모로 처리합니다.',
      ),
      tags: ['Product Strategy', 'Content Architecture', 'Multi-Model AI', 'AI Orchestration'],
    },
    {
      phase: '04 — ' + t('Build', '빌드'),
      title: t(
        'AI-native pipeline from source to reader',
        '소스에서 독자까지 이어지는 AI 네이티브 파이프라인',
      ),
      content: t(
        'Built an AI-native data pipeline using multi-model orchestration and MCP servers to continuously ingest English-language financial sources, extract market-moving signals, translate and structure content for Korean readers, and surface it within minutes of publication. Docker-based infrastructure enables reliable scaling around US market open/close windows.',
        '멀티 모델 오케스트레이션과 MCP 서버를 활용하여 영문 금융 소스를 지속적으로 수집하고, 시장을 움직이는 시그널을 추출하고, 한국어로 번역·구조화하여 발행 수분 내에 노출하는 AI 네이티브 데이터 파이프라인을 구축했습니다. Docker 기반 인프라로 미국 장 개장·마감 시간대의 트래픽 급증에도 안정적으로 대응합니다.',
      ),
      tags: ['Multi-Model AI', 'MCP Server', 'Docker', '3rd Party APIs', 'AI Orchestration'],
    },
    {
      phase: '05 — ' + t('Outcome', '성과'),
      title: t(
        "South Korea's #1 US stock market information media",
        '한국 1위 미국 주식 시장 정보 미디어',
      ),
      content: t(
        "ATTN established itself as the leading Korean-language platform for US market intelligence. The platform delivers real-time coverage of SEC filings, government signals, and market news — closing the information gap that had left Korean investors at a structural disadvantage in US markets.",
        'ATTN은 미국 시장 인텔리전스 분야의 대표 한국어 플랫폼으로 자리 잡았습니다. SEC 공시, 정부 시그널, 시장 뉴스를 실시간으로 전달하며, 한국 투자자가 미국 주식 시장에서 겪던 구조적 정보 격차를 해소하고 있습니다.',
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
      title: t('Multi-model orchestration earns its complexity', '멀티 모델 오케스트레이션, 복잡해도 그만한 가치가 있다'),
      body: t(
        'No single model handles real-time ingestion, translation, summarization, and signal extraction equally well. Orchestrating specialized models per task gave us both better output quality and cost efficiency at scale.',
        '단일 모델로는 실시간 수집, 번역, 요약, 시그널 추출을 모두 잘 처리할 수 없습니다. 작업별로 전문화된 모델을 오케스트레이션한 결과, 대규모 운영에서 결과 품질과 비용 효율성이 모두 향상되었습니다.',
      ),
    },
  ];

  return (
    <CaseStudyShell accentClass="acc-sky" onBack={onBack} lang={lang} onToggleLang={onToggleLang} t={t} pageTitle="ATTN Case Study — Justina Yoo" pageDescription="US market intelligence for Korean investors.">
      <CaseStudyHero
        brandLabel="ATTN"
        logoSrc="/attn-logo.svg"
        title="ATTN"
        tagline={t('US Market Intelligence · AI Translation · Korean Investors', '미국 시장 인텔리전스 · AI 번역 · 한국 투자자')}
        subtitle={t(
          'Closing the information gap between Korean investors and US markets — real-time SEC filings, government signals, and market news, translated and delivered at the speed of trading.',
          '한국 투자자와 미국 시장 간 정보 격차 해소 — SEC 공시, 정부 시그널, 시장 뉴스를 실시간으로 번역해 트레이딩 속도로 전달.',
        )}
        productColor="#5ACE81"
        metrics={[
          { v: 'Real-time', l: t('Delivery', '실시간 전달') },
          { v: '3', l: t('AI Models', 'AI 모델') },
          { v: 'SEC + Gov', l: t('Signal Sources', '시그널 소스') },
          { v: '0→1', l: t('Build', '빌드') },
        ]}
        t={t}
      />

      {/* Product UI showcase */}
      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <Reveal>
            <div className="flex items-center gap-4 mb-10">
              <img src="/attn-logo.svg" alt="ATTN" className="h-6" />
              <a
                href="https://www.attn.today"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-tech text-[11px] tracking-widest uppercase"
                style={{ color: 'var(--acc)' } as React.CSSProperties}
              >
                attn.today ↗
              </a>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-sm overflow-hidden border hairline mb-6">
              <img src="/attn-hero.png" alt="ATTN homepage with market overview and SEC filings" className="w-full" />
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal delay={160}>
              <div className="rounded-sm overflow-hidden border hairline">
                <img src="/attn-content.png" alt="ATTN morning brief and market data" className="w-full" />
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="rounded-sm overflow-hidden border hairline">
                <img src="/attn-features.png" alt="ATTN SEC filing articles" className="w-full" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

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
          <SectionLabel eyebrow={t('PROCESS', '프로세스')} title={t('How we built it', '어떻게 만들었는가')} />
          <TimelineList steps={timeline} />
        </div>
      </section>

      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel eyebrow={t('REFLECTIONS', '회고')} title={t('What I learned', '제가 배운 것')} />
          <CardGrid items={learnings} />
        </div>
      </section>

      <CTASection
        title={t('Want to talk through this?', '이 프로젝트 더 이야기 나누고 싶다면')}
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
        title={t('Want to talk agentic workflows?', '에이전틱 워크플로우에 대해 이야기할까요?')}
        body={t(
          'Happy to share how I build and ship with AI agents — from architecture to daily use.',
          'AI 에이전트로 어떻게 제품을 만들고 운영하는지 공유할 수 있습니다 — 아키텍처부터 일상 활용까지.',
        )}
        ctaLabel={t('Get in touch', '연락하기')}
      />
    </CaseStudyShell>
  );
}

/* ─── Product Strategy & 0→1 ───────────────────────────── */
export function StrategyCaseStudy({
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
        subLabels={[t('Role-Level Case Study', '역할 기반 케이스 스터디')]}
        title={t('Product Strategy & 0→1', '프로덕트 전략 & 0→1')}
        subtitle={t(
          'From zero to product-market fit — defining what to build, for whom, and how to win.',
          '제로에서 프로덕트-마켓 핏까지 — 무엇을 만들고, 누구를 위해, 어떻게 이길지 정의합니다.',
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
          <SectionLabel eyebrow={t('VISUALS', '비주얼')} title={t('Visual Evidence', '시각적 근거')} />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'AEKO Activation Loop', desc: 'Diagram showing the user journey: connect domain → define prompts → see AI Visibility Score → optimization guidance' },
              { title: 'NewsChat PMF Timeline', desc: 'Timeline graphic showing key milestones from hypothesis to 1M MAU in 5 months, with PMF signals marked' },
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
            title={t('How I think about strategy', '전략에 대한 사고방식')}
          />
          <CardGrid items={principles} />
        </div>
      </section>

      <CTASection
        title={t('Want to talk strategy?', '전략에 대해 이야기할까요?')}
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
        title={t('Want to talk AI architecture?', 'AI 아키텍처에 대해 이야기할까요?')}
        body={t(
          'Happy to go deeper on RAG pipelines, multi-model orchestration, or building AI systems that actually ship.',
          'RAG 파이프라인, 멀티 모델 오케스트레이션, 실제로 출시되는 AI 시스템 구축에 대해 더 자세히 이야기 나눌 수 있습니다.',
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
          <CardGrid items={examples} />
        </div>
      </section>

      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel eyebrow={t('VISUALS', '비주얼')} title={t('UX & Revenue Design', 'UX 및 수익 설계')} />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Contextual Ad Placement UX', desc: 'Before/after mockup showing ad placement at natural conversation breakpoints vs. traditional banner ads — the UX constraint that drove 10% CTR' },
              { title: 'AEKO Freemium Funnel', desc: 'Funnel diagram: free visibility score → urgency trigger → paid prompt tracking → optimization tier' },
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
            title={t('How I think about monetization', '수익화에 대한 사고방식')}
          />
          <CardGrid items={principles} />
        </div>
      </section>

      <CTASection
        title={t('Want to talk monetization?', '수익화에 대해 이야기할까요?')}
        body={t(
          'Happy to go deeper on revenue strategy, pricing architecture, or growth without paid acquisition.',
          '수익 전략, 가격 설계, 유료 획득 없는 성장에 대해 더 자세히 이야기 나눌 수 있습니다.',
        )}
        ctaLabel={t('Get in touch', '연락하기')}
      />
    </CaseStudyShell>
  );
}

/* ─── Agentic Tooling ──────────────────────────────────── */
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

  const examples: { icon: IconName; title: string; body: string }[] = [
    {
      icon: 'Zap',
      title: t('Sales & Marketing Agent', '세일즈 & 마케팅 에이전트'),
      body: t(
        'Claude MCP plugin for AEKO — automates outbound research, personalized pitches, outreach drafting, and lead tracking. Replaced hours of manual prospecting with a single conversational workflow.',
        'AEKO용 Claude MCP 플러그인입니다. 아웃바운드 리서치, 맞춤형 피치, 아웃리치 초안 작성, 리드 추적을 자동화하여 수시간의 수동 영업 준비를 하나의 대화형 워크플로우로 대체했습니다.',
      ),
    },
    {
      icon: 'News',
      title: t('Research & News Agent', '리서치 & 뉴스 에이전트'),
      body: t(
        'Automated competitive research, market monitoring, and news aggregation across industries. Pulls from multiple sources, synthesizes insights, and delivers structured briefings — turning a daily manual process into an always-on intelligence feed.',
        '경쟁사 리서치, 시장 모니터링, 업계 뉴스 수집을 자동화했습니다. 다양한 소스에서 정보를 수집하고 인사이트를 종합하여 구조화된 브리핑을 제공합니다. 매일 수동으로 하던 작업을 상시 가동되는 인텔리전스 피드로 전환했습니다.',
      ),
    },
    {
      icon: 'Globe',
      title: t('Content Pipeline → ana2me', '콘텐츠 파이프라인 → ana2me'),
      body: t(
        'End-to-end content automation agents — topic research, SEO/AEO scoring, bilingual writing, fact-checking, and publishing. Powers ana2me (ana2me.com), a Korean beauty & ingredient database built as a side project. Each agent is a modular skill that chains into the next, replacing a multi-person editorial workflow.',
        '주제 리서치, SEO/AEO 스코어링, 이중 언어 작성, 팩트체킹, 발행까지 전 과정을 아우르는 콘텐츠 자동화 에이전트입니다. 사이드 프로젝트로 구축한 한국 뷰티 & 성분 데이터베이스 ana2me(ana2me.com)를 운영하고 있습니다. 각 에이전트는 모듈형 스킬로 다음 단계와 연결되어, 여러 명이 필요했던 편집 워크플로우를 대체합니다.',
      ),
    },
  ];

  const principles: { icon: IconName; title: string; body: string }[] = [
    {
      icon: 'Bulb',
      title: t('Agents as teammates, not tools', '에이전트는 도구가 아닌 팀원'),
      body: t(
        'Each agent has a specific role and judgment scope, not just a prompt wrapper.',
        '각 에이전트는 단순 프롬프트 래퍼가 아닌 특정 역할과 판단 범위를 갖습니다.',
      ),
    },
    {
      icon: 'Target',
      title: t('MCP as the integration layer', 'MCP를 통합 레이어로'),
      body: t(
        'Agents operate inside existing tools (Claude Desktop, Cursor, terminal), not separate UIs.',
        '에이전트는 별도 UI가 아닌 기존 도구(Claude Desktop, Cursor, 터미널) 안에서 작동합니다.',
      ),
    },
    {
      icon: 'Bar',
      title: t('Compounding leverage', '복리적 레버리지'),
      body: t(
        'Each agent frees capacity to build the next one. The real ROI is cumulative.',
        '에이전트 하나를 만들 때마다 다음 에이전트를 만들 여유가 생깁니다. 진정한 ROI는 누적됩니다.',
      ),
    },
  ];

  return (
    <CaseStudyShell accentClass="acc-violet" onBack={onBack} lang={lang} onToggleLang={onToggleLang} t={t} pageTitle="Agentic Tooling — Justina Yoo" pageDescription="Claude-powered agents for sales, PM workflows, and content automation.">
      <CaseStudyHero
        brandLabel={t('Agentic Tooling', '에이전틱 툴링')}
        subLabels={[t('Role-Level Case Study', '역할 기반 케이스 스터디'), 'Panomix & AEKO Intelligence']}
        title={t('Agentic Tooling', '에이전틱 툴링')}
        subtitle={t(
          'Custom AI agents built on Claude — replacing manual workflows with autonomous, composable tooling.',
          'Claude 기반 커스텀 AI 에이전트 — 수동 워크플로우를 자율적이고 조합 가능한 도구로 대체합니다.',
        )}
        t={t}
      />

      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel
            eyebrow={t('WHAT I BUILT', '무엇을 만들었는가')}
            title={t('Agent systems in production', '운영 중인 에이전트 시스템')}
          />
          <CardGrid items={examples} />
        </div>
      </section>

      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel eyebrow={t('VISUALS', '비주얼')} title={t('Agent Architecture', '에이전트 아키텍처')} />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Agent Workflow Map', desc: 'Diagram showing how the 3 agents (Sales, Research, Content) connect via MCP and chain into each other' },
              { title: 'Content Pipeline Flow', desc: 'Flow chart: topic research → SEO/AEO scoring → bilingual writing → fact-checking → publishing to ana2me.com' },
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
            title={t('How I think about agents', '에이전트에 대한 사고방식')}
          />
          <CardGrid items={principles} />
        </div>
      </section>

      <CTASection
        title={t('Want to talk agentic tooling?', '에이전틱 툴링에 대해 이야기할까요?')}
        body={t(
          'Happy to share how I design, build, and chain AI agents — from MCP architecture to compounding leverage.',
          'AI 에이전트를 어떻게 설계하고 구축하고 연결하는지 공유할 수 있습니다 — MCP 아키텍처부터 복리적 레버리지까지.',
        )}
        ctaLabel={t('Get in touch', '연락하기')}
      />
    </CaseStudyShell>
  );
}
