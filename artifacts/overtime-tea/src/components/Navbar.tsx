import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

const links = [
  { name: 'Home', href: '/' },
  { name: "What We're Brewing", href: '/services' },
  { name: 'The Overtime Method', href: '/process' },
  { name: 'Conversations', href: '/work' },
  { name: 'Thoughts', href: '/insights' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const { content } = useContent();
  const { brandName, logoUrl } = content.global;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHome = location === '/';

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#121212]/80 backdrop-blur-xl py-4 shadow-sm border-b border-white/10'
            : 'bg-gradient-to-b from-black/50 to-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center z-50 relative" style={{ color: '#F6F1E8' }}>
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={brandName}
                className="h-8 md:h-10 w-auto object-contain max-w-[140px] md:max-w-[180px]"
              />
            ) : (
              <span className="text-xl md:text-2xl font-serif font-bold tracking-wider">
                {brandName}
              </span>
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm uppercase tracking-widest font-medium transition-colors relative group py-2"
                  style={{ color: isActive ? '#B88A44' : '#F6F1E8' }}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#B88A44] transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="px-6 py-2 border border-[#B88A44] text-[#B88A44] rounded-full text-sm uppercase tracking-widest relative overflow-hidden group transition-colors duration-300"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Start A Conversation
              </span>
              <span className="absolute inset-0 bg-[#B88A44] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden relative z-50 p-1"
            style={{ color: '#F6F1E8' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={menuOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>

        {/* Marquee Ticker — Home only */}
        {isHome && (
          <div
            className={`w-full overflow-hidden bg-foreground text-background py-2 text-xs uppercase tracking-[0.2em] whitespace-nowrap absolute -bottom-8 left-0 transition-opacity duration-300 ${
              scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <div className="inline-block animate-marquee">
              <span className="mx-4">Social Media Management</span>•
              <span className="mx-4">Content Strategy</span>•
              <span className="mx-4">Reels & Short Form</span>•
              <span className="mx-4">Creative Direction</span>•
              <span className="mx-4">Brand Presence</span>•
              <span className="mx-4">Content Planning</span>•
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
            className="fixed inset-0 z-40 bg-[#121212] flex flex-col justify-center items-center px-6"
          >
            <div className="flex flex-col gap-6 md:gap-8 text-center w-full max-w-sm">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 + 0.2 }}
                >
                  <Link
                    href={link.href}
                    className={`text-3xl md:text-4xl font-serif transition-colors block ${
                      location === link.href ? 'text-[#B88A44]' : 'text-[#F6F1E8] hover:text-[#B88A44]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.08 + 0.2 }}
                className="mt-4"
              >
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 border border-[#B88A44] text-[#B88A44] rounded-full text-base uppercase tracking-widest hover:bg-[#B88A44] hover:text-white transition-all duration-300"
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
