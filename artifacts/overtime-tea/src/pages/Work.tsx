import React from 'react';
import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

const Work = () => {
  const projects = [
    { name: "Vessel Coffee", category: "Brand Identity & Social", metrics: "+240% Engagement", stat: "15k → 52k followers in 3 months", img: "/images/vessel-coffee.png", bg: "from-[#4B3124]/40" },
    { name: "Hum Studio", category: "Content Strategy", metrics: "4.2M Views", stat: "Viral reel series", img: "/images/hum-studio.png", bg: "from-[#5E6B52]/40" },
    { name: "The Basil Brand", category: "Social Media Management", metrics: "+89% Engagement", stat: "Content strategy overhaul", img: "https://images.unsplash.com/photo-1523688688410-53b49ee2f877?w=800&auto=format&fit=crop&q=80", bg: "from-[#D8C2A8]/40" },
    { name: "Lune Collective", category: "Creative Direction", metrics: "2.1M Reach", stat: "60-day campaign", img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=80", bg: "from-[#B88A44]/40" },
    { name: "Drift & Co.", category: "Brand Presence", metrics: "+10k Followers", stat: "30-day growth", img: "https://images.unsplash.com/photo-1512413513110-388a18357eb4?w=800&auto=format&fit=crop&q=80", bg: "from-[#121212]/40" },
    { name: "Ora Beauty", category: "Full-Service Management", metrics: "+300% Traffic", stat: "Social-driven revenue", img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&auto=format&fit=crop&q=80", bg: "from-[#4B3124]/40" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-[#F6F1E8] min-h-screen"
    >
      <SEO 
        title="Our Work — Overtime Tea" 
        description="Explore the conversations Overtime Tea has started for brands across industries — from social media growth to viral content campaigns." 
      />

      <section className="pt-40 pb-20 px-6 bg-[#121212] text-[#F6F1E8]">
        <div className="container mx-auto">
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Conversations<br/>We've Started
          </motion.h1>
          <motion.p 
            className="text-xl text-white/70 max-w-2xl font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Every brand has a story. We help tell it louder.
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <motion.div 
                key={project.name}
                className="group relative overflow-hidden aspect-[4/3] bg-[#121212] cursor-pointer rounded-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              >
                <img 
                  src={project.img} 
                  alt={project.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.bg} via-[#121212]/50 to-transparent transition-opacity duration-500 flex flex-col justify-end p-8`} />
                <div className="absolute inset-0 flex flex-col justify-end p-8 z-10 group-hover:-translate-y-4 transition-transform duration-500">
                  <p className="text-[#B88A44] text-sm font-semibold tracking-widest uppercase mb-2">{project.category}</p>
                  <h3 className="text-4xl font-serif text-white mb-2">{project.name}</h3>
                  <div className="flex items-center gap-2 text-white/90 font-medium">
                    <CheckCircle2 size={18} className="text-[#B88A44]" /> 
                    <span className="text-[#B88A44]">{project.metrics}</span> — {project.stat}
                  </div>
                  <div className="h-0 overflow-hidden group-hover:h-12 transition-all duration-500 mt-4">
                    <span className="inline-flex items-center gap-2 text-white font-medium bg-white/10 px-6 py-2 rounded-full backdrop-blur-md">
                      View Conversation <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-black/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-widest font-semibold text-black/40 mb-12">Brands we've worked with</p>
          <div className="flex flex-wrap justify-center gap-12 text-2xl font-serif text-black/60">
            <span>Vessel Coffee</span>
            <span>Hum Studio</span>
            <span>The Basil Brand</span>
            <span>Lune Collective</span>
            <span>Drift & Co.</span>
            <span>Ora Beauty</span>
          </div>

          <div className="mt-20">
            <h2 className="text-4xl font-serif font-bold mb-8 text-[#121212]">Want to be next?</h2>
            <Link href="/contact" className="inline-block px-10 py-4 bg-[#121212] text-[#F6F1E8] rounded-full font-medium tracking-wide hover:bg-[#B88A44] transition-all duration-300">
              Start A Conversation
            </Link>
          </div>
        </div>
      </section>

    </motion.div>
  );
};

export default Work;
