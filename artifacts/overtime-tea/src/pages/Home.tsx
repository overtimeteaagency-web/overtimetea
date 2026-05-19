import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, MessageCircle, Bookmark, Share2, Play } from 'lucide-react';
import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { useContent } from '@/context/ContentContext';

const AnimatedCounter = ({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
};

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#121212] flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="relative w-24 h-24 flex items-center justify-center">
        <motion.div
          className="absolute bottom-0 w-16 h-12 border-4 border-[#F6F1E8] rounded-b-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          className="absolute top-0 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-8 bg-[#B88A44] rounded-full blur-[1px]"
              animate={{ y: [0, -20, -40], opacity: [0, 0.7, 0], scale: [1, 1.5, 2] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.4, ease: "easeOut" }}
            />
          ))}
        </motion.div>
      </div>
      <motion.p
        className="mt-8 font-serif text-xl tracking-widest text-[#F6F1E8]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        BREWING
      </motion.p>
    </motion.div>
  );
};

/* ── Instagram Phone Mockup ─────────────────────────────── */
const instagramPosts = [
  {
    user: "vesselcoffee",
    avatar: "VC",
    time: "2h",
    likes: "4,821",
    caption: "Morning ritual, elevated. ☕",
    tag: "#ContentStrategy",
    gradient: "from-amber-900 to-stone-800",
  },
  {
    user: "humstudio",
    avatar: "HS",
    time: "5h",
    likes: "12.3K",
    caption: "Stillness is a practice.",
    tag: "#BrandPresence",
    gradient: "from-slate-700 to-zinc-800",
  },
  {
    user: "lunecollective",
    avatar: "LC",
    time: "1d",
    likes: "8,450",
    caption: "Every thread tells a story.",
    tag: "#CreativeDirection",
    gradient: "from-rose-900 to-stone-900",
  },
];

const BadgesFromContext = () => {
  const { content } = useContent();
  const h = content.home;
  return (
    <>
      <motion.div
        className="absolute -right-8 top-16 bg-[#B88A44] text-[#121212] px-3 py-2 rounded-xl text-xs font-bold shadow-lg"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      >
        {h.badge1}
      </motion.div>
      <motion.div
        className="absolute -left-10 bottom-24 bg-[#F6F1E8] text-[#121212] px-3 py-2 rounded-xl text-xs font-bold shadow-lg"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
      >
        {h.badge2}
      </motion.div>
      <motion.div
        className="absolute -right-6 bottom-32 bg-white/10 backdrop-blur text-white px-3 py-2 rounded-xl text-xs shadow border border-white/10"
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
      >
        {h.badge3}
      </motion.div>
    </>
  );
};

