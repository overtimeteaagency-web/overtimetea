import React, { useState, useRef } from 'react';
import { SEO } from '@/components/SEO';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'wouter';
import { useContent } from '@/context/ContentContext';

/* ── Step data ─────────────────────────────────────────── */
const steps = [
  {
    num: '01',
    name: 'Steep',
    verb: 'Understand.',
    color: '#4B3124',
    light: '#7a5c46',
    tagline: 'We listen before we create.',
    desc: 'Every great brand conversation starts with deep listening. Before a single post is written or pixel is placed, we immerse ourselves completely in your world — your voice, your audience, your story.',
    deliverables: ['Brand Discovery Session', 'Audience Research', 'Competitor Deep-Dive', 'Content Audit', 'Platform Analysis'],
    insight: '"Most agencies start with what to post. We start with who you are."',
    visual: 'steep',
  },
  {
    num: '02',
    name: 'Brew',
    verb: 'Strategise.',
    color: '#5E6B52',
    light: '#8a9e7a',
    tagline: "Strategy that's built to last.",
    desc: 'This is where the formula comes together. We build the full creative and strategic blueprint — content pillars, brand voice, platform strategy, and a content calendar that never feels like a calendar.',
    deliverables: ['Content Strategy Document', 'Brand Voice Guide', 'Platform Playbook', 'Content Pillars', 'Editorial Calendar Framework'],
    insight: '"Your content strategy should feel like a conversation, not a broadcast schedule."',
    visual: 'brew',
  },
  {
    num: '03',
    name: 'Pour',
    verb: 'Create.',
    color: '#B88A44',
    light: '#d4a85c',
    tagline: 'Creation with intention.',
    desc: "Here's where overtime truly begins. Every post, reel, caption, and asset is crafted with the care of a master — because content that looks rushed is content that gets scrolled past.",
    deliverables: ['Reels Production', 'Graphic Design', 'Copywriting & Captions', 'Story Templates', 'Brand Asset Creation'],
    insight: '"The 3 seconds before someone scrolls past your post is worth more than the next 30 minutes of your feed."',
    visual: 'pour',
  },
  {
    num: '04',
    name: 'Stir',
    verb: 'Engage.',
    color: '#2C4A6B',
    light: '#4a7aab',
    tagline: 'Engagement that builds community.',
    desc: "We don't just post and ghost. Every DM answered, every comment replied to, every conversation sparked — this is where audiences become communities and followers become advocates.",
    deliverables: ['Daily Community Management', 'DM Strategy', 'Comment Engagement', 'Collaboration Outreach', 'Audience Nurturing'],
    insight: '"The most powerful social media strategy is simply giving a damn about your community."',
    visual: 'stir',
  },
  {
    num: '05',
    name: 'Serve',
    verb: 'Deliver.',
    color: '#8B5E3C',
    light: '#b88a6a',
    tagline: 'Results you can actually measure.',
    desc: "Everything is tracked, reported, and refined. We present real numbers with honest analysis every month — what worked, what we're pushing further, and what we're brewing next.",
    deliverables: ['Monthly Analytics Report', 'Growth Dashboard', 'Strategy Refinement', 'A/B Test Insights', 'Quarterly Review Call'],
    insight: '"Metrics without context are just vanity. We report results with the story behind them."',
    visual: 'serve',
  },
];

/* ── Visual components per step ────────────────────────── */
const SteepVisual = ({ color }: { color: string }) => (
  <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
    {[1, 2, 3, 4].map((r) => (
      <motion.div
        key={r}
        className="absolute rounded-full border"
        style={{ borderColor: `${color}40`, width: r * 80, height: r * 80 }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0.6] }}
        transition={{ repeat: Infinity, duration: 3 + r * 0.5, ease: 'easeInOut', delay: r * 0.3 }}
      />
    ))}
    <motion.div
      className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center"
      style={{ background: color }}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
    >
      <span className="text-white font-serif text-lg italic font-light">listen</span>
    </motion.div>
    {/* Floating dots */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: color,
          left: `${20 + Math.random() * 60}%`,
          top: `${20 + Math.random() * 60}%`,
        }}
        animate={{ y: [0, -12, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 + Math.random() * 2, delay: i * 0.3 }}
      />
    ))}
  </div>
);

