import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'Home', href: '/', num: '01' },
  { name: "What We're Brewing", href: '/services', num: '02' },
  { name: 'The Overtime Method', href: '/process', num: '03' },
  { name: 'Conversations', href: '/work', num: '04' },
  { name: 'Thoughts', href: '/insights', num: '05' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHome = location === '/';

  const textLight = !scrolled;

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#121212]/80 backdrop-blur-xl py-4 shadow-sm border-b border-white/10' : 'bg-gradient-to-b from-black/50 to-transparent py-6'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif font-bold tracking-wider z-50 relative" style={{ color: '#F6F1E8' }}>
            Overtime Tea
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm uppercase tracking-widest font-medium transition-colors relative group py-2 flex items-start gap-1 ${isActive ? 'text-[#B88A44]' : 'hover:text-[#B88A44]'}`}
                  style={{ color: isActive ? '#B88A44' : '#F6F1E8' }}
                >
                  <span className="opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 text-[10px] text-[#B88A44] transition-all absolute -top-1 -right-4 font-sans font-bold">
                    {link.num}
                  </span>
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-[#B88A44] transition-all duration-300 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="px-6 py-2 border border-[#B88A44] text-[#B88A44] rounded-full text-sm uppercase tracking-widest hover:bg-[#B88A44] hover:text-white transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Start A Conversation</span>
              <div className="absolute inset-0 bg-[#B88A44] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden relative z-50"
            style={{ color: '#F6F1E8' }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Marquee Ticker - Only on Home */}
        {isHome && (
          <div className={`w-full overflow-hidden bg-foreground text-background py-2 text-xs uppercase tracking-[0.2em] whitespace-nowrap transition-opacity duration-300 absolute -bottom-8 left-0 ${scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="inline-block animate-marquee">
              <span className="mx-4">Social Media Management</span>•
              <span className="mx-4">Content Strategy</span>•
              <span className="mx-4">Reels & Short Form</span>•
              <span className="mx-4">Creative Direction</span>•
              <span className="mx-4">Brand Presence</span>•
              <span className="mx-4">Content Planning</span>•
              {/* Duplicate for infinite effect */}
              <span className="mx-4">Social Media Management</span>•
              <span className="mx-4">Content Strategy</span>•
              <span className="mx-4">Reels & Short Form</span>•
              <span className="mx-4">Creative Direction</span>•
              <span className="mx-4">Brand Presence</span>•
              <span className="mx-4">Content Planning</span>•
            </div>
          </div>
        )}
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#121212] flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-8 text-center">
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <Link
                    href={link.href}
                    className="text-4xl font-serif text-[#F6F1E8] hover:text-[#B88A44] transition-colors flex items-center justify-center gap-4"
                  >
                    <span className="text-sm font-sans text-[#B88A44] mb-4">{link.num}</span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.1 + 0.2 }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  className="px-8 py-4 border border-[#B88A44] text-[#B88A44] rounded-full text-lg uppercase tracking-widest hover:bg-[#B88A44] hover:text-white transition-all duration-300"
                >
                  Start A Conversation
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
