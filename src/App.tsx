/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Editorial blue-paper portfolio — home + password gate + EN/KR toggle.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  Reveal,
  Icon,
  TopNav,
  Footer,
  PageMeta,
} from './ui';
import MorphBlob from './MorphBlob';
import { NewsChatCaseStudy, AekoCaseStudy, AttnCaseStudy, WorkflowCaseStudy, StrategyCaseStudy, AISystemsCaseStudy, MonetizationCaseStudy, AgentsCaseStudy } from './CaseStudies';

type Lang = 'en' | 'kr';
type Page = 'home' | 'newschat' | 'aeko' | 'attn' | 'workflow' | 'strategy' | 'ai-systems' | 'monetization' | 'agents';

const PASSWORD = import.meta.env.VITE_PORTFOLIO_PASSWORD || '';
const AUTH_KEY = 'justina_portfolio_auth_v2';

/* ─── Password Gate ─────────────────────────────── */
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, '1');
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1600);
    }
  };

  return (
    <div
      className="canvas-tint grain min-h-screen flex items-center justify-center px-6"
      style={{ position: 'relative' }}
    >
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-strong rounded-sm p-10 md:p-12 border hairline">
          <div className="eyebrow mb-3">Access required</div>
          <h1 className="font-serif-display text-[28px] sm:text-[36px] leading-[1.05] tracking-tight mb-3">
            Justina Yoo
          </h1>
          <p className="text-[14px] mb-8" style={{ color: 'var(--ink-3)' }}>
            This portfolio is private. Enter the password to continue.
          </p>
          <form onSubmit={submit} className="flex flex-col gap-3">
            <input
              type="password"
              autoFocus
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Password"
              className="px-4 py-3 border hairline rounded-sm bg-white/5 text-[14px] outline-none focus:border-[var(--accent)]"
              style={{
                animation: error ? 'shake 0.4s' : 'none',
                borderColor: error ? '#FF6B6B' : undefined,
              }}
            />
            <button type="submit" className="btn-primary justify-center">
              Enter <Icon.Arrow />
            </button>
            {error && (
              <p
                className="text-[12px] font-mono-tech tracking-widest uppercase"
                style={{ color: '#FF6B6B' }}
              >
                Incorrect password
              </p>
            )}
          </form>
        </div>
        <p
          className="mt-6 text-center font-mono-tech text-[10px] tracking-widest uppercase"
          style={{ color: 'var(--ink-3)' }}
        >
          If you need access, email justina.yoo@gmail.com
        </p>
      </div>
      <style>{`@keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }`}</style>
    </div>
  );
}