const BrewVisual = ({ color }: { color: string }) => {
  const pillars = ['Voice', 'Audience', 'Platform', 'Goals', 'Content'];
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="w-full max-w-xs space-y-3">
        {pillars.map((p, i) => (
          <motion.div
            key={p}
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <span className="text-xs font-mono w-16 shrink-0" style={{ color: `${color}aa` }}>{`0${i + 1}`}</span>
            <div className="flex-1 h-10 rounded-full overflow-hidden" style={{ background: `${color}20` }}>
              <motion.div
                className="h-full rounded-full flex items-center px-4"
                style={{ background: color }}
                animate={{ width: [`${40 + i * 10}%`, `${60 + i * 8}%`, `${40 + i * 10}%`] }}
                transition={{ repeat: Infinity, duration: 3 + i * 0.4, ease: 'easeInOut' }}
              >
                <span className="text-white text-xs font-medium whitespace-nowrap">{p}</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const PourVisual = ({ color }: { color: string }) => {
  const formats = ['Reel', 'Story', 'Post', 'Collab', 'Caption', 'Asset'];
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
        {formats.map((f, i) => (
          <motion.div
            key={f}
            className="aspect-square rounded-2xl flex items-center justify-center text-xs font-bold text-white"
            style={{ background: color }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: 'spring', bounce: 0.4 }}
            whileHover={{ scale: 1.1, rotate: 3 }}
            animate={{
              y: [0, i % 2 === 0 ? -6 : 6, 0],
            }}
          >
            {f}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const StirVisual = ({ color }: { color: string }) => (
  <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
    <motion.div
      className="w-48 h-48 rounded-full border-2 border-dashed absolute"
      style={{ borderColor: `${color}60` }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
    />
    <motion.div
      className="w-32 h-32 rounded-full border absolute"
      style={{ borderColor: color }}
      animate={{ rotate: -360 }}
      transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
    />
    {['DM', 'Reply', 'Like', 'Share', 'Tag', 'Story'].map((label, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 90;
      return (
        <motion.div
          key={label}
          className="absolute text-[10px] font-bold px-2 py-1 rounded-full text-white"
          style={{
            background: color,
            left: `calc(50% + ${Math.cos(angle) * radius}px - 20px)`,
            top: `calc(50% + ${Math.sin(angle) * radius}px - 10px)`,
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
        >
          {label}
        </motion.div>
      );
    })}
    <motion.div
      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold z-10"
      style={{ background: color }}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      YOU
    </motion.div>
  </div>
);

const ServeVisual = ({ color }: { color: string }) => {
  const bars = [
    { label: 'Reach', h: 45 }, { label: 'Eng.', h: 72 }, { label: 'Conv.', h: 58 },
    { label: 'Growth', h: 88 }, { label: 'ROI', h: 95 },
  ];
  return (
    <div className="w-full h-full flex items-end justify-center pb-16 gap-4 px-8">
      {bars.map((b, i) => (
        <div key={b.label} className="flex flex-col items-center gap-2 flex-1">
          <motion.span
            className="text-xs font-bold"
            style={{ color }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
          >
            {b.h}%
          </motion.span>
          <div className="w-full rounded-t-xl overflow-hidden" style={{ height: 160, background: `${color}15` }}>
            <motion.div
              className="w-full rounded-t-xl"
              style={{ background: color }}
              initial={{ height: 0 }}
              whileInView={{ height: `${b.h}%` }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: 'easeOut' }}
            />
          </div>
          <span className="text-[10px] text-white/40 font-medium">{b.label}</span>
        </div>
      ))}
    </div>
  );
};

const visuals: Record<string, (c: string) => React.ReactNode> = {
  steep: (c) => <SteepVisual color={c} />,
  brew: (c) => <BrewVisual color={c} />,
  pour: (c) => <PourVisual color={c} />,
  stir: (c) => <StirVisual color={c} />,
  serve: (c) => <ServeVisual color={c} />,
};

/* ── Step section ─────────────────────────────────────── */
function StepSection({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const isEven = index % 2 === 0;

  return (
    <motion.section
      ref={ref}
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ background: index % 2 === 0 ? '#121212' : '#0e0e0e' }}
    >
      {/* giant background number */}
      <span
        className="absolute font-serif font-black pointer-events-none select-none leading-none"
        style={{
          fontSize: 'clamp(180px, 30vw, 380px)',
          color: `${step.color}08`,
          right: isEven ? '-2%' : undefined,
          left: isEven ? undefined : '-2%',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        {step.num}
      </span>

      <div className="container mx-auto px-6 py-24 z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Step badge */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: step.color }}
              >
                {step.num}
              </span>
              <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: step.light }}>
                {step.verb}
              </span>
            </div>

            <h2
              className="font-serif font-bold leading-none mb-4"
              style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', color: '#F6F1E8' }}
            >
              {step.name}
            </h2>

            <p className="text-xl font-light mb-6" style={{ color: step.light }}>
              {step.tagline}
            </p>

            <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-lg">
              {step.desc}
            </p>

            {/* Deliverables */}
            <div className="space-y-3 mb-10">
              {step.deliverables.map((d, i) => (
                <motion.div
                  key={d}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: step.color }} />
                  <span className="text-white/60 text-sm">{d}</span>
                </motion.div>
              ))}
            </div>

            {/* Insight quote */}
            <motion.blockquote
              className="border-l-2 pl-5 italic text-white/40 text-sm leading-relaxed"
              style={{ borderColor: step.color }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
            >
              {step.insight}
            </motion.blockquote>
          </motion.div>

          {/* Visual side */}
          <motion.div
            className="relative h-[480px] rounded-3xl overflow-hidden"
            style={{ background: `${step.color}15`, border: `1px solid ${step.color}20` }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {visuals[step.visual](step.color)}

            {/* Corner label */}
            <div
              className="absolute bottom-6 right-6 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest"
              style={{ background: `${step.color}60`, backdropFilter: 'blur(10px)' }}
            >
              {step.name}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

/* ── Page ─────────────────────────────────────────────── */
const Process = () => {
  const { content } = useContent();
  const steps = content.process;
  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="bg-[#121212]"
  >
    <SEO
      title="The Overtime Method — Overtime Tea"
      description="Discover the Overtime Method: a 5-step creative process from brand understanding to delivering unforgettable social media presence."
    />

    {/* Hero */}
    <section className="min-h-screen flex flex-col justify-center px-6 pt-32 pb-20 relative overflow-hidden bg-[#121212]">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#4B3124]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.p
          className="text-[#B88A44] text-sm uppercase tracking-[0.4em] mb-6 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Our Process
        </motion.p>

        <div className="overflow-hidden mb-4">
          <motion.h1
            className="font-serif font-black text-[#F6F1E8] leading-none"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            The Overtime
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1
            className="font-serif font-black text-[#B88A44] italic leading-none"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            Method.
          </motion.h1>
        </div>

        <motion.p
          className="text-xl md:text-2xl text-white/50 font-light max-w-2xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Every brand deserves overtime-level attention. Here's exactly how we brew it.
        </motion.p>

        {/* Step pills */}
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {steps.map((s) => (
            <div
              key={s.num}
              className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium"
              style={{ borderColor: `${s.color}40`, color: s.light, background: `${s.color}10` }}
            >
              <span className="text-[10px] opacity-50">{s.num}</span>
              {s.name}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>

    {/* Progress indicator strip */}
    <div className="sticky top-20 z-40 bg-[#121212]/90 backdrop-blur border-b border-white/5 hidden lg:block">
      <div className="container mx-auto px-6">
        <div className="flex">
          {steps.map((s, i) => (
            <div key={s.num} className="flex-1 flex items-center gap-2 py-3 border-r border-white/5 last:border-r-0 px-4">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0" style={{ background: s.color }}>
                {i + 1}
              </span>
              <span className="text-xs font-medium" style={{ color: s.light }}>{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Steps */}
    {steps.map((step, index) => (
      <StepSection key={step.num} step={step} index={index} />
    ))}

    {/* RIO section */}
    <section className="py-32 px-6 relative overflow-hidden" style={{ background: '#F6F1E8' }}>
      <div className="container mx-auto max-w-5xl text-center relative z-10">
        <motion.p
          className="text-[#B88A44] text-sm uppercase tracking-[0.4em] mb-6 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Our Core Principle
        </motion.p>
        <motion.h2
          className="text-6xl md:text-8xl font-serif font-black text-[#121212] mb-8 leading-none"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          RIO
        </motion.h2>
        <motion.p
          className="text-2xl font-serif italic text-[#4B3124] mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Results, Inside & Out.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { letter: 'R', word: 'Results', desc: 'Every decision is tied to a metric that matters. We don\'t do work that can\'t be measured.' },
            { letter: 'I', word: 'Inside', desc: 'Strategy, process, and creative direction that\'s thoughtful at every internal stage.' },
            { letter: 'O', word: 'Out', desc: 'The final output your audience sees — crafted to be unforgettable and undeniably on-brand.' },
          ].map((r, i) => (
            <motion.div
              key={r.letter}
              className="p-8 rounded-2xl bg-white border border-black/8 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -4 }}
            >
              <span className="text-6xl font-serif font-black text-[#B88A44] block mb-3">{r.letter}</span>
              <h3 className="text-xl font-serif font-bold text-[#121212] mb-2">{r.word}</h3>
              <p className="text-[#121212]/60 text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-3 px-12 py-5 bg-[#121212] text-[#F6F1E8] rounded-full font-medium tracking-wide hover:bg-[#B88A44] transition-all duration-300 text-lg group"
        >
          Start Your Method
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  </motion.div>
  );
};

export default Process;