const InstagramMockup = () => {
  const [activePost, setActivePost] = useState(0);
  const [liked, setLiked] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePost((p) => (p + 1) % instagramPosts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const post = instagramPosts[activePost];

  const toggleLike = () => {
    setLiked((prev) => {
      const next = [...prev];
      next[activePost] = !next[activePost];
      return next;
    });
  };

  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Phone shell */}
      <div className="relative w-[260px] h-[520px] bg-[#0f0f0f] rounded-[40px] border-[6px] border-[#2a2a2a] shadow-[0_0_60px_rgba(184,138,68,0.15)] overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#0f0f0f] rounded-b-2xl z-20" />

        {/* Instagram header */}
        <div className="bg-[#0f0f0f] px-4 pt-8 pb-2 flex justify-between items-center z-10 relative border-b border-white/5">
          <span className="font-serif text-white text-lg font-bold italic">Overtime Tea</span>
          <div className="flex gap-3">
            <div className="w-5 h-5 rounded-full border border-white/30" />
            <div className="w-5 h-5 rounded-full border border-white/30" />
          </div>
        </div>

        {/* Stories row */}
        <div className="flex gap-3 px-4 py-3 overflow-hidden bg-[#0f0f0f]">
          {['You', 'VC', 'HS', 'LC', 'DR'].map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-1 shrink-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 ${i === 0 ? 'border-[#B88A44]' : 'border-[#B88A44]/40'} bg-gradient-to-br from-[#4B3124] to-[#B88A44]`}>
                {s}
              </div>
              <span className="text-[8px] text-white/40 truncate w-10 text-center">{s === 'You' ? 'Your story' : s}</span>
            </div>
          ))}
        </div>

        {/* Post */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePost}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full"
          >
            {/* Post header */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0f0f0f]">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${post.gradient} flex items-center justify-center text-white text-[10px] font-bold border border-[#B88A44]/30`}>
                {post.avatar}
              </div>
              <div>
                <p className="text-white text-[11px] font-semibold">{post.user}</p>
                <p className="text-white/30 text-[9px]">{post.time} ago</p>
              </div>
              <div className="ml-auto text-white/30 text-lg">···</div>
            </div>

            {/* Post image */}
            <div className={`w-full h-[160px] bg-gradient-to-br ${post.gradient} flex flex-col items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, #B88A44 0%, transparent 50%)' }} />
              <span className="text-[#B88A44] font-serif text-4xl italic font-light opacity-60">OT</span>
              <span className="text-white/30 text-[9px] uppercase tracking-widest mt-1">{post.tag}</span>
              {/* Play icon for reels feel */}
              <motion.div
                className="absolute bottom-3 right-3 w-8 h-8 bg-white/10 backdrop-blur rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Play size={10} fill="white" className="text-white ml-0.5" />
              </motion.div>
            </div>

            {/* Post actions */}
            <div className="px-4 py-2 bg-[#0f0f0f]">
              <div className="flex items-center gap-4 mb-2">
                <motion.button
                  onClick={toggleLike}
                  whileTap={{ scale: 1.4 }}
                  className="flex items-center gap-1"
                >
                  <Heart
                    size={18}
                    className={`transition-colors ${liked[activePost] ? 'fill-red-500 text-red-500' : 'text-white/60'}`}
                  />
                </motion.button>
                <MessageCircle size={18} className="text-white/60" />
                <Share2 size={18} className="text-white/60" />
                <Bookmark size={18} className="ml-auto text-white/60" />
              </div>
              <p className="text-white text-[11px] font-semibold">{post.likes} likes</p>
              <p className="text-white/70 text-[10px] mt-0.5">
                <span className="font-semibold text-white">{post.user}</span>{' '}
                {post.caption}
              </p>
              <p className="text-[#B88A44] text-[9px] mt-0.5">{post.tag}</p>

              {/* Engagement bar */}
              <div className="mt-3 space-y-1">
                {[
                  { label: 'Reach', pct: 85 },
                  { label: 'Engage', pct: 68 },
                ].map((m) => (
                  <div key={m.label} className="flex items-center gap-2">
                    <span className="text-white/30 text-[8px] w-10">{m.label}</span>
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[#B88A44] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${m.pct}%` }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="text-[#B88A44] text-[8px]">{m.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom nav bar */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#0f0f0f] border-t border-white/5 flex items-center justify-around px-4">
          {['⊞', '⊕', '▷', '♡', '◎'].map((icon, i) => (
            <span key={i} className={`text-sm ${i === 0 ? 'text-[#B88A44]' : 'text-white/30'}`}>{icon}</span>
          ))}
        </div>
      </div>

      {/* Floating badges */}
      <BadgesFromContext />
    </div>
  );
};

