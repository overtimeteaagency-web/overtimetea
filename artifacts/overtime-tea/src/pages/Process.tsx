import React from 'react';
import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Process = () => {
  const steps = [
    { 
      num: "01", 
      name: "Steep", 
      tagline: "We listen before we create.",
      desc: "Deep dive into brand identity, audience research, competitor analysis, and discovery calls. We steep ourselves in your world.",
      visual: (
        <div className="w-full h-full flex items-center justify-center relative">
          <motion.div className="w-32 h-32 rounded-full border border-[#B88A44]/30 absolute" animate={{ scale: [1, 2, 2.5], opacity: [0.5, 0.2, 0] }} transition={{ repeat: Infinity, duration: 3 }} />
          <motion.div className="w-32 h-32 rounded-full border border-[#B88A44]/50 absolute" animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.4, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }} />
          <div className="w-32 h-32 rounded-full bg-[#B88A44] flex items-center justify-center text-[#121212] font-serif text-2xl italic z-10">Listen</div>
        </div>
      )
    },
    { 
      num: "02", 
      name: "Brew", 
      tagline: "Strategy that's built to last.",
      desc: "Content strategy, brand voice, platform selection, and goal setting. We formulate the exact blend your brand needs.",
      visual: (
        <div className="w-full h-full flex items-center justify-center">
          <div className="grid grid-cols-3 gap-2 w-48 h-48">
            {[...Array(9)].map((_, i) => (
              <motion.div key={i} className="bg-[#B88A44]/20 border border-[#B88A44]/40" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }} />
            ))}
          </div>
        </div>
      )
    },
    { 
      num: "03", 
      name: "Pour", 
      tagline: "Creation with intention.",
      desc: "Content design, reels production, copywriting, and asset creation. Bringing the strategy to life with world-class aesthetics.",
      visual: (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col gap-4">
            <motion.div className="h-12 w-64 bg-[#B88A44] rounded-lg" animate={{ width: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} />
            <motion.div className="h-12 w-48 bg-[#B88A44]/60 rounded-lg" animate={{ width: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.2 }} />
            <motion.div className="h-12 w-56 bg-[#B88A44]/30 rounded-lg" animate={{ width: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.4 }} />
          </div>
        </div>
      )
    },
    { 
      num: "04", 
      name: "Stir", 
      tagline: "Engagement that builds community.",
      desc: "Community management, DM strategy, conversation sparking, and audience nurturing. We don't just post; we interact.",
      visual: (
        <div className="w-full h-full flex items-center justify-center relative">
          <motion.div className="w-48 h-48 border-2 border-dashed border-[#B88A44] rounded-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} />
          <motion.div className="w-32 h-32 border border-[#B88A44] rounded-full absolute" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }} />
          <div className="w-4 h-4 bg-[#F6F1E8] rounded-full absolute top-1/4" />
        </div>
      )
    },
    { 
      num: "05", 
      name: "Serve", 
      tagline: "Results you can measure.",
      desc: "Analytics, monthly reports, strategy refinement, and growth tracking. Delivering the final product and iterating for perfection.",
      visual: (
        <div className="w-full h-full flex items-end justify-center pb-12 gap-4">
          <motion.div className="w-12 bg-[#B88A44]/40 rounded-t-sm" animate={{ height: ["20%", "40%", "20%"] }} transition={{ repeat: Infinity, duration: 4 }} />
          <motion.div className="w-12 bg-[#B88A44]/70 rounded-t-sm" animate={{ height: ["40%", "70%", "40%"] }} transition={{ repeat: Infinity, duration: 4, delay: 0.5 }} />
          <motion.div className="w-12 bg-[#B88A44] rounded-t-sm" animate={{ height: ["60%", "100%", "60%"] }} transition={{ repeat: Infinity, duration: 4, delay: 1 }} />
        </div>
      )
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-[#121212] text-[#F6F1E8] min-h-screen"
    >
      <SEO 
        title="The Overtime Method — Overtime Tea" 
        description="Discover the Overtime Method: a 5-step creative process from brand understanding to delivering unforgettable social media presence." 
      />

      <section className="min-h-[70vh] flex flex-col justify-center px-6 pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto z-10">
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-6 leading-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            The Overtime<br/>Method
          </motion.h1>
          <motion.p 
            className="text-2xl text-white/60 font-light max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Every brand deserves overtime-level attention.
          </motion.p>
        </div>
        
        {/* Decorative background element */}
        <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-[#4B3124]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      </section>

      <div className="container mx-auto px-6 py-20">
        {steps.map((step, index) => (
          <motion.div 
            key={step.num}
            className={`min-h-[80vh] flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 py-20 border-t border-white/10`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <span className="text-[#B88A44] font-serif text-8xl md:text-[12rem] font-bold opacity-20 leading-none -mb-12 md:-mb-20 pointer-events-none">{step.num}</span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 relative z-10">{step.name}</h2>
              <h3 className="text-2xl font-light text-[#B88A44] mb-6">{step.tagline}</h3>
              <p className="text-xl text-white/60 max-w-lg leading-relaxed">{step.desc}</p>
            </div>
            <div className="w-full lg:w-1/2 h-[500px] bg-white/5 rounded-3xl relative overflow-hidden">
              {step.visual}
            </div>
          </motion.div>
        ))}
      </div>

      <section className="py-32 bg-[#F6F1E8] text-[#121212] px-6 text-center">
        <div className="container mx-auto max-w-4xl">
          <span className="text-sm uppercase tracking-widest text-[#B88A44] font-semibold mb-6 block">Why This Works</span>
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-10">RIO — Results, Inside & Out.</h2>
          <p className="text-xl text-black/70 mb-12 leading-relaxed">
            A beautiful feed is nothing without a strategy. A great strategy is invisible without execution. 
            We blend data-driven decisions with world-class aesthetics to build a presence that not only looks incredible, but actually performs.
          </p>
          <a href="/contact" className="inline-block px-10 py-5 bg-[#121212] text-[#F6F1E8] rounded-full font-medium tracking-wide hover:bg-[#B88A44] transition-all duration-300">
            Start Your Method
          </a>
        </div>
      </section>
    </motion.div>
  );
};

export default Process;
