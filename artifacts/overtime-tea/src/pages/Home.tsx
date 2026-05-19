import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Instagram, Linkedin, Twitter, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

// Custom Hook for Mouse Position
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  
  return mousePosition;
};

// --- Shared Components ---

const SteamDivider = () => (
  <div className="w-full h-24 overflow-hidden relative opacity-50 flex items-center justify-center">
    <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
      <motion.path
        d="M0,50 Q250,0 500,50 T1000,50"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-secondary opacity-30"
        animate={{
          d: [
            "M0,50 Q250,0 500,50 T1000,50",
            "M0,50 Q250,100 500,50 T1000,50",
            "M0,50 Q250,0 500,50 T1000,50"
          ]
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.path
        d="M0,70 Q250,20 500,70 T1000,70"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-accent opacity-20"
        animate={{
          d: [
            "M0,70 Q250,20 500,70 T1000,70",
            "M0,70 Q250,120 500,70 T1000,70",
            "M0,70 Q250,20 500,70 T1000,70"
          ]
        }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />
    </svg>
  </div>
);

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

// --- Main Page Sections ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Cup */}
        <motion.div 
          className="absolute bottom-0 w-16 h-12 border-4 border-foreground rounded-b-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />
        {/* Steam */}
        <motion.div 
          className="absolute top-0 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-8 bg-accent rounded-full blur-[1px]"
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
        className="mt-8 font-serif text-xl tracking-widest text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        BREWING...
      </motion.p>
    </motion.div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', href: '#home' },
    { name: "What We're Brewing", href: '#services' },
    { name: 'The Overtime Method', href: '#method' },
    { name: 'Conversations', href: '#portfolio' },
    { name: 'Thoughts', href: '#blog' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-background/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-serif font-bold tracking-wider text-foreground flex items-center gap-2">
          Overtime Tea <span className="text-xl">☕</span>
        </a>
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm uppercase tracking-widest font-medium text-foreground/80 hover:text-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a 
            href="#cta" 
            className="px-6 py-2 border border-foreground/20 rounded-full text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Start A Conversation
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image / Texture */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero.png" 
          alt="Atmospheric Tea House" 
          className="w-full h-full object-cover object-center opacity-40 mix-blend-multiply filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
              x: Math.sin(i) * 20
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
          <span className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-6 block">
            The Atelier of Social Media
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground leading-tight mb-6 max-w-5xl mx-auto">
            Brewed overtime for <br className="hidden md:block"/> 
            <span className="italic font-light text-secondary">better conversations.</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            We help brands turn content into conversations through strategy, storytelling, and overtime-level creative effort.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <a href="#cta" className="px-8 py-4 bg-foreground text-background rounded-full font-medium tracking-wide hover:bg-secondary transition-all duration-300 flex items-center gap-2 group">
            Start A Conversation
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#services" className="px-8 py-4 border border-foreground/20 text-foreground rounded-full font-medium tracking-wide hover:border-foreground transition-all duration-300">
            See What We're Brewing
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest text-foreground/50">Scroll</span>
        <motion.div 
          className="w-[1px] h-12 bg-foreground/20 overflow-hidden"
        >
          <motion.div 
            className="w-full h-1/2 bg-accent"
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: "Social Media Management", desc: "Steeped in strategy.", detail: "End-to-end management that builds community and drives engagement." },
    { title: "Content Strategy", desc: "Served with creativity.", detail: "Data-informed pillars that translate your brand into compelling narratives." },
    { title: "Reels & Short Form", desc: "Built with overtime effort.", detail: "High-retention vertical video that captures attention in the first 3 seconds." },
    { title: "Creative Direction", desc: "Crafted with intention.", detail: "Visual systems that elevate your aesthetic and ensure brand consistency." },
    { title: "Brand Presence Building", desc: "Poured with purpose.", detail: "Establishing a commanding digital footprint across all relevant touchpoints." },
    { title: "Content Planning", desc: "Brewed for the long run.", detail: "Meticulous calendars that balance trend-reaction with evergreen storytelling." },
  ];

  return (
    <section id="services" className="py-32 bg-background relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">What We're Brewing</h2>
          <div className="w-16 h-[1px] bg-accent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="group relative h-64 border border-foreground/10 p-8 flex flex-col justify-end overflow-hidden bg-background hover:border-accent/50 transition-colors duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
            >
              {/* Hover background effect */}
              <div className="absolute inset-0 bg-muted/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors duration-300">{service.title}</h3>
                <p className="text-secondary italic font-serif text-lg mb-4">{service.desc}</p>
                
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500">
                  <p className="text-sm text-foreground/70">{service.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Method = () => {
  const steps = [
    { num: "01", name: "Steep", desc: "Understanding the brand, audience, and story." },
    { num: "02", name: "Brew", desc: "Building strategy and creative direction." },
    { num: "03", name: "Pour", desc: "Designing engaging content and experiences." },
    { num: "04", name: "Stir", desc: "Creating conversations and audience connection." },
    { num: "05", name: "Serve", desc: "Delivering memorable brand presence and results." },
  ];

  return (
    <section id="method" className="py-32 bg-foreground text-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3 sticky top-32">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">The Overtime Method</h2>
            <p className="text-background/70 text-lg font-light">
              Greatness cannot be rushed. Our process is designed to extract the most potent essence of your brand.
            </p>
          </div>
          
          <div className="lg:w-2/3 flex flex-col gap-12 border-l border-background/20 pl-8 md:pl-12">
            {steps.map((step, i) => (
              <motion.div 
                key={step.num}
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute -left-[3.25rem] md:-left-[4.25rem] top-2 w-4 h-4 rounded-full bg-background border-4 border-foreground" />
                <span className="text-accent font-serif text-2xl italic mb-2 block">Step {step.num}</span>
                <h3 className="text-3xl font-semibold mb-3">{step.name}</h3>
                <p className="text-background/60 text-lg max-w-md">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
    </section>
  );
};

const WhyUs = () => {
  return (
    <section className="py-32 bg-background relative">
      <SteamDivider />
      <div className="container mx-auto px-6 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Most agencies manage pages.<br/>
            <span className="italic text-secondary">We build conversations.</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-foreground/70 font-light mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            We believe in strategy-first approaches, culture-aware branding, and emotional content. 
            We build recall, not just reach. Our core principle is simple: <strong className="font-semibold text-accent">RIO — Results, Inside & Out.</strong>
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: 3, suffix: "x", label: "Avg Engagement Lift" },
              { num: 50, suffix: "+", label: "Brands Served" },
              { num: 100, suffix: "%", label: "Overtime Effort" }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                className="p-8 border border-foreground/10 flex flex-col items-center justify-center bg-muted/10"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.4 }}
              >
                <div className="text-5xl font-serif font-bold text-secondary mb-2 flex items-center">
                  <AnimatedCounter to={stat.num} />{stat.suffix}
                </div>
                <div className="text-sm uppercase tracking-widest text-foreground/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    { name: "Vessel Coffee", category: "Brand Identity & Social", metrics: "+240% Engagement", img: "/images/vessel-coffee.png" },
    { name: "Hum Studio", category: "Content Strategy", metrics: "50k Organic Reach", img: "/images/hum-studio.png" },
    { name: "The Basil Brand", category: "Social Media Management", metrics: "+180% Follower Growth", img: "https://images.unsplash.com/photo-1523688688410-53b49ee2f877?w=800&auto=format&fit=crop&q=80" },
    { name: "Oasis Wellness", category: "Creative Direction", metrics: "3x Conversion Rate", img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=80" },
  ];

  return (
    <section id="portfolio" className="py-32 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Conversations We've Started</h2>
            <p className="text-foreground/70 max-w-lg">A curated gallery of brands we've helped brew overtime.</p>
          </motion.div>
          <motion.a 
            href="#cta"
            className="flex items-center gap-2 text-accent font-medium hover:text-secondary transition-colors"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            View All Work <ArrowRight size={16} />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div 
              key={project.name}
              className="group relative overflow-hidden aspect-[4/3] bg-foreground/5 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
            >
              <img 
                src={project.img} 
                alt={project.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:blur-[2px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">{project.category}</p>
                <h3 className="text-3xl font-serif text-background mb-2">{project.name}</h3>
                <div className="flex items-center gap-2 text-background/80 text-sm">
                  <CheckCircle2 size={14} className="text-accent" /> {project.metrics}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Blog = () => {
  const posts = [
    { title: "People don't remember content. They remember how brands made them feel.", date: "Oct 12", read: "4 min read" },
    { title: "Good branding is never rushed. The art of slow growth.", date: "Sep 28", read: "6 min read" },
    { title: "The best conversations stay longer than trends.", date: "Sep 15", read: "5 min read" },
  ];

  return (
    <section id="blog" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Tea Break Thoughts</h2>
          <div className="w-16 h-[1px] bg-accent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {posts.map((post, i) => (
            <motion.article 
              key={post.title}
              className="flex flex-col group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-xs uppercase tracking-widest text-foreground/50 mb-4 flex gap-4">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.read}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground leading-snug mb-6 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <div className="mt-auto">
                <span className="text-sm font-medium border-b border-foreground/20 pb-1 group-hover:border-accent transition-colors">
                  Read Article
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    { quote: "Overtime Tea didn't just manage our social media; they completely redefined our brand's voice. The engagement speaks for itself.", author: "Sarah Jenkins", role: "Founder, Vessel Coffee" },
    { quote: "The level of care and 'overtime effort' they put into every post makes them feel like an in-house team.", author: "Marcus Thorne", role: "CMO, Hum Studio" },
    { quote: "Finally, an agency that understands that real community building takes patience, strategy, and exceptional taste.", author: "Elena Rostova", role: "Director, Oasis Wellness" }
  ];

  return (
    <section className="py-32 bg-secondary text-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent via-transparent to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-16 text-background/80">Whispers in the Tea Room</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, i) => (
            <motion.div 
              key={i}
              className="bg-foreground/20 backdrop-blur-md p-8 rounded-sm border border-background/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-accent text-4xl font-serif mb-4">"</div>
              <p className="text-lg font-light italic mb-8 leading-relaxed">
                {test.quote}
              </p>
              <div>
                <p className="font-semibold text-background">{test.author}</p>
                <p className="text-sm text-background/60">{test.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section id="cta" className="py-40 bg-foreground text-background relative overflow-hidden flex items-center justify-center text-center">
      {/* Slow moving steam background */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-20"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
          scale: [1, 1.1, 1]
        }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(184, 138, 68, 0.4) 0%, transparent 50%)',
          backgroundSize: '200% 200%'
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6">
            Let's brew something <br/>
            <span className="italic text-accent">people remember.</span>
          </h2>
          <p className="text-xl text-background/60 mb-12 font-light max-w-2xl mx-auto">
            Because strong brands are never rushed. Drop us a line and let's start the conversation.
          </p>
          <a href="mailto:overtimeteaagency@gmail.com" className="inline-block px-10 py-5 bg-accent text-foreground font-semibold tracking-wider uppercase text-sm rounded-full hover:bg-background transition-colors duration-300">
            Start A Conversation
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-background py-12 border-t border-foreground/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="text-2xl font-serif font-bold text-foreground">
            Overtime Tea <span className="text-xl">☕</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-foreground/60 hover:text-accent transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-foreground/60 hover:text-accent transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-foreground/60 hover:text-accent transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-foreground/50 gap-4">
          <p>Brewed overtime for better conversations.</p>
          <div className="flex gap-6">
            <a href="mailto:overtimeteaagency@gmail.com" className="hover:text-foreground transition-colors">overtimeteaagency@gmail.com</a>
            <span>&copy; {new Date().getFullYear()} Overtime Tea.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Custom Cursor ---
const Cursor = () => {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  // Don't render cursor on mobile/touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      animate={{
        x: x - 8,
        y: y - 8,
        scale: isHovering ? 2.5 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
    />
  );
};

// --- Progress Bar ---
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent transform origin-left z-[100]"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-background min-h-screen selection:bg-accent selection:text-background font-sans">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <ScrollProgress />
      <Cursor />
      
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar />
          <Hero />
          <Services />
          <Method />
          <WhyUs />
          <Portfolio />
          <Blog />
          <Testimonials />
          <CTA />
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