/* ─── Home sections ─────────────────────────────── */
function Hero({ t }: { t: (en: string, kr: string) => string }) {
  const isKr = t('en', 'kr') === 'kr';
  return (
    <section className="relative overflow-hidden" style={{ background: 'rgba(26,26,28,0.92)', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5)', color: '#F5F2EA' }}>
      {/* Torus as background on mobile */}
      <div className="absolute right-[-15%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-[0.12] pointer-events-none md:hidden">
        <MorphBlob palette="iris" />
      </div>
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 pt-2 pb-24 sm:pb-28 md:pt-4 md:pb-32 relative z-[1]">
        <div className="grid grid-cols-12 gap-6 md:gap-14 items-stretch">
          <div className="col-span-12 md:col-span-7 md:order-2 flex flex-col">
            <Reveal>
              <div className="flex items-center gap-1.5 sm:gap-3 mb-6 sm:mb-8 flex-nowrap">
                <span
                  className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-mono-tech text-[7px] sm:text-[10px] tracking-wider sm:tracking-widest uppercase font-medium whitespace-nowrap"
                  style={{ background: 'rgba(152,232,193,0.12)', color: '#98E8C1', border: '1px solid rgba(152,232,193,0.25)' }}
                >
                  <span className="inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full" style={{ background: '#98E8C1' }} />
                  Open to opportunities
                </span>
                <span
                  className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-mono-tech text-[7px] sm:text-[10px] tracking-wider sm:tracking-widest uppercase font-medium whitespace-nowrap"
                  style={{ background: 'rgba(158,132,255,0.12)', color: '#9E84FF', border: '1px solid rgba(158,132,255,0.25)' }}
                >
                  <span className="inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full" style={{ background: '#9E84FF' }} />
                  Available for AI consulting &amp; building
                </span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="flex items-start gap-0">
                <h1 className={`title-glow font-serif-display leading-[1.5] md:leading-[1.1] tracking-tight ${isKr ? 'text-[32px] sm:text-[38px] md:text-[40px] lg:text-[54px] xl:text-[66px]' : 'text-[36px] sm:text-[44px] md:text-[48px] lg:text-[64px] xl:text-[80px]'}`} style={{ fontWeight: 700, letterSpacing: '-0.03em' }}>
                  {t('Strategy to', 'AX')}
                  {isKr ? <br /> : <br className="md:hidden" />}
                  {' '}<span className="accent-glow">{t('shipped', '전략부터')}</span>
                  {isKr ? <br /> : <br className="hidden md:block" />}
                  {' '}<span className="accent-glow">{t('product', '딜리버리까지')}</span><span className="accent-glow">.</span>
                </h1>
                <img
                  src="/avatar.png"
                  alt="Justina Yoo"
                  className={`w-[110px] sm:w-[130px] md:w-[190px] lg:w-[240px] flex-shrink-0 -mt-3 md:-mt-2 ${isKr ? 'ml-12 sm:ml-6 md:ml-0' : 'ml-4 sm:ml-0 sm:-ml-4 md:-ml-8'}`}
                />
              </div>
            </Reveal>
            <Reveal delay={260}>
              <p
                className="mt-2 md:mt-4 text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed max-w-[560px]"
                style={{ color: '#C8C6BE', fontWeight: 500 }}
              >
                {t(
                  'From defining strategy to shipping AI systems at scale, I work across the full stack of AI transformation: opportunity framing, experience design, and hands-on delivery.',
                  '전략 수립부터 대규모 AI 시스템 출시까지, AI 트랜스포메이션의 전 과정을 함께합니다. 기회 발굴, 경험 설계, 그리고 직접 구현까지.',
                )}
              </p>
            </Reveal>
          </div>
          <div className="hidden md:flex col-span-12 md:col-span-5 md:order-1 flex-col">
            <Reveal delay={300}>
              <div
                className="relative rounded-lg overflow-hidden mb-7 h-[360px]"
                style={{
                  border: '1px dashed rgba(255,255,255,0.14)',
                  background: `
                    linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px) 0 0 / 28px 28px,
                    linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px) 0 0 / 28px 28px,
                    radial-gradient(ellipse at 50% 45%, #28282C 0%, #1C1C1F 70%)
                  `,
                }}
              >
                <MorphBlob palette="iris" />
              </div>
            </Reveal>
          </div>
          {/* Context row — full width */}
          <div className="col-span-12 md:order-3">
            <Reveal delay={360}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-4 md:-mt-6" style={{}}>
                <div>
                  <div className="font-mono-tech text-[11px] tracking-widest uppercase mb-2" style={{ color: '#7C7A74', fontWeight: 500 }}>{t('Based across', '거점')}</div>
                  <div className="flex items-center gap-3 text-[14px] flex-wrap" style={{ color: '#F5F2EA', fontWeight: 500 }}>
                    <span>🇨🇳 {t('Shanghai', '상하이')}</span>
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                    <span>🇺🇸 {t('Pittsburgh', '피츠버그')}</span>
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                    <span>🇰🇷 {t('Seoul', '서울')}</span>
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                    <span>🇭🇰 {t('Hong Kong', '홍콩')}</span>
                  </div>
                </div>
                <div>
                  <div className="font-mono-tech text-[11px] tracking-widest uppercase mb-2" style={{ color: '#7C7A74', fontWeight: 500 }}>{t('Education', '학력')}</div>
                  <div className="flex items-center gap-3">
                    <img src="/cmu-logo.png" alt="CMU" className="w-7 h-7 rounded" />
                    <div className="text-[14px]" style={{ color: '#F5F2EA', fontWeight: 500 }}>
                      {t('Carnegie Mellon University — Decision Science + HCI', '카네기멜론대학교 — 의사결정과학 + HCI')}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-mono-tech text-[11px] tracking-widest uppercase mb-2" style={{ color: '#7C7A74', fontWeight: 500 }}>{t('Focus', '관심 분야')}</div>
                  <div className="text-[14px]" style={{ color: '#F5F2EA', fontWeight: 500 }}>
                    {t('AX Consulting · AI Strategist · UX · End-to-End Build', 'AX 컨설팅 · AI 전략가 · UX · 풀사이클 구축')}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolStack() {
  const tools = [
    { name: 'Claude', logo: '/tools/claude.svg' },
    { name: 'Cursor', logo: '/tools/cursor.svg' },
    { name: 'VS Code', logo: '/tools/vscode.svg' },
    { name: 'Figma', logo: '/tools/figma.svg' },
    { name: 'Canva', logo: '/tools/canva.svg' },
    { name: 'Notion', logo: '/tools/notion.svg' },
    { name: 'Supabase', logo: '/tools/supabase.svg' },
    { name: 'GitHub', logo: '/tools/github.svg' },
    { name: 'Google Analytics', logo: '/tools/google-analytics.svg' },
    { name: 'Slack', logo: '/tools/slack.svg' },
  ];
  return (
    <section className="border-b hairline">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-4 md:py-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <span className="eyebrow">Stack</span>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          {tools.map(tool => (
            <div key={tool.name} className="flex items-center gap-2">
              <img src={tool.logo} alt={tool.name} className="w-4 h-4" style={{ opacity: 0.6, filter: 'invert(1) brightness(0.85)' }} />
              <span className="text-[13px]" style={{ color: 'var(--ink-3)' }}>{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedWork({
  t,
  onOpen,
}: {
  t: (en: string, kr: string) => string;
  onOpen: (p: Page) => void;
}) {
  const [filter, setFilter] = useState<string | null>(null);

  const projects: {
    id: Page;
    name: string;
    logo?: string;
    tag: string;
    kicker: string;
    headline: string;
    body: string;
    accent: string;
    categories: string[];
    metrics: { v: string; l: string }[];
  }[] = [
    {
      id: 'strategy',
      name: t('Product Strategy & 0→1', '프로덕트 전략 & 0→1'),
      tag: t('Strategy · PM', '전략 · PM'),
      kicker: '01',
      categories: ['0→1', 'B2B', 'B2C'],
      headline: t(
        'From zero to product-market fit.',
        '아이디어에서 PMF까지.',
      ),
      body: t(
        'Owned AEKO end-to-end from concept to MVP as sole PM. Led NewsChat from hypothesis to 1M MAU in 5 months. Defined activation loops, pricing architecture, and go-to-market for both.',
        'AEKO를 컨셉부터 MVP까지 단독 PM으로 이끌었고, NewsChat을 가설 단계에서 5개월 만에 MAU 100만까지 성장시켰습니다. 두 제품 모두 활성화 루프, 가격 체계, GTM 전략을 직접 설계했습니다.',
      ),
      accent: '#9E84FF',
      metrics: [
        { v: 'GTM', l: t('Go-to-Market', 'Go-to-Market') },
        { v: '1M', l: t('MAU', 'MAU') },
        { v: '5mo', l: t('To PMF', 'PMF 달성') },
      ],
    },
    {
      id: 'ai-systems',
      name: t('AI Systems & Infrastructure', 'AI 시스템 & 인프라'),
      tag: t('GenAI · MCP', 'GenAI · MCP'),
      kicker: '02',
      categories: ['GenAI', 'B2B'],
      headline: t(
        'Designing the AI that powers the product.',
        '제품의 핵심이 되는 AI를 직접 설계.',
      ),
      body: t(
        'RAG pipelines for NewsChat. ADK — an embeddable SDK auto-generating contextual AI features for publishers. Visibility scoring and source attribution systems for AEKO. MCP server integrations across the stack.',
        'NewsChat의 RAG 파이프라인, 퍼블리셔용 맥락형 AI 기능을 자동 생성하는 임베더블 SDK ADK, AEKO의 가시성 스코어링 및 소스 어트리뷰션 시스템, 스택 전반의 MCP 서버 통합을 설계했습니다.',
      ),
      accent: '#7DE8FF',
      metrics: [
        { v: 'SDK', l: t('+ API', '+ API') },
        { v: 'RAG', l: t('+ LLM', '+ LLM') },
        { v: 'MCP', l: t('Infra', '인프라') },
      ],
    },
    {
      id: 'monetization',
      name: t('Monetization & Growth', '수익화 & 그로스'),
      tag: t('Revenue · Growth', '수익 · 그로스'),
      kicker: '03',
      categories: ['B2C', 'B2B'],
      headline: t(
        'Revenue-first product thinking.',
        '수익을 먼저 생각하는 프로덕트.',
      ),
      body: t(
        "Designed NewsChat's contextual ad system — 10% CTR vs 0.1% industry average, 3.5x ARPU. Built AEKO's freemium pricing architecture. Grew NewsChat to 1M MAU with zero paid acquisition.",
        'NewsChat의 맥락 광고 시스템을 설계해 업계 평균 0.1% 대비 10% CTR, ARPU 3.5배를 달성했습니다. AEKO의 프리미엄 가격 체계를 구축하고, NewsChat을 유료 마케팅 없이 MAU 100만까지 성장시켰습니다.',
      ),
      accent: '#98E8C1',
      metrics: [
        { v: '10%', l: 'CTR' },
        { v: '3.5x', l: 'ARPU' },
        { v: 'A/B', l: t('Testing', '테스팅') },
      ],
    },
    {
      id: 'agents',
      name: t('Agentic Tooling', '에이전틱 툴링'),
      tag: t('Agents · MCP', '에이전트 · MCP'),
      kicker: '04',
      categories: ['GenAI', '0→1'],
      headline: t(
        'AI agents that multiply output.',
        '생산성을 극대화하는 AI 에이전트.',
      ),
      body: t(
        'Built Claude-powered agents for sales prospecting, PM workflows, and content automation at Panomix / AEKO Intelligence. MCP integrations that run inside Claude Desktop and Cursor.',
        'Panomix / AEKO Intelligence에서 Claude 기반 세일즈, PM 워크플로우, 콘텐츠 자동화 에이전트를 구축했습니다. Claude Desktop과 Cursor에서 바로 실행되는 MCP 통합.',
      ),
      accent: '#C4A5FF',
      metrics: [
        { v: '3+', l: t('Agents', '에이전트') },
        { v: 'Prompt', l: t('Engineering', '엔지니어링') },
        { v: 'Claude', l: t('Platform', '플랫폼') },
      ],
    },
  ];

  return (
    <section id="featured-work" className="border-b hairline relative overflow-hidden">
      <div className="absolute -right-20 top-20 w-[200px] h-[200px] opacity-[0.25] pointer-events-none hidden md:block z-[2]">
        <MorphBlob palette="iris" holeScale={0} blobOnly />
      </div>
      <div className="absolute -left-20 top-[65%] w-[180px] h-[180px] opacity-[0.20] pointer-events-none hidden md:block z-[2]">
        <MorphBlob palette="iris" holeScale={0} blobOnly />
      </div>
      <div className="relative z-[1] max-w-[1240px] mx-auto px-6 md:px-10 py-8 md:py-14 lg:py-20">
        <Reveal>
          <div className="flex items-end justify-between mb-6">
            <h2 className="title-glow font-serif-display text-[24px] sm:text-[32px] md:text-[44px] lg:text-[56px] leading-[1] tracking-tight">
              {t('Featured Work', '주요 프로젝트')}
            </h2>
            <div
              className="hidden md:block font-mono-tech text-[10px] tracking-widest uppercase"
              style={{ color: 'var(--ink-3)' }}
            >
              2023 — 2026
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6 md:mb-10">
            {['0→1', 'GenAI', 'B2B', 'B2C'].map(cat => (
              <span key={cat} className="chip">
                {cat}
              </span>
            ))}
          </div>
        </Reveal>
        <div className="flex flex-col">
          {projects.filter(p => !filter || p.categories.includes(filter)).map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <button
                onClick={() => onOpen(p.id)}
                className="group relative w-full text-left border-t hairline last:border-b py-5 md:py-8 lg:py-10"
              >
                <div className="grid grid-cols-12 gap-6 md:gap-10 items-start transition-transform duration-300 origin-left group-hover:scale-[1.02]">
                  <div className="col-span-12 md:col-span-1">
                    <div
                      className="font-mono-tech text-[11px] tracking-widest"
                      style={{ color: 'var(--ink-3)' }}
                    >
                      {p.kicker}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <div className="mb-3">
                      {p.logo ? (
                        <img src={p.logo} alt={p.name} className="h-8" />
                      ) : (
                        <span
                          className="font-serif-display text-[24px] sm:text-[30px] md:text-[36px] leading-none"
                          style={{ color: p.accent }}
                        >
                          {p.name}
                        </span>
                      )}
                    </div>
                    <span className="chip">{p.tag}</span>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <h3 className="font-serif-display text-[20px] sm:text-[24px] md:text-[32px] leading-[1.05] tracking-tight mb-4">
                      {p.headline}
                    </h3>
                    <p className="text-[14px] max-w-[54ch]" style={{ color: 'var(--ink-2)' }}>
                      {p.body}
                    </p>
                    <div className="flex flex-wrap gap-5 mt-6">
                      {p.metrics.map((m, j) => (
                        <div key={j}>
                          <div
                            className="font-serif-display text-[20px] leading-none"
                            style={{ color: p.accent }}
                          >
                            {m.v}
                          </div>
                          <div
                            className="font-mono-tech text-[10px] tracking-widest uppercase mt-1"
                            style={{ color: 'var(--ink-3)' }}
                          >
                            {m.l}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="hidden md:flex col-span-12 md:col-span-2 md:justify-end">
                    <span
                      className="inline-flex items-center gap-2 font-mono-tech text-[11px] tracking-widest uppercase group-hover:gap-4 transition-all"
                      style={{ color: p.accent }}
                    >
                      {t('Case study', '케이스')} <Icon.ArrowUpRight />
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


function Career({ t }: { t: (en: string, kr: string) => string }) {
  const roles = [
    {
      period: 'May 2024 — May 2026',
      company: 'Panomix & AEKO Intelligence',
      role: 'AI Product Manager',
      body: t(
        'Built AI agents to automate competitive research and product workflows. Owned AEKO end-to-end from concept to MVP as sole PM. Scaled NewsChat to 1M+ MAU in 5 months with +10% ad CTR and +250% session time.',
        'AI 에이전트를 활용해 경쟁 리서치와 프로덕트 워크플로를 자동화했습니다. AEKO는 컨셉부터 MVP까지 단독 PM으로 이끌었고, NewsChat은 5개월 만에 MAU 100만 이상으로 성장시키며 광고 CTR +10%, 세션 시간 +250%를 달성했습니다.',
      ),
    },
    {
      period: 'May 2023 — Jul 2023',
      company: 'Edelman',
      role: 'Branding & Marketing Intern',
      body: t(
        'Supported marketing campaign execution and drafted performance reports based on engagement metrics. Participated in strategy development for new businesses through market research and competitor analysis.',
        '마케팅 캠페인 실행을 지원하고 참여 지표 기반 성과 보고서를 작성했습니다. 시장 조사와 경쟁사 분석을 통해 신규 비즈니스 전략 수립에 참여했습니다.',
      ),
    },
    {
      period: 'May 2022 — Aug 2022',
      company: 'GLG (Gerson Lehrman Group)',
      role: 'Council Development Intern',
      body: t(
        'Interviewed 20+ international industry experts daily to assess project feasibility and surface actionable insights for consulting and corporate clients.',
        '매일 20명 이상의 글로벌 업계 전문가를 인터뷰하며 프로젝트 타당성을 평가하고, 컨설팅 및 기업 고객을 위한 실행 가능한 인사이트를 도출했습니다.',
      ),
    },
    {
      period: 'Jun 2021 — Jul 2021',
      company: 'Tridge',
      role: 'Product Growth Intern',
      body: t(
        'Ran user research with regional Project Managers to surface insights shaping go-to-market positioning across international markets.',
        '각 지역 PM과 함께 사용자 리서치를 진행하고, 글로벌 시장 진출 전략 수립에 활용할 인사이트를 도출했습니다.',
      ),
    },
  ];
  return (
    <section id="career" className="border-b hairline relative overflow-hidden" style={{ background: 'rgba(33,33,35,0.88)' }}>
      <div className="absolute -left-24 bottom-10 w-[180px] h-[180px] opacity-[0.22] pointer-events-none hidden md:block z-[2]">
        <MorphBlob palette="iris" holeScale={0} blobOnly />
      </div>
      <div className="absolute -right-16 top-20 w-[140px] h-[140px] opacity-[0.18] pointer-events-none hidden lg:block z-[2]">
        <MorphBlob palette="iris" holeScale={0} blobOnly />
      </div>
      <div className="relative z-[1] max-w-[1240px] mx-auto px-6 md:px-10 py-8 md:py-14 lg:py-20">
        <Reveal>
          <div className="flex items-end justify-between mb-6 md:mb-10 flex-wrap gap-6">
            <div>
              <div className="eyebrow mb-3">{t('Career', '커리어')}</div>
              <h2 className="title-glow font-serif-display text-[24px] sm:text-[32px] md:text-[44px] lg:text-[52px] leading-[1] tracking-tight max-w-[22ch]">
                {t('Experience', '경력')}
              </h2>
            </div>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
              {t('Download résumé', '이력서 다운로드')} <Icon.FileText />
            </a>
          </div>
        </Reveal>
        <div className="relative max-w-[900px] mx-auto">
          {/* Vertical line */}
          <div className="absolute left-[7px] md:left-[7px] top-0 bottom-0 w-px" style={{ background: 'rgba(125,232,255,0.15)' }} />
          {roles.map((r, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="relative pl-10 md:pl-12 py-4 md:py-5">
                {/* Circle on the line */}
                <div className="absolute left-0 top-8 md:top-10 w-[15px] h-[15px] rounded-full" style={{
                  background: '#1A1A1C',
                  border: '2px solid #7DE8FF',
                  boxShadow: '0 0 8px rgba(125,232,255,0.3)',
                }} />
                <div
                  className="font-mono-tech text-[11px] tracking-widest uppercase mb-3"
                  style={{ color: '#7DE8FF' }}
                >
                  {r.period}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <div>
                    <div className="font-serif-display text-[18px] sm:text-[20px] md:text-[24px] leading-tight">
                      {r.role}
                    </div>
                    <div className="font-mono-tech text-[11px] tracking-wider uppercase mt-1" style={{ color: 'var(--ink-3)' }}>
                      {r.company}
                    </div>
                  </div>
                  <p
                    className="text-[14px] leading-relaxed"
                    style={{ color: 'var(--ink-2)' }}
                  >
                    {r.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage({
  t,
  onOpen,
}: {
  t: (en: string, kr: string) => string;
  onOpen: (p: Page) => void;
}) {
  return (
    <>
      <PageMeta title="Justina Yoo — AI Product Manager" description="Strategy to shipped product. From defining AI strategy to shipping systems at scale across Shanghai, Pittsburgh, and Seoul." />
      <Hero t={t} />
      <section className="relative z-10 -mt-10 sm:-mt-14 md:-mt-20 mb-6 md:mb-0" style={{ color: '#fff' }}>
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="rounded-2xl sm:rounded-full py-5 md:py-6 lg:py-8 px-6 md:px-8 lg:px-10 overflow-hidden" style={{
            background: 'transparent',
            boxShadow: '0 0 8px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.08), inset 3px 3px 0.5px -3.5px rgba(255,255,255,0.09), inset -3px -3px 0.5px -3.5px rgba(255,255,255,0.85), inset 1px 1px 1px -0.5px rgba(255,255,255,0.6), inset -1px -1px 1px -0.5px rgba(255,255,255,0.6), inset 0 0 6px 6px rgba(255,255,255,0.12), inset 0 0 2px 2px rgba(255,255,255,0.06), 0 0 12px rgba(0,0,0,0.15)',
            backdropFilter: 'url(#liquid-glass) blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}>
          <div className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-12">
            {[
              { v: '4', l: t('Products shipped', '출시한 제품'), sub: '', color: '#9E84FF' },
              { v: '1M+', l: t('Users reached', '도달 사용자'), sub: 'NewsChat', color: '#7DE8FF' },
              { v: '10%', l: t('Ad CTR achieved', '달성 광고 CTR'), sub: 'NewsChat', color: '#98E8C1' },
            ].map((m, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="flex flex-col gap-2 items-center text-center">
                  <span className="font-serif-display text-[32px] sm:text-[40px] md:text-[56px] leading-none tracking-tight" style={{ color: m.color }}>{m.v}</span>
                  <span className="font-mono-tech text-[8px] sm:text-[9px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.55)' }}>{m.l}{m.sub && ` · ${m.sub}`}</span>
                </div>
              </Reveal>
            ))}
          </div>
          </div>
        </div>
      </section>
      <ToolStack />
      <FeaturedWork t={t} onOpen={onOpen} />
      <Career t={t} />
      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-8 md:py-10">
          <div className="eyebrow mb-6">{t('Products', '프로덕트')}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'AEKO', logo: '/aeko-logo.svg', logoH: 'h-6', desc: t('AEO for e-commerce', '이커머스를 위한 AEO'), page: 'aeko' as Page },
              { name: 'NewsChat', logo: '/newschat-logo.svg', logoH: 'h-5', desc: t('AI contextual chat for news readers', '뉴스 독자를 위한 AI 맥락 채팅'), page: 'newschat' as Page },
              { name: 'ATTN', logo: '/attn-logo.svg', logoH: 'h-3.5', desc: t('US market intelligence for KR investors', '한국 투자자를 위한 미국 증시 인텔리전스'), page: 'attn' as Page },
              { name: 'ana2me', logo: '/ana2me-logo.svg', logoH: 'h-5', desc: t('Korean beauty & ingredient database', '한국 뷰티 & 성분 데이터베이스'), side: true },
            ].map(p => (
              <button
                key={p.name}
                onClick={() => p.page && onOpen(p.page)}
                className="group flex flex-col gap-2 sm:gap-3 p-3 sm:p-5 md:p-8 rounded-xl hover:scale-[1.02] transition-all text-left"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  boxShadow: 'inset 1px 1px 1px -0.5px rgba(255,255,255,0.2), inset -1px -1px 1px -0.5px rgba(255,255,255,0.2), inset 0 0 4px 3px rgba(255,255,255,0.04), 0 0 4px rgba(0,0,0,0.04)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="flex flex-wrap items-center gap-3">
                  {p.logo ? (
                    <span className="inline-flex items-center justify-center w-[72px] h-[40px] rounded-lg flex-shrink-0" style={{ background: 'rgba(255,255,255,0.85)' }}>
                      <img src={p.logo} alt={p.name} className="max-h-[22px] max-w-[58px] object-contain" />
                    </span>
                  ) : (
                    <span className="text-[15px] font-medium flex-shrink-0">{p.name}</span>
                  )}
                  <span className="text-[13px] leading-snug" style={{ color: 'var(--ink-2)' }}>{p.desc}</span>
                  {p.page && <span className="font-mono-tech text-[9px] tracking-widest uppercase px-1.5 py-0.5 border rounded-sm ml-auto flex-shrink-0" style={{ color: '#F0C87A', borderColor: 'rgba(240,200,122,0.3)' }}>{t('Case study', '케이스 스터디')}</span>}
                  {(p as any).side && <span className="font-mono-tech text-[9px] tracking-widest uppercase px-1.5 py-0.5 border hairline rounded-sm ml-auto flex-shrink-0" style={{ color: 'var(--ink-3)' }}>Side project</span>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden" style={{ background: 'rgba(33,33,35,0.88)', color: 'var(--ink)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-[0.20] pointer-events-none hidden lg:block z-[2]">
          <MorphBlob palette="iris" holeScale={0} blobOnly />
        </div>
        <div className="relative z-[1] max-w-[1240px] mx-auto px-6 md:px-10 py-14 md:py-24 lg:py-32">
          <Reveal>
            <div className="eyebrow mb-6" style={{ color: 'var(--ink-3)' }}>{t("Let's connect", '연결하기')}</div>
          </Reveal>
          <div className="grid grid-cols-12 gap-6 md:gap-10 lg:gap-16 items-start">
            <div className="col-span-12 md:col-span-7">
              <Reveal delay={60}>
                <h2 className="font-serif-display text-[26px] sm:text-[36px] md:text-[48px] lg:text-[64px] leading-[0.95] tracking-tight">
                  {t('Inquire about', 'AX 컨설팅에 대해')}
                  <br />
                  {t('AX consulting', '문의주세요')}
                  .
                </h2>
                <p
                  className="mt-6 text-[15px] max-w-[44ch]"
                  style={{ color: 'var(--ink-2)' }}
                >
                  {t(
                    'Product strategy, 0→1 builds, AI monetization — happy to talk.',
                    '프로덕트 전략, 0→1 구축, AI 수익화 — 편하게 연락주세요.',
                  )}
                </p>
              </Reveal>
            </div>
            <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:pt-4">
              <Reveal delay={120}>
                <a
                  href="mailto:justina.yoo@gmail.com"
                  className="flex items-center justify-between px-4 py-4 md:px-6 md:py-5 rounded-2xl sm:rounded-full transition-all hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(158,132,255,0.08) 0%, rgba(158,132,255,0.02) 100%)',
                    border: 'none',
                    boxShadow: '0 0 8px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.08), inset 3px 3px 0.5px -3.5px rgba(158,132,255,0.12), inset -3px -3px 0.5px -3.5px rgba(255,255,255,0.85), inset 1px 1px 1px -0.5px rgba(255,255,255,0.6), inset -1px -1px 1px -0.5px rgba(255,255,255,0.6), inset 0 0 6px 6px rgba(158,132,255,0.08), inset 0 0 2px 2px rgba(255,255,255,0.06), 0 0 12px rgba(158,132,255,0.08)',
                    backdropFilter: 'url(#liquid-glass) blur(12px)',
                    overflow: 'hidden',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <Icon.Mail />
                    <div>
                      <div className="text-[14px] font-medium">justina.yoo@gmail.com</div>
                      <div className="font-mono-tech text-[10px] tracking-widest uppercase mt-1" style={{ color: 'var(--ink-3)' }}>{t('Email', '이메일')}</div>
                    </div>
                  </div>
                  <Icon.ArrowUpRight />
                </a>
              </Reveal>
              <Reveal delay={180}>
                <a
                  href="https://www.linkedin.com/in/justina-ji-yeon-yoo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-4 md:px-6 md:py-5 rounded-2xl sm:rounded-full transition-all hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(158,132,255,0.08) 0%, rgba(158,132,255,0.02) 100%)',
                    border: 'none',
                    boxShadow: '0 0 8px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.08), inset 3px 3px 0.5px -3.5px rgba(158,132,255,0.12), inset -3px -3px 0.5px -3.5px rgba(255,255,255,0.85), inset 1px 1px 1px -0.5px rgba(255,255,255,0.6), inset -1px -1px 1px -0.5px rgba(255,255,255,0.6), inset 0 0 6px 6px rgba(158,132,255,0.08), inset 0 0 2px 2px rgba(255,255,255,0.06), 0 0 12px rgba(158,132,255,0.08)',
                    backdropFilter: 'url(#liquid-glass) blur(12px)',
                    overflow: 'hidden',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <Icon.LinkedIn />
                    <div>
                      <div className="text-[14px] font-medium">LinkedIn</div>
                      <div className="font-mono-tech text-[10px] tracking-widest uppercase mt-1" style={{ color: 'var(--ink-3)' }}>{t('Connect', '연결')}</div>
                    </div>
                  </div>
                  <Icon.ArrowUpRight />
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Root App ─────────────────────────────── */
export default function App() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1');
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('jy_lang') as Lang) || 'en');
  const pathToPage = (path: string): Page => {
    if (path === '/work/newschat') return 'newschat';
    if (path === '/work/aeko') return 'aeko';
    if (path === '/work/attn') return 'attn';
    if (path === '/work/workflow') return 'workflow';
    if (path === '/work/strategy') return 'strategy';
    if (path === '/work/ai-systems') return 'ai-systems';
    if (path === '/work/monetization') return 'monetization';
    if (path === '/work/agents') return 'agents';
    return 'home';
  };

  const [page, setPage] = useState<Page>(() => {
    // Handle GitHub Pages SPA redirect via ?p= param
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('p');
    if (redirect) {
      const decoded = decodeURIComponent(redirect);
      window.history.replaceState(null, '', decoded);
      return pathToPage(decoded);
    }
    return pathToPage(window.location.pathname);
  });

  useEffect(() => {
    localStorage.setItem('jy_lang', lang);
  }, [lang]);

  useEffect(() => {
    const onPop = () => setPage(pathToPage(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const t = useCallback((en: string, kr: string) => (lang === 'en' ? en : kr), [lang]);
  const toggleLang = () => setLang(l => (l === 'en' ? 'kr' : 'en'));

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' });
  }, []);

  const openCase = (p: Page) => {
    window.history.pushState(null, '', `/work/${p}`);
    setPage(p);
    window.scrollTo({ top: 0 });
  };
  const backHome = () => {
    window.history.pushState(null, '', '/');
    setPage('home');
    window.scrollTo({ top: 0 });
  };

  // Case study pages require auth
  if (page !== 'home') {
    if (!authed) return <PasswordGate onUnlock={() => setAuthed(true)} />;

    if (page === 'newschat')
      return <NewsChatCaseStudy onBack={backHome} lang={lang} onToggleLang={toggleLang} t={t} />;
    if (page === 'aeko')
      return <AekoCaseStudy onBack={backHome} lang={lang} onToggleLang={toggleLang} t={t} />;
    if (page === 'attn')
      return <AttnCaseStudy onBack={backHome} lang={lang} onToggleLang={toggleLang} t={t} />;
    if (page === 'workflow')
      return <WorkflowCaseStudy onBack={backHome} lang={lang} onToggleLang={toggleLang} t={t} />;
    if (page === 'strategy')
      return <StrategyCaseStudy onBack={backHome} lang={lang} onToggleLang={toggleLang} t={t} />;
    if (page === 'ai-systems')
      return <AISystemsCaseStudy onBack={backHome} lang={lang} onToggleLang={toggleLang} t={t} />;
    if (page === 'monetization')
      return <MonetizationCaseStudy onBack={backHome} lang={lang} onToggleLang={toggleLang} t={t} />;
    if (page === 'agents')
      return <AgentsCaseStudy onBack={backHome} lang={lang} onToggleLang={toggleLang} t={t} />;
  }

  return (
    <div className="canvas-tint grain perspective-grid" style={{ position: 'relative' }}>
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="liquid-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves={1} seed={1} result="turbulence" />
            <feGaussianBlur in="turbulence" stdDeviation={2} result="blurredNoise" />
            <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale={70} xChannelSelector="R" yChannelSelector="B" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation={4} result="finalBlur" />
            <feComposite in="finalBlur" in2="finalBlur" operator="over" />
          </filter>
        </defs>
      </svg>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <TopNav
          onHome={backHome}
          onScrollTo={scrollTo}
          lang={lang}
          onToggleLang={toggleLang}
          tFn={t}
        />
        <HomePage t={t} onOpen={openCase} />
        <Footer />
      </div>
    </div>
  );
}