/* ── Overtime Method Steps ──────────────────────────────── */
const methodSteps = [
  {
    num: '01',
    name: 'Steep',
    verb: 'Understand.',
    desc: 'Deep dive into your brand identity, audience, competitors, and story. We listen before we create.',
    detail: ['Brand Discovery Call', 'Audience Research', 'Competitor Analysis', 'Content Audit'],
  },
  {
    num: '02',
    name: 'Brew',
    verb: 'Strategise.',
    desc: 'Building the strategy, content pillars, and creative direction that will define your presence.',
    detail: ['Content Strategy', 'Platform Selection', 'Brand Voice Guide', 'Goal Setting'],
  },
  {
    num: '03',
    name: 'Pour',
    verb: 'Create.',
    desc: 'Designing content, producing reels, writing copy — every asset crafted with intention.',
    detail: ['Content Design', 'Reels Production', 'Copywriting', 'Asset Creation'],
  },
  {
    num: '04',
    name: 'Stir',
    verb: 'Engage.',
    desc: 'Sparking real conversations, managing community, nurturing your audience every single day.',
    detail: ['Community Management', 'DM Strategy', 'Conversation Building', 'Audience Nurturing'],
  },
  {
    num: '05',
    name: 'Serve',
    verb: 'Deliver.',
    desc: 'Reporting results, refining strategy, and continuously raising the bar on your brand presence.',
    detail: ['Analytics Reports', 'Strategy Refinement', 'Growth Tracking', 'Monthly Reviews'],
  },
];

