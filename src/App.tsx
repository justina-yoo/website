/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, TrendingUp, Users, MousePointerClick, Clock, MessageSquare, Newspaper, Target, Lightbulb, BarChart3, ChevronRight, Globe, Zap } from 'lucide-react';

const locations = [
  { city: "Shanghai", country: "China", flag: "🇨🇳", pct: 10 },
  { city: "Pennsylvania", country: "United States", flag: "🇺🇸", pct: 50 },
  { city: "Seoul", country: "South Korea", flag: "🇰🇷", pct: 90 },
];

function HorizonTracker() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % locations.length), 2400);
    return () => clearInterval(id);
  }, []);

  const dotPct = locations[active].pct;

  return (
    <div className="flex flex-col items-center gap-1 select-none w-full max-w-[340px]">
      <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-3">Lived in</span>
      {/* horizon container */}
      <div className="relative w-full" style={{ height: 56 }}>
        {/* line */}
        <div className="absolute top-[18px] left-0 right-0 h-px bg-slate-200" />
        {/* travelled fill */}
        <motion.div
          className="absolute top-[18px] left-0 h-px bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-400"
          animate={{ width: `${dotPct}%` }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
        />
        {/* city points */}
        {locations.map((loc, i) => (
          <div
            key={loc.city}
            className="absolute flex flex-col items-center"
            style={{ left: `${loc.pct}%`, transform: 'translateX(-50%)', top: 0 }}
          >
            {/* dot */}
            <motion.div
              animate={{
                scale: active === i ? 1.4 : 1,
                backgroundColor: active === i ? '#6366f1' : '#cbd5e1',
                boxShadow: active === i ? '0 0 0 4px rgba(99,102,241,0.2)' : '0 0 0 0px transparent',
              }}
              transition={{ duration: 0.4 }}
              className="w-2.5 h-2.5 rounded-full mt-[13px]"
            />
            {/* label */}
            <motion.div
              animate={{ opacity: active === i ? 1 : 0.35 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center mt-2"
            >
              <span className="text-base leading-none">{loc.flag}</span>
              <span className="text-[10px] font-semibold text-slate-700 mt-0.5 whitespace-nowrap">{loc.city}</span>
            </motion.div>
          </div>
        ))}
        {/* traveling glow dot */}
        <motion.div
          animate={{ left: `${dotPct}%` }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
          className="absolute top-[12px] -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-500/30 blur-[3px] pointer-events-none"
        />
      </div>
    </div>
  );
}

// ─── Floating Sparkle shape ────────────────────────────────────────────────
function Sparkle({ style, color1, color2 }: { style?: React.CSSProperties; color1: string; color2: string }) {
  return (
    <svg viewBox="0 0 80 80" style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`sg-${color1.replace('#','')}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>
      <path
        d="M40 4 C40 4 44 28 58 34 C72 40 76 40 76 40 C76 40 52 44 46 58 C40 72 40 76 40 76 C40 76 36 52 22 46 C8 40 4 40 4 40 C4 40 28 36 34 22 C40 8 40 4 40 4Z"
        fill={`url(#sg-${color1.replace('#','')})`}
        opacity="0.92"
      />
    </svg>
  );
}

// ─── Glass Orb ─────────────────────────────────────────────────────────────
function GlassOrb({ size, gradient, style }: { size: number; gradient: string; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: gradient,
        boxShadow: `0 20px 60px rgba(99,102,241,0.25), inset 0 -8px 20px rgba(255,255,255,0.3), inset 0 8px 20px rgba(255,255,255,0.5)`,
        filter: 'blur(0.4px)',
        ...style,
      }}
    />
  );
}

// ─── Featured Project Page — NewsChat ────────────────────────────────────────────

function NewsChatCaseStudy({ onBack }: { onBack: () => void }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  const metrics = [
    { icon: Users, value: "1M", label: "MAU in 5 months", color: "text-indigo-500" },
    { icon: Clock, value: "250%", label: "Increase in dwell time", color: "text-cyan-500" },
    { icon: MousePointerClick, value: "10%", label: "Contextual ad CTR", color: "text-violet-500" },
    { icon: Newspaper, value: "100M+", label: "Article views accumulated", color: "text-sky-500" },
  ];

  const timeline = [
    { phase: "01 — Discovery", title: "Why are readers bouncing?", content: "Partnered with a South Korean digital news publisher facing a 40% YoY drop in session duration. Ran user interviews, session replay analysis, and heatmapping across 3M monthly sessions. The core insight: readers wanted to go deeper on a topic but had no path forward — they'd read the headline, skim the article, and leave.", tags: ["User Interviews", "Session Analytics", "Heatmapping", "Stakeholder Alignment"] },
    { phase: "02 — Problem Framing", title: "Passive consumption is a dead end", content: "Defined the core problem: news content was broadcast-only. Readers had questions the article didn't answer, but no way to ask them. This created a gap between reader intent and publisher experience — and left monetization value on the table. Framed the opportunity as: can we make news a conversation?", tags: ["Jobs-to-be-Done", "Opportunity Sizing", "Problem Statement"] },
    { phase: "03 — Solution Design", title: "NewsChat: Ask anything about the story", content: "Designed a contextual conversational layer embedded directly in news articles. Readers can ask follow-up questions, get source summaries, explore related topics, and request simplified explanations — all grounded in the article and vetted source material via RAG pipelines. Worked closely with ML and infra teams to define retrieval quality, latency budgets (<800ms), and hallucination guardrails.", tags: ["GenAI / LLM", "RAG Architecture", "UX Design", "Latency Optimization"] },
    { phase: "04 — Monetization Strategy", title: "Contextual ads that feel native", content: "Designed a contextual ad injection system that reads the semantic thread of each conversation turn and surfaces relevant sponsored content at natural breakpoints — never mid-sentence, never intrusive. Ads are tagged to conversation intent, not page keywords, achieving 10x industry-average CTR. Modeled a CPM uplift of 3.2x over standard display inventory.", tags: ["Ad Strategy", "Intent Targeting", "Revenue Modeling", "A/B Testing"] },
    { phase: "05 — Launch & Scale", title: "0 → 1M MAU in 5 months", content: "Ran a soft launch with 3 publisher partners, iterating on response quality, UI placement, and chat trigger UX based on real engagement data. After hitting PMF signals (>30% of readers who saw the chat prompt engaged with it), scaled to additional publishers. Hit 1M MAU 5 months post-launch with zero paid acquisition — entirely through publisher distribution.", tags: ["Go-to-Market", "PMF Signals", "Publisher Partnerships", "Growth"] },
  ];

  const learnings = [
    { icon: Lightbulb, title: "Trust is the foundation of AI products", body: "Hallucination wasn't just a technical problem — it was a product trust problem. We invested heavily in source attribution UI and escalation flows (\"I'm not sure — read the original article\") before we got engagement to lift. Users forgave slow answers; they didn't forgive wrong ones." },
    { icon: Target, title: "Monetization must be designed in, not bolted on", body: "Starting with a clear monetization hypothesis from day one shaped every product decision — from data schemas to conversation UX. Teams that treat ads as a later problem ship products that are fundamentally incompatible with their business model." },
    { icon: BarChart3, title: "Dwell time is a vanity metric without attribution", body: "Dwell time went up 250% — but the real win was that pages-per-session and return visit rate moved too. We learned to look for correlated behavior clusters, not single metrics, as signals of genuine engagement improvement." },
  ];

  return (
    <div className="animated-gradient min-h-screen text-slate-900 font-sans relative">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-indigo-300/30 blur-[120px]" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-violet-300/25 blur-[100px]" />
        <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-300/20 blur-[120px]" />
        <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] rounded-full bg-pink-300/20 blur-[100px]" />
      </div>

      <nav className="fixed top-0 w-full z-50 bg-white/20 backdrop-blur-2xl border-b border-white/30 shadow-sm shadow-indigo-100/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <button onClick={onBack} className="text-xl font-bold tracking-tighter text-slate-800">
            JUSTINA<span className="text-indigo-500">.</span>YOO
          </button>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/justina-ji-yeon-yoo/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-sm border border-white/70 text-slate-700 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all shadow-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="mailto:justina.yoo@gmail.com"
              className="px-4 py-2 md:px-6 md:py-2.5 bg-white/50 backdrop-blur-sm text-slate-800 text-sm font-semibold rounded-full border border-white/70 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all flex items-center gap-2 shadow-sm">
              Contact <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-20 relative z-10">
        <section className="relative py-16 md:py-28 overflow-hidden border-b border-white/30">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full border border-indigo-300/40 bg-indigo-100/60 backdrop-blur text-indigo-600 text-xs font-semibold tracking-widest uppercase">Featured Project</span>
                <span className="px-3 py-1 rounded-full border border-white/60 bg-white/40 backdrop-blur text-slate-500 text-xs font-semibold tracking-widest uppercase">GenAI · Media · Monetization</span>
              </div>
              <div className="inline-flex items-center bg-slate-800 rounded-xl px-4 py-2 mb-6">
                <img src="https://panomix.io/images/products/Newschat%20logo.svg" alt="NewsChat" className="h-7 object-contain" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-6">NewsChat<span className="text-indigo-500">.</span></h1>
              <p className="text-base md:text-xl lg:text-2xl text-slate-500 font-light max-w-2xl leading-relaxed mb-10">Turning passive news consumption into interactive conversation — and monetizing the engagement gap.</p>
              <div className="flex flex-wrap gap-3 md:gap-6 text-sm text-slate-500">
                <div><span className="font-semibold text-slate-800">Role</span> · Lead PM, 0→1</div>
                <div><span className="font-semibold text-slate-800">Team</span> · ML, Infra, Design, Partnerships</div>
                <div><span className="font-semibold text-slate-800">Market</span> · Digital News Publishers</div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-20 border-b border-white/30">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-10">Impact at a glance</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {metrics.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="rounded-2xl bg-white/40 backdrop-blur-lg border border-white/60 p-4 md:p-6 hover:bg-white/60 hover:shadow-lg hover:shadow-indigo-100/30 transition-all">
                    <m.icon className={`w-5 h-5 mb-4 ${m.color}`} />
                    <div className={`text-4xl font-bold tracking-tight mb-1 ${m.color}`}>{m.value}</div>
                    <div className="text-sm text-slate-500 leading-snug">{m.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-20 border-b border-white/30">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">The Context</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">News media is an engagement crisis dressed as a content problem.</h2>
                <p className="text-slate-600 leading-relaxed">Publishers invested in AI-powered content generation — and saw article output double. But session duration kept falling. More content didn't mean more engagement. The real problem was structural: readers had no reason to stay.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-4">
                {[
                  { label: "Average article read time", before: "48 sec" },
                  { label: "Reader return rate (7-day)", before: "12%" },
                  { label: "Ad CPM (display)", before: "$1.20" },
                  { label: "AI content investment ROI", before: "Unmeasured" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/40 backdrop-blur border border-white/60">
                    <span className="text-sm text-slate-600">{row.label}</span>
                    <span className="text-sm font-semibold text-red-400">{row.before}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-24 border-b border-white/30">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-4">Process</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">How we built it</h2>
            </motion.div>
            <div className="space-y-6">
              {timeline.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group rounded-2xl bg-white/40 backdrop-blur-lg border border-white/60 p-5 md:p-8 hover:bg-white/60 hover:shadow-md hover:shadow-indigo-100/30 transition-all">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase text-indigo-500 mb-1">{step.phase}</p>
                      <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors mt-1 shrink-0" />
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-5">{step.content}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag, j) => (
                      <span key={j} className="px-2.5 py-1 rounded-full bg-indigo-100/60 text-indigo-600 text-xs font-medium border border-indigo-200/40">{tag}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-24 border-b border-white/30">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-4">Product</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">NewsChat in action</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {[
                { icon: MessageSquare, title: "Ask anything", body: "Readers ask follow-up questions mid-article. NewsChat responds with context drawn from the story, related reporting, and verified source material — grounded via RAG." },
                { icon: Newspaper, title: "Deeper context, instantly", body: "\"Who is this person?\" \"What happened last week?\" — background questions are answered in-line without leaving the page. Session depth increases, bounce rate drops." },
                { icon: TrendingUp, title: "Monetize the conversation", body: "Sponsored content surfaces contextually at natural breakpoints in the conversation thread — matched to semantic intent, not page keywords. 10% CTR vs. 0.1% industry average." },
              ].map((card, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-2xl bg-white/40 backdrop-blur-lg border border-white/60 p-5 md:p-7 hover:bg-white/60 transition-all">
                  <card.icon className="w-6 h-6 text-indigo-500 mb-5" />
                  <h3 className="text-lg font-semibold mb-3 text-slate-800">{card.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{card.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-24 border-b border-white/30">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">Reflections</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">What I learned</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {learnings.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-2xl bg-white/40 backdrop-blur-lg border border-white/60 p-5 md:p-7 hover:bg-white/60 transition-all">
                  <item.icon className="w-5 h-5 text-indigo-500 mb-5" />
                  <h3 className="text-base font-bold mb-3 leading-snug text-slate-800">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-24">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Want to talk through this?</h2>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">I'm always happy to go deeper on product strategy, AI monetization, or 0→1 builds.</p>
              <a href="mailto:justina.yoo@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-3.5 bg-indigo-500 text-white text-sm font-semibold rounded-full hover:bg-indigo-600 transition-colors">
                Get in touch <Mail className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/40 bg-white/20 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-xs text-slate-400 tracking-widest uppercase">© 2026 Justina Yoo</div>
        </div>
      </footer>
    </div>
  );
}

// ─── AEKO Featured Project ─────────────────────────────────────────────────────────

function AekoCaseStudy({ onBack }: { onBack: () => void }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  const timeline = [
    { phase: "01 — Discovery", title: "The SEO playbook doesn't work for AI search", content: "Interviewed cross-border e-commerce sellers who noticed their AI-era traffic was unpredictable and unattributable. The core finding: sellers had zero visibility into how ChatGPT, Claude, and Perplexity were recommending (or not recommending) their products. The same brand got completely different AI treatment depending on the market and language — and nobody knew why.", tags: ["User Interviews", "Market Research", "Competitive Analysis", "Opportunity Sizing"] },
    { phase: "02 — Problem Framing", title: "Brands are flying blind in AI-driven search", content: "Defined the core problem: AI engines have taken over top-of-funnel discovery for millions of shoppers, but there are no analytics tools built for it. Search Console exists for traditional SEO. There is no equivalent for AEO — Answer Engine Optimization. This gap is sharpest for cross-border sellers, where language and market context dramatically change AI outputs.", tags: ["Jobs-to-be-Done", "Problem Statement", "TAM Sizing", "AEO Category Definition"] },
    { phase: "03 — Product Strategy", title: "Monitor first, optimize second", content: "Made the key strategic call to lead with monitoring — not optimization recommendations. Sellers need to see the problem before they'll invest in fixing it. Designed AEKO's core activation loop: connect domain → define tracked prompts → see your AI Visibility Score → receive optimization guidance. This sequencing is our hypothesis for driving both activation and paid conversion.", tags: ["Product Strategy", "Activation Design", "Pricing Architecture", "Freemium Model"] },
    { phase: "04 — MVP Build", title: "Real-time AI visibility across multiple engines and markets", content: "Built an MVP that polls ChatGPT, Claude, and Perplexity with real buyer prompts, segmented by market and language (US, UK, JP, KR). Introduced the AI Visibility Score — a composite of mentions, citations, and share of voice — as the north star metric. Also scoped AEKO Agents (MCP integration) to let power users run optimization tools directly in Claude Desktop and Cursor without leaving their workflow.", tags: ["GenAI", "MCP Integration", "Multi-Region Data", "Visibility Score Metric"] },
    { phase: "05 — What's Next", title: "Testing the MVP with early users", content: "Currently running closed MVP testing with a small cohort of cross-border sellers. Focused on validating three things: do sellers understand their score, does seeing the score motivate action, and does the optimization guidance produce measurable AI visibility changes. Results pending — watching closely.", tags: ["MVP Testing", "User Validation", "Activation Metrics", "Iteration"] },
  ];

  const bets = [
    { icon: Lightbulb, title: "The aha moment has to be immediate", body: "Our hypothesis: sellers need to see their AI Visibility Score within minutes of signing up — before we ask for any commitment. Showing a brand they have zero mentions while a competitor ranks in every query should be the conversion event. We're testing whether the score alone creates urgency." },
    { icon: Zap, title: "MCP will be the highest-retention surface", body: "We're betting that the AEKO Agents integration — running optimization in Claude Desktop and Cursor — will anchor power users more than the dashboard alone. When the tool lives inside an existing workflow, churn friction drops. This is our top hypothesis to validate post-MVP." },
    { icon: Globe, title: "Cross-market parity is the real differentiator", body: "Every comparable tool tracks one market. Our bet is that showing a Korean brand how they appear in US ChatGPT versus Japanese Perplexity in the same view is the feature that justifies premium pricing and enterprise conversations. Multi-region is the moat we're building toward." },
  ];

  return (
    <div className="animated-gradient min-h-screen text-slate-900 font-sans relative">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-violet-300/30 blur-[120px]" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-300/25 blur-[100px]" />
        <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full bg-pink-300/20 blur-[120px]" />
        <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] rounded-full bg-blue-300/20 blur-[100px]" />
      </div>

      <nav className="fixed top-0 w-full z-50 bg-white/20 backdrop-blur-2xl border-b border-white/30 shadow-sm shadow-indigo-100/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <button onClick={onBack} className="text-xl font-bold tracking-tighter text-slate-800">
            JUSTINA<span className="text-indigo-500">.</span>YOO
          </button>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/justina-ji-yeon-yoo/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-sm border border-white/70 text-slate-700 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all shadow-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="mailto:justina.yoo@gmail.com"
              className="px-4 py-2 md:px-6 md:py-2.5 bg-white/50 backdrop-blur-sm text-slate-800 text-sm font-semibold rounded-full border border-white/70 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all flex items-center gap-2 shadow-sm">
              Contact <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-20 relative z-10">
        <section className="relative py-16 md:py-28 overflow-hidden border-b border-white/30">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full border border-violet-300/40 bg-violet-100/60 backdrop-blur text-violet-600 text-xs font-semibold tracking-widest uppercase">Featured Project</span>
                <span className="px-3 py-1 rounded-full border border-amber-300/40 bg-amber-50/60 backdrop-blur text-amber-600 text-xs font-semibold tracking-widest uppercase">MVP in Testing</span>
                <span className="px-3 py-1 rounded-full border border-white/60 bg-white/40 backdrop-blur text-slate-500 text-xs font-semibold tracking-widest uppercase">AEO · SaaS · Cross-Border E-commerce</span>
              </div>
              <img src="https://aeko-intelligence.com/logo.svg" alt="AEKO" className="h-7 object-contain mb-6" />
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-6">AEKO<span className="text-violet-500">.</span></h1>
              <p className="text-base md:text-xl lg:text-2xl text-slate-500 font-light max-w-2xl leading-relaxed mb-10">Building the analytics layer for the AI search era — so brands stop flying blind when AI engines recommend their competitors.</p>
              <div className="flex flex-wrap gap-3 md:gap-6 text-sm text-slate-500">
                <div><span className="font-semibold text-slate-800">Role</span> · Product Strategy & 0→1 Build</div>
                <div><span className="font-semibold text-slate-800">Stage</span> · Closed MVP Testing</div>
                <div><span className="font-semibold text-slate-800">Market</span> · Cross-Border E-commerce</div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-20 border-b border-white/30">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">The Shift</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">AI engines are the new search bar. Nobody built analytics for them.</h2>
                <p className="text-slate-600 leading-relaxed">A growing share of product discovery now happens through conversational AI — not traditional search. Brands spent years optimizing for keywords, backlinks, and page speed. None of that moves the needle when a shopper asks ChatGPT "best Korean skincare for dry skin." AEKO was built to close that data gap.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-4">
                {[
                  { label: "ChatGPT monthly active users", value: "400M+" },
                  { label: "Product queries via AI search", value: "Rising fast" },
                  { label: "Brands with AI visibility data", value: "Near zero" },
                  { label: "Cross-border sellers at risk", value: "Millions" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/40 backdrop-blur border border-white/60">
                    <span className="text-sm text-slate-600">{row.label}</span>
                    <span className="text-sm font-semibold text-violet-600">{row.value}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-24 border-b border-white/30">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4">Process</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">How we built it</h2>
            </motion.div>
            <div className="space-y-6">
              {timeline.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group rounded-2xl bg-white/40 backdrop-blur-lg border border-white/60 p-5 md:p-8 hover:bg-white/60 hover:shadow-md hover:shadow-violet-100/30 transition-all">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase text-violet-500 mb-1">{step.phase}</p>
                      <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-violet-500 transition-colors mt-1 shrink-0" />
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-5">{step.content}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag, j) => (
                      <span key={j} className="px-2.5 py-1 rounded-full bg-violet-100/60 text-violet-600 text-xs font-medium border border-violet-200/40">{tag}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-24 border-b border-white/30">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">Hypotheses</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">Key product bets</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {bets.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-2xl bg-white/40 backdrop-blur-lg border border-white/60 p-5 md:p-7 hover:bg-white/60 transition-all">
                  <item.icon className="w-5 h-5 text-violet-500 mb-5" />
                  <h3 className="text-base font-bold mb-3 leading-snug text-slate-800">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-24">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Curious about AEKO?</h2>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">Happy to go deeper on the strategy, the AEO category, or what we're learning from early users.</p>
              <a href="mailto:justina.yoo@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-3.5 bg-violet-500 text-white text-sm font-semibold rounded-full hover:bg-violet-600 transition-colors">
                Get in touch <Mail className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/40 bg-white/20 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-xs text-slate-400 tracking-widest uppercase">© 2026 Justina Yoo</div>
        </div>
      </footer>
    </div>
  );
}

// ─── Cursor Trail ─────────────────────────────────────────────────────────────

const TRAIL_COLORS = [
  'rgba(165,180,252,0.7)',  // indigo-300
  'rgba(196,181,253,0.7)',  // violet-300
  'rgba(249,168,212,0.65)', // pink-300
  'rgba(147,197,253,0.65)', // blue-300
  'rgba(233,213,255,0.7)',  // purple-200
];

function CursorTrail() {
  const [dots, setDots] = useState<{ id: number; x: number; y: number; color: string; size: number }[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const id = counter.current++;
      const color = TRAIL_COLORS[id % TRAIL_COLORS.length];
      const size = Math.random() * 10 + 6;
      setDots(prev => [...prev.slice(-18), { id, x: e.clientX, y: e.clientY, color, size }]);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {dots.map(dot => (
          <motion.div
            key={dot.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: dot.x - dot.size / 2,
              top: dot.y - dot.size / 2,
              width: dot.size,
              height: dot.size,
              borderRadius: '50%',
              background: dot.color,
              filter: 'blur(2px)',
              pointerEvents: 'none',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── ATTN Case Study ──────────────────────────────────────────────────────────

function AttnCaseStudy({ onBack }: { onBack: () => void }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  const timeline = [
    { phase: "01 — Discovery", title: "Korean investors are flying blind on US markets", content: "Korean retail investors were increasingly active in US equities, but the information gap was severe. Earnings releases, SEC filings, and government policy signals move US small-cap stocks within minutes — yet Korean investors had no reliable, translated source to act on them in time. By the time news filtered through, the trade was gone.", tags: ["User Research", "Market Analysis", "Opportunity Sizing", "Competitive Landscape"] },
    { phase: "02 — Problem Framing", title: "The bottleneck isn't information — it's speed and language", content: "The problem wasn't that US market data didn't exist. It was that nothing aggregated SEC filings, government signals, and breaking market news in one place and made them accessible in Korean, fast enough to act on. We framed the product opportunity as: build the intelligence layer Korean investors need to move at the speed of US markets.", tags: ["Problem Statement", "Jobs-to-be-Done", "TAM Sizing"] },
    { phase: "03 — Product Strategy", title: "Three-pillar intelligence platform", content: "Designed ATTN around three core content pillars: real-time market news, SEC filing analysis, and US government policy signals. Each pillar feeds a distinct investor need — from intraday traders reacting to earnings to longer-horizon investors tracking regulatory shifts. Multi-model AI handles translation, summarization, and signal extraction at scale.", tags: ["Product Strategy", "Content Architecture", "Multi-Model AI", "AI Orchestration"] },
    { phase: "04 — Build", title: "AI-native pipeline from source to reader", content: "Built an AI-native data pipeline using multi-model orchestration and MCP servers to continuously ingest English-language financial sources, extract market-moving signals, translate and structure content for Korean readers, and surface it within minutes of publication. Docker-based infrastructure enables reliable scaling around US market open/close windows.", tags: ["Multi-Model AI", "MCP Server", "Docker", "3rd Party APIs", "AI Orchestration"] },
    { phase: "05 — Outcome", title: "South Korea's #1 US stock market information media", content: "ATTN established itself as the leading Korean-language platform for US market intelligence. The platform delivers real-time coverage of SEC filings, government signals, and market news — closing the information gap that had left Korean investors at a structural disadvantage in US markets.", tags: ["Product Launch", "Market Leadership", "SEO", "Growth"] },
  ];

  const pillars = [
    { icon: TrendingUp, title: "Real-time market news", body: "Breaking US market coverage translated and delivered to Korean investors within minutes — fast enough to inform intraday decisions on small-cap stocks and earnings plays." },
    { icon: Newspaper, title: "SEC filing analysis", body: "SEC disclosures are dense and in English. ATTN extracts the signal — material changes, insider moves, risk flags — and surfaces them in structured Korean-language summaries." },
    { icon: Globe, title: "US government signals", body: "Policy shifts, Fed communications, and regulatory moves that affect US markets. ATTN tracks and translates these signals so Korean investors aren't the last to know." },
  ];

  const learnings = [
    { icon: Lightbulb, title: "Speed is the product", body: "In financial information, a 10-minute lag is the same as no information. Every infrastructure decision — from MCP server design to deployment architecture — was made to minimize time from source to reader." },
    { icon: Target, title: "Translation is more than language", body: "Accurate Korean translation wasn't enough. We had to localize financial terminology, contextualize US market conventions, and adapt formatting for how Korean investors read and act on information." },
    { icon: Zap, title: "Multi-model orchestration earns its complexity", body: "No single model handles real-time ingestion, translation, summarization, and signal extraction equally well. Orchestrating specialized models per task gave us both better output quality and cost efficiency at scale." },
  ];

  return (
    <div className="animated-gradient min-h-screen text-slate-900 font-sans relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-sky-300/30 blur-[120px]" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-300/25 blur-[100px]" />
        <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-300/20 blur-[120px]" />
        <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] rounded-full bg-violet-300/20 blur-[100px]" />
      </div>

      <nav className="fixed top-0 w-full z-50 bg-white/20 backdrop-blur-2xl border-b border-white/30 shadow-sm shadow-indigo-100/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <button onClick={onBack} className="text-xl font-bold tracking-tighter text-slate-800">
            JUSTINA<span className="text-indigo-500">.</span>YOO
          </button>
          <div className="flex items-center gap-3">
            <a href="https://www.linkedin.com/in/justina-ji-yeon-yoo/" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-sm border border-white/70 text-slate-700 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all shadow-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="mailto:justina.yoo@gmail.com"
              className="px-4 py-2 md:px-6 md:py-2.5 bg-white/50 backdrop-blur-sm text-slate-800 text-sm font-semibold rounded-full border border-white/70 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all flex items-center gap-2 shadow-sm">
              Contact <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-20 relative z-10">
        <section className="relative py-16 md:py-28 overflow-hidden border-b border-white/30">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full border border-sky-300/40 bg-sky-100/60 backdrop-blur text-sky-600 text-xs font-semibold tracking-widest uppercase">Featured Project</span>
                <span className="px-3 py-1 rounded-full border border-white/60 bg-white/40 backdrop-blur text-slate-500 text-xs font-semibold tracking-widest uppercase">Financial Media · AI · Korea</span>
              </div>
              <img src="https://attn.today/icons/attn_logo.svg" alt="ATTN" className="h-8 object-contain mb-6" />
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-6">Korea's <span className="text-sky-500">#1 US Market</span> Intelligence Platform</h1>
              <p className="text-base md:text-xl lg:text-2xl text-slate-500 font-light max-w-2xl leading-relaxed mb-10">Closing the information gap between Korean investors and US markets — real-time SEC filings, government signals, and market news, translated and delivered at the speed of trading.</p>
              <div className="flex flex-wrap gap-3 md:gap-6 text-sm text-slate-500">
                <div><span className="font-semibold text-slate-800">Role</span> · Lead PM, 0→1 Build</div>
                <div><span className="font-semibold text-slate-800">Stack</span> · Multi-Model AI, MCP Server, AI Orchestration</div>
                <div><span className="font-semibold text-slate-800">Market</span> · Korean Retail Investors</div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-20 border-b border-white/30">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">The Problem</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">Korean investors are the last to know about US market moves.</h2>
                <p className="text-slate-600 leading-relaxed">SEC filings, earnings calls, and government policy signals move small-cap stocks within minutes of publication. All of it is in English, scattered across dozens of sources. By the time Korean investors found and parsed the information, the trade window had already closed.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-4">
                {[
                  { label: "Language barrier to US financial sources", value: "Severe" },
                  { label: "SEC filings available in Korean", value: "Zero" },
                  { label: "Time to act on US small-cap news", value: "Minutes" },
                  { label: "Korean retail investors in US equities", value: "Growing fast" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/40 backdrop-blur border border-white/60">
                    <span className="text-sm text-slate-600">{row.label}</span>
                    <span className="text-sm font-semibold text-sky-600">{row.value}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 border-b border-white/30">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-sky-400 mb-4">Product</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">Three pillars of US market intelligence</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {pillars.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-2xl bg-white/40 backdrop-blur-lg border border-white/60 p-5 md:p-7 hover:bg-white/60 transition-all">
                  <item.icon className="w-6 h-6 text-sky-500 mb-5" />
                  <h3 className="text-lg font-semibold mb-3 text-slate-800">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-24 border-b border-white/30">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-sky-400 mb-4">Process</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">How we built it</h2>
            </motion.div>
            <div className="space-y-6">
              {timeline.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group rounded-2xl bg-white/40 backdrop-blur-lg border border-white/60 p-5 md:p-8 hover:bg-white/60 hover:shadow-md hover:shadow-sky-100/30 transition-all">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase text-sky-500 mb-1">{step.phase}</p>
                      <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-sky-500 transition-colors mt-1 shrink-0" />
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-5">{step.content}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag, j) => (
                      <span key={j} className="px-2.5 py-1 rounded-full bg-sky-100/60 text-sky-600 text-xs font-medium border border-sky-200/40">{tag}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-24 border-b border-white/30">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">Reflections</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">What I learned</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {learnings.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-2xl bg-white/40 backdrop-blur-lg border border-white/60 p-5 md:p-7 hover:bg-white/60 transition-all">
                  <item.icon className="w-5 h-5 text-sky-500 mb-5" />
                  <h3 className="text-base font-bold mb-3 leading-snug text-slate-800">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-24">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Want to talk through this?</h2>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">Happy to go deeper on the AI pipeline, financial media strategy, or what it takes to build for speed-sensitive markets.</p>
              <a href="mailto:justina.yoo@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-3.5 bg-sky-500 text-white text-sm font-semibold rounded-full hover:bg-sky-600 transition-colors">
                Get in touch <Mail className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/40 bg-white/20 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-xs text-slate-400 tracking-widest uppercase">© 2026 Justina Yoo</div>
        </div>
      </footer>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

const SITE_PASSWORD = 'justina';

export default function App() {
  const [page, setPage] = useState<'home' | 'newschat' | 'aeko' | 'attn'>('home');
  const [unlocked, setUnlocked] = useState(false);
  const [careerExpanded, setCareerExpanded] = useState(false);
  const [sitePassword, setSitePassword] = useState('');
  const [sitePasswordError, setSitePasswordError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  function submitSitePassword(e: React.FormEvent) {
    e.preventDefault();
    if (sitePassword === SITE_PASSWORD) {
      setUnlocked(true);
    } else {
      setSitePasswordError(true);
      setSitePassword('');
    }
  }

  if (!unlocked) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: 'linear-gradient(135deg, #c7d2fe 0%, #a5f3fc 45%, #d8b4fe 100%)' }}
      >
        {/* Decorative floating elements on lock screen */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ y: [0, -16, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[15%] left-[10%]">
            <Sparkle style={{ width: 48, height: 48, opacity: 0.7 }} color1="#a78bfa" color2="#818cf8" />
          </motion.div>
          <motion.div animate={{ y: [0, 14, 0], rotate: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute top-[20%] right-[12%]">
            <Sparkle style={{ width: 36, height: 36, opacity: 0.65 }} color1="#67e8f9" color2="#38bdf8" />
          </motion.div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="absolute bottom-[20%] left-[15%]">
            <GlassOrb size={120} gradient="radial-gradient(circle at 35% 30%, #e0e7ff, #a5b4fc, #6366f1)" />
          </motion.div>
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }} className="absolute bottom-[15%] right-[10%]">
            <GlassOrb size={180} gradient="radial-gradient(circle at 35% 30%, #ede9fe, #a5b4fc, #6366f1)" />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-sm text-center relative z-10">
          <div className="text-2xl font-bold tracking-tighter mb-1 text-slate-800">JUSTINA<span className="text-indigo-500">.</span>YOO</div>
          <p className="text-sm text-slate-600 mb-10">This portfolio is password protected.</p>
          <form onSubmit={submitSitePassword} className="space-y-3">
            <input
              type="password"
              value={sitePassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSitePassword(e.target.value); setSitePasswordError(false); }}
              placeholder="Enter password"
              autoFocus
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors text-center tracking-widest bg-white/70 backdrop-blur-sm ${sitePasswordError ? 'border-red-300 bg-red-50/70 placeholder-red-300 focus:border-red-400' : 'border-white/80 focus:border-indigo-400'}`}
            />
            {sitePasswordError && <p className="text-xs text-red-500">Incorrect password. Try again.</p>}
            <button type="submit" className="w-full py-3 bg-slate-900/90 text-white text-sm font-semibold rounded-xl hover:bg-indigo-600 transition-colors backdrop-blur-sm">
              Enter
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <CursorTrail />
      <AnimatePresence mode="wait">
      {page === 'newschat' ? (
        <motion.div key="newschat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          <NewsChatCaseStudy onBack={() => setPage('home')} />
        </motion.div>
      ) : page === 'aeko' ? (
        <motion.div key="aeko" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          <AekoCaseStudy onBack={() => setPage('home')} />
        </motion.div>
      ) : page === 'attn' ? (
        <motion.div key="attn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          <AttnCaseStudy onBack={() => setPage('home')} />
        </motion.div>
      ) : (
        <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
          className="animated-gradient text-slate-900 font-sans selection:bg-indigo-500/30 relative">
          {/* Fixed full-page gradient blobs so colour persists while scrolling */}
          <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-indigo-300/40 blur-[120px]" />
            <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-blue-300/35 blur-[120px]" />
            <div className="absolute top-2/3 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-300/35 blur-[120px]" />
            <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] rounded-full bg-pink-200/30 blur-[120px]" />
          </div>

          {/* ── Navigation ────────────────────────────────────── */}
          <nav className="fixed top-0 w-full z-50 bg-white/20 backdrop-blur-2xl border-b border-white/30 shadow-sm shadow-indigo-100/20">
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
              <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xl font-bold tracking-tighter text-slate-800 hover:text-indigo-500 transition-colors">
                JUSTINA<span className="text-indigo-500">.</span>YOO
              </motion.button>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-1 md:gap-3">
                <div className="hidden sm:flex items-center gap-1">
                  <button
                    onClick={() => document.getElementById('featured-work')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-indigo-500 hover:bg-white/40 rounded-full transition-all"
                  >
                    Featured Work
                  </button>
                  <button
                    onClick={() => document.getElementById('side-projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-indigo-500 hover:bg-white/40 rounded-full transition-all"
                  >
                    Side Projects
                  </button>
                </div>
                <a
                  href="https://www.linkedin.com/in/justina-ji-yeon-yoo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-sm border border-white/70 text-slate-700 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all shadow-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="mailto:justina.yoo@gmail.com"
                  className="px-4 py-2 md:px-6 md:py-2.5 bg-white/50 backdrop-blur-sm text-slate-800 text-sm font-semibold rounded-full border border-white/70 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all flex items-center gap-2 shadow-sm">
                  Contact <Mail className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </nav>

          {/* ── Hero ──────────────────────────────────────────── */}
          <section
            className="relative flex items-center justify-center pt-20 overflow-hidden"
            style={{ minHeight: 'min(90vh, 100dvh)', background: 'transparent' }}
          >
            {/* Animated gradient overlay that shifts */}
            <motion.div
              className="absolute inset-0 z-0 pointer-events-none"
              animate={{ background: [
                'radial-gradient(ellipse at 20% 50%, rgba(196,181,253,0.5) 0%, transparent 60%)',
                'radial-gradient(ellipse at 80% 50%, rgba(186,230,253,0.5) 0%, transparent 60%)',
                'radial-gradient(ellipse at 50% 20%, rgba(221,214,254,0.5) 0%, transparent 60%)',
                'radial-gradient(ellipse at 20% 50%, rgba(196,181,253,0.5) 0%, transparent 60%)',
              ]}}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Floating orbs — mouse parallax */}
            <motion.div
              className="absolute bottom-[8%] left-[4%] z-0 pointer-events-none"
              style={{ x: mousePos.x * -18, y: mousePos.y * -12 }}
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <GlassOrb size={220} gradient="radial-gradient(circle at 35% 28%, #f5f3ff, #c4b5fd, #7c3aed)" />
            </motion.div>

            <motion.div
              className="absolute bottom-[12%] right-[5%] z-0 pointer-events-none"
              style={{ x: mousePos.x * 22, y: mousePos.y * 14 }}
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            >
              <GlassOrb size={260} gradient="radial-gradient(circle at 35% 28%, #ede9fe, #c4b5fd, #7c3aed)" />
            </motion.div>

            <motion.div
              className="absolute top-[15%] right-[8%] z-0 pointer-events-none"
              style={{ x: mousePos.x * 15, y: mousePos.y * -10 }}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <GlassOrb size={100} gradient="radial-gradient(circle at 35% 28%, #fdf4ff, #e879f9, #9333ea)" />
            </motion.div>

            {/* Sparkle shapes */}
            <motion.div
              className="absolute top-[22%] left-[8%] z-0 pointer-events-none"
              style={{ x: mousePos.x * -10, y: mousePos.y * -8 }}
              animate={{ rotate: [0, 15, 0], y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkle style={{ width: 64, height: 64 }} color1="#a78bfa" color2="#6366f1" />
            </motion.div>

            <motion.div
              className="absolute top-[30%] right-[14%] z-0 pointer-events-none"
              style={{ x: mousePos.x * 12, y: mousePos.y * 10 }}
              animate={{ rotate: [0, -20, 0], y: [0, 12, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <Sparkle style={{ width: 48, height: 48 }} color1="#67e8f9" color2="#0ea5e9" />
            </motion.div>

            <motion.div
              className="absolute bottom-[32%] left-[16%] z-0 pointer-events-none"
              style={{ x: mousePos.x * -8, y: mousePos.y * 12 }}
              animate={{ rotate: [0, 25, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
              <Sparkle style={{ width: 32, height: 32, opacity: 0.7 }} color1="#f0abfc" color2="#c026d3" />
            </motion.div>

            <motion.div
              className="absolute top-[55%] right-[20%] z-0 pointer-events-none"
              style={{ x: mousePos.x * 16, y: mousePos.y * -14 }}
              animate={{ rotate: [0, -12, 0], y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            >
              <Sparkle style={{ width: 40, height: 40, opacity: 0.75 }} color1="#bfdbfe" color2="#6366f1" />
            </motion.div>

            {/* Hero content */}
            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-white/70 text-indigo-600 text-xs font-bold tracking-[0.2em] uppercase mb-8 shadow-sm"
                >
                  AI Product Manager
                </motion.span>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.7 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9] text-slate-800 mb-4"
                >
                  JUSTINA YOO
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tight leading-snug mb-8 text-indigo-500"
                >
                  Architecting the 0→1 AI Journey.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.7 }}
                  className="max-w-xl mx-auto text-base md:text-lg text-slate-600 mb-8 leading-relaxed"
                >
                  Bridging complex AI capabilities and human-centered design.
                  Currently building 0→1 GenAI products at Panomix.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="flex flex-wrap justify-center gap-2 mb-10"
                >
                  {[
                    { value: "1M+", label: "MAU in 5 months", color: "text-indigo-500" },
                    { value: "+250%", label: "Session time", color: "text-violet-500" },
                    { value: "+10%", label: "Ad CTR", color: "text-pink-500" },
                    { value: "0→1", label: "builder", color: "text-sky-500" },
                  ].map((stat, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/70 shadow-sm text-sm text-slate-700">
                      <span className={`font-bold ${stat.color}`}>{stat.value}</span>
                      <span className="text-slate-500">{stat.label}</span>
                    </span>
                  ))}
                </motion.div>

              </motion.div>
            </div>

          </section>

          {/* ── Education ─────────────────────────────────────── */}
          <section className="py-16 relative">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
            <div className="max-w-4xl mx-auto px-6 relative z-10">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10">
                <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-2">Background</p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">Education & Background</h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {/* School cards */}
                <div className="space-y-3">
                  {[
                    {
                      school: "Carnegie Mellon University",
                      period: "2019 – 2024",
                      degree: "B.S. Decision Science",
                      sub: "Minors in HCI & Architecture",
                      accent: "border-indigo-300",
                      tag: "Pittsburgh, PA",
                      tagColor: "bg-indigo-100 text-indigo-600",
                    },
                    {
                      school: "Shanghai American School",
                      period: "2007 – 2019",
                      degree: "IB & AP Diploma",
                      sub: "International Baccalaureate + Advanced Placement",
                      accent: "border-violet-300",
                      tag: "Shanghai, China",
                      tagColor: "bg-violet-100 text-violet-600",
                    },
                  ].map((edu, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className={`rounded-2xl bg-white/40 backdrop-blur-lg border-l-4 ${edu.accent} border border-white/60 p-4 shadow-sm shadow-indigo-100/20 hover:bg-white/60 transition-all`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <p className="font-bold text-slate-800 text-sm leading-snug">{edu.school}</p>
                        <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${edu.tagColor}`}>{edu.tag}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-500 mb-0.5">{edu.degree} · {edu.period}</p>
                      <p className="text-xs text-slate-400">{edu.sub}</p>
                    </motion.div>
                  ))}

                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.25, duration: 0.6 }} className="pt-2">
                    <HorizonTracker />
                  </motion.div>
                </div>

                {/* What I bring */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.6 }}>
                  <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-4">What I bring</p>
                  <div className="space-y-3">
                    {[
                      { flag: "🇰🇷 🇨🇳 🇺🇸", label: "Global Experience", desc: "Raised across Korea, China, and the US — fluent in all three languages and comfortable navigating cross-cultural teams and markets.", color: "bg-indigo-50 border-indigo-100" },
                      { flag: "🎓", label: "Decision Science + HCI", desc: "Analytical problem-framing meets user-centered design.", color: "bg-violet-50 border-violet-100" },
                      { flag: "⚡", label: "0→1 builder", desc: "Two GenAI products from concept to production launch.", color: "bg-cyan-50 border-cyan-100" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                        className={`rounded-xl border p-4 backdrop-blur-md bg-white/40 border-white/60 shadow-sm hover:bg-white/60 transition-all`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base">{item.flag}</span>
                          <p className="text-sm font-bold text-slate-800">{item.label}</p>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── Career ────────────────────────────────────────── */}
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 md:px-6">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10">
                <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-2">Career</p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">The journey so far</h2>
              </motion.div>
              {(() => {
                const jobs = [
                  { role: "AI Product Manager", company: "Panomix", period: "2024 – Present", tag: "Current", tagColor: "bg-indigo-100 text-indigo-600", summary: "Leading 0→1 GenAI product builds — from news-chat to AI-SDK. Own the full lifecycle: roadmap, specs, launch, and iteration with Engineering & Design.", accent: "bg-indigo-400" },
                  { role: "Branding & Marketing Intern", company: "Edelman", period: "2023", tag: "Comms & Strategy", tagColor: "bg-cyan-100 text-cyan-600", summary: "Learned how global brands tell stories. Executed campaigns, wrote performance reports, and contributed to new business strategy through deep competitor research.", accent: "bg-cyan-300" },
                  { role: "Council Development Intern", company: "Gerson Lehrman Group", period: "2022", tag: "Research", tagColor: "bg-violet-100 text-violet-600", summary: "Interviewed 20+ industry experts daily to surface insights for consulting clients. Built a muscle for rapid synthesis across wildly different domains.", accent: "bg-violet-300" },
                  { role: "Product Growth Intern", company: "Tridge", period: "2021", tag: "First product role", tagColor: "bg-sky-100 text-sky-600", summary: "First taste of product work — user interviews, data organization, and localizing content across Chinese and English markets.", accent: "bg-sky-300" },
                ];
                return (
                  <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                    {/* Current role */}
                    <div className="rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 md:p-6 hover:bg-white/60 transition-all">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${jobs[0].accent}`} />
                        <span className="text-base font-bold text-slate-800">{jobs[0].role}</span>
                        <span className="text-slate-300 text-sm">·</span>
                        <span className="text-slate-500 text-sm">{jobs[0].company}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${jobs[0].tagColor}`}>{jobs[0].tag}</span>
                      </div>
                      <p className="text-xs text-slate-400 mb-2 pl-[18px]">{jobs[0].period}</p>
                      <p className="text-sm text-slate-500 leading-relaxed pl-[18px]">{jobs[0].summary}</p>
                    </div>

                    {/* Collapsed: peek + expand trigger as one unit */}
                    {!careerExpanded && (
                      <button
                        onClick={() => setCareerExpanded(true)}
                        className="w-full mt-2 relative rounded-2xl overflow-hidden border border-white/60 bg-white/40 backdrop-blur-md group hover:bg-white/55 transition-all"
                      >
                        {/* Blurred ghost row */}
                        <div className="px-6 pt-4 pb-10 blur-[2px] opacity-40 select-none pointer-events-none">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${jobs[1].accent}`} />
                            <span className="text-base font-bold text-slate-800">{jobs[1].role}</span>
                            <span className="text-slate-300 text-sm">·</span>
                            <span className="text-slate-500 text-sm">{jobs[1].company}</span>
                          </div>
                        </div>
                        {/* Fade gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/70 pointer-events-none" />
                        {/* Always-visible label */}
                        <div className="absolute bottom-0 inset-x-0 flex items-center justify-center gap-2 py-3 border-t border-white/50">
                          <span className="text-xs font-semibold text-indigo-500 group-hover:text-indigo-600 transition-colors">See previous roles</span>
                          <motion.span animate={{ y: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                            <ChevronRight className="w-3.5 h-3.5 text-indigo-500 rotate-90" />
                          </motion.span>
                        </div>
                      </button>
                    )}

                    {/* Expanded: previous roles + collapse */}
                    {careerExpanded && (
                      <div className="mt-2 space-y-2">
                        {jobs.slice(1).map((job, i) => (
                          <motion.div key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: i * 0.06 }}
                            className="rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 md:p-6 hover:bg-white/60 transition-all">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${job.accent}`} />
                              <span className="text-base font-bold text-slate-800">{job.role}</span>
                              <span className="text-slate-300 text-sm">·</span>
                              <span className="text-slate-500 text-sm">{job.company}</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${job.tagColor}`}>{job.tag}</span>
                            </div>
                            <p className="text-xs text-slate-400 mb-2 pl-[18px]">{job.period}</p>
                            <p className="text-sm text-slate-500 leading-relaxed pl-[18px]">{job.summary}</p>
                          </motion.div>
                        ))}
                        <button
                          onClick={() => setCareerExpanded(false)}
                          className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-400 hover:text-indigo-500 transition-colors"
                        >
                          Show less <ChevronRight className="w-3.5 h-3.5 rotate-[270deg]" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })()}
            </div>
          </section>

          {/* ── Featured Projects ──────────────────────────────────── */}
          <section id="featured-work" className="py-20">
            <div className="max-w-4xl mx-auto px-4 md:px-6">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-6">Featured Projects</p>
              </motion.div>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onClick={() => setPage('newschat')}
                  className="group rounded-2xl bg-white/40 backdrop-blur-lg border border-white/60 p-5 md:p-8 shadow-sm hover:bg-white/65 hover:shadow-xl hover:shadow-indigo-100/40 transition-all cursor-pointer"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="inline-flex items-center bg-slate-800 rounded-lg px-3 py-1.5">
                      <img src="https://panomix.io/images/products/Newschat%20logo.svg" alt="NewsChat" className="h-5 object-contain" />
                    </div>
                    <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600">Featured Project</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-slate-700 mb-2">Scaling & Monetizing Generative AI</h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-3">Built the product architecture for a GenAI-powered news chat experience — from 0 to 1M MAU. Designed a contextual ad strategy that layered monetization without degrading the AI conversation, driving a +10% CTR lift and +250% session depth increase.</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {["0→1 Product", "1M MAU", "Contextual Ads", "GenAI", "Monetization"].map(t => (
                      <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-500 border border-indigo-100">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-indigo-500 group-hover:gap-3 transition-all">
                    Read case study <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onClick={() => setPage('aeko')}
                  className="group rounded-2xl bg-white/40 backdrop-blur-lg border border-white/60 p-5 md:p-8 shadow-sm hover:bg-white/65 hover:shadow-xl hover:shadow-violet-100/40 transition-all cursor-pointer"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="inline-flex items-center bg-white rounded-lg px-3 py-1.5 border border-slate-100">
                      <img src="https://aeko-intelligence.com/logo.svg" alt="AEKO" className="h-8 object-contain" />
                    </div>
                    <span className="inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-600">Featured Project</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-slate-700 mb-2">AI Visibility for Cross-Border E-commerce</h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-3">Defining the product strategy for an Answer Engine Optimization SaaS targeting cross-border e-commerce brands. Translating AI search behavior into actionable visibility tools — currently in MVP testing with MCP integration underway.</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {["AEO SaaS", "MVP", "MCP Integration", "E-commerce", "Pre-launch"].map(t => (
                      <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-50 text-violet-500 border border-violet-100">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-violet-500 group-hover:gap-3 transition-all">
                    Read case study <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onClick={() => setPage('attn')}
                  className="group rounded-2xl bg-white/40 backdrop-blur-lg border border-white/60 p-5 md:p-8 shadow-sm hover:bg-white/65 hover:shadow-xl hover:shadow-sky-100/40 transition-all cursor-pointer"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="inline-flex items-center bg-white rounded-lg px-3 py-1.5 border border-slate-100">
                      <img src="https://attn.today/icons/attn_logo.svg" alt="ATTN" className="h-4 object-contain" />
                    </div>
                    <span className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-600">Featured Project</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-slate-700 mb-2">Korea's #1 US Market Intelligence Platform</h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-3">Built an AI-native pipeline that aggregates SEC filings, US government signals, and breaking market news — translated into Korean at trading speed. Closing the information gap that had left Korean retail investors structurally behind in US equities.</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {["Multi-Model AI", "Financial Media", "MCP Server", "Korea", "Launched"].map(t => (
                      <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-500 border border-sky-100">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-sky-500 group-hover:gap-3 transition-all">
                    Read case study <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── Side Projects ─────────────────────────────────── */}
          <section id="side-projects" className="py-16 relative">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
            <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10">
                <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-2">Side Projects</p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">Building on the side</h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl bg-white/30 backdrop-blur border border-white/50 border-dashed p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[140px]"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100/60 flex items-center justify-center">
                  <span className="text-indigo-400 text-sm">✦</span>
                </div>
                <p className="text-xs font-semibold tracking-widest uppercase text-slate-400">Coming Soon</p>
              </motion.div>
            </div>
          </section>

          <footer className="py-12 border-t border-white/40 bg-white/20 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <div className="text-xs text-slate-400 tracking-widest uppercase">© 2026 Justina Yoo</div>
            </div>
          </footer>

        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
