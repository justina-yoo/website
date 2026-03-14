/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Mail, ChevronDown } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
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
          {/* Background Elements */}
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
                AI Product Manager
              </span>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.9]">
                Justina Yoo<span className="text-emerald-500">.</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 mb-12 leading-relaxed">
                I am an AI Product Manager dedicated to crafting intuitive experiences 
                powered by cutting-edge machine learning. Bridging the gap between 
                complex AI research and human-centric products, I thrive in the 
                ambiguity of emerging technologies.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-6 h-6 text-white/20 animate-bounce" />
          </motion.div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-32 border-t border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-2xl md:text-3xl font-light tracking-widest text-white/20 uppercase">
                Coming Soon!
              </h2>
              <div className="mt-8 flex justify-center">
                <div className="w-12 h-px bg-emerald-500/30" />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Simplified Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-xs text-white/20 tracking-widest uppercase">
            © 2026 Justina Yoo
          </div>
        </div>
      </footer>
    </div>
  );
}
