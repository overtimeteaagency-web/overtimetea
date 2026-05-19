import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'wouter';
import { SEO } from '@/components/SEO';

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
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
};

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
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
              animate={{
                y: [0, -20, -40],
                opacity: [0, 0.7, 0],
                scale: [1, 1.5, 2]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: i * 0.4,
                ease: "easeOut"
              }}
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

const Home = () => {
  const [loading, setLoading] = useState(true);

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

          {/* Hero */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Particles */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#B88A44]/40 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -150],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 5,
                    repeat: Infinity,
                    delay: Math.random() * 5
                  }}
                />
              ))}
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif font-bold text-[#F6F1E8] leading-[1.1] mb-8 max-w-6xl mx-auto">
                  Brewed overtime for <br className="hidden md:block"/> 
                  <span className="italic font-light text-[#B88A44]">better conversations.</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                  We help brands turn content into conversations through strategy, storytelling, and overtime-level creative effort.
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-col sm:flex-row items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <Link href="/contact" className="px-10 py-5 bg-[#B88A44] text-white rounded-full font-medium tracking-wide hover:bg-white hover:text-[#121212] transition-colors duration-300 flex items-center gap-2 group text-lg">
                  Start A Conversation
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/services" className="px-10 py-5 border border-white/20 text-white rounded-full font-medium tracking-wide hover:border-white transition-all duration-300 text-lg">
                  See What We're Brewing
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Stats Bar */}
          <div className="bg-[#B88A44] text-[#121212] py-8 border-y border-white/10">
            <div className="container mx-auto px-6 flex flex-wrap justify-between items-center gap-8 font-serif text-2xl md:text-3xl font-bold">
              <div><AnimatedCounter to={50} />+ Brands Served</div>
              <div><AnimatedCounter to={3} />x Avg Engagement Lift</div>
              <div><AnimatedCounter to={100} />% Overtime Effort</div>
              <div>5-Star Rating</div>
            </div>
          </div>

          {/* Services Teaser */}
          <section className="py-32 px-6">
            <div className="container mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4">Our Expertise</h2>
                <div className="w-16 h-[1px] bg-[#B88A44] mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Social Media Management", desc: "Your brand's daily voice, crafted with intention and strategy." },
                  { title: "Reels & Short Form", desc: "High-retention vertical video that captures attention in the first 3 seconds." },
                  { title: "Creative Direction", desc: "Visual systems that elevate your aesthetic and ensure consistency." }
                ].map((s, i) => (
                  <motion.div 
                    key={s.title}
                    className="group border border-white/10 p-10 bg-white/5 hover:border-[#B88A44] transition-colors duration-500 rounded-lg cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                  >
                    <h3 className="text-3xl font-serif font-bold mb-4 text-[#F6F1E8] group-hover:text-[#B88A44] transition-colors">{s.title}</h3>
                    <p className="text-white/60 text-lg mb-8">{s.desc}</p>
                    <Link href="/services" className="text-sm uppercase tracking-widest font-semibold text-[#B88A44] flex items-center gap-2">
                      Learn More <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Teaser */}
          <section className="py-32 px-6 bg-[#F6F1E8] text-[#121212]">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                  <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4">The Overtime Method</h2>
                  <p className="text-xl text-black/60 max-w-lg">A meticulous 5-step approach to turning content into real conversations.</p>
                </div>
                <Link href="/process" className="px-8 py-3 border border-black text-black rounded-full hover:bg-black hover:text-white transition-colors">
                  View Full Process
                </Link>
              </div>
              
              <div className="flex flex-col lg:flex-row border-t border-black/10">
                {['Steep', 'Brew', 'Pour', 'Stir', 'Serve'].map((step, i) => (
                  <div key={step} className="flex-1 py-8 lg:px-8 border-b lg:border-b-0 lg:border-r border-black/10 last:border-0 relative group">
                    <span className="text-[#B88A44] font-serif text-xl italic block mb-4">0{i+1}</span>
                    <h3 className="text-3xl font-serif font-bold group-hover:text-[#B88A44] transition-colors">{step}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-32 px-6 overflow-hidden">
            <div className="container mx-auto">
              <h2 className="text-5xl md:text-6xl font-serif font-bold mb-20 text-center">Words on the street.</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { quote: "Overtime Tea completely redefined our brand's voice. The engagement speaks for itself.", author: "Sarah Jenkins", role: "Vessel Coffee" },
                  { quote: "They understand the nuance of modern social media better than anyone we've worked with.", author: "Mark Chen", role: "Hum Studio" },
                  { quote: "Our reels have never looked better, and our community has never been stronger.", author: "Elena Rostova", role: "Lune Collective" }
                ].map((t, i) => (
                  <motion.div 
                    key={t.author}
                    className="p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                  >
                    <div className="text-4xl text-[#B88A44] font-serif mb-6">"</div>
                    <p className="text-xl font-light leading-relaxed mb-8 italic">"{t.quote}"</p>
                    <div>
                      <div className="font-bold text-lg">{t.author}</div>
                      <div className="text-white/50 text-sm uppercase tracking-widest">{t.role}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-40 px-6 bg-[#B88A44] text-[#121212] text-center">
            <div className="container mx-auto">
              <h2 className="text-6xl md:text-8xl font-serif font-bold mb-10">Let's brew something <br/>people remember.</h2>
              <Link href="/contact" className="inline-block px-12 py-6 bg-[#121212] text-white rounded-full font-medium tracking-wide hover:bg-white hover:text-[#121212] transition-all duration-300 text-xl">
                Start A Conversation
              </Link>
            </div>
          </section>

        </motion.div>
      )}
    </>
  );
};

export default Home;
