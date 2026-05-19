import { Link } from 'wouter';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#121212] text-[#F6F1E8] py-16 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="text-3xl font-serif font-bold tracking-wider flex items-center gap-2 mb-6">
              Overtime Tea <span className="text-2xl text-[#B88A44]">☕</span>
            </Link>
            <p className="text-white/60 font-light max-w-sm text-lg">
              Brewed overtime for better conversations.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-widest text-[#B88A44] font-semibold mb-6">Explore</h4>
            <div className="flex flex-col gap-4">
              <Link href="/services" className="text-white/70 hover:text-white transition-colors">Services</Link>
              <Link href="/process" className="text-white/70 hover:text-white transition-colors">Method</Link>
              <Link href="/work" className="text-white/70 hover:text-white transition-colors">Work</Link>
              <Link href="/insights" className="text-white/70 hover:text-white transition-colors">Insights</Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-widest text-[#B88A44] font-semibold mb-6">Connect</h4>
            <div className="flex flex-col gap-4">
              <Link href="/contact" className="text-white/70 hover:text-white transition-colors">Contact Us</Link>
              <a href="mailto:overtimeteaagency@gmail.com" className="text-white/70 hover:text-white transition-colors">overtimeteaagency@gmail.com</a>
              <div className="flex gap-4 mt-2">
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#B88A44] hover:border-[#B88A44] transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#B88A44] hover:border-[#B88A44] transition-all">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#B88A44] hover:border-[#B88A44] transition-all">
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
          <p>© {new Date().getFullYear()} Overtime Tea Agency. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
