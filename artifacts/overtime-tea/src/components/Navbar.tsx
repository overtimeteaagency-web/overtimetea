import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Process', href: '/process' },
  { name: 'Work', href: '/work' },
  { name: 'Insights', href: '/insights' },
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

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHome = location === '/';

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#121212]/85 backdrop-blur-xl py-4 shadow-sm border-b border-white/10'
            : 'bg-gradient-to-b from-black/40 to-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-serif font-bold tracking-widest z-50 relative"
            style={{ color: '#F6F1E8' }}
          >
            Overtime Tea
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {links.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm tracking-widest uppercase font-medium transition-colors duration-200 group py-1"
                  style={{ color: isActive ? '#B88A44' : '#F6F1E8' }}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-[#B88A44] transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}

            <Link
              href="/contact"
              className="ml-2 px-5 py-2 text-sm uppercase tracking-widest font-medium rounded-full border border-[#B88A44] text-[#B88A44] relative overflow-hidden group transition-colors duration-300"
            >
              <span className="relative z-10 group-hover:text-[#121212] transition-colors duration-300">
                Contact
              </span>
              <span className="absolute inset-0 bg-[#B88A44] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden relative z-50"
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

        {/* Marquee Ticker — only on Home, only when not scrolled */}
        {isHome && (
          <div
            className={`w-full overflow-hidden bg-[#F6F1E8] text-[#121212] py-2 text-[10px] uppercase tracking-[0.25em] whitespace-nowrap absolute -bottom-8 left-0 transition-opacity duration-300 ${
              scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <div className="inline-block animate-marquee">
              {[
                'Social Media Management',
                'Content Strategy',
                'Reels & Short Form',
                'Creative Direction',
                'Brand Presence',
                'Content Planning',
                'Social Media Management',
                'Content Strategy',
                'Reels & Short Form',
                'Creative Direction',
                'Brand Presence',
                'Content Planning',
              ].map((item, i) => (
                <span key={i} className="mx-6">
                  {item}
                  {i < 11 && <span className="ml-6 opacity-40">·</span>}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#121212] flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-6 text-center">
              {[...links, { name: 'Contact', href: '/contact' }].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.15, ease: 'easeOut' }}
                >
                  <Link
                    href={link.href}
                    className={`text-4xl font-serif transition-colors duration-200 ${
                      location === link.href ? 'text-[#B88A44]' : 'text-[#F6F1E8] hover:text-[#B88A44]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <p className="absolute bottom-10 text-xs tracking-widest uppercase text-[#F6F1E8]/30 font-sans">
              overtimeteaagency@gmail.com
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
