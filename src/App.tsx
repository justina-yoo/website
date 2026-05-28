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

const PASSWORD = 'justina2026';
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
  return (
    <section className="relative" style={{ background: '#1A1A1C', color: '#F5F2EA' }}>
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 pt-10 pb-16 sm:pb-28 md:pt-20 md:pb-48">
        <div className="grid grid-cols-12 gap-6 md:gap-14 items-start">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 flex-wrap">
                <span
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-[11px] font-mono-tech tracking-widest uppercase font-medium"
                  style={{ background: '#F5F2EA', color: '#1A1A1C' }}
                >
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: '#3DDC8E', boxShadow: '0 0 0 2px rgba(61,220,142,0.2)' }}
                  />
                  Open to strategic opportunities
                </span>
                <span
                  className="inline-flex items-center px-3.5 py-2 rounded-lg text-[11px] font-mono-tech tracking-widest uppercase font-medium"
                  style={{ border: '1px solid rgba(255,255,255,0.14)', color: '#F5F2EA' }}
                >
                  Available for AI consulting &amp; building
                </span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="font-serif-display text-[26px] sm:text-[32px] md:text-[48px] lg:text-[72px] xl:text-[84px] leading-[0.98] tracking-tight" style={{ fontWeight: 700, letterSpacing: '-0.03em' }}>
                {t('Strategy to ', '전략부터 ')}
                <span style={{ color: '#9E84FF' }}>
                  {t('shipped', '제품')}<br />
                  {t('product', '출시까지')}
                </span>
                <span style={{ color: '#9E84FF' }}>.</span>
              </h1>
            </Reveal>
            <Reveal delay={260}>
              <p
                className="mt-5 md:mt-8 text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed max-w-[560px]"
                style={{ color: '#C8C6BE', fontWeight: 500 }}
              >
                {t(
                  'I figure out where AI creates real value — in products, experiences, and user interactions. From defining strategy to shipping AI systems at scale, I work across the full stack of AI transformation: opportunity framing, experience design, and hands-on delivery.',
                  'AI가 실질적인 가치를 만드는 지점을 찾아냅니다 — 제품, 경험, 그리고 사용자와의 상호작용 방식에서. 전략 수립부터 대규모 AI 시스템 출시까지, AI 트랜스포메이션의 전 과정을 아우릅니다: 기회 프레이밍, 경험 설계, 그리고 직접 실행까지.',
                )}
              </p>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-5">
            <Reveal delay={300}>
              <div
                className="relative rounded-lg overflow-hidden mb-4 md:mb-7 h-[180px] sm:h-[260px] md:h-[360px]"
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
            <Reveal delay={360}>
              <div className="flex flex-col gap-3 md:gap-5" style={{ borderLeft: '1px solid rgba(255,255,255,0.14)', paddingLeft: 24 }}>
                <div>
                  <div className="font-mono-tech text-[11px] tracking-widest uppercase mb-2" style={{ color: '#7C7A74', fontWeight: 500 }}>{t('Based across', '거점')}</div>
                  <div className="flex items-center gap-3 text-[14px]" style={{ color: '#F5F2EA', fontWeight: 500 }}>
                    <span>🇨🇳 {t('Shanghai', '상하이')}</span>
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                    <span>🇺🇸 {t('Pittsburgh', '피츠버그')}</span>
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                    <span>🇰🇷 {t('Seoul', '서울')}</span>
                  </div>
                  <div className="mt-2 font-mono-tech text-[10px] tracking-widest uppercase" style={{ color: '#9E84FF' }}>
                    {t('Open to opportunities across Asia', '아시아 전역의 기회에 열려 있습니다')}
                  </div>
                </div>
                <div>
                  <div className="font-mono-tech text-[11px] tracking-widest uppercase mb-2" style={{ color: '#7C7A74', fontWeight: 500 }}>{t('Focus', '관심 분야')}</div>
                  <div className="text-[14px]" style={{ color: '#F5F2EA', fontWeight: 500 }}>
                    {t('AX Consulting · GenAI · 0→1 · End-to-End Build', 'AX 컨설팅 · GenAI · 0→1 · 풀사이클 구축')}
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
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-4 md:py-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <span className="eyebrow">Stack</span>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
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
        '제로에서 프로덕트-마켓 핏까지.',
      ),
      body: t(
        'Owned AEKO end-to-end from concept to MVP as sole PM. Led NewsChat from hypothesis to 1M MAU in 5 months. Defined activation loops, pricing architecture, and go-to-market for both.',
        'AEKO를 컨셉부터 MVP까지 단독 PM으로 이끌었고, NewsChat을 가설 단계에서 5개월 만에 MAU 100만까지 성장시켰습니다. 두 제품 모두 활성화 루프, 가격 체계, GTM 전략을 직접 설계했습니다.',
      ),
      accent: '#9E84FF',
      metrics: [
        { v: '2', l: t('Products 0→1', '0→1 제품') },
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
        '제품을 움직이는 AI를 설계하다.',
      ),
      body: t(
        'RAG pipelines for NewsChat. ADK — an embeddable SDK auto-generating contextual AI features for publishers. Visibility scoring and source attribution systems for AEKO. MCP server integrations across the stack.',
        'NewsChat의 RAG 파이프라인, 퍼블리셔용 맥락형 AI 기능을 자동 생성하는 임베더블 SDK ADK, AEKO의 가시성 스코어링 및 소스 어트리뷰션 시스템, 스택 전반의 MCP 서버 통합을 설계했습니다.',
      ),
      accent: '#B988FF',
      metrics: [
        { v: '3', l: t('Products', '제품') },
        { v: 'RAG', l: t('+ Multi-model', '+ 멀티 모델') },
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
        '수익 중심 프로덕트 사고.',
      ),
      body: t(
        "Designed NewsChat's contextual ad system — 10% CTR vs 0.1% industry average, 3.5x ARPU. Built AEKO's freemium pricing architecture. Grew NewsChat to 1M MAU with zero paid acquisition.",
        'NewsChat의 맥락 광고 시스템을 설계해 업계 평균 0.1% 대비 10% CTR, ARPU 3.5배를 달성했습니다. AEKO의 프리미엄 가격 체계를 구축하고, NewsChat을 유료 마케팅 없이 MAU 100만까지 성장시켰습니다.',
      ),
      accent: '#7DE8FF',
      metrics: [
        { v: '10%', l: 'CTR' },
        { v: '3.5x', l: 'ARPU' },
        { v: '$0', l: 'CAC' },
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
        '아웃풋을 배가하는 AI 에이전트.',
      ),
      body: t(
        'Built Claude-powered agents for sales prospecting, PM workflows, and content automation at Panomix / AEKO Intelligence. MCP integrations that run inside Claude Desktop and Cursor.',
        'Panomix / AEKO Intelligence에서 Claude 기반 세일즈, PM 워크플로우, 콘텐츠 자동화 에이전트를 구축했습니다. Claude Desktop과 Cursor에서 바로 실행되는 MCP 통합.',
      ),
      accent: '#C4A5FF',
      metrics: [
        { v: '3+', l: t('Agents', '에이전트') },
        { v: 'MCP', l: t('Infra', '인프라') },
        { v: 'Claude', l: t('Platform', '플랫폼') },
      ],
    },
  ];

  return (
    <section id="featured-work" className="border-b hairline">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-12 md:py-20 lg:py-28">
        <Reveal>
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-serif-display text-[24px] sm:text-[32px] md:text-[44px] lg:text-[56px] leading-[1] tracking-tight">
              {t('Featured Work', '주요 프로젝트')}
            </h2>
            <div
              className="hidden md:block font-mono-tech text-[10px] tracking-widest uppercase"
              style={{ color: 'var(--ink-3)' }}
            >
              2023 — 2026
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-8 md:mb-16">
            {['0→1', 'GenAI', 'B2B', 'B2C'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(f => f === cat ? null : cat)}
                className={`chip cursor-pointer transition-colors ${filter === cat ? 'chip-filled' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="flex flex-col">
          {projects.filter(p => !filter || p.categories.includes(filter)).map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <button
                onClick={() => onOpen(p.id)}
                className="group relative w-full text-left border-t hairline last:border-b py-6 md:py-10 lg:py-14 transition-colors"
              >
                <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
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
                  <div className="col-span-12 md:col-span-2 flex md:justify-end">
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
      role: t('AI Product Manager', 'AI 프로덕트 매니저'),
      body: t(
        'Built AI agents to automate competitive research and product workflows. Owned AEKO end-to-end from concept to MVP as sole PM. Scaled NewsChat to 1M+ MAU in 5 months with +10% ad CTR and +250% session time.',
        'AI 에이전트를 활용해 경쟁 리서치와 프로덕트 워크플로를 자동화했습니다. AEKO는 컨셉부터 MVP까지 단독 PM으로 이끌었고, NewsChat은 5개월 만에 MAU 100만 이상으로 성장시키며 광고 CTR +10%, 세션 시간 +250%를 달성했습니다.',
      ),
    },
    {
      period: 'May 2023 — Jul 2023',
      company: 'Edelman',
      role: t('Branding & Marketing Intern', '브랜딩 & 마케팅 인턴'),
      body: t(
        'Supported marketing campaign execution and drafted performance reports based on engagement metrics. Participated in strategy development for new businesses through market research and competitor analysis.',
        '마케팅 캠페인 실행을 지원하고 참여 지표 기반 성과 보고서를 작성했습니다. 시장 조사와 경쟁사 분석을 통해 신규 비즈니스 전략 수립에 참여했습니다.',
      ),
    },
    {
      period: 'May 2022 — Aug 2022',
      company: 'GLG (Gerson Lehrman Group)',
      role: t('Council Development Intern', '카운슬 개발 인턴'),
      body: t(
        'Interviewed 20+ international industry experts daily to assess project feasibility and surface actionable insights for consulting and corporate clients.',
        '매일 20명 이상의 글로벌 업계 전문가를 인터뷰하며 프로젝트 타당성을 평가하고, 컨설팅 및 기업 고객을 위한 실행 가능한 인사이트를 도출했습니다.',
      ),
    },
    {
      period: 'Jun 2021 — Jul 2021',
      company: 'Tridge',
      role: t('Product Growth Intern', '프로덕트 그로스 인턴'),
      body: t(
        'Ran user research with regional Project Managers to surface insights shaping go-to-market positioning across international markets.',
        '각 지역 PM과 함께 사용자 리서치를 진행하고, 글로벌 시장 진출 전략 수립에 활용할 인사이트를 도출했습니다.',
      ),
    },
  ];
  return (
    <section id="career" className="border-b hairline" style={{ background: 'var(--paper-2)' }}>
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-12 md:py-20 lg:py-28">
        <Reveal>
          <div className="flex items-end justify-between mb-8 md:mb-16 flex-wrap gap-6">
            <div>
              <div className="eyebrow mb-3">{t('Career', '경력')}</div>
              <h2 className="font-serif-display text-[24px] sm:text-[32px] md:text-[44px] lg:text-[52px] leading-[1] tracking-tight max-w-[22ch]">
                {t('Experience', '경력')}
              </h2>
            </div>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-5 py-3 border-2 rounded-sm text-[13px] font-medium tracking-wide transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]" style={{ borderColor: 'var(--ink)', color: 'var(--ink)' }}>
              {t('Download résumé', '이력서 다운로드')} <Icon.FileText />
            </a>
          </div>
        </Reveal>
        <div>
          {roles.map((r, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="border-t hairline py-8 md:py-10 grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-3">
                  <div
                    className="font-mono-tech text-[11px] tracking-widest uppercase"
                    style={{ color: 'var(--accent)' }}
                  >
                    {r.period}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-9">
                  <div className="flex flex-wrap items-baseline gap-4 mb-3">
                    <span className="font-serif-display text-[20px] sm:text-[24px] md:text-[30px] leading-none">
                      {r.company}
                    </span>
                    <span
                      className="font-serif-display text-[16px]"
                      style={{ color: 'var(--ink-3)' }}
                    >
                      {r.role}
                    </span>
                  </div>
                  <p
                    className="text-[15px] leading-relaxed max-w-[64ch]"
                    style={{ color: 'var(--ink-2)' }}
                  >
                    {r.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t hairline" />
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
      <section className="relative z-10 -mt-16 md:-mt-20" style={{ color: '#fff' }}>
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="rounded-sm py-6 md:py-10 lg:py-14 px-4 md:px-6 lg:px-10" style={{ background: 'var(--accent)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {[
              { v: '4', l: t('Products shipped', '출시한 제품'), sub: '' },
              { v: '1M+', l: t('Users reached', '도달 사용자'), sub: 'NewsChat' },
              { v: '10%', l: t('Ad CTR achieved', '달성 광고 CTR'), sub: 'NewsChat' },
            ].map((m, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="flex flex-col gap-2">
                  <span className="font-serif-display text-[32px] sm:text-[40px] md:text-[56px] leading-none tracking-tight" style={{ color: '#fff' }}>{m.v}</span>
                  <span className="font-mono-tech text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.55)' }}>{m.l}{m.sub && ` · ${m.sub}`}</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'AEKO', logo: '/aeko-logo.svg', desc: t('AEO platform for e-commerce brands', '이커머스 브랜드를 위한 AEO 플랫폼'), page: 'aeko' as Page },
              { name: 'NewsChat', logo: '/newschat-logo.svg', desc: t('AI chat layer for news publishers', '뉴스 퍼블리셔용 AI 채팅 레이어'), page: 'newschat' as Page },
              { name: 'ATTN', logo: '/attn-logo.svg', desc: t('US market intelligence for KR investors', '한국 투자자를 위한 미국 증시 인텔리전스'), page: 'attn' as Page },
              { name: 'ana2me', desc: t('Korean beauty & ingredient database', '한국 뷰티 & 성분 데이터베이스'), side: true },
            ].map(p => (
              <button
                key={p.name}
                onClick={() => p.page ? onOpen(p.page) : window.open('https://ana2me.com', '_blank')}
                className="group flex flex-col gap-2 p-4 border hairline rounded-sm hover:bg-white/5 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  {p.logo ? (
                    <img src={p.logo} alt={p.name} className="h-5" />
                  ) : (
                    <span className="text-[15px] font-medium">{p.name}</span>
                  )}
                  {(p as any).side && <span className="font-mono-tech text-[9px] tracking-widest uppercase px-1.5 py-0.5 border hairline rounded-sm" style={{ color: 'var(--ink-3)' }}>Side project</span>}
                </div>
                <span className="text-[12px] leading-snug" style={{ color: 'var(--ink-3)' }}>{p.desc}</span>
                <span className="font-mono-tech text-[10px] tracking-widest uppercase mt-auto" style={{ color: 'var(--accent)' }}>
                  {p.page ? t('Case study', '케이스 스터디') : 'Visit ↗'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: '#212123', color: 'var(--ink)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-14 md:py-24 lg:py-32">
          <Reveal>
            <div className="eyebrow mb-6" style={{ color: 'var(--ink-3)' }}>{t("Let's connect", '연결하기')}</div>
          </Reveal>
          <div className="grid grid-cols-12 gap-6 md:gap-10 lg:gap-16 items-start">
            <div className="col-span-12 md:col-span-7">
              <Reveal delay={60}>
                <h2 className="font-serif-display text-[26px] sm:text-[36px] md:text-[48px] lg:text-[64px] leading-[0.95] tracking-tight">
                  {t("Let's ", '의미 있는 것을 ')}
                  <span className="italic" style={{ color: 'var(--accent)' }}>
                    {t('build', '함께')}
                  </span>
                  <br />
                  {t('something that matters', '만들어 봐요')}
                  <span style={{ color: 'var(--accent)' }}>.</span>
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
                  className="flex items-center justify-between px-4 py-4 md:px-6 md:py-5 rounded-sm transition-colors hover:bg-white/5"
                  style={{ border: '1px solid var(--rule)' }}
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
                  className="flex items-center justify-between px-4 py-4 md:px-6 md:py-5 rounded-sm transition-colors hover:bg-white/5"
                  style={{ border: '1px solid var(--rule)' }}
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

  return (
    <div className="canvas-tint grain" style={{ position: 'relative' }}>
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
