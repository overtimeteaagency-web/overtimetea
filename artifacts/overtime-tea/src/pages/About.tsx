import React, { useRef } from 'react';
import { SEO } from '@/components/SEO';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Coffee, Zap, Heart, Target, Users, Star } from 'lucide-react';
import { Link } from 'wouter';

/* ── Team members ───────────────────────────────────────── */
const team = [
  {
    name: 'Aryan Mehta',
    role: 'Founder & Creative Director',
    handle: '@aryan',
    obsession: 'Brand voice & the art of the perfect caption',
    color: '#4B3124',
    initials: 'AM',
    years: '6 yrs in social',
    quote: '"I built Overtime Tea because I was tired of brands that posted without purpose."',
    tags: ['Strategy', 'Brand Identity', 'Creative Direction'],
  },
  {
    name: 'Nisha Kapoor',
    role: 'Head of Content Strategy',
    handle: '@nisha',
    obsession: 'Content pillars that actually convert',
    color: '#5E6B52',
    initials: 'NK',
    years: '5 yrs in content',
    quote: '"Every piece of content is a micro-conversation. Most brands forget that."',
    tags: ['Content Strategy', 'Copywriting', 'Analytics'],
  },
  {
    name: 'Rohan Das',
    role: 'Lead Reels & Video Producer',
    handle: '@rohan',
    obsession: 'The first 1.5 seconds of every reel',
    color: '#B88A44',
    initials: 'RD',
    years: '4 yrs in video',
    quote: '"If a reel doesn\'t stop the scroll in 1.5 seconds, it doesn\'t exist."',
    tags: ['Reels', 'Video Production', 'Trends'],
  },
  {
    name: 'Sara Lopes',
    role: 'Community & Engagement Lead',
    handle: '@sara',
    obsession: 'Turning followers into genuinely loyal fans',
    color: '#8B5E6B',
    initials: 'SL',
    years: '4 yrs in community',
    quote: '"The DM you reply to at 11pm is the one that becomes a lifelong customer."',
    tags: ['Community', 'Engagement', 'Brand Loyalty'],
  },
];

/* ── Values ─────────────────────────────────────────────── */
const values = [
  {
    icon: <Coffee size={22} />,
    title: 'Overtime is a mindset, not a schedule.',
    desc: 'We don\'t count hours. We count the quality of conversations started, the care put into each post, the extra thought given to every brief.',
  },
  {
    icon: <Zap size={22} />,
    title: 'Strategy before aesthetics. Always.',
    desc: 'A beautiful feed with no strategy is just a pretty void. We build the "why" before the "what."',
  },
  {
    icon: <Heart size={22} />,
    title: 'We treat every brand like it\'s our own.',
    desc: 'We don\'t manage pages. We build presence. There\'s a difference — and you feel it in the work.',
  },
  {
    icon: <Target size={22} />,
    title: 'Honest results over inflated reports.',
    desc: 'We\'ll tell you what\'s working, what isn\'t, and exactly what we\'re doing about it. Transparency isn\'t a perk — it\'s how we work.',
  },
  {
    icon: <Users size={22} />,
    title: 'Culture-aware branding, always.',
    desc: 'The best social media isn\'t just on-brand — it\'s on-moment. We keep your brand in the conversation, not behind it.',
  },
  {
    icon: <Star size={22} />,
    title: 'Calm confidence, not loud promises.',
    desc: 'We don\'t overpromise. We under-promise and overdeliver. Every single time.',
  },
];

/* ── Milestones ─────────────────────────────────────────── */
const milestones = [
  { year: '2020', event: 'Overtime Tea founded over — you guessed it — a cup of tea.', note: 'Just 2 people, 1 laptop, and a belief that social media deserved better.' },
  { year: '2021', event: 'First 10 brand clients. First viral reel. First "how did you do that?"', note: 'Hum Studio\'s nervous system reel hits 800K views.' },
  { year: '2022', event: 'Expanded the team. Built the Overtime Method.', note: 'Formalised the process that had been working quietly in the background.' },
  { year: '2023', event: '30+ active brands. 2M+ content views served.', note: 'Lune Collective campaign gets picked up by Vogue India.' },
  { year: '2024', event: 'Full creative agency offering launched.', note: 'Creative direction, brand identity, and video production added to the brew.' },
  { year: '2025', event: '50+ brands served. Still brewing overtime.', note: 'And we\'re just getting started.' },
];

