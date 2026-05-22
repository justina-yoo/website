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
} from './ui';
import { NewsChatCaseStudy, AekoCaseStudy, AttnCaseStudy, WorkflowCaseStudy } from './CaseStudies';

type Lang = 'en' | 'kr';
type Page = 'home' | 'newschat' | 'aeko' | 'attn' | 'workflow';

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
          <h1 className="font-serif-display text-[36px] leading-[1.05] tracking-tight mb-3">
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
              className="px-4 py-3 border hairline rounded-sm bg-white/70 text-[14px] outline-none focus:border-[var(--ink)]"
              style={{
                animation: error ? 'shake 0.4s' : 'none',
                borderColor: error ? '#b91c1c' : undefined,
              }}
            />
            <button type="submit" className="btn-primary justify-center">
              Enter <Icon.Arrow />
            </button>
            {error && (
              <p
                className="text-[12px] font-mono-tech tracking-widest uppercase"
                style={{ color: '#b91c1c' }}
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
    <section className="relative border-b hairline">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 pt-20 pb-24 md:pt-32 md:pb-36">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="col-span-12 md:col-span-8">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="chip chip-filled">
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: '#4ade80' }}
                  />
                  {t('Open to opportunities', '새로운 기회를 찾고 있습니다')}
                </span>
                <span className="chip">{t('AI Product Consulting', 'AI 프로덕트 컨설팅')}</span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="font-serif-display text-[36px] sm:text-[48px] md:text-[80px] lg:text-[96px] leading-[0.92] tracking-tight">
                {t('Strategy to', '전략부터')}
                <br />
                <span style={{ color: 'var(--accent)' }}>
                  {t('shipped product', '제품 출시까지')}
                </span>
                <span style={{ color: 'var(--accent)' }}>.</span>
              </h1>
            </Reveal>
            <Reveal delay={260}>
              <p
                className="mt-10 font-serif-display text-[18px] md:text-[22px] leading-snug max-w-[50ch]"
                style={{ color: 'var(--ink-3)' }}
              >
                {t(
                  'AI product consulting, end to end — research, design, build, and launch. Embedded with the team, not outside it.',
                  'AI 프로덕트를 처음부터 끝까지 — 리서치, 설계, 개발, 론칭. 팀 외부가 아닌, 팀과 함께.',
                )}
              </p>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-4">
            <Reveal delay={360}>
              <div className="border-l hairline pl-6 flex flex-col gap-6">
                <div>
                  <div className="eyebrow mb-2">{t('Currently', '현재')}</div>
                  <div className="text-[14px]" style={{ color: 'var(--ink-2)' }}>
                    {t('Building ', '')}
                    <span className="font-serif-display italic">AEKO</span>
                    {t(' — AEO for cross-border brands', ' — 크로스보더 브랜드를 위한 AEO 플랫폼 구축 중')}
                  </div>
                </div>
                <div>
                  <div className="eyebrow mb-2">{t('Based across', '거점')}</div>
                  <div className="flex flex-col gap-1.5 text-[14px]" style={{ color: 'var(--ink-2)' }}>
                    <span>🇨🇳 {t('Shanghai — 12 years', '상하이 — 12년')}</span>
                    <span>🇺🇸 {t('Pittsburgh — 5 years', '피츠버그 — 5년')}</span>
                    <span>🇰🇷 {t('Seoul — Now', '서울 — 현재')}</span>
                  </div>
                </div>
                <div>
                  <div className="eyebrow mb-2">{t('Focus', '관심 분야')}</div>
                  <div className="text-[14px]" style={{ color: 'var(--ink-2)' }}>
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
      id: 'aeko',
      name: 'AEKO',
      logo: '/aeko-logo.svg',
      tag: t('AEO · SaaS', 'AEO · SaaS'),
      kicker: '01',
      categories: ['B2B', 'AEO', 'SaaS', '0→1'],
      headline: t(
        'Analytics for the AI search era.',
        'AI 검색 시대의 분석 도구.',
      ),
      body: t(
        'The AEO platform for cross-border e-commerce. Tracks brand visibility across ChatGPT, Claude, and Perplexity — multi-region, multi-language — with MCP agents that run optimization inside Claude Desktop and Cursor.',
        '크로스보더 이커머스 브랜드를 위한 AEO 플랫폼. ChatGPT, Claude, Perplexity에서 브랜드가 어떻게 노출되는지 다국어·다지역으로 추적하고, MCP 에이전트를 통해 Claude Desktop과 Cursor에서 바로 최적화를 실행할 수 있습니다.',
      ),
      accent: '#5B5BF5',
      metrics: [
        { v: 'MVP', l: t('In testing', '테스트 중') },
        { v: '3+', l: t('AI engines', 'AI 엔진') },
        { v: '4', l: t('Markets tracked', '추적 중인 시장') },
      ],
    },
    {
      id: 'newschat',
      name: 'NewsChat',
      logo: '/newschat-logo.svg',
      tag: t('GenAI · Media', 'GenAI · 미디어'),
      kicker: '02',
      categories: ['B2C', 'GenAI', '0→1'],
      headline: t(
        'Turning passive news into conversation.',
        '뉴스를 읽는 것에서 대화하는 것으로.',
      ),
      body: t(
        'Contextual AI chat layer embedded in news articles. Grew to 1M MAU in 5 months, lifted dwell time 250%, and introduced a contextual ad product delivering 10% CTR.',
        '뉴스 기사 안에서 바로 대화할 수 있는 AI 채팅 레이어. 출시 5개월 만에 MAU 100만 돌파, 체류 시간 250% 증가, 맥락 광고 CTR 10% 달성.',
      ),
      accent: '#2E4BFF',
      metrics: [
        { v: '1M', l: t('MAU in 5mo', '5개월 MAU') },
        { v: '250%', l: t('Dwell time', '체류 시간') },
        { v: '10%', l: 'Ad CTR' },
      ],
    },
    {
      id: 'attn',
      name: 'ATTN',
      logo: '/attn-logo.svg',
      tag: t('Financial Media', '금융 미디어'),
      kicker: '03',
      categories: ['B2B', 'B2C', 'GenAI', 'Financial Media'],
      headline: t(
        "Korea's #1 US market intelligence.",
        '국내 1위 미국 증시 정보 플랫폼.',
      ),
      body: t(
        'Real-time SEC filings, government signals, and market news translated and delivered at trading speed. Built on multi-model AI orchestration and MCP infrastructure.',
        'SEC 공시, 정부 시그널, 시장 뉴스를 실시간으로 번역해 트레이딩 속도로 전달합니다. 멀티 모델 AI 오케스트레이션과 MCP 인프라 기반.',
      ),
      accent: '#0EA5E9',
      metrics: [
        { v: '#1', l: t('In category', '카테고리 1위') },
        { v: '3', l: t('Data pillars', '데이터 축') },
        { v: 'RT', l: t('Latency', '레이턴시') },
      ],
    },
    {
      id: 'workflow',
      name: t('AI Workflow Stack', 'AI 워크플로우 스택'),
      tag: t('Agentic · Internal Tools', '에이전틱 · 내부 도구'),
      kicker: '04',
      categories: ['GenAI', '0→1'],
      headline: t(
        'Agents that do the work with me.',
        '나와 함께 일하는 AI 에이전트.',
      ),
      body: t(
        'Custom AI agents and MCP integrations built on Claude at Panomix / AEKO Intelligence — a sales & marketing plugin, a junior PM agent, and end-to-end content automation.',
        'Panomix / AEKO Intelligence에서 Claude로 구축한 AI 에이전트와 MCP 통합 도구 — 세일즈·마케팅 플러그인, 주니어 PM 에이전트, 콘텐츠 자동화 파이프라인.',
      ),
      accent: '#8B5CF6',
      metrics: [
        { v: '3+', l: t('Agents built', '구축한 에이전트') },
        { v: 'MCP', l: t('Infrastructure', '인프라') },
        { v: 'Claude', l: t('Platform', '플랫폼') },
      ],
    },
  ];

  return (
    <section id="featured-work" className="border-b hairline">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <Reveal>
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-serif-display text-[28px] sm:text-[36px] md:text-[56px] leading-[1] tracking-tight">
              {t('Featured Work', '주요 프로젝트')}
            </h2>
            <div
              className="hidden md:block font-mono-tech text-[10px] tracking-widest uppercase"
              style={{ color: 'var(--ink-3)' }}
            >
              2023 — 2026
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-16">
            {['B2B', 'B2C', 'AEO', 'GenAI', 'SaaS', 'Financial Media', '0→1'].map(cat => (
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
                className="group relative w-full text-left border-t hairline last:border-b py-10 md:py-14 transition-colors"
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
                          className="font-serif-display text-[36px] leading-none"
                          style={{ color: p.accent }}
                        >
                          {p.name}
                        </span>
                      )}
                    </div>
                    <span className="chip">{p.tag}</span>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <h3 className="font-serif-display text-[24px] md:text-[32px] leading-[1.05] tracking-tight mb-4">
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
    <section id="career" className="border-b hairline">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <Reveal>
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div>
              <div className="eyebrow mb-3">{t('Career', '경력')}</div>
              <h2 className="font-serif-display text-[28px] sm:text-[36px] md:text-[52px] leading-[1] tracking-tight max-w-[22ch]">
                {t('Experience', '경력')}
              </h2>
            </div>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
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
                    <span className="font-serif-display text-[24px] md:text-[30px] leading-none">
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
      <Hero t={t} />
      <FeaturedWork t={t} onOpen={onOpen} />
      <Career t={t} />
      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
          <Reveal>
            <div className="eyebrow mb-6">{t('Say hello', '연락하기')}</div>
            <h2 className="font-serif-display text-[32px] sm:text-[44px] md:text-[72px] leading-[0.95] tracking-tight mb-8">
              {t("Let's ", '의미 있는 것을 ')}
              <span className="italic" style={{ color: 'var(--accent)' }}>
                {t('build', '함께')}
              </span>
              <br />
              {t('something that matters', '만들어 봐요')}
              <span style={{ color: 'var(--accent)' }}>.</span>
            </h2>
            <p
              className="max-w-[48ch] mx-auto text-[15px] mb-10"
              style={{ color: 'var(--ink-3)' }}
            >
              {t(
                'I reply to every serious message. Product strategy, 0→1 builds, AI monetization — happy to talk.',
                '진심 어린 메시지에는 반드시 답장드립니다. 프로덕트 전략, 0→1 구축, AI 수익화 — 편하게 연락주세요.',
              )}
            </p>
            <a href="mailto:justina.yoo@gmail.com" className="btn-primary">
              {t('Start a conversation', '이야기 나누기')} <Icon.Mail />
            </a>
          </Reveal>
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
