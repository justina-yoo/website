/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Case study pages — NewsChat / AEKO / ATTN.
 * Each accepts `t` (translator) and `onBack` so it can be embedded inside the App shell
 * with the password gate + EN/KR toggle preserved.
 */

import { useEffect, type ReactNode } from 'react';
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
  subtitle,
  meta,
  logoSrc,
  t,
}: {
  brandLabel: string;
  subLabels?: string[];
  title: ReactNode;
  subtitle: string;
  meta?: { label: string; value: string }[];
  logoSrc?: string;
  t: T;
}) {
  return (
    <section className="border-b hairline">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 pt-20 pb-16 md:pt-28 md:pb-24">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="chip chip-acc">{t('Featured Project', '주요 프로젝트')}</span>
            {subLabels.map((s, i) => (
              <span key={i} className="chip">
                {s}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="flex items-center gap-3 mb-6">
            {logoSrc ? (
              <img src={logoSrc} alt={brandLabel} className="h-8" />
            ) : (
              <span
                className="font-serif-display text-[24px]"
                style={{ color: 'var(--acc)' } as React.CSSProperties}
              >
                {brandLabel}
              </span>
            )}
          </div>
        </Reveal>
        <Reveal delay={200}>
          <h1
            className="font-serif-display text-[40px] md:text-[64px] lg:text-[80px] leading-[0.92] tracking-tight mb-8"
            style={{ color: 'var(--ink)' }}
          >
            {title}
            <span style={{ color: 'var(--acc)' } as React.CSSProperties}>.</span>
          </h1>
        </Reveal>
        <Reveal delay={280}>
          <p
            className="font-serif-display text-[18px] md:text-[24px] leading-snug max-w-[40ch] mb-10"
            style={{ color: 'var(--ink-3)' }}
          >
            {subtitle}
          </p>
        </Reveal>
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
    </section>
  );
}

/* ─── NewsChat ─────────────────────────────────────────── */
export function NewsChatCaseStudy({
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

  const metrics = [
    { v: '1M', l: t('MAU in 5 months', '5개월 내 MAU') },
    { v: '250%', l: t('Increase in dwell time', '체류 시간 증가') },
    { v: '10%', l: t('Contextual ad CTR', '맥락 광고 CTR') },
    { v: '100M+', l: t('Article views accumulated', '누적 기사 조회수') },
  ];

  const timeline = [
    {
      phase: '01 — ' + t('Discovery', '리서치'),
      title: t('Why are readers bouncing?', '독자들은 왜 이탈하는가?'),
      content: t(
        "Partnered with a South Korean digital news publisher facing a 40% YoY drop in session duration. Ran user interviews, session replay analysis, and heatmapping across 3M monthly sessions. The core insight: readers wanted to go deeper on a topic but had no path forward — they'd read the headline, skim the article, and leave.",
        '세션 시간이 전년 대비 40% 감소한 한국 디지털 뉴스 퍼블리셔와 협업했습니다. 월 300만 세션을 대상으로 사용자 인터뷰, 세션 리플레이, 히트맵 분석을 진행했습니다. 핵심 인사이트는 명확했습니다. 독자는 특정 주제를 더 깊이 알고 싶어했지만 더 나아갈 경로가 없었고, 헤드라인과 본문만 훑고 이탈했습니다.',
      ),
      tags: ['User Interviews', 'Session Analytics', 'Heatmapping', 'Stakeholder Alignment'],
    },
    {
      phase: '02 — ' + t('Problem Framing', '문제 정의'),
      title: t('Passive consumption is a dead end', '수동적 소비는 더 이상 통하지 않는다'),
      content: t(
        "Defined the core problem: news content was broadcast-only. Readers had questions the article didn't answer, but no way to ask them. This created a gap between reader intent and publisher experience — and left monetization value on the table. Framed the opportunity as: can we make news a conversation?",
        '핵심 문제를 정의했습니다. 뉴스 콘텐츠는 일방적 전달에 그치고 있었습니다. 독자는 기사에서 답을 얻지 못한 질문을 던질 방법이 없었고, 이는 독자 의도와 퍼블리셔 경험 사이의 간극을 만들어 수익화 기회를 놓치게 했습니다. "뉴스를 대화로 만들 수 있을까?"라는 질문으로 기회를 정의했습니다.',
      ),
      tags: ['Jobs-to-be-Done', 'Opportunity Sizing', 'Problem Statement'],
    },
    {
      phase: '03 — ' + t('Solution Design', '솔루션 설계'),
      title: t('NewsChat: Ask anything about the story', 'NewsChat: 기사에 대해 무엇이든 물어보세요'),
      content: t(
        'Designed a contextual conversational layer embedded directly in news articles. Readers can ask follow-up questions, get source summaries, explore related topics, and request simplified explanations — all grounded in the article and vetted source material via RAG pipelines. Worked closely with ML and infra teams to define retrieval quality, latency budgets (<800ms), and hallucination guardrails.',
        '뉴스 기사 내부에 맥락 기반 대화 레이어를 설계했습니다. 독자는 추가 질문, 소스 요약, 관련 주제 탐색, 쉬운 설명 요청이 가능하며, 모든 응답은 RAG 파이프라인을 통해 기사와 검증된 자료에 근거합니다. ML·인프라 팀과 협업하여 검색 품질, 응답 시간(<800ms), 환각 방지 가드레일을 정의했습니다.',
      ),
      tags: ['GenAI / LLM', 'RAG Architecture', 'UX Design', 'Latency Optimization'],
    },
    {
      phase: '04 — ' + t('Monetization Strategy', '수익화 전략'),
      title: t('Contextual ads that feel native', '자연스럽게 녹아드는 맥락 광고'),
      content: t(
        "Designed a contextual ad injection system that reads the semantic thread of each conversation turn and surfaces relevant sponsored content at natural breakpoints — never mid-sentence, never intrusive. Ads are tagged to conversation intent, not page keywords, achieving 10% CTR.",
        '각 대화 턴의 의미 흐름을 읽고 자연스러운 지점에 스폰서 콘텐츠를 노출하는 맥락 광고 시스템을 설계했습니다. 문장 중간에 끼어들지 않고 방해되지 않게 배치했습니다. 광고는 페이지 키워드가 아닌 대화 의도에 매칭되어 10% CTR을 달성했습니다.',
      ),
      tags: ['Ad Strategy', 'Intent Targeting', 'Revenue Modeling', 'A/B Testing'],
    },
    {
      phase: '05 — ' + t('Launch & Scale', '출시 및 확장'),
      title: t('0 → 1M MAU in 5 months', '5개월 만에 0에서 100만 MAU'),
      content: t(
        'Ran a soft launch with 3 publisher partners, iterating on response quality, UI placement, and chat trigger UX based on real engagement data. After hitting PMF signals (>30% of readers who saw the chat prompt engaged with it), scaled to additional publishers. Hit 1M MAU 5 months post-launch with minimal paid acquisition — driven primarily through publisher distribution.',
        '3개 퍼블리셔 파트너와 소프트 론칭을 진행했습니다. 실제 인게이지먼트 데이터를 바탕으로 응답 품질, UI 배치, 채팅 트리거 UX를 반복적으로 개선했습니다. PMF 신호(노출 독자 30% 이상 참여)를 확인한 후 추가 퍼블리셔로 확장했습니다. 최소한의 유료 마케팅으로, 주로 퍼블리셔 배포를 통해 론칭 5개월 만에 100만 MAU를 달성했습니다.',
      ),
      tags: ['Go-to-Market', 'PMF Signals', 'Publisher Partnerships', 'Growth'],
    },
  ];

  const product: { icon: IconName; title: string; body: string }[] = [
    {
      icon: 'Msg',
      title: t('Ask anything', '무엇이든 질문'),
      body: t(
        'Readers ask follow-up questions mid-article. NewsChat responds with context drawn from the story, related reporting, and verified source material — grounded via RAG.',
        '독자는 기사를 읽는 도중 후속 질문을 할 수 있습니다. NewsChat은 기사, 관련 보도, 검증 소스를 바탕으로 RAG 기반 응답을 제공합니다.',
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
      icon: 'Bulb',
      title: t('Trust is the foundation of AI products', 'AI 제품의 근본은 신뢰'),
      body: t(
        'Hallucination wasn\'t just a technical problem — it was a product trust problem. We invested heavily in source attribution UI and escalation flows ("I\'m not sure — read the original article") before we got engagement to lift. Users forgave slow answers; they didn\'t forgive wrong ones.',
        '환각은 단순한 기술 문제가 아닌 제품 신뢰 문제였습니다. 인게이지먼트가 상승하기 전에 출처 표기 UI와 에스컬레이션 흐름("확실하지 않습니다 — 원문을 확인해주세요")에 집중 투자했습니다. 사용자는 느린 답변은 용서해도 틀린 답변은 용서하지 않았습니다.',
      ),
    },
    {
      icon: 'Target',
      title: t('Monetization must be designed in, not bolted on', '수익화는 나중에 붙이지 말고 처음부터 설계'),
      body: t(
        'Starting with a clear monetization hypothesis from day one shaped every product decision — from data schemas to conversation UX. Teams that treat ads as a later problem ship products that are fundamentally incompatible with their business model.',
        '첫날부터 명확한 수익화 가설을 세운 것이 데이터 스키마부터 대화 UX까지 모든 결정을 정렬시켰습니다. 광고를 나중 문제로 미루는 팀은 결국 비즈니스 모델과 근본적으로 맞지 않는 제품을 출시하게 됩니다.',
      ),
    },
    {
      icon: 'Bar',
      title: t(
        'Dwell time is a vanity metric without attribution',
        '어트리뷰션 없는 체류 시간은 허영 지표',
      ),
      body: t(
        'Dwell time went up 250% — but the real win was that pages-per-session and return visit rate moved too. We learned to look for correlated behavior clusters, not single metrics, as signals of genuine engagement improvement.',
        '체류 시간이 250% 상승했지만, 진짜 성과는 세션당 페이지 수와 재방문율도 함께 올랐다는 것입니다. 진정한 인게이지먼트 개선 신호는 단일 지표가 아닌 상관된 행동 클러스터에서 찾아야 한다는 것을 배웠습니다.',
      ),
    },
  ];

  return (
    <CaseStudyShell accentClass="acc-indigo" onBack={onBack} lang={lang} onToggleLang={onToggleLang} t={t} pageTitle="NewsChat Case Study — Justina Yoo" pageDescription="AI chat layer for news publishers. 1M MAU in 5 months.">
      <CaseStudyHero
        brandLabel="NewsChat"
        logoSrc="/newschat-logo.svg"
        subLabels={['GenAI · Media · Monetization']}
        title="NewsChat"
        subtitle={t(
          'Turning passive news consumption into interactive conversation — and monetizing the engagement gap.',
          '수동적 뉴스 소비를 대화형 경험으로 전환하고, 인게이지먼트 격차를 수익으로 연결합니다.',
        )}
        meta={[{ label: t('Market', '시장'), value: t('Digital News Publishers', '디지털 뉴스 퍼블리셔') }]}
        t={t}
      />

      {/* Product UI showcase — mobile */}
      <section className="border-b hairline" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <Reveal>
            <div className="flex items-center gap-4 mb-10">
              <img src="/newschat-logo.svg" alt="NewsChat" className="h-7" />
              <a
                href="https://newschat.wikitree.co.kr/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-tech text-[11px] tracking-widest uppercase"
                style={{ color: 'var(--acc)' } as React.CSSProperties}
              >
                newschat.wikitree.co.kr ↗
              </a>
            </div>
          </Reveal>
          <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-[720px] mx-auto">
            {['/newschat-mobile-1.png', '/newschat-mobile-2.png', '/newschat-mobile-3.png'].map((src, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="rounded-sm overflow-hidden border hairline shadow-sm">
                  <img src={src} alt={`NewsChat mobile UI ${i + 1}`} className="w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* metrics band */}
      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16">
          <div className="eyebrow mb-8">{t('Impact at a glance', '한눈에 보는 성과')}</div>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-[1px] rounded-sm overflow-hidden border hairline"
            style={{ background: 'var(--rule)' }}
          >
            {metrics.map((m, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="metric h-full" style={{ border: 'none' }}>
                  <span className="n" style={{ color: 'var(--acc)' } as React.CSSProperties}>
                    {m.v}
                  </span>
                  <span
                    className="font-mono-tech text-[11px] tracking-widest uppercase"
                    style={{ color: 'var(--ink-3)' }}
                  >
                    {m.l}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* context */}
      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <ContextBlock
            eyebrow={t('THE CONTEXT', '배경')}
            headline={t(
              'News media is an engagement crisis dressed as a content problem.',
              '뉴스 미디어의 위기는 콘텐츠 문제처럼 보이지만, 실제로는 인게이지먼트 문제입니다.',
            )}
            body={t(
              "Publishers invested in AI-powered content generation — and saw article output double. But session duration kept falling. More content didn't mean more engagement. The real problem was structural: readers had no reason to stay.",
              '퍼블리셔들은 AI 기반 콘텐츠 생성에 투자해 기사 생산량을 두 배로 늘렸습니다. 하지만 세션 시간은 계속 감소했습니다. 콘텐츠가 늘어난다고 인게이지먼트가 따라오는 것은 아니었습니다. 진짜 문제는 구조적이었습니다 — 독자가 머무를 이유가 없었던 것입니다.',
            )}
            rows={[
              { label: t('Average article read time', '평균 기사 읽는 시간'), value: '48 sec' },
              { label: t('Reader return rate (7-day)', '7일 재방문율'), value: '12%' },
              { label: t('Ad CTR (contextual)', '맥락 광고 CTR'), value: '10%' },
              { label: t('AI content investment ROI', 'AI 콘텐츠 투자 ROI'), value: t('Unmeasured', '측정 불가') },
            ]}
            rowAccent="#B91C1C"
          />
        </div>
      </section>

      {/* process */}
      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel eyebrow={t('PROCESS', '프로세스')} title={t('How we built it', '어떻게 만들었는가')} />
          <TimelineList steps={timeline} />
        </div>
      </section>

      {/* product */}
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

      {/* learnings */}
      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel eyebrow={t('REFLECTIONS', '회고')} title={t('What I learned', '제가 배운 것')} />
          <CardGrid items={learnings} />
        </div>
      </section>

      <CTASection
        title={t('Want to talk through this?', '이 프로젝트 더 이야기 나누고 싶다면')}
        body={t(
          "I'm always happy to go deeper on product strategy, AI monetization, or 0→1 builds.",
          '프로덕트 전략, AI 수익화, 0→1 제품 구축에 대해 언제든 이야기 나눌 수 있습니다.',
        )}
        ctaLabel={t('Get in touch', '연락하기')}
      />
    </CaseStudyShell>
  );
}

/* ─── AEKO ─────────────────────────────────────────────── */
export function AekoCaseStudy({
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

  const timeline = [
    {
      phase: '01 — ' + t('Discovery', '리서치'),
      title: t(
        "The SEO playbook doesn't work for AI search",
        'SEO 플레이북은 AI 검색에서 더 이상 통하지 않는다',
      ),
      content: t(
        'Interviewed cross-border e-commerce sellers who noticed their AI-era traffic was unpredictable and unattributable. The core finding: sellers had zero visibility into how ChatGPT, Claude, and Perplexity were recommending (or not recommending) their products. The same brand got completely different AI treatment depending on the market and language — and nobody knew why.',
        'AI 시대 트래픽이 예측 불가능하고 추적이 안 된다는 점을 인지한 크로스보더 이커머스 셀러들과 인터뷰를 진행했습니다. 핵심 발견은 이것이었습니다. 셀러들은 ChatGPT, Claude, Perplexity가 자사 제품을 어떻게 추천하거나 추천하지 않는지 전혀 파악하지 못하고 있었습니다. 같은 브랜드가 시장과 언어에 따라 완전히 다른 AI 응답을 받았지만, 아무도 그 이유를 몰랐습니다.',
      ),
      tags: ['User Interviews', 'Market Research', 'Competitive Analysis', 'Opportunity Sizing'],
    },
    {
      phase: '02 — ' + t('Problem Framing', '문제 정의'),
      title: t('Brands are flying blind in AI-driven search', '브랜드들은 AI 검색 환경에서 깜깜이로 운영 중'),
      content: t(
        "Defined the core problem: AI engines have taken over top-of-funnel discovery for millions of shoppers, but there are no analytics tools built for it. Search Console exists for traditional SEO. There is no equivalent for AEO — Answer Engine Optimization. This gap is sharpest for cross-border sellers, where language and market context dramatically change AI outputs.",
        '핵심 문제를 정의했습니다. AI 엔진이 수백만 쇼퍼의 초기 제품 탐색을 장악했지만, 이를 위한 분석 도구는 존재하지 않았습니다. 전통 SEO에는 Search Console이 있지만 AEO(답변 엔진 최적화)에는 동등한 도구가 없습니다. 언어와 시장 맥락에 따라 AI 결과가 크게 달라지는 크로스보더 셀러에게 이 격차가 가장 심각합니다.',
      ),
      tags: ['Jobs-to-be-Done', 'Problem Statement', 'TAM Sizing', 'AEO Category Definition'],
    },
    {
      phase: '03 — ' + t('Product Strategy', '프로덕트 전략'),
      title: t('Monitor first, optimize second', '모니터링 먼저, 최적화는 그 다음'),
      content: t(
        "Made the key strategic call to lead with monitoring — not optimization recommendations. Sellers need to see the problem before they'll invest in fixing it. Designed AEKO's core activation loop: connect domain → define tracked prompts → see your AI Visibility Score → receive optimization guidance. This sequencing is our hypothesis for driving both activation and paid conversion.",
        '핵심 전략적 결정을 내렸습니다. 최적화 제안이 아닌 모니터링을 먼저 제공하는 것입니다. 셀러들은 문제를 직접 봐야 해결에 투자합니다. AEKO의 핵심 활성화 루프를 설계했습니다: 도메인 연결 → 추적 프롬프트 정의 → AI Visibility Score 확인 → 최적화 가이던스 수신. 이 순서가 활성화와 유료 전환을 모두 이끌 것이라는 가설입니다.',
      ),
      tags: ['Product Strategy', 'Activation Design', 'Pricing Architecture', 'Freemium Model'],
    },
    {
      phase: '04 — ' + t('MVP Build', 'MVP 빌드'),
      title: t(
        'Real-time AI visibility across multiple engines and markets',
        '여러 엔진과 시장에서 실시간으로 추적하는 AI 가시성',
      ),
      content: t(
        'Built an MVP that polls ChatGPT, Claude, and Perplexity with real buyer prompts, segmented by market and language (US, UK, JP, KR). Introduced the AI Visibility Score — a composite of mentions, citations, and share of voice — as the north star metric. Also scoped AEKO Agents (MCP integration) to let power users run optimization tools directly in Claude Desktop and Cursor without leaving their workflow.',
        '실제 구매자 프롬프트로 ChatGPT, Claude, Perplexity를 시장·언어별(US, UK, JP, KR)로 세분화해 폴링하는 MVP를 구축했습니다. 멘션·인용·점유율을 종합한 AI Visibility Score를 핵심 지표로 도입했습니다. 파워 유저가 Claude Desktop과 Cursor 안에서 워크플로우를 벗어나지 않고 최적화 도구를 실행할 수 있도록 AEKO Agents(MCP 통합)도 함께 설계했습니다.',
      ),
      tags: ['GenAI', 'MCP Integration', 'Multi-Region Data', 'Visibility Score Metric'],
    },
    {
      phase: '05 — ' + t("What's Next", '다음 단계'),
      title: t('Testing the MVP with early users', '얼리 유저와 함께 MVP 테스트 중'),
      content: t(
        'Currently running closed MVP testing with a small cohort of cross-border sellers. Focused on validating three things: do sellers understand their score, does seeing the score motivate action, and does the optimization guidance produce measurable AI visibility changes. Results pending — watching closely.',
        '소규모 크로스보더 셀러 코호트와 비공개 MVP 테스트를 진행하고 있습니다. 세 가지를 검증하는 데 집중하고 있습니다: 셀러가 점수를 이해하는가, 점수 확인이 행동을 유도하는가, 최적화 가이던스가 측정 가능한 AI 가시성 변화를 만드는가. 현재 결과를 면밀히 관찰하고 있습니다.',
      ),
      tags: ['MVP Testing', 'User Validation', 'Activation Metrics', 'Iteration'],
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
        logoSrc="/aeko-logo.svg"
        subLabels={[t('MVP in Testing', 'MVP 테스트 중'), 'AEO · SaaS · Cross-Border E-commerce']}
        title="AEKO"
        subtitle={t(
          'Building the analytics layer for the AI search era — so brands stop flying blind when AI engines recommend their competitors.',
          'AI 검색 시대를 위한 분석 레이어를 구축합니다 — AI 엔진이 경쟁사를 추천하는 동안 브랜드가 더 이상 맹목적으로 운영되지 않도록.',
        )}
        meta={[
          { label: t('Stage', '단계'), value: t('Closed MVP Testing', '비공개 MVP 테스트') },
          { label: t('Market', '시장'), value: t('Cross-Border E-commerce', '크로스보더 이커머스') },
        ]}
        t={t}
      />

      {/* Product UI showcase */}
      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <Reveal>
            <div className="flex items-center gap-4 mb-10">
              <img src="/aeko-logo.svg" alt="AEKO" className="h-8" />
              <a
                href="https://aeko-intelligence.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-tech text-[11px] tracking-widest uppercase"
                style={{ color: 'var(--acc)' } as React.CSSProperties}
              >
                aeko-intelligence.com ↗
              </a>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-sm overflow-hidden border hairline mb-8">
              <img src="/aeko-hero.png" alt="AEKO landing page" className="w-full" />
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal delay={160}>
              <div className="rounded-sm overflow-hidden border hairline">
                <img src="/aeko-score-ui.png" alt="AI Visibility Score dashboard" className="w-full" />
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="rounded-sm overflow-hidden border hairline">
                <img src="/aeko-dashboard.png" alt="AEKO prompt tracking and optimization" className="w-full" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <ContextBlock
            eyebrow={t('THE SHIFT', '변화')}
            headline={t(
              'AI engines are the new search bar. Nobody built analytics for them.',
              'AI 엔진이 새로운 검색창이 되었습니다. 하지만 아무도 이를 위한 분석 도구를 만들지 않았습니다.',
            )}
            body={t(
              'A growing share of product discovery now happens through conversational AI — not traditional search. Brands spent years optimizing for keywords, backlinks, and page speed. None of that moves the needle when a shopper asks ChatGPT "best Korean skincare for dry skin." AEKO was built to close that data gap.',
              '제품 발견의 점점 더 큰 부분이 전통 검색이 아닌 대화형 AI를 통해 이뤄지고 있습니다. 브랜드들은 수년간 키워드, 백링크, 페이지 속도를 최적화해 왔습니다. 하지만 쇼퍼가 ChatGPT에 "건조 피부에 좋은 한국 스킨케어"를 물을 때 이 중 어느 것도 소용이 없습니다. AEKO는 바로 그 데이터 격차를 메우기 위해 만들어졌습니다.',
            )}
            rows={[
              { label: t('ChatGPT monthly active users', 'ChatGPT 월간 활성 사용자'), value: '400M+' },
              { label: t('Product queries via AI search', 'AI 검색을 통한 제품 탐색'), value: t('Rising fast', '급증 중') },
              { label: t('Brands with AI visibility data', 'AI 가시성 데이터를 보유한 브랜드'), value: t('Near zero', '거의 0') },
              { label: t('Cross-border sellers at risk', '위험에 노출된 크로스보더 셀러'), value: t('Millions', '수백만') },
            ]}
          />
        </div>
      </section>

      <section className="border-b hairline">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionLabel eyebrow={t('PROCESS', '프로세스')} title={t('How we built it', '어떻게 만들었는가')} />
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

      <CTASection
        title={t('Curious about AEKO?', 'AEKO가 궁금하신가요?')}
        body={t(
          "Happy to go deeper on the strategy, the AEO category, or what we're learning from early users.",
          '전략, AEO 카테고리, 얼리 유저에게서 배우고 있는 것에 대해 더 자세히 이야기 나눌 수 있습니다.',
        )}
        ctaLabel={t('Get in touch', '연락하기')}
      />
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
        subLabels={['Financial Media · AI · Korea']}
        title={
          <>
            {t("Korea's ", '한국의 ')}
            <span className="italic" style={{ color: 'var(--acc)' } as React.CSSProperties}>
              {t('#1 US Market', '1위 미국 주식')}
            </span>{' '}
            {t('Intelligence Platform', '인텔리전스 플랫폼')}
          </>
        }
        subtitle={t(
          'Closing the information gap between Korean investors and US markets — real-time SEC filings, government signals, and market news, translated and delivered at the speed of trading.',
          '한국 투자자와 미국 시장 간 정보 격차 해소 — SEC 공시, 정부 시그널, 시장 뉴스를 실시간으로 번역해 트레이딩 속도로 전달.',
        )}
        meta={[
          { label: t('Stack', '스택'), value: 'Multi-Model AI, MCP Server, AI Orchestration' },
          { label: t('Market', '시장'), value: t('Korean Retail Investors', '한국 개인 투자자') },
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
      logo: '/aeko-logo.svg',
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
          'Our monetization was primarily ad-driven — my focus was designing ad experiences that felt native to the product, placing them where context was strongest and UX impact was zero.',
          '수익화는 주로 광고 기반이었으며, 제 역할은 광고가 제품에 자연스럽게 녹아드는 경험을 설계하는 것이었습니다. 맥락이 가장 강하고 UX 영향이 없는 지점에 광고를 배치했습니다.',
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