/* ── Section wrapper with scroll trigger ──────────────── */
function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Page ─────────────────────────────────────────────── */
const About = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-screen"
  >
    <SEO
      title="About — Overtime Tea"
      description="Meet the team behind Overtime Tea — a social media agency built on the belief that great brands are brewed overtime, not overnight."
    />

    {/* ── Hero ───────────────────────────────────────── */}
    <section className="min-h-screen flex flex-col justify-center px-6 pt-32 pb-20 bg-[#121212] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#4B3124]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#B88A44]/8 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl">
        <motion.p
          className="text-[#B88A44] text-sm uppercase tracking-[0.4em] mb-8 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Who We Are
        </motion.p>

        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-serif font-black text-[#F6F1E8] leading-none"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            We're not an agency.
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-12">
          <motion.h1
            className="font-serif font-black text-[#B88A44] italic leading-none"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            We're a brewing house.
          </motion.h1>
        </div>

        <motion.p
          className="text-xl md:text-2xl text-white/50 max-w-3xl font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Overtime Tea was built on a simple belief: that social media should feel like a real conversation — warm, intentional, and impossible to scroll past. We brew that belief into everything we touch.
        </motion.p>

        {/* Scroll quote */}
        <motion.div
          className="mt-20 border-l-2 border-[#B88A44] pl-8 max-w-2xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-3xl font-serif italic text-[#F6F1E8]/80 leading-snug">
            "Good conversations start over tea. Great brands are brewed overtime."
          </p>
          <p className="text-[#B88A44] text-sm mt-4 uppercase tracking-widest">— The Overtime Tea Founding Belief</p>
        </motion.div>
      </div>
    </section>

    {/* ── The story ──────────────────────────────────── */}
    <section className="py-32 px-6 bg-[#F6F1E8]">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <RevealSection>
            <p className="text-[#B88A44] text-sm uppercase tracking-[0.3em] mb-6 font-medium">The Origin</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-[#121212] mb-8 leading-tight">
              It started with a<br />
              <span className="italic text-[#4B3124]">bad client experience.</span>
            </h2>
            <div className="space-y-5 text-[#121212]/60 text-lg leading-relaxed">
              <p>
                In 2020, our founder Aryan watched a brand he loved get handed off to an agency that treated their social media like a checkbox. Generic content. Templated captions. Zero understanding of who the brand actually was.
              </p>
              <p>
                He sat with that frustration over tea — and decided to build the agency he wished had existed. One that listened first. Strategised second. Created third.
              </p>
              <p>
                He called it Overtime Tea — because the best work happens after the meeting ends, when everyone else has stopped caring and you're still going, still refining, still brewing.
              </p>
            </div>
          </RevealSection>

          {/* Manifesto card */}
          <RevealSection delay={0.2}>
            <div className="bg-[#121212] rounded-3xl p-10 sticky top-28">
              <p className="text-[#B88A44] text-xs uppercase tracking-[0.3em] mb-6">Our Manifesto</p>
              <div className="space-y-5">
                {[
                  'We post with purpose, not just to fill a calendar.',
                  'We write captions that sound like a real person, because they are.',
                  'We make reels that stop the scroll because they say something worth stopping for.',
                  'We measure success in conversations started, not just impressions served.',
                  'We go overtime because your brand deserves more than minimum effort.',
                ].map((line, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-4 items-start"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="text-[#B88A44] font-serif text-xl font-bold shrink-0 mt-0.5">{`0${i + 1}`}</span>
                    <p className="text-[#F6F1E8]/70 text-base leading-relaxed">{line}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>

    {/* ── Timeline ───────────────────────────────────── */}
    <section className="py-32 px-6 bg-[#121212]">
      <div className="container mx-auto max-w-4xl">
        <RevealSection>
          <p className="text-[#B88A44] text-sm uppercase tracking-[0.3em] mb-4 font-medium text-center">Our Journey</p>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-[#F6F1E8] text-center mb-20">Brewing since 2020.</h2>
        </RevealSection>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[22px] top-0 bottom-0 w-[2px] bg-white/5 lg:left-1/2 lg:-translate-x-1/2" />

          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              className={`relative flex gap-8 mb-16 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Dot */}
              <div className="absolute left-[14px] lg:left-1/2 lg:-translate-x-1/2 w-5 h-5 rounded-full bg-[#B88A44] border-4 border-[#121212] z-10 mt-1" />

              {/* Content */}
              <div className={`ml-12 lg:ml-0 lg:w-[45%] ${i % 2 === 0 ? 'lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12'}`}>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/8 hover:border-[#B88A44]/30 transition-colors">
                  <span className="text-[#B88A44] font-serif text-3xl font-bold block mb-2">{m.year}</span>
                  <p className="text-[#F6F1E8] font-medium mb-2">{m.event}</p>
                  <p className="text-white/40 text-sm italic">{m.note}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Values ─────────────────────────────────────── */}
    <section className="py-32 px-6 bg-[#F6F1E8]">
      <div className="container mx-auto max-w-6xl">
        <RevealSection>
          <div className="text-center mb-20">
            <p className="text-[#B88A44] text-sm uppercase tracking-[0.3em] mb-4 font-medium">What We Stand For</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-[#121212]">The way we work.</h2>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="bg-white rounded-2xl p-8 border border-black/6 hover:border-[#B88A44]/30 hover:shadow-lg transition-all duration-500 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6 text-white transition-transform group-hover:scale-110"
                style={{ background: '#B88A44' }}
              >
                {v.icon}
              </div>
              <h3 className="text-lg font-serif font-bold text-[#121212] mb-3 leading-snug">{v.title}</h3>
              <p className="text-[#121212]/55 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Team ───────────────────────────────────────── */}
    <section className="py-32 px-6 bg-[#121212]">
      <div className="container mx-auto max-w-6xl">
        <RevealSection>
          <div className="text-center mb-20">
            <p className="text-[#B88A44] text-sm uppercase tracking-[0.3em] mb-4 font-medium">The Brewers</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-[#F6F1E8]">
              The people behind<br />
              <span className="italic text-[#B88A44]">the overtime.</span>
            </h2>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              className="group rounded-3xl overflow-hidden border border-white/8 hover:border-[#B88A44]/30 transition-all duration-500 bg-white/5"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -6 }}
            >
              {/* Top strip */}
              <div className="h-28 relative flex items-end p-6" style={{ background: member.color }}>
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 0%, transparent 60%)' }} />
                <div className="flex items-end justify-between w-full">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                    style={{ background: `${member.color}cc`, border: '3px solid rgba(255,255,255,0.2)' }}
                  >
                    {member.initials}
                  </div>
                  <span className="text-white/40 text-xs font-mono">{member.years}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-xl font-serif font-bold text-[#F6F1E8]">{member.name}</h3>
                  <span className="text-xs text-white/30 font-mono mt-1">{member.handle}</span>
                </div>
                <p className="text-[#B88A44] text-sm font-medium mb-4">{member.role}</p>

                <blockquote className="text-white/50 text-sm italic leading-relaxed mb-5 border-l-2 pl-4" style={{ borderColor: member.color }}>
                  {member.quote}
                </blockquote>

                <div className="text-xs text-white/30 mb-4">
                  <span className="font-semibold text-white/50 mr-1">Obsessed with:</span>
                  {member.obsession}
                </div>

                <div className="flex flex-wrap gap-2">
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full text-white/60 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Numbers ────────────────────────────────────── */}
    <section className="py-24 px-6 bg-[#B88A44] relative overflow-hidden">
      {/* Decorative rings */}
      {[1, 2, 3].map((r) => (
        <motion.div
          key={r}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#121212]/10 pointer-events-none"
          style={{ width: r * 260, height: r * 260 }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ repeat: Infinity, duration: 3 + r, ease: 'easeInOut', delay: r * 0.4 }}
        />
      ))}
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: '50+', label: 'Brands Served' },
            { num: '10M+', label: 'Content Views' },
            { num: '5 yrs', label: 'Brewing Overtime' },
            { num: '100%', label: 'Overtime Effort' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-5xl md:text-6xl font-serif font-black text-[#121212] mb-2">{s.num}</p>
              <p className="text-[#121212]/50 text-sm uppercase tracking-widest font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA ────────────────────────────────────────── */}
    <section className="py-32 px-6 bg-[#121212] text-center">
      <div className="container mx-auto">
        <RevealSection>
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-[#F6F1E8] mb-6">
            Come brew with us.
          </h2>
          <p className="text-white/50 text-xl mb-12 max-w-xl mx-auto font-light">
            We take on a limited number of new brands each quarter. If you're ready for overtime-level attention, let's talk.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-12 py-5 bg-[#B88A44] text-white rounded-full font-medium tracking-wide hover:bg-white hover:text-[#121212] transition-all duration-300 text-lg group"
          >
            Start A Conversation
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </RevealSection>
      </div>
    </section>
  </motion.div>
);

export default About;
