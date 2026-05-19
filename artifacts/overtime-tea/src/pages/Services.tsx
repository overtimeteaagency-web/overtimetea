import React from 'react';
import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { useContent } from '@/context/ContentContext';

const serviceStyles = [
  { bg: 'bg-[#121212]', text: 'text-[#F6F1E8]', accent: 'text-[#B88A44]' },
  { bg: 'bg-[#F6F1E8]', text: 'text-[#121212]', accent: 'text-[#4B3124]' },
  { bg: 'bg-[#4B3124]', text: 'text-[#F6F1E8]', accent: 'text-[#D8C2A8]' },
  { bg: 'bg-[#121212]', text: 'text-[#F6F1E8]', accent: 'text-[#B88A44]' },
  { bg: 'bg-[#F6F1E8]', text: 'text-[#121212]', accent: 'text-[#5E6B52]' },
  { bg: 'bg-[#121212]', text: 'text-[#F6F1E8]', accent: 'text-[#B88A44]' },
];

const Services = () => {
  const { content } = useContent();
  const services = content.services.map((s, i) => ({ ...s, ...serviceStyles[i] }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-[#121212] min-h-screen"
    >
      <SEO 
        title="Services — Overtime Tea" 
        description="From social media management to reels, creative direction, and content strategy — discover how Overtime Tea brews results for your brand." 
      />

      <section className="pt-40 pb-32 px-6 border-b border-white/10">
        <div className="container mx-auto">
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-[9rem] font-serif font-bold text-[#F6F1E8] mb-6 leading-none tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            What We're<br/>Brewing.
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white/60 max-w-3xl font-light mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            A full suite of creative and strategic services designed to elevate your brand's digital presence.
          </motion.p>
        </div>
      </section>

      <div>
        {services.map((service, i) => (
          <section key={service.num} className={`${service.bg} ${service.text} py-32 px-6 relative overflow-hidden`}>
            <div className="container mx-auto">
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                {/* Number & Visual */}
                <div className="lg:col-span-4 relative">
                  <span className={`${service.accent} font-serif text-[10rem] md:text-[14rem] font-bold leading-none block -mt-12 opacity-80`}>
                    {service.num}
                  </span>
                </div>

                {/* Content */}
                <div className="lg:col-span-8 z-10">
                  <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6">{service.title}</h2>
                  <h3 className={`text-2xl font-light mb-8 ${service.accent}`}>{service.tagline}</h3>
                  <p className="text-xl opacity-80 max-w-2xl mb-12 leading-relaxed">
                    {service.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-lg opacity-90">
                        <CheckCircle2 size={20} className={service.accent} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Subtle background divider */}
            {i !== services.length - 1 && (
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-current opacity-10" />
            )}
          </section>
        ))}
      </div>

      <section className="py-32 bg-[#B88A44] text-white px-6 text-center">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-10 text-[#121212]">Ready to place an order?</h2>
          <Link href="/contact" className="inline-flex items-center gap-4 px-10 py-5 bg-[#121212] text-white rounded-full font-medium tracking-wide hover:bg-[#F6F1E8] hover:text-[#121212] transition-all duration-300 text-lg group">
            Let's brew <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

    </motion.div>
  );
};

export default Services;
