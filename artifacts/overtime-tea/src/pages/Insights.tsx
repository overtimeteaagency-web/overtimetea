import React from 'react';
import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { useContent } from '@/context/ContentContext';

const Insights = () => {
  const { content } = useContent();
  const posts = content.insights;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-[#F6F1E8] min-h-screen"
    >
      <SEO 
        title="Tea Break Thoughts — Overtime Tea" 
        description="Insights, perspectives, and creative thinking from the Overtime Tea team on social media, branding, and the art of meaningful content." 
      />

      <section className="pt-28 md:pt-40 pb-12 md:pb-20 px-4 md:px-6 border-b border-black/10">
        <div className="container mx-auto">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 text-[#121212]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Tea Break<br/>Thoughts
          </motion.h1>
          <motion.p 
            className="text-xl text-black/60 max-w-2xl font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Insights, perspectives, and creative thinking from our team.
          </motion.p>
        </div>
      </section>

      {/* Featured Insight */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div 
            className="group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="aspect-[4/3] bg-[#121212] overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&auto=format&fit=crop&q=80" alt="Featured" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" />
            </div>
            <div>
              <div className="text-sm uppercase tracking-widest text-[#B88A44] font-semibold mb-4 flex gap-4">
                <span>{posts[0].category}</span>
                <span className="text-black/30">•</span>
                <span className="text-black/50">{posts[0].read}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#121212] mb-6 group-hover:text-[#B88A44] transition-colors">
                {posts[0].title}
              </h2>
              <p className="text-lg text-black/60 mb-8 max-w-lg">
                {posts[0].excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-[#121212] font-medium border-b border-[#121212] pb-1 group-hover:border-[#B88A44] group-hover:text-[#B88A44] transition-all">
                Read Article <ArrowRight size={16} />
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.slice(1).map((post, i) => (
              <motion.article 
                key={post.title}
                className="flex flex-col group cursor-pointer h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mb-6 overflow-hidden rounded-lg aspect-video bg-[#F6F1E8]">
                   <div className="w-full h-full bg-[#121212]/5 group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="text-xs uppercase tracking-widest text-[#B88A44] font-semibold mb-4 flex gap-3">
                  <span>{post.category}</span>
                  <span className="text-black/30">•</span>
                  <span className="text-black/50">{post.read}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#121212] leading-snug mb-4 group-hover:text-[#B88A44] transition-colors">
                  {post.title}
                </h3>
                <p className="text-black/60 mb-8 flex-grow">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <span className="text-sm font-medium border-b border-black/20 pb-1 group-hover:border-[#B88A44] group-hover:text-[#B88A44] transition-colors">
                    Read Article
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-[#121212] text-[#F6F1E8] text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">More tea?</h2>
          <p className="text-white/60 mb-10 text-lg">Subscribe to our newsletter for weekly insights on branding, social media, and creative strategy.</p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-white/5 border border-white/20 rounded-full px-6 py-4 text-white focus:outline-none focus:border-[#B88A44] w-full sm:w-auto flex-grow max-w-md"
            />
            <button className="px-8 py-4 bg-[#B88A44] text-white rounded-full font-medium hover:bg-[#a67b3b] transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </motion.div>
  );
};

export default Insights;
