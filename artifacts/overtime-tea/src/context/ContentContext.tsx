import React, { createContext, useContext, useState, useEffect } from 'react';

/* ── Types ─────────────────────────────────────────────── */

export interface Service {
  num: string;
  title: string;
  tagline: string;
  desc: string;
  deliverables: string[];
}

export interface ProcessStep {
  num: string;
  name: string;
  verb: string;
  color: string;
  light: string;
  tagline: string;
  desc: string;
  insight: string;
  deliverables: string[];
  visual: string;
}

export interface InsightPost {
  title: string;
  excerpt: string;
  date: string;
  read: string;
  category: string;
  imageUrl: string;
}

export interface WorkProject {
  name: string;
  handle: string;
  category: string;
  metrics: string;
  stat: string;
  followers: string;
  color: string;
  accent: string;
  tagline: string;
  results: { label: string; value: string }[];
}

export interface SiteContent {
  global: {
    brandName: string;
    email: string;
    instagramUrl: string;
    linkedinUrl: string;
    twitterUrl: string;
    footerTagline: string;
  };
  home: {
    heroLine1: string;
    heroLine2: string;
    heroTagline: string;
    heroCta: string;
    badge1: string;
    badge2: string;
    badge3: string;
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
  };
  services: Service[];
  process: ProcessStep[];
  insights: InsightPost[];
  work: WorkProject[];
  contact: {
    heroHeadline1: string;
    heroHeadline2: string;
    heroSubtext: string;
    email: string;
    aboutHeadline1: string;
    aboutHeadline2: string;
    aboutText1: string;
    aboutText2: string;
    stat1: string; stat1Label: string;
    stat2: string; stat2Label: string;
    stat3: string; stat3Label: string;
    stat4: string; stat4Label: string;
    value1Title: string; value1Desc: string;
    value2Title: string; value2Desc: string;
    value3Title: string; value3Desc: string;
  };
}

/* ── Defaults ───────────────────────────────────────────── */

