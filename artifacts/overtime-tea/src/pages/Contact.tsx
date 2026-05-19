import React from 'react';
import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().min(2, 'Company is required'),
  email: z.string().email('Invalid email address'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Please tell us a bit about your brand'),
});

const Contact = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      service: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "We'll be in touch soon.",
      description: "Your conversation is brewing ☕",
    });
    form.reset();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-[#F6F1E8] min-h-screen"
    >
      <SEO 
        title="Start A Conversation — Overtime Tea" 
        description="Ready to brew something unforgettable? Get in touch with Overtime Tea and let's build your brand's social media presence together." 
      />

      <section className="pt-40 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Col - Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#121212] mb-6 leading-tight">
                Let's brew something <span className="italic text-[#B88A44]">people remember.</span>
              </h1>
              <p className="text-xl text-black/60 mb-12 font-light">
                Because strong brands are never rushed.
              </p>

              <div className="mb-12">
                <h3 className="text-sm uppercase tracking-widest text-[#B88A44] font-semibold mb-6">What to expect</h3>
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <span className="text-[#B88A44] font-serif italic text-xl">01.</span>
                    <div>
                      <h4 className="font-semibold text-[#121212]">We review your brand</h4>
                      <p className="text-black/60 text-sm">We take a deep dive into your current presence.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#B88A44] font-serif italic text-xl">02.</span>
                    <div>
                      <h4 className="font-semibold text-[#121212]">Strategy call in 48hrs</h4>
                      <p className="text-black/60 text-sm">We meet to discuss vision, goals, and possibilities.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#B88A44] font-serif italic text-xl">03.</span>
                    <div>
                      <h4 className="font-semibold text-[#121212]">Proposal within a week</h4>
                      <p className="text-black/60 text-sm">A custom strategy and execution plan.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-widest text-[#B88A44] font-semibold mb-4">Direct Contact</h3>
                <a href="mailto:overtimeteaagency@gmail.com" className="text-xl font-serif text-[#121212] hover:text-[#B88A44] transition-colors border-b border-[#121212] pb-1">
                  overtimeteaagency@gmail.com
                </a>
                <div className="flex gap-4 mt-8">
                  <a href="#" className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-[#B88A44] hover:text-white hover:border-[#B88A44] transition-all text-[#121212]">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-[#B88A44] hover:text-white hover:border-[#B88A44] transition-all text-[#121212]">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-[#B88A44] hover:text-white hover:border-[#B88A44] transition-all text-[#121212]">
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Col - Form */}
            <motion.div 
              className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-black/5"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#121212]">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe" className="bg-[#F6F1E8]/50 border-black/10 focus-visible:ring-[#B88A44]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#121212]">Brand / Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Brand" className="bg-[#F6F1E8]/50 border-black/10 focus-visible:ring-[#B88A44]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#121212]">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="jane@example.com" className="bg-[#F6F1E8]/50 border-black/10 focus-visible:ring-[#B88A44]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#121212]">Which service?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-[#F6F1E8]/50 border-black/10 focus-visible:ring-[#B88A44]">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="social-media">Social Media Management</SelectItem>
                            <SelectItem value="content-strategy">Content Strategy</SelectItem>
                            <SelectItem value="reels">Reels & Short Form</SelectItem>
                            <SelectItem value="creative-direction">Creative Direction</SelectItem>
                            <SelectItem value="brand-presence">Brand Presence Building</SelectItem>
                            <SelectItem value="content-planning">Content Planning</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#121212]">Tell us about your brand...</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What are your goals?" 
                            className="bg-[#F6F1E8]/50 border-black/10 focus-visible:ring-[#B88A44] min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <button type="submit" className="w-full py-4 bg-[#B88A44] text-white rounded-lg font-medium tracking-wide hover:bg-[#121212] transition-colors duration-300">
                    Brew It
                  </button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 px-6 bg-[#121212] text-[#F6F1E8]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-[#B88A44] mb-5">Who we are</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6">
                We're not an agency.<br />
                <span className="italic text-[#B88A44]">We're a brewing house.</span>
              </h2>
              <p className="text-[#F6F1E8]/60 text-lg font-light leading-relaxed mb-6">
                Founded in 2020 over a late-night cup of tea, Overtime Tea was built on one belief — that social media deserved more than scheduled posts and vanity metrics. It deserved craft.
              </p>
              <p className="text-[#F6F1E8]/60 text-lg font-light leading-relaxed">
                Today we work with 50+ brands across lifestyle, food, fashion, and wellness — building digital presence that actually feels like something.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { stat: '50+', label: 'Brands served' },
                { stat: '2M+', label: 'Content views' },
                { stat: '5 yrs', label: 'In the brew' },
                { stat: '100%', label: 'Transparency' },
              ].map(({ stat, label }) => (
                <div
                  key={label}
                  className="border border-white/10 rounded-2xl p-8 flex flex-col gap-2 hover:border-[#B88A44]/40 transition-colors duration-300"
                >
                  <span className="text-4xl font-serif font-bold text-[#B88A44]">{stat}</span>
                  <span className="text-sm uppercase tracking-widest text-[#F6F1E8]/50">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 pt-16 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { title: 'Overtime is a mindset.', desc: "We don't count hours. We count the care put into every post, every brief, every conversation." },
              { title: 'Strategy before aesthetics.', desc: 'A beautiful feed with no strategy is just a pretty void. We build the why before the what.' },
              { title: 'Honest results always.', desc: "We tell you what's working and what isn't. Transparency isn't a perk — it's how we work." },
            ].map(({ title, desc }) => (
              <div key={title}>
                <h4 className="font-serif text-lg text-[#F6F1E8] mb-2">{title}</h4>
                <p className="text-[#F6F1E8]/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-[#F6F1E8] text-[#121212]">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Frequently Asked</h2>
            <p className="text-white/60 font-light">The details on how we brew.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-white/10">
              <AccordionTrigger className="text-lg font-serif hover:text-[#B88A44]">How quickly can you start?</AccordionTrigger>
              <AccordionContent className="text-white/60 text-base">
                We typically onboard within 1–2 weeks, depending on the scope of the project and our current capacity.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-white/10">
              <AccordionTrigger className="text-lg font-serif hover:text-[#B88A44]">Do you work with small brands?</AccordionTrigger>
              <AccordionContent className="text-white/60 text-base">
                Absolutely. We love working with emerging brands to help them establish a strong foundational presence.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-white/10">
              <AccordionTrigger className="text-lg font-serif hover:text-[#B88A44]">What platforms do you cover?</AccordionTrigger>
              <AccordionContent className="text-white/60 text-base">
                Instagram, TikTok, LinkedIn, Facebook, and Twitter/X. We focus on where your audience actually spends their time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-white/10">
              <AccordionTrigger className="text-lg font-serif hover:text-[#B88A44]">Is there a minimum contract?</AccordionTrigger>
              <AccordionContent className="text-white/60 text-base">
                We offer both monthly retainers (typically 3-month minimum to see real results) and project-based work for specific campaigns or creative direction.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-white/10">
              <AccordionTrigger className="text-lg font-serif hover:text-[#B88A44]">How do you measure success?</AccordionTrigger>
              <AccordionContent className="text-white/60 text-base">
                Through engagement rate, reach, follower growth, and website traffic originating from social channels. We provide detailed monthly reports.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

    </motion.div>
  );
};

export default Contact;
