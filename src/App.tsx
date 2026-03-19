/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ChevronDown, ArrowLeft, TrendingUp, Users, MousePointerClick, Clock, MessageSquare, Newspaper, Target, Lightbulb, BarChart3, ChevronRight, Globe, Search, Zap, Eye } from 'lucide-react';

const locations = [
  { city: "Shanghai", country: "China", flag: "🇨🇳", color: "#e63946" },
  { city: "Pennsylvania", country: "United States", flag: "🇺🇸", color: "#4361ee" },
  { city: "Seoul", country: "South Korea", flag: "🇰🇷", color: "#2d6a4f" },
];

// ─── Case Study Page ──────────────────────────────────────────────────────────

function NewsChatCaseStudy({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const metrics = [
    { icon: Users, value: "1M", label: "MAU in 5 months", color: "text-emerald-500" },
    { icon: Clock, value: "250%", label: "Increase in dwell time", color: "text-blue-500" },
    { icon: MousePointerClick, value: "10%", label: "Contextual ad CTR", color: "text-violet-500" },
    { icon: Newspaper, value: "100M+", label: "Article views accumulated", color: "text-amber-500" },
  ];

  const timeline = [
    {
      phase: "01 — Discovery",
      title: "Why are readers bouncing?",
      content: "Partnered with a South Korean digital news publisher facing a 40% YoY drop in session duration. Ran user interviews, session replay analysis, and heatmapping across 3M monthly sessions. The core insight: readers wanted to go deeper on a topic but had no path forward — they'd read the headline, skim the article, and leave.",
      tags: ["User Interviews", "Session Analytics", "Heatmapping", "Stakeholder Alignment"],
    },
    {
      phase: "02 — Problem Framing",
      title: "Passive consumption is a dead end",
      content: "Defined the core problem: news content was broadcast-only. Readers had questions the article didn't answer, but no way to ask them. This created a gap between reader intent and publisher experience — and left monetization value on the table. Framed the opportunity as: can we make news a conversation?",
      tags: ["Jobs-to-be-Done", "Opportunity Sizing", "Problem Statement"],
    },
    {
      phase: "03 — Solution Design",
      title: "NewsChat: Ask anything about the story",
      content: "Designed a contextual conversational layer embedded directly in news articles. Readers can ask follow-up questions, get source summaries, explore related topics, and request simplified explanations — all grounded in the article and vetted source material via RAG pipelines. Worked closely with ML and infra teams to define retrieval quality, latency budgets (<800ms), and hallucination guardrails.",
      tags: ["GenAI / LLM", "RAG Architecture", "UX Design", "Latency Optimization"],
    },
    {
      phase: "04 — Monetization Strategy",
      title: "Contextual ads that feel native",
      content: "Designed a contextual ad injection system that reads the semantic thread of each conversation turn and surfaces relevant sponsored content at natural breakpoints — never mid-sentence, never intrusive. Ads are tagged to conversation intent, not page keywords, achieving 10x industry-average CTR. Modeled a CPM uplift of 3.2x over standard display inventory.",
      tags: ["Ad Strategy", "Intent Targeting", "Revenue Modeling", "A/B Testing"],
    },
    {
      phase: "05 — Launch & Scale",
      title: "0 → 1M MAU in 5 months",
      content: "Ran a soft launch with 3 publisher partners, iterating on response quality, UI placement, and chat trigger UX based on real engagement data. After hitting PMF signals (>30% of readers who saw the chat prompt engaged with it), scaled to additional publishers. Hit 1M MAU 5 months post-launch with zero paid acquisition — entirely through publisher distribution.",
      tags: ["Go-to-Market", "PMF Signals", "Publisher Partnerships", "Growth"],
    },
  ];

  const learnings = [
    {
      icon: Lightbulb,
      title: "Trust is the foundation of AI products",
      body: "Hallucination wasn't just a technical problem — it was a product trust problem. We invested heavily in source attribution UI and escalation flows (\"I'm not sure — read the original article\") before we got engagement to lift. Users forgave slow answers; they didn't forgive wrong ones.",
    },
    {
      icon: Target,
      title: "Monetization must be designed in, not bolted on",
      body: "Starting with a clear monetization hypothesis from day one shaped every product decision — from data schemas to conversation UX. Teams that treat ads as a later problem ship products that are fundamentally incompatible with their business model.",
    },
    {
      icon: BarChart3,
      title: "Dwell time is a vanity metric without attribution",
      body: "Dwell time went up 250% — but the real win was that pages-per-session and return visit rate moved too. We learned to look for correlated behavior clusters, not single metrics, as signals of genuine engagement improvement.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="text-xl font-bold tracking-tighter">
            JUSTINA<span className="text-emerald-500">.</span>YOO
          </div>
          <a
            href="mailto:justina.yoo@gmail.com"
            className="px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-2"
          >
            Contact <Mail className="w-4 h-4" />
          </a>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-28 overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px]" />
          </div>
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 text-xs font-semibold tracking-widest uppercase">
                  Case Study
                </span>
                <span className="px-3 py-1 rounded-full border border-slate-200 text-slate-500 text-xs font-semibold tracking-widest uppercase">
                  GenAI · Media · Monetization
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
                NewsChat<span className="text-emerald-500">.</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 font-light max-w-2xl leading-relaxed mb-10">
                Turning passive news consumption into interactive conversation — and monetizing the engagement gap.
              </p>
              <div className="flex flex-wrap gap-6 text-sm text-slate-500">
                <div><span className="font-semibold text-slate-800">Role</span> · Lead PM, 0→1</div>
                <div><span className="font-semibold text-slate-800">Team</span> · ML, Infra, Design, Partnerships</div>
                <div><span className="font-semibold text-slate-800">Market</span> · Digital News Publishers</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Metrics */}
        <section className="py-20 bg-slate-50 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-10">Impact at a glance</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <m.icon className={`w-5 h-5 mb-4 ${m.color}`} />
                    <div className={`text-4xl font-bold tracking-tight mb-1 ${m.color}`}>{m.value}</div>
                    <div className="text-sm text-slate-500 leading-snug">{m.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Context */}
        <section className="py-20 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">The Context</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
                  News media is an engagement crisis dressed as a content problem.
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Publishers invested in AI-powered content generation — and saw article output double. But session duration kept falling. More content didn't mean more engagement. The real problem was structural: readers had no reason to stay.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                {[
                  { label: "Average article read time", before: "48 sec", issue: true },
                  { label: "Reader return rate (7-day)", before: "12%", issue: true },
                  { label: "Ad CPM (display)", before: "$1.20", issue: true },
                  { label: "AI content investment ROI", before: "Unmeasured", issue: true },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-sm text-slate-600">{row.label}</span>
                    <span className="text-sm font-semibold text-red-400">{row.before}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-24 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">Process</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How we built it</h2>
            </motion.div>
            <div className="space-y-6">
              {timeline.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group rounded-2xl border border-slate-200 bg-white p-8 hover:border-emerald-500/30 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase text-emerald-500 mb-1">{step.phase}</p>
                      <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors mt-1 shrink-0" />
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-5">{step.content}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag, j) => (
                      <span key={j} className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How NewsChat Works */}
        <section className="py-24 bg-slate-950 text-white border-b border-slate-800">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-4">Product</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">NewsChat in action</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: MessageSquare,
                  title: "Ask anything",
                  body: "Readers ask follow-up questions mid-article. NewsChat responds with context drawn from the story, related reporting, and verified source material — grounded via RAG.",
                },
                {
                  icon: Newspaper,
                  title: "Deeper context, instantly",
                  body: "\"Who is this person?\" \"What happened last week?\" — background questions are answered in-line without leaving the page. Session depth increases, bounce rate drops.",
                },
                {
                  icon: TrendingUp,
                  title: "Monetize the conversation",
                  body: "Sponsored content surfaces contextually at natural breakpoints in the conversation thread — matched to semantic intent, not page keywords. 10% CTR vs. 0.1% industry average.",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-7 hover:border-emerald-500/30 transition-colors"
                >
                  <card.icon className="w-6 h-6 text-emerald-400 mb-5" />
                  <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{card.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Learnings */}
        <section className="py-24 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">Reflections</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What I learned</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {learnings.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-2xl border border-slate-200 bg-white p-7 hover:shadow-md transition-shadow"
                >
                  <item.icon className="w-5 h-5 text-emerald-500 mb-5" />
                  <h3 className="text-base font-bold mb-3 leading-snug">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Want to talk through this?
              </h2>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">I'm always happy to go deeper on product strategy, AI monetization, or 0→1 builds.</p>
              <a
                href="mailto:justina.yoo@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-500 text-white text-sm font-semibold rounded-full hover:bg-emerald-600 transition-colors"
              >
                Get in touch <Mail className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-xs text-slate-500 tracking-widest uppercase">© 2026 Justina Yoo</div>
        </div>
      </footer>
    </div>
  );
}

// ─── AEKO Case Study ─────────────────────────────────────────────────────────

function AekoCaseStudy({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const timeline = [
    {
      phase: "01 — Discovery",
      title: "The SEO playbook doesn't work for AI search",
      content: "Interviewed cross-border e-commerce sellers who noticed their AI-era traffic was unpredictable and unattributable. The core finding: sellers had zero visibility into how ChatGPT, Claude, and Perplexity were recommending (or not recommending) their products. The same brand got completely different AI treatment depending on the market and language — and nobody knew why.",
      tags: ["User Interviews", "Market Research", "Competitive Analysis", "Opportunity Sizing"],
    },
    {
      phase: "02 — Problem Framing",
      title: "Brands are flying blind in AI-driven search",
      content: "Defined the core problem: AI engines have taken over top-of-funnel discovery for millions of shoppers, but there are no analytics tools built for it. Search Console exists for traditional SEO. There is no equivalent for AEO — Answer Engine Optimization. This gap is sharpest for cross-border sellers, where language and market context dramatically change AI outputs.",
      tags: ["Jobs-to-be-Done", "Problem Statement", "TAM Sizing", "AEO Category Definition"],
    },
    {
      phase: "03 — Product Strategy",
      title: "Monitor first, optimize second",
      content: "Made the key strategic call to lead with monitoring — not optimization recommendations. Sellers need to see the problem before they'll invest in fixing it. Designed AEKO's core activation loop: connect domain → define tracked prompts → see your AI Visibility Score → receive optimization guidance. This sequencing is our hypothesis for driving both activation and paid conversion.",
      tags: ["Product Strategy", "Activation Design", "Pricing Architecture", "Freemium Model"],
    },
    {
      phase: "04 — MVP Build",
      title: "Real-time AI visibility across multiple engines and markets",
      content: "Built an MVP that polls ChatGPT, Claude, and Perplexity with real buyer prompts, segmented by market and language (US, UK, JP, KR). Introduced the AI Visibility Score — a composite of mentions, citations, and share of voice — as the north star metric. Also scoped AEKO Agents (MCP integration) to let power users run optimization tools directly in Claude Desktop and Cursor without leaving their workflow.",
      tags: ["GenAI", "MCP Integration", "Multi-Region Data", "Visibility Score Metric"],
    },
    {
      phase: "05 — What's Next",
      title: "Testing the MVP with early users",
      content: "Currently running closed MVP testing with a small cohort of cross-border sellers. Focused on validating three things: do sellers understand their score, does seeing the score motivate action, and does the optimization guidance produce measurable AI visibility changes. Results pending — watching closely.",
      tags: ["MVP Testing", "User Validation", "Activation Metrics", "Iteration"],
    },
  ];

  const bets = [
    {
      icon: Lightbulb,
      title: "The aha moment has to be immediate",
      body: "Our hypothesis: sellers need to see their AI Visibility Score within minutes of signing up — before we ask for any commitment. Showing a brand they have zero mentions while a competitor ranks in every query should be the conversion event. We're testing whether the score alone creates urgency.",
    },
    {
      icon: Zap,
      title: "MCP will be the highest-retention surface",
      body: "We're betting that the AEKO Agents integration — running optimization in Claude Desktop and Cursor — will anchor power users more than the dashboard alone. When the tool lives inside an existing workflow, churn friction drops. This is our top hypothesis to validate post-MVP.",
    },
    {
      icon: Globe,
      title: "Cross-market parity is the real differentiator",
      body: "Every comparable tool tracks one market. Our bet is that showing a Korean brand how they appear in US ChatGPT versus Japanese Perplexity in the same view is the feature that justifies premium pricing and enterprise conversations. Multi-region is the moat we're building toward.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="text-xl font-bold tracking-tighter">
            JUSTINA<span className="text-emerald-500">.</span>YOO
          </div>
          <a
            href="mailto:justina.yoo@gmail.com"
            className="px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-2"
          >
            Contact <Mail className="w-4 h-4" />
          </a>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-28 overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[140px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
          </div>
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-600 text-xs font-semibold tracking-widest uppercase">
                  Case Study
                </span>
                <span className="px-3 py-1 rounded-full border border-amber-300/40 bg-amber-50 text-amber-600 text-xs font-semibold tracking-widest uppercase">
                  MVP in Testing
                </span>
                <span className="px-3 py-1 rounded-full border border-slate-200 text-slate-500 text-xs font-semibold tracking-widest uppercase">
                  AEO · SaaS · Cross-Border E-commerce
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
                AEKO<span className="text-violet-500">.</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 font-light max-w-2xl leading-relaxed mb-10">
                Building the analytics layer for the AI search era — so brands stop flying blind when AI engines recommend their competitors.
              </p>
              <div className="flex flex-wrap gap-6 text-sm text-slate-500">
                <div><span className="font-semibold text-slate-800">Role</span> · Product Strategy & 0→1 Build</div>
                <div><span className="font-semibold text-slate-800">Stage</span> · Closed MVP Testing</div>
                <div><span className="font-semibold text-slate-800">Market</span> · Cross-Border E-commerce</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Context */}
        <section className="py-20 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">The Shift</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
                  AI engines are the new search bar. Nobody built analytics for them.
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  A growing share of product discovery now happens through conversational AI — not traditional search. Brands spent years optimizing for keywords, backlinks, and page speed. None of that moves the needle when a shopper asks ChatGPT "best Korean skincare for dry skin." AEKO was built to close that data gap.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-3"
              >
                {[
                  { engine: "ChatGPT", icon: "💬", note: "Top discovery for product recs" },
                  { engine: "Perplexity", icon: "🔍", note: "High purchase-intent queries" },
                  { engine: "Claude", icon: "◆", note: "Trusted for B2B research" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{row.icon}</span>
                      <span className="text-sm font-semibold text-slate-800">{row.engine}</span>
                    </div>
                    <span className="text-xs text-slate-500">{row.note}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">Process</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How we got here</h2>
            </motion.div>
            <div className="space-y-6">
              {timeline.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group rounded-2xl border border-slate-200 bg-white p-8 hover:border-violet-500/30 hover:shadow-md transition-all"
                >
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
                      <span key={j} className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How AEKO works */}
        <section className="py-24 bg-slate-950 text-white border-b border-slate-800">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4">Product</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">AEKO's three-layer system</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Eye,
                  title: "Monitor",
                  body: "Track your AI Visibility Score across ChatGPT, Claude, and Perplexity. See exactly how — and whether — each AI engine recommends your products, segmented by market and language.",
                },
                {
                  icon: Search,
                  title: "Understand",
                  body: "Prompt Research Library surfaces real buyer queries by region and category. Competitive share-of-voice tracking shows how you rank against alternatives in each AI's outputs.",
                },
                {
                  icon: Zap,
                  title: "Optimize",
                  body: "AEKO Agents (MCP) runs optimization tools — llms.txt, JSON-LD, product schema, page content — directly in Claude Desktop or Cursor. Natural language interface, no context switching.",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-7 hover:border-violet-500/30 transition-colors"
                >
                  <card.icon className="w-6 h-6 text-violet-400 mb-5" />
                  <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{card.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Bets */}
        <section className="py-24 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">Current Thinking</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">The bets we're testing</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {bets.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-2xl border border-slate-200 bg-white p-7 hover:shadow-md transition-shadow"
                >
                  <item.icon className="w-5 h-5 text-violet-500 mb-5" />
                  <h3 className="text-base font-bold mb-3 leading-snug">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Want to talk through this?</h2>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">Happy to go deeper on AEO strategy, the MVP testing approach, or what we're learning from early users.</p>
              <a
                href="mailto:justina.yoo@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-violet-500 text-white text-sm font-semibold rounded-full hover:bg-violet-600 transition-colors"
              >
                Get in touch <Mail className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-xs text-slate-500 tracking-widest uppercase">© 2026 Justina Yoo</div>
        </div>
      </footer>
    </div>
  );
}

// ─── Main Portfolio ───────────────────────────────────────────────────────────

const PASSWORD = 'justina';

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [sitePassword, setSitePassword] = useState('');
  const [sitePasswordError, setSitePasswordError] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(0);
  const [page, setPage] = useState<'home' | 'newschat' | 'aeko'>('home');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocation((prev) => (prev + 1) % locations.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  function submitSitePassword(e: React.FormEvent) {
    e.preventDefault();
    if (sitePassword === PASSWORD) {
      setUnlocked(true);
    } else {
      setSitePasswordError(true);
      setSitePassword('');
    }
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm text-center"
        >
          <div className="text-2xl font-bold tracking-tighter mb-1">
            JUSTINA<span className="text-emerald-500">.</span>YOO
          </div>
          <p className="text-sm text-slate-400 mb-10">This portfolio is password protected.</p>

          <form onSubmit={submitSitePassword} className="space-y-3">
            <input
              type="password"
              value={sitePassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSitePassword(e.target.value); setSitePasswordError(false); }}
              placeholder="Enter password"
              autoFocus
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors text-center tracking-widest ${
                sitePasswordError
                  ? 'border-red-300 bg-red-50 placeholder-red-300 focus:border-red-400'
                  : 'border-slate-200 focus:border-slate-400'
              }`}
            />
            {sitePasswordError && (
              <p className="text-xs text-red-500">Incorrect password. Try again.</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-700 transition-colors"
            >
              Enter
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {page === 'newschat' ? (
        <motion.div key="newschat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          <NewsChatCaseStudy onBack={() => setPage('home')} />
        </motion.div>
      ) : page === 'aeko' ? (
        <motion.div key="aeko" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          <AekoCaseStudy onBack={() => setPage('home')} />
        </motion.div>
      ) : (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-500/30"
        >
          {/* Navigation */}
          <nav className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white/70 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold tracking-tighter"
              >
                JUSTINA<span className="text-emerald-500">.</span>YOO
              </motion.div>
              <div className="flex items-center">
                <a
                  href="mailto:justina.yoo@gmail.com"
                  className="px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-2"
                >
                  Contact <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </nav>

          <main>
            {/* Hero / About Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
              </div>

              <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="inline-block px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-6">
                    🤖 AI Product Manager
                  </span>
                  <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.9]">
                    Justina Yoo<span className="text-emerald-500">.</span>
                  </h1>
                  <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                    I am an AI Product Manager dedicated to crafting intuitive experiences
                    powered by cutting-edge machine learning. Bridging the gap between
                    complex AI research and human-centric products, I thrive in the
                    ambiguity of emerging technologies.
                  </p>

                  {/* Animated location ticker */}
                  <div className="flex items-center justify-center gap-3 mb-12">
                    <span className="text-sm text-slate-400 tracking-widest uppercase font-medium">Lived in</span>
                    <div className="relative h-9 w-56 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentLocation}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="absolute inset-0 flex items-center gap-2"
                        >
                          <span className="text-2xl leading-none">{locations[currentLocation].flag}</span>
                          <div className="text-left">
                            <span className="text-sm font-bold text-slate-800 block leading-tight">
                              {locations[currentLocation].city}
                            </span>
                            <span className="text-xs text-slate-400 leading-tight">
                              {locations[currentLocation].country}
                            </span>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <div className="flex gap-1.5">
                      {locations.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentLocation(i)}
                          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                          style={{ backgroundColor: i === currentLocation ? locations[i].color : '#cbd5e1' }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
              >
                <ChevronDown className="w-6 h-6 text-slate-400/70 animate-bounce" />
              </motion.div>
            </section>

            {/* Featured Card */}
            <section className="py-20 bg-slate-50">
              <div className="max-w-4xl mx-auto px-6">
                <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-6">Case Studies</p>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setPage('newschat')}
                  className="group rounded-2xl border border-slate-200 bg-white shadow-sm p-8 hover:shadow-lg hover:border-emerald-500/30 transition-all cursor-pointer"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      NewsChat: <span className="text-emerald-500">Scaling & Monetizing Generative AI</span>
                    </h2>
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Case Study
                    </span>
                  </div>
                  <p className="text-slate-500 mb-5">
                    0→1 Product Architecture · 1M MAU · Contextual Ad Strategy
                  </p>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 group-hover:gap-3 transition-all">
                    Read case study <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setPage('aeko')}
                  className="group rounded-2xl border border-slate-200 bg-white shadow-sm p-8 hover:shadow-lg hover:border-violet-500/30 transition-all cursor-pointer mt-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      AEKO: <span className="text-violet-500">AI Visibility for Cross-Border E-commerce</span>
                    </h2>
                    <span className="inline-flex items-center rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-700">
                      Case Study
                    </span>
                  </div>
                  <p className="text-slate-500 mb-5">
                    AEO SaaS · 693% AI Visit Growth · $90M+ Pipeline · MCP Integration
                  </p>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-violet-600 group-hover:gap-3 transition-all">
                    Read case study <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Impact Numbers */}
            <section className="py-24 border-t border-slate-200 bg-slate-950 text-white">
              <div className="max-w-4xl mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-14"
                >
                  <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-3">By the numbers</p>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What I've shipped</h2>
                </motion.div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-800 rounded-2xl overflow-hidden">
                  {[
                    { value: "1M+", label: "MAU", sub: "in 5 months" },
                    { value: "+250%", label: "Session time", sub: "AI-driven UX" },
                    { value: "+10%", label: "Ad CTR", sub: "contextual integration" },
                    { value: "20+", label: "Experts interviewed", sub: "daily at GLG" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="bg-slate-900 p-8"
                    >
                      <div className="text-4xl font-bold text-emerald-400 tracking-tight mb-1">{stat.value}</div>
                      <div className="text-sm font-semibold text-white mb-0.5">{stat.label}</div>
                      <div className="text-xs text-slate-500">{stat.sub}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Career journey */}
            <section className="py-24 border-t border-slate-100">
              <div className="max-w-4xl mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-14"
                >
                  <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-3">Career</p>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">The journey so far</h2>
                </motion.div>
                <div className="relative">
                  {/* vertical line */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200 hidden md:block" />
                  <div className="space-y-10">
                    {[
                      {
                        role: "AI Product Manager",
                        company: "Panomix",
                        period: "2024 – Present",
                        tag: "Current",
                        tagColor: "bg-emerald-500/10 text-emerald-700",
                        summary: "Leading 0→1 GenAI product builds — from news-chat to AI-SDK. Own the full lifecycle: roadmap, specs, launch, and iteration with Engineering & Design.",
                        accent: "bg-emerald-500",
                      },
                      {
                        role: "Branding & Marketing Intern",
                        company: "Edelman",
                        period: "2023",
                        tag: "Comms & Strategy",
                        tagColor: "bg-blue-500/10 text-blue-700",
                        summary: "Learned how global brands tell stories. Executed campaigns, wrote performance reports, and contributed to new business strategy through deep competitor research.",
                        accent: "bg-blue-400",
                      },
                      {
                        role: "Council Development Intern",
                        company: "Gerson Lehrman Group",
                        period: "2022",
                        tag: "Research",
                        tagColor: "bg-violet-500/10 text-violet-700",
                        summary: "Interviewed 20+ industry experts daily to surface insights for consulting clients. Built a muscle for rapid synthesis across wildly different domains.",
                        accent: "bg-violet-400",
                      },
                      {
                        role: "Product Growth Intern",
                        company: "Tridge",
                        period: "2021",
                        tag: "First product role",
                        tagColor: "bg-amber-500/10 text-amber-700",
                        summary: "First taste of product work — user interviews, data organization, and localizing content across Chinese and English markets.",
                        accent: "bg-amber-400",
                      },
                    ].map((job, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.5 }}
                        className="md:pl-8 relative"
                      >
                        <span className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full hidden md:block ${job.accent}`} />
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-base font-bold text-slate-900">{job.role}</span>
                          <span className="text-slate-400 text-sm">·</span>
                          <span className="text-slate-500 text-sm">{job.company}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${job.tagColor}`}>{job.tag}</span>
                        </div>
                        <p className="text-xs text-slate-400 mb-2">{job.period}</p>
                        <p className="text-sm text-slate-600 leading-relaxed max-w-xl">{job.summary}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Education + DNA */}
            <section className="py-24 border-t border-slate-200 bg-slate-50">
              <div className="max-w-4xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16">
                  {/* Education */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-8">Education</p>
                    <div className="space-y-8">
                      <div>
                        <p className="font-bold text-slate-900 mb-1">Carnegie Mellon University</p>
                        <p className="text-sm text-slate-500 mb-1">B.S. Decision Science · 2019–2024</p>
                        <p className="text-sm text-slate-400">Minors in Human-Computer Interaction & Architecture — an intentional mix of data, people, and form.</p>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 mb-1">Shanghai American School</p>
                        <p className="text-sm text-slate-500 mb-1">IB & AP Diploma · 2007–2019</p>
                        <p className="text-sm text-slate-400">Twelve years in Shanghai — where thinking globally became second nature.</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* What makes me different */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                  >
                    <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-8">What I bring</p>
                    <div className="space-y-5">
                      {[
                        { flag: "🇰🇷 🇨🇳 🇺🇸", label: "Trilingual", desc: "Native English, Korean, and Chinese — I think, write, and build across markets." },
                        { flag: "🎓", label: "Decision Science + HCI", desc: "Trained to frame ambiguous problems with data and design them for humans." },
                        { flag: "⚡", label: "0→1 builder", desc: "Taken two GenAI products from blank doc to live users inside a startup." },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                          <span className="text-xl mt-0.5">{item.flag}</span>
                          <div>
                            <p className="text-sm font-semibold text-slate-800 mb-0.5">{item.label}</p>
                            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Coming Soon Section */}
            <section className="py-32 border-t border-slate-200 bg-slate-50">
              <div className="max-w-7xl mx-auto px-6 text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                >
                  <h2 className="text-2xl md:text-3xl font-light tracking-widest text-slate-500 uppercase">
                    Coming Soon!
                  </h2>
                  <div className="mt-8 flex justify-center">
                    <div className="w-12 h-px bg-emerald-500/30" />
                  </div>
                </motion.div>
              </div>
            </section>
          </main>

          <footer className="py-12 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <div className="text-xs text-slate-500 tracking-widest uppercase">© 2026 Justina Yoo</div>
            </div>
          </footer>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