const Home = () => {
  const { content } = useContent();
  const h = content.home;
  const [loading, setLoading] = useState(true);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-[#121212] min-h-screen text-[#F6F1E8]"
        >
          <SEO
            title="Overtime Tea — Brewed Overtime for Better Conversations"
            description="Overtime Tea is a premium social media management agency turning content into conversations through strategy, storytelling, and overtime-level creative effort."
          />

          {/* ── Hero ──────────────────────────────────────── */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#B88A44]/40 rounded-full"
                  style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                  animate={{ y: [0, -150], opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                  transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
                />
              ))}
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
                <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif font-bold text-[#F6F1E8] leading-[1.1] mb-8 max-w-6xl mx-auto">
                  {h.heroLine1} <br className="hidden md:block" />
                  <span className="italic font-light text-[#B88A44]">{h.heroLine2}</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                  {h.heroTagline}
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <Link href="/contact" className="px-10 py-5 bg-[#B88A44] text-white rounded-full font-medium tracking-wide hover:bg-white hover:text-[#121212] transition-colors duration-300 flex items-center gap-2 group text-lg">
                  {h.heroCta}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/services" className="px-10 py-5 border border-white/20 text-white rounded-full font-medium tracking-wide hover:border-white transition-all duration-300 text-lg">
                  See What We're Brewing
                </Link>
              </motion.div>
            </div>
          </section>

          {/* ── Stats Bar ─────────────────────────────────── */}
          <div className="bg-[#B88A44] text-[#121212] py-8 border-y border-white/10">
            <div className="container mx-auto px-6 flex flex-wrap justify-between items-center gap-8 font-serif text-2xl md:text-3xl font-bold">
              <div><AnimatedCounter to={parseInt(h.stat1Number) || 50} />+ {h.stat1Label}</div>
              <div><AnimatedCounter to={parseInt(h.stat2Number) || 3} />x Avg Engagement Lift</div>
              <div><AnimatedCounter to={parseInt(h.stat3Number) || 100} />% {h.stat3Label}</div>
              <div>5-Star Rating</div>
            </div>
          </div>

          {/* ── Our Expertise + Instagram Mockup ─────────── */}
          <section className="py-32 px-6">
            <div className="container mx-auto">
              <div className="text-center mb-20">
                <motion.p
                  className="text-[#B88A44] uppercase tracking-[0.3em] text-sm mb-4 font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  What We Do Best
                </motion.p>
                <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4">Our Expertise</h2>
                <div className="w-16 h-[1px] bg-[#B88A44] mx-auto" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: service cards */}
                <div className="grid grid-cols-1 gap-6">
                  {[
                    {
                      num: '01',
                      title: "Social Media Management",
                      desc: "Your brand's daily voice, crafted with intention and strategy.",
                      tag: "Strategy · Growth · Community"
                    },
                    {
                      num: '02',
                      title: "Reels & Short Form",
                      desc: "High-retention vertical video that captures attention in the first 3 seconds.",
                      tag: "Video · Trends · Storytelling"
                    },
                    {
                      num: '03',
                      title: "Creative Direction",
                      desc: "Visual systems that elevate your aesthetic and ensure consistency across every touchpoint.",
                      tag: "Design · Identity · Vision"
                    },
                  ].map((s, i) => (
                    <motion.div
                      key={s.title}
                      className="group border border-white/10 p-8 bg-white/5 hover:border-[#B88A44] hover:bg-white/8 transition-all duration-500 rounded-xl cursor-pointer relative overflow-hidden"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      whileHover={{ y: -4 }}
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#B88A44] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top rounded-r" />
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-[#B88A44] font-serif text-4xl font-light">{s.num}</span>
                        <ArrowRight size={16} className="text-white/20 group-hover:text-[#B88A44] group-hover:translate-x-1 transition-all duration-300 mt-2" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold mb-2 text-[#F6F1E8] group-hover:text-[#B88A44] transition-colors">{s.title}</h3>
                      <p className="text-white/50 mb-4 text-sm leading-relaxed">{s.desc}</p>
                      <span className="text-[10px] uppercase tracking-widest text-white/30 group-hover:text-[#B88A44]/60 transition-colors">{s.tag}</span>
                      <Link href="/services" className="absolute inset-0" />
                    </motion.div>
                  ))}
                </div>

                {/* Right: Instagram mockup */}
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <InstagramMockup />
                </motion.div>
              </div>

              <div className="text-center mt-16">
                <Link href="/services" className="inline-flex items-center gap-2 text-[#B88A44] text-sm uppercase tracking-widest hover:gap-4 transition-all duration-300 font-medium">
                  View All Services <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>

          {/* ── The Overtime Method ───────────────────────── */}
          <section className="py-32 px-6 bg-[#F6F1E8] text-[#121212]">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div>
                  <motion.p
                    className="text-[#B88A44] uppercase tracking-[0.3em] text-sm mb-4 font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    How We Work
                  </motion.p>
                  <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4">The Overtime Method</h2>
                  <p className="text-xl text-black/50 max-w-lg">A meticulous 5-step approach to turning content into real conversations.</p>
                </div>
                <Link href="/process" className="px-8 py-3 border border-black/20 text-black rounded-full hover:bg-black hover:text-white transition-all duration-300 shrink-0 text-sm uppercase tracking-widest">
                  View Full Process
                </Link>
              </div>

              {/* Steps grid */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-black/10 rounded-2xl overflow-hidden">
                {methodSteps.map((step, i) => (
                  <motion.div
                    key={step.name}
                    className="relative p-8 border-r border-black/10 last:border-r-0 cursor-pointer group transition-all duration-500"
                    style={{
                      backgroundColor: hoveredStep === i ? '#121212' : 'transparent',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    onHoverStart={() => setHoveredStep(i)}
                    onHoverEnd={() => setHoveredStep(null)}
                  >
                    {/* Step number */}
                    <motion.span
                      className="font-serif text-5xl font-bold block mb-3 leading-none transition-colors duration-500"
                      style={{ color: hoveredStep === i ? '#B88A44' : '#B88A44' }}
                      animate={{ scale: hoveredStep === i ? 1.1 : 1 }}
                    >
                      {step.num}
                    </motion.span>

                    {/* Step name */}
                    <h3
                      className="text-2xl font-serif font-bold mb-1 transition-colors duration-500"
                      style={{ color: hoveredStep === i ? '#F6F1E8' : '#121212' }}
                    >
                      {step.name}
                    </h3>

                    {/* Verb tag */}
                    <p
                      className="text-xs uppercase tracking-widest mb-4 transition-colors duration-500"
                      style={{ color: hoveredStep === i ? '#B88A44' : '#9a7a5a' }}
                    >
                      {step.verb}
                    </p>

                    {/* Desc + detail on hover */}
                    <AnimatePresence>
                      {hoveredStep === i && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-white/60 text-sm leading-relaxed mb-4">{step.desc}</p>
                          <ul className="space-y-1">
                            {step.detail.map((d) => (
                              <li key={d} className="flex items-center gap-2 text-xs text-white/40">
                                <span className="w-1 h-1 bg-[#B88A44] rounded-full shrink-0" />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Bottom bar */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-[#B88A44]"
                      animate={{ width: hoveredStep === i ? '100%' : '0%' }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>
                ))}
              </div>

              <p className="text-center text-black/40 text-sm mt-8 tracking-widest uppercase">Hover each step to explore</p>
            </div>
          </section>

          {/* ── Testimonials ──────────────────────────────── */}
          <section className="py-32 px-6 overflow-hidden">
            <div className="container mx-auto">
              <h2 className="text-5xl md:text-6xl font-serif font-bold mb-20 text-center">Words on the street.</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { quote: "Overtime Tea completely redefined our brand's voice. The engagement speaks for itself.", author: "Sarah Jenkins", role: "Vessel Coffee" },
                  { quote: "They understand the nuance of modern social media better than anyone we've worked with.", author: "Mark Chen", role: "Hum Studio" },
                  { quote: "Our reels have never looked better, and our community has never been stronger.", author: "Elena Rostova", role: "Lune Collective" },
                ].map((t, i) => (
                  <motion.div
                    key={t.author}
                    className="p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-[#B88A44]/40 transition-colors duration-500"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    whileHover={{ y: -6 }}
                  >
                    <div className="text-4xl text-[#B88A44] font-serif mb-6">"</div>
                    <p className="text-xl font-light leading-relaxed mb-8 italic text-white/80">"{t.quote}"</p>
                    <div>
                      <div className="font-bold text-lg">{t.author}</div>
                      <div className="text-white/40 text-sm uppercase tracking-widest">{t.role}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Final CTA ─────────────────────────────────── */}
          <section className="relative py-40 px-6 bg-[#B88A44] text-[#121212] text-center overflow-hidden">
            {/* Decorative animated rings */}
            {[1, 2, 3].map((r) => (
              <motion.div
                key={r}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#121212]/10 pointer-events-none"
                style={{ width: r * 280, height: r * 280 }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.15, 0.3] }}
                transition={{ repeat: Infinity, duration: 3 + r, ease: 'easeInOut', delay: r * 0.4 }}
              />
            ))}

            {/* Floating gold orbs */}
            {[
              { x: '10%', y: '20%', size: 120 },
              { x: '85%', y: '60%', size: 80 },
              { x: '60%', y: '85%', size: 60 },
            ].map((orb, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[#121212]/8 pointer-events-none"
                style={{ left: orb.x, top: orb.y, width: orb.size, height: orb.size }}
                animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
                transition={{ repeat: Infinity, duration: 8 + i * 2, ease: 'easeInOut' }}
              />
            ))}

            <div className="relative z-10 container mx-auto">
              <motion.p
                className="text-[#121212]/50 uppercase tracking-[0.4em] text-sm mb-6 font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Ready to Begin?
              </motion.p>
              <motion.h2
                className="text-6xl md:text-8xl font-serif font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Let's brew something<br />
                <span className="italic font-light">people remember.</span>
              </motion.h2>
              <motion.p
                className="text-[#121212]/60 text-xl mb-12 font-light max-w-xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Because strong brands are never rushed.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-14 py-6 bg-[#121212] text-white rounded-full font-medium tracking-wide hover:bg-white hover:text-[#121212] transition-all duration-400 text-xl group"
                >
                  Start A Conversation
                  <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </motion.div>

              {/* RIO tag */}
              <motion.div
                className="mt-16 inline-flex items-center gap-3 bg-[#121212]/10 rounded-full px-6 py-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <span className="w-2 h-2 bg-[#121212] rounded-full animate-pulse" />
                <span className="text-sm uppercase tracking-widest text-[#121212]/70 font-medium">RIO — Results, Inside & Out</span>
              </motion.div>
            </div>
          </section>

        </motion.div>
      )}
    </>
  );
};

export default Home;