const defaultContent: SiteContent = {
  global: {
    brandName: 'Overtime Tea',
    email: 'overtimeteaagency@gmail.com',
    instagramUrl: '#',
    linkedinUrl: '#',
    twitterUrl: '#',
    footerTagline: 'Premium social media management, brewed with intention.',
  },
  home: {
    heroLine1: 'Your brand deserves',
    heroLine2: 'overtime attention.',
    heroTagline: 'We are a social media management agency that crafts digital presence with the patience of a perfectly brewed cup.',
    heroCta: 'Start A Conversation',
    badge1: '+240% Growth',
    badge2: '4.2M Views',
    badge3: '89% Engagement ↑',
    stat1Number: '50',
    stat1Label: 'Brands Served',
    stat2Number: '4200000',
    stat2Label: 'Content Views',
    stat3Number: '240',
    stat3Label: 'Avg Growth %',
  },
  services: [
    {
      num: '01',
      title: 'Social Media Management',
      tagline: "Your brand's daily voice, crafted with intention.",
      desc: "Full-scale ecosystem management. We don't just post; we build community, drive engagement, and translate your brand values into daily interactions.",
      deliverables: ['Platform Strategy & Management', 'Community Engagement', 'Copywriting & Tone of Voice', 'Growth Tracking', 'Monthly Reporting'],
    },
    {
      num: '02',
      title: 'Content Strategy',
      tagline: "Every post is a chapter in your brand's story.",
      desc: 'Data-informed content pillars that provide a roadmap for everything you publish. We eliminate the guesswork from your feed.',
      deliverables: ['Audience Persona Research', 'Content Pillar Development', 'Competitor Analysis', 'Editorial Calendars', 'Campaign Ideation'],
    },
    {
      num: '03',
      title: 'Reels & Short Form',
      tagline: 'Stop the scroll. Start the conversation.',
      desc: 'High-retention vertical video engineered for algorithmic success. We script, shoot, and edit videos that capture attention in the critical first 3 seconds.',
      deliverables: ['Concept & Scripting', 'Video Editing & Production', 'Trend Adaptation', 'Music Licensing', 'Hook Optimization'],
    },
    {
      num: '04',
      title: 'Creative Direction',
      tagline: 'The vision behind everything your brand puts out.',
      desc: 'Building a cohesive visual language. We ensure that no matter the platform, your brand looks unmistakably premium and recognizable.',
      deliverables: ['Visual Identity Systems', 'Mood Boards & Aesthetics', 'Brand Guidelines', 'Photoshoot Direction', 'Campaign Art Direction'],
    },
    {
      num: '05',
      title: 'Brand Presence Building',
      tagline: 'From unknown to unforgettable.',
      desc: 'Establishing a commanding digital footprint from the ground up. Perfect for new brands or established companies needing a digital refresh.',
      deliverables: ['Profile Optimization', 'Cross-Platform Consistency', 'Bio & Link Strategy', 'Highlight Cover Design', 'Launch Campaigns'],
    },
    {
      num: '06',
      title: 'Content Planning',
      tagline: 'Never run out of ideas. Never miss a moment.',
      desc: 'Meticulous organization of your content flow. We balance real-time trend reaction with evergreen storytelling.',
      deliverables: ['Monthly Content Calendars', 'Seasonal Campaigns', 'Content Batching Systems', 'Asset Organization', 'Publishing Schedules'],
    },
  ],
  process: [
    {
      num: '01', name: 'Steep', verb: 'Understand.',
      color: '#4B3124', light: '#7a5c46',
      tagline: 'We listen before we create.',
      desc: 'Every great brand conversation starts with deep listening. Before a single post is written or pixel is placed, we immerse ourselves completely in your world — your voice, your audience, your story.',
      deliverables: ['Brand Discovery Session', 'Audience Research', 'Competitor Deep-Dive', 'Content Audit', 'Platform Analysis'],
      insight: '"Most agencies start with what to post. We start with who you are."',
      visual: 'steep',
    },
    {
      num: '02', name: 'Brew', verb: 'Strategise.',
      color: '#5E6B52', light: '#8a9e7a',
      tagline: "Strategy that's built to last.",
      desc: 'This is where the formula comes together. We build the full creative and strategic blueprint — content pillars, brand voice, platform strategy, and a content calendar that never feels like a calendar.',
      deliverables: ['Content Strategy Document', 'Brand Voice Guide', 'Platform Playbook', 'Content Pillars', 'Editorial Calendar Framework'],
      insight: '"Your content strategy should feel like a conversation, not a broadcast schedule."',
      visual: 'brew',
    },
    {
      num: '03', name: 'Pour', verb: 'Create.',
      color: '#B88A44', light: '#d4a85c',
      tagline: 'Creation with intention.',
      desc: "Here's where overtime truly begins. Every post, reel, caption, and asset is crafted with the care of a master — because content that looks rushed is content that gets scrolled past.",
      deliverables: ['Reels Production', 'Graphic Design', 'Copywriting & Captions', 'Story Templates', 'Brand Asset Creation'],
      insight: '"The 3 seconds before someone scrolls past your post is worth more than the next 30 minutes of your feed."',
      visual: 'pour',
    },
    {
      num: '04', name: 'Stir', verb: 'Engage.',
      color: '#2C4A6B', light: '#4a7aab',
      tagline: 'Engagement that builds community.',
      desc: "We don't just post and ghost. Every DM answered, every comment replied to, every conversation sparked — this is where audiences become communities and followers become advocates.",
      deliverables: ['Daily Community Management', 'DM Strategy', 'Comment Engagement', 'Collaboration Outreach', 'Audience Nurturing'],
      insight: '"The most powerful social media strategy is simply giving a damn about your community."',
      visual: 'stir',
    },
    {
      num: '05', name: 'Serve', verb: 'Deliver.',
      color: '#8B5E3C', light: '#b88a6a',
      tagline: 'Results you can actually measure.',
      desc: "Everything is tracked, reported, and refined. We present real numbers with honest analysis every month — what worked, what we're pushing further, and what we're brewing next.",
      deliverables: ['Monthly Analytics Report', 'Growth Dashboard', 'Strategy Refinement', 'A/B Test Insights', 'Quarterly Review Call'],
      insight: '"Metrics without context are just vanity. We report results with the story behind them."',
      visual: 'serve',
    },
  ],
  insights: [
    { title: "People don't remember content. They remember how brands made them feel.", excerpt: 'On emotional branding and why feeling > reach when building long-term recall.', date: 'Oct 12', read: '4 min read', category: 'Brand Strategy', imageUrl: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&auto=format&fit=crop&q=80' },
    { title: 'Good branding is never rushed.', excerpt: 'Why slow, intentional brand building beats trend-chasing in the modern social landscape.', date: 'Sep 28', read: '6 min read', category: 'Creative Direction', imageUrl: '' },
    { title: 'The best conversations stay longer than trends.', excerpt: 'Building evergreen brand recall instead of relying solely on viral moments.', date: 'Sep 15', read: '5 min read', category: 'Content Strategy', imageUrl: '' },
    { title: "Why your Instagram grid isn't your brand — but it is your first impression.", excerpt: 'On visual identity, profile aesthetics, and the balance between curation and reality.', date: 'Aug 30', read: '4 min read', category: 'Social Media', imageUrl: '' },
    { title: "Reels changed everything. Here's what most brands still get wrong.", excerpt: 'A deep dive into short-form content strategy and the 3-second hook.', date: 'Aug 12', read: '7 min read', category: 'Reels & Short Form', imageUrl: '' },
    { title: 'The most underrated social media strategy: just being genuinely interesting.', excerpt: 'On authenticity, brand voice, and creating content that actually connects.', date: 'Jul 25', read: '5 min read', category: 'Community', imageUrl: '' },
  ],
  work: [
    {
      name: 'Vessel Coffee', handle: '@vesselcoffee', category: 'Social Media Management',
      metrics: '+240%', stat: 'Engagement Rate', followers: '15k → 52k',
      color: '#4B3124', accent: '#B88A44',
      tagline: 'We turned their morning ritual into a movement.',
      results: [
        { label: 'Followers Gained', value: '37,000+' },
        { label: 'Avg Reel Views', value: '180K' },
        { label: 'Engagement Rate', value: '8.4%' },
        { label: 'DM Inquiries/mo', value: '200+' },
      ],
    },
    {
      name: 'Hum Studio', handle: '@humstudio', category: 'Content Strategy + Reels',
      metrics: '800K', stat: 'Reel Views', followers: '8k → 31k',
      color: '#5E6B52', accent: '#D8C2A8',
      tagline: 'Stillness as content. A meditation brand that went viral.',
      results: [
        { label: 'Viral Reel Views', value: '800K' },
        { label: 'Followers Gained', value: '23,000+' },
        { label: 'Profile Visits', value: '2.1M' },
        { label: 'Save Rate', value: '12.7%' },
      ],
    },
    {
      name: 'Lune Collective', handle: '@lunecollective', category: 'Creative Direction',
      metrics: '+180%', stat: 'Profile Reach', followers: '22k → 67k',
      color: '#2C2C3E', accent: '#B88A44',
      tagline: 'Fashion that whispers. We made sure the world listened.',
      results: [
        { label: 'Profile Reach', value: '+180%' },
        { label: 'Followers Gained', value: '45,000+' },
        { label: 'Press Features', value: '3 (incl. Vogue India)' },
        { label: 'Collab Inquiries', value: '50+/mo' },
      ],
    },
    {
      name: 'Verdant Kitchen', handle: '@verdantkitchen', category: 'Brand Presence Building',
      metrics: '+320%', stat: 'Story Views', followers: '3k → 28k',
      color: '#3D5A3E', accent: '#D8C2A8',
      tagline: 'Plant-based food that looked as good as it tasted.',
      results: [
        { label: 'Followers Gained', value: '25,000+' },
        { label: 'Story Views', value: '+320%' },
        { label: 'Website Clicks', value: '8,400/mo' },
        { label: 'Avg Reel Reach', value: '95K' },
      ],
    },
  ],
  contact: {
    heroHeadline1: "Let's brew something",
    heroHeadline2: 'people remember.',
    heroSubtext: 'Because strong brands are never rushed.',
    email: 'overtimeteaagency@gmail.com',
    aboutHeadline1: "We're not an agency.",
    aboutHeadline2: "We're a brewing house.",
    aboutText1: 'Founded in 2020 over a late-night cup of tea, Overtime Tea was built on one belief — that social media deserved more than scheduled posts and vanity metrics. It deserved craft.',
    aboutText2: 'Today we work with 50+ brands across lifestyle, food, fashion, and wellness — building digital presence that actually feels like something.',
    stat1: '50+', stat1Label: 'Brands served',
    stat2: '2M+', stat2Label: 'Content views',
    stat3: '5 yrs', stat3Label: 'In the brew',
    stat4: '100%', stat4Label: 'Transparency',
    value1Title: 'Overtime is a mindset.', value1Desc: "We don't count hours. We count the care put into every post, every brief, every conversation.",
    value2Title: 'Strategy before aesthetics.', value2Desc: 'A beautiful feed with no strategy is just a pretty void. We build the why before the what.',
    value3Title: 'Honest results always.', value3Desc: "We tell you what's working and what isn't. Transparency isn't a perk — it's how we work.",
  },
};

/* ── Context ────────────────────────────────────────────── */

interface ContentContextType {
  content: SiteContent;
  updateContent: (next: SiteContent) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | null>(null);

const STORAGE_KEY = 'ot_site_content_v1';

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return { ...defaultContent, ...JSON.parse(stored) };
    } catch {}
    return defaultContent;
  });

  const updateContent = (next: SiteContent) => {
    setContent(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
};

export { defaultContent };
