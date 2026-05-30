import { Link } from 'wouter';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export const Footer = () => {
  const { content } = useContent();
  const { brandName, email, footerTagline, instagramUrl, linkedinUrl, twitterUrl, logoUrl } = content.global;

  return (
    <footer className="bg-[#121212] text-[#F6F1E8] py-12 md:py-16 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              {logoUrl ? (
                <img src={logoUrl} alt={brandName} className="h-8 md:h-10 w-auto object-contain max-w-[160px]" />
              ) : (
                <span className="text-2xl md:text-3xl font-serif font-bold tracking-wider">
                  {brandName} <span className="text-[#B88A44]"></span>
                </span>
              )}
            </Link>
            <p className="text-white/60 font-light max-w-sm text-base md:text-lg">
              {footerTagline || 'Brewed overtime for better conversations.'}
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#B88A44] font-semibold mb-5 md:mb-6">Explore</h4>
            <div className="flex flex-col gap-3 md:gap-4">
              <Link href="/services" className="text-white/70 hover:text-white transition-colors text-sm md:text-base">Services</Link>
              <Link href="/process" className="text-white/70 hover:text-white transition-colors text-sm md:text-base">Method</Link>
              <Link href="/work" className="text-white/70 hover:text-white transition-colors text-sm md:text-base">Work</Link>
              <Link href="/insights" className="text-white/70 hover:text-white transition-colors text-sm md:text-base">Insights</Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#B88A44] font-semibold mb-5 md:mb-6">Connect</h4>
            <div className="flex flex-col gap-3 md:gap-4">
              <Link href="/contact" className="text-white/70 hover:text-white transition-colors text-sm md:text-base">Contact Us</Link>
              <a href={`mailto:${email}`} className="text-white/70 hover:text-white transition-colors text-sm md:text-base break-all">{email}</a>
              <div className="flex gap-3 mt-1">
                <a href={instagramUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#B88A44] hover:border-[#B88A44] transition-all">
                  <Instagram size={16} />
                </a>
                <a href={linkedinUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#B88A44] hover:border-[#B88A44] transition-all">
                  <Linkedin size={16} />
                </a>
                <a href={twitterUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#B88A44] hover:border-[#B88A44] transition-all">
                  <Twitter size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs md:text-sm text-white/40 gap-4">
          <p>© {new Date().getFullYear()} {brandName} Agency. All rights reserved.</p>
          <div className="flex gap-4 md:gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
