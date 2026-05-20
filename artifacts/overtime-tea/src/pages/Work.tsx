import React, { useState } from 'react';
import { SEO } from '@/components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '@/context/ContentContext';
import { ArrowRight, X, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, CheckCheck, Smile, Image, Mic, ChevronRight, TrendingUp, Users, Eye, Share2 } from 'lucide-react';
import { Link } from 'wouter';

/* ── Conversation data ─────────────────────────────────── */

type Message = {
  from: 'brand' | 'ot' | 'user';
  name: string;
  avatar: string;
  text: string;
  time: string;
  type?: 'dm' | 'comment' | 'story-reply' | 'collab';
  reactions?: string[];
  image?: boolean;
};

type Conversation = {
  platform: string;
  platformColor: string;
  type: string;
  title: string;
  messages: Message[];
};

type Project = {
  name: string;
  handle: string;
  category: string;
  metrics: string;
  stat: string;
  followers: string;
  color: string;
  accent: string;
  tagline: string;
  conversations: Conversation[];
  results: { label: string; value: string }[];
};

const projects: Project[] = [
  {
    name: "Vessel Coffee",
    handle: "@vesselcoffee",
    category: "Social Media Management",
    metrics: "+240%",
    stat: "Engagement Rate",
    followers: "15k → 52k",
    color: "#4B3124",
    accent: "#B88A44",
    tagline: "We turned their morning ritual into a movement.",
    results: [
      { label: "Followers Gained", value: "37,000+" },
      { label: "Avg Reel Views", value: "180K" },
      { label: "Engagement Rate", value: "8.4%" },
      { label: "DM Inquiries/mo", value: "200+" },
    ],
    conversations: [
      {
        platform: "Instagram DM",
        platformColor: "#E1306C",
        type: "dm",
        title: "The brief that started it all",
        messages: [
          { from: 'brand', name: 'Vessel Coffee', avatar: 'VC', text: "Hey! We've been following your work for a while now. We're a specialty coffee brand and honestly… our Instagram is embarrassing compared to what we're actually serving.", time: '9:14 AM' },
          { from: 'ot', name: 'Overtime Tea', avatar: 'OT', text: "Ha, we appreciate the honesty. What does 'embarrassing' look like for Vessel?", time: '9:17 AM' },
          { from: 'brand', name: 'Vessel Coffee', avatar: 'VC', text: "Like… 3 posts a week of latte art. No strategy. No captions that mean anything. 400 likes max. We KNOW our product is premium. Our feed doesn't show it.", time: '9:19 AM' },
          { from: 'ot', name: 'Overtime Tea', avatar: 'OT', text: "Got it. Can we ask — what feeling do you want someone to have the second they land on your profile?", time: '9:21 AM' },
          { from: 'brand', name: 'Vessel Coffee', avatar: 'VC', text: "Like they just walked into the best coffee shop they've ever been in. That quiet, warm, 'oh this place gets it' feeling.", time: '9:23 AM' },
          { from: 'ot', name: 'Overtime Tea', avatar: 'OT', text: "That's your brand right there. Let's brew that into every post. We'll send over a full proposal this week — but we're already thinking about your content pillars.", time: '9:25 AM' },
          { from: 'brand', name: 'Vessel Coffee', avatar: 'VC', text: "This is exactly the energy we needed. Please do! ☕", time: '9:26 AM', reactions: ['❤️', '🔥'] },
        ],
      },
      {
        platform: "Instagram Comments",
        platformColor: "#E1306C",
        type: "comment",
        title: "When the reel hit different",
        messages: [
          { from: 'brand', name: 'vesselcoffee', avatar: 'VC', text: "Your morning deserves more than mediocre. ☕ [Reel: slow-mo espresso pour, golden hour light, jazz in the background]", time: 'Post caption', image: true },
          { from: 'user', name: 'maya.brews', avatar: 'MB', text: "I've watched this 7 times and I'm not even a coffee person. What IS this brand?!", time: '2h ago', reactions: ['❤️ 847'] },
          { from: 'user', name: 'jxsper.studio', avatar: 'JS', text: "The cinematography on this though… is this an ad or a film?? asking for a friend", time: '2h ago', reactions: ['🔥 312'] },
          { from: 'brand', name: 'vesselcoffee', avatar: 'VC', text: "@jxsper.studio just a Tuesday morning pour 😌 we take our rituals seriously over here", time: '1h ago', reactions: ['❤️ 201'] },
          { from: 'user', name: 'coffeeobsessed.pk', avatar: 'CO', text: "Just drove 40 mins to find this place. Worth it. My wallet is crying but my soul is full.", time: '45m ago', reactions: ['😭❤️ 1.2K'] },
          { from: 'brand', name: 'vesselcoffee', avatar: 'VC', text: "@coffeeobsessed.pk 40 mins is the minimum entry fee for good taste 😂 see you next time!", time: '30m ago', reactions: ['🔥 533'] },
        ],
      },
    ],
  },
  {
    name: "Hum Studio",
    handle: "@humstudio",
    category: "Content Strategy + Reels",
    metrics: "4.2M",
    stat: "Reel Views",
    followers: "8k → 31k",
    color: "#5E6B52",
    accent: "#8BAF6A",
    tagline: "One reel series changed their entire business.",
    results: [
      { label: "Total Reel Views", value: "4.2M" },
      { label: "New Followers", value: "23,000" },
      { label: "Bookings from IG", value: "+180%" },
      { label: "Story Views/week", value: "45K avg" },
    ],
    conversations: [
      {
        platform: "WhatsApp",
        platformColor: "#25D366",
        type: "dm",
        title: "The reel idea that nobody expected",
        messages: [
          { from: 'ot', name: 'Overtime Tea', avatar: 'OT', text: "Okay hear us out — what if the next reel isn't about your services at all?", time: '11:02 AM' },
          { from: 'brand', name: 'Hum Studio', avatar: 'HS', text: "…go on 👀", time: '11:03 AM' },
          { from: 'ot', name: 'Overtime Tea', avatar: 'OT', text: "We do a 60-second 'things your nervous system is trying to tell you' reel. No sell. Just value. People save it, share it, screenshot it. Then they find YOU.", time: '11:05 AM' },
          { from: 'brand', name: 'Hum Studio', avatar: 'HS', text: "That's… not what I expected. But it makes so much sense. We're always selling the studio and never just BEING the studio.", time: '11:07 AM' },
          { from: 'ot', name: 'Overtime Tea', avatar: 'OT', text: "Exactly. People don't book wellness spaces because of services. They book because they feel understood by the brand first.", time: '11:08 AM' },
          { from: 'brand', name: 'Hum Studio', avatar: 'HS', text: "Okay. I'm trusting the process. Let's do it 🌿", time: '11:09 AM' },
          { from: 'ot', name: 'Overtime Tea', avatar: 'OT', text: "That reel is going to do numbers. Trust. We'll send the script by Thursday.", time: '11:10 AM' },
          { from: 'brand', name: 'Hum Studio', avatar: 'HS', text: "📌 pinning this message for when it hits 1M 😂", time: '11:11 AM', reactions: ['😂', '🤞'] },
        ],
      },
      {
        platform: "Instagram Comments",
        platformColor: "#E1306C",
        type: "comment",
        title: "After the reel dropped: 847K views",
        messages: [
          { from: 'brand', name: 'humstudio', avatar: 'HS', text: "5 things your nervous system is screaming at you (but you keep ignoring) 🧘‍♀️ [Reel: text-on-screen + soft ambient music]", time: 'Reel caption', image: true },
          { from: 'user', name: 'therapist.zara', avatar: 'TZ', text: "As a therapist I'm BEGGING everyone to save this. This is exactly what I tell my clients in week one.", time: '1h ago', reactions: ['❤️ 4.1K'] },
          { from: 'user', name: 'busymom.of3', avatar: 'BM', text: "point 3 hit me like a freight train while I was washing dishes. I need a moment.", time: '1h ago', reactions: ['😭 2.8K'] },
          { from: 'brand', name: 'humstudio', avatar: 'HS', text: "@busymom.of3 those dishes can wait — you come first 💚", time: '45m ago', reactions: ['❤️ 1.1K'] },
          { from: 'user', name: 'reelsofreelss', avatar: 'RR', text: "Tagged 6 people. This account just became my new Sunday ritual.", time: '30m ago', reactions: ['🔖 889'] },
          { from: 'user', name: 'wellness.kiran', avatar: 'WK', text: "Just booked a session after watching this 3 times. The energy of this brand is exactly what I needed.", time: '20m ago', reactions: ['🌿 654'] },
        ],
      },
    ],
  },
  {
    name: "The Basil Brand",
    handle: "@thebasilbrand",
    category: "Content Strategy Overhaul",
    metrics: "+89%",
    stat: "Engagement Rate",
    followers: "22k → 48k",
    color: "#8B7355",
    accent: "#D4A853",
    tagline: "From a restaurant page to a food culture destination.",
    results: [
      { label: "Engagement Rate", value: "+89%" },
      { label: "Reel Saves", value: "12K/month" },
      { label: "UGC Posts/month", value: "300+" },
      { label: "Table Reservations via IG", value: "+65%" },
    ],
    conversations: [
      {
        platform: "Instagram DM",
        platformColor: "#E1306C",
        type: "dm",
        title: "The content pivot conversation",
        messages: [
          { from: 'brand', name: 'The Basil Brand', avatar: 'TB', text: "Our content strategy rn is basically: take photo of food, post food, pray for likes. We need a complete reset.", time: '2:30 PM' },
          { from: 'ot', name: 'Overtime Tea', avatar: 'OT', text: "Classic. Can we ask — who eats at Basil? Paint us a picture of the person.", time: '2:33 PM' },
          { from: 'brand', name: 'The Basil Brand', avatar: 'TB', text: "Young professionals. People who work in the city, eat with intention, care about where their food comes from. The 'I'd rather spend ₹800 on a good meal than ₹200 on 4 bad ones' crowd.", time: '2:35 PM' },
          { from: 'ot', name: 'Overtime Tea', avatar: 'OT', text: "Perfect. So they don't want food photos. They want to feel like Basil is *their* place. We make the content about identity, not ingredients.", time: '2:38 PM' },
          { from: 'brand', name: 'The Basil Brand', avatar: 'TB', text: "Say more??", time: '2:39 PM' },
          { from: 'ot', name: 'Overtime Tea', avatar: 'OT', text: "Think: 'you're the type of person who…' content. Behind the kitchen. The sourcing story. The chef's 3am playlist. Make them feel like insiders, not customers.", time: '2:41 PM' },
          { from: 'brand', name: 'The Basil Brand', avatar: 'TB', text: "Okay I just got chills. This is EXACTLY what we've been trying to articulate for 2 years. Can we start Monday?", time: '2:43 PM', reactions: ['🔥', '🌿'] },
        ],
      },
      {
        platform: "Story Reply",
        platformColor: "#E1306C",
        type: "story-reply",
        title: "UGC campaign that created itself",
        messages: [
          { from: 'brand', name: 'thebasilbrand', avatar: 'TB', text: "📸 Story: 'Drop your 'this is my place' restaurant in comments — we'll repost our favourite ↓'", time: 'Story (24h)', image: true },
          { from: 'user', name: 'foodie.ria', avatar: 'FR', text: "Basil IS my place. First date, job celebration, breakdown recovery — all of them happened here. You don't need a campaign, you ARE the campaign.", time: '34m ago', reactions: ['❤️ Reposted'] },
          { from: 'user', name: 'meera.eats', avatar: 'ME', text: "The herb butter bread. That's all. I'd come back just for that bread and sit alone with no shame.", time: '1h ago', reactions: ['😭🍞 Reposted'] },
          { from: 'brand', name: 'thebasilbrand', avatar: 'TB', text: "Quick reply to @meera.eats: We've seen you every Thursday for 8 months. The bread remembers you too. 🌿", time: '45m ago', reactions: ['❤️ Viral reply'] },
          { from: 'user', name: 'chef.curious', avatar: 'CC', text: "Followed you because of that reply. This is how restaurants should talk to people.", time: '20m ago', reactions: ['❤️ 1.4K'] },
        ],
      },
    ],
  },
  {
    name: "Lune Collective",
    handle: "@lunecollective",
    category: "Creative Direction + Reels",
    metrics: "2.1M",
    stat: "Campaign Reach",
    followers: "12k → 41k",
    color: "#6B4C6B",
    accent: "#C9A8C9",
    tagline: "We built a visual language the fashion world noticed.",
    results: [
      { label: "Campaign Reach", value: "2.1M" },
      { label: "Profile Visits", value: "+340%" },
      { label: "Link-in-bio Clicks", value: "+220%" },
      { label: "Press Features", value: "3 publications" },
    ],
    conversations: [
      {
        platform: "Email Thread",
        platformColor: "#B88A44",
        type: "collab",
        title: "The creative direction brief",
        messages: [
          { from: 'brand', name: 'Lune Collective', avatar: 'LC', text: "We want our feed to feel like a French editorial magazine meets a Bombay rooftop at sunset. Is that even possible on Instagram?", time: 'Email — Mon 10:14 AM' },
          { from: 'ot', name: 'Overtime Tea', avatar: 'OT', text: "Not just possible — that's actually a coherent mood board. What we're hearing: muted tones, editorial framing, golden hour warmth, high-fashion cool with local soul. Right?", time: 'Mon 11:30 AM' },
          { from: 'brand', name: 'Lune Collective', avatar: 'LC', text: "YES. Exactly. We want people to feel culture when they scroll through. Not just clothes.", time: 'Mon 11:47 AM' },
          { from: 'ot', name: 'Overtime Tea', avatar: 'OT', text: "Noted. We'll send you 3 creative directions by Wednesday — each with a full colour palette, typography treatment, caption style, and sample reel concept. We'll also propose a 'visual language guide' so every piece of content is on-brand even if produced separately.", time: 'Mon 12:05 PM' },
          { from: 'brand', name: 'Lune Collective', avatar: 'LC', text: "A visual language guide — we've been needing that for literally 2 years and didn't know how to ask for it. Thank you for knowing before we did.", time: 'Mon 12:18 PM', reactions: ['⭐'] },
        ],
      },
      {
        platform: "Instagram Comments",
        platformColor: "#E1306C",
        type: "comment",
        title: "When the campaign hit the feed",
        messages: [
          { from: 'brand', name: 'lunecollective', avatar: 'LC', text: "Worn differently. Lived intentionally. — our new collection isn't about clothes. It's about how you carry yourself. 🌙 [Campaign Reel — editorial + voiceover]", time: 'Campaign launch', image: true },
          { from: 'user', name: 'vogue.india.fans', avatar: 'VI', text: "This is Vogue editorial quality content and they're not even a legacy brand. The fashion industry should take notes.", time: '3h ago', reactions: ['🔥 3.1K'] },
          { from: 'user', name: 'styleby.nneka', avatar: 'SN', text: "The way the narration and visuals sync. I watched 4 times and noticed new details each time. This is ART.", time: '2h ago', reactions: ['❤️ 2.4K'] },
          { from: 'brand', name: 'lunecollective', avatar: 'LC', text: "@styleby.nneka that's exactly the intention — content you can sit with. Thank you for watching that closely 🌙", time: '1h ago', reactions: ['🌙 1.7K'] },
          { from: 'user', name: 'fashionpr.rekha', avatar: 'FP', text: "Sent this to our editorial team. We'd love to feature Lune in our March issue — please check DMs.", time: '45m ago', reactions: ['✨ 2.8K'] },
        ],
      },
    ],
  },
  {
    name: "Drift & Co.",
    handle: "@driftandco",
    category: "Brand Presence Building",
    metrics: "+10K",
    stat: "Followers in 30 days",
    followers: "0 → 10k",
    color: "#2C4A6B",
    accent: "#5B9BD5",
    tagline: "Built a following before they even launched a product.",
    results: [
      { label: "Day-1 Launch Followers", value: "10,200" },
      { label: "Waitlist Signups", value: "1,800" },
      { label: "Avg Story Views", value: "6,500" },
      { label: "Launch Day Sales", value: "Sold out in 4h" },
    ],
    conversations: [
      {
        platform: "Instagram DM",
        platformColor: "#E1306C",
        type: "dm",
        title: "Building hype before the product existed",
        messages: [
          { from: 'brand', name: 'Drift & Co.', avatar: 'DC', text: "We're launching a lifestyle brand in 30 days but we have zero following, zero content, and zero strategy. Please help.", time: '8:45 AM' },
          { from: 'ot', name: 'Overtime Tea', avatar: 'OT', text: "30 days is actually enough time to build real anticipation — IF we don't waste any of it. What does Drift stand for? One sentence.", time: '8:48 AM' },
          { from: 'brand', name: 'Drift & Co.', avatar: 'DC', text: "Slow living for people who live too fast. Products that make you pause.", time: '8:49 AM' },
          { from: 'ot', name: 'Overtime Tea', avatar: 'OT', text: "That's a movement, not just a brand. Here's the play: we don't post products for the first 2 weeks. We post philosophy. We make people feel like they already belong to something before they can buy anything.", time: '8:52 AM' },
          { from: 'brand', name: 'Drift & Co.', avatar: 'DC', text: "That's counterintuitive and I love it. How many followers can we realistically get to?", time: '8:54 AM' },
          { from: 'ot', name: 'Overtime Tea', avatar: 'OT', text: "If we execute right — 10k by launch. We've done it before. The key is making followers feel like founding members, not followers.", time: '8:56 AM' },
          { from: 'brand', name: 'Drift & Co.', avatar: 'DC', text: "Founding members. I'm writing that down. Starting Monday?", time: '8:57 AM', reactions: ['🚀', '✅'] },
        ],
      },
    ],
  },
  {
    name: "Ora Beauty",
    handle: "@orabeauty",
    category: "Full-Service Management",
    metrics: "+300%",
    stat: "Website Traffic from Social",
    followers: "5k → 28k",
    color: "#8B5E6B",
    accent: "#D4889A",
    tagline: "We made beauty content that actually starts conversations.",
    results: [
      { label: "Website Traffic from Social", value: "+300%" },
      { label: "Product Discovery via Reels", value: "68%" },
      { label: "Community Replies/day", value: "150+" },
      { label: "Influencer Collaborations", value: "12 organic" },
    ],
    conversations: [
      {
        platform: "Instagram DM",
        platformColor: "#E1306C",
        type: "dm",
        title: "Finding the real brand voice",
        messages: [
          { from: 'brand', name: 'Ora Beauty', avatar: 'OB', text: "Every beauty brand says 'clean, inclusive, empowering' — we say those things too but we sound like everyone else. How do we sound like us?", time: '3:10 PM' },
          { from: 'ot', name: 'Overtime Tea', avatar: 'OT', text: "Great question. Tell us about the last comment or DM that felt like 'YES, that person gets us.'", time: '3:13 PM' },
          { from: 'brand', name: 'Ora Beauty', avatar: 'OB', text: "Someone said 'Ora is the brand that doesn't make me feel bad for not knowing a 12-step routine.' That felt so right.", time: '3:15 PM' },
          { from: 'ot', name: 'Overtime Tea', avatar: 'OT', text: "There's your voice. Ora is for people who want to feel good, not feel behind. Anti-anxiety beauty. Not clean beauty — calm beauty.", time: '3:17 PM' },
          { from: 'brand', name: 'Ora Beauty', avatar: 'OB', text: "CALM BEAUTY. That's it. That's been the word this whole time and we couldn't find it.", time: '3:18 PM', reactions: ['🌸', '💡', '🔥'] },
          { from: 'ot', name: 'Overtime Tea', avatar: 'OT', text: "We'll build the whole content strategy around that. Captions, hooks, story formats — every touchpoint reinforces calm. Not perfection. Calm.", time: '3:20 PM' },
          { from: 'brand', name: 'Ora Beauty', avatar: 'OB', text: "I've been doing this for 3 years and nobody has helped us find our own brand this fast. Thank you 🌸", time: '3:22 PM' },
        ],
      },
      {
        platform: "Instagram Comments",
        platformColor: "#E1306C",
        type: "comment",
        title: "When the community showed up",
        messages: [
          { from: 'brand', name: 'orabeauty', avatar: 'OB', text: "Skincare doesn't have to be complicated. It just has to be yours. 🌸 [Reel: 3-step Ora routine, natural light, no filter]", time: 'Reel post', image: true },
          { from: 'user', name: 'skincare.sara.real', avatar: 'SS', text: "I cried watching this because every other brand makes me feel like I'm failing. This made me feel like I'm doing fine.", time: '2h ago', reactions: ['🌸 4.7K'] },
          { from: 'brand', name: 'orabeauty', avatar: 'OB', text: "@skincare.sara.real You ARE doing fine. This is exactly why Ora exists 💙", time: '1h ago', reactions: ['❤️ 2.3K'] },
          { from: 'user', name: 'beautyeditor.priya', avatar: 'BE', text: "In 10 years of beauty journalism, this is the first brand comment that didn't feel like it was written by a PR team. Remarkable.", time: '45m ago', reactions: ['✨ 1.8K'] },
          { from: 'user', name: 'newto.skincare', avatar: 'NS', text: "Just bought my first ever skincare product because of this video. I felt safe trying something new for the first time.", time: '30m ago', reactions: ['🌸 3.2K'] },
        ],
      },
    ],
  },
];

/* ── Sub components ──────────────────────────────────────── */

const avatarColors: Record<string, string> = {
  OT: '#B88A44', VC: '#4B3124', HS: '#5E6B52', TB: '#8B7355',
  LC: '#6B4C6B', DC: '#2C4A6B', OB: '#8B5E6B',
  MB: '#888', JS: '#555', CO: '#777', TZ: '#4a8a6a',
  BM: '#a06040', RR: '#606080', WK: '#5a8060', FR: '#a07050',
  ME: '#708060', CC: '#607070', VI: '#505080', SN: '#806050',
  FP: '#705080', SS: '#806070', BE: '#607060', NS: '#608070',
};

function MessageBubble({ msg, isOT }: { msg: Message; isOT: boolean }) {
  const isRight = isOT || msg.from === 'ot';
  const bgColor = isRight ? '#121212' : '#F0F0F0';
  const textColor = isRight ? '#F6F1E8' : '#121212';
  const av = msg.avatar;

  return (
    <motion.div
      className={`flex items-end gap-2 mb-4 ${isRight ? 'flex-row-reverse' : 'flex-row'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
        style={{ background: avatarColors[av] || '#888' }}
      >
        {av}
      </div>
      <div style={{ maxWidth: '72%' }}>
        {!isRight && (
          <p className="text-[10px] text-gray-400 mb-1 ml-1">{msg.name}</p>
        )}
        {msg.image && (
          <div
            className="w-full h-24 rounded-2xl mb-2 flex items-center justify-center text-xs text-gray-400 border border-gray-200"
            style={{ background: 'linear-gradient(135deg, #f0ede8, #e8e4dc)' }}
          >
            <Image size={20} className="mr-2 text-gray-300" /> Post Preview
          </div>
        )}
        <div
          className="px-4 py-3 rounded-2xl text-sm leading-relaxed"
          style={{
            background: bgColor,
            color: textColor,
            borderBottomRightRadius: isRight ? 4 : 16,
            borderBottomLeftRadius: isRight ? 16 : 4,
          }}
        >
          {msg.text}
        </div>
        {msg.reactions && (
          <div className={`flex gap-1 mt-1 ${isRight ? 'justify-end mr-1' : 'ml-1'}`}>
            {msg.reactions.map((r, i) => (
              <span key={i} className="bg-white border border-gray-200 rounded-full px-2 py-0.5 text-xs shadow-sm">{r}</span>
            ))}
          </div>
        )}
        <p className={`text-[10px] text-gray-400 mt-1 ${isRight ? 'text-right mr-1' : 'ml-1'}`}>{msg.time}</p>
      </div>
    </motion.div>
  );
}

function CommentThread({ msg }: { msg: Message }) {
  const av = msg.avatar;
  const isBrand = msg.from === 'brand';

  return (
    <motion.div
      className={`flex gap-3 mb-5 ${isBrand ? 'pl-0' : 'pl-2'}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0 mt-0.5"
        style={{ background: avatarColors[av] || '#888' }}
      >
        {av}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[13px] font-semibold ${isBrand ? 'text-[#121212]' : 'text-gray-800'}`}>
            {msg.name}
          </span>
          {isBrand && (
            <span className="text-[10px] bg-[#B88A44]/10 text-[#B88A44] border border-[#B88A44]/20 px-2 py-0.5 rounded-full font-medium">Brand</span>
          )}
          <span className="text-gray-400 text-[11px]">{msg.time}</span>
        </div>
        {msg.image && (
          <div className="w-full h-32 rounded-xl mb-3 flex items-center justify-center bg-gradient-to-br from-[#f6f1e8] to-[#ede8e0] border border-gray-100">
            <Image size={22} className="text-gray-300 mr-2" />
            <span className="text-xs text-gray-400">Reel / Post</span>
          </div>
        )}
        <p className="text-gray-700 text-sm leading-relaxed">{msg.text}</p>
        {msg.reactions && (
          <div className="flex gap-2 mt-2">
            {msg.reactions.map((r, i) => (
              <span key={i} className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">{r}</span>
            ))}
          </div>
        )}
        <div className="flex gap-4 mt-2">
          <button className="text-[11px] text-gray-400 hover:text-[#B88A44] transition-colors font-medium">Like</button>
          <button className="text-[11px] text-gray-400 hover:text-[#B88A44] transition-colors font-medium">Reply</button>
        </div>
      </div>
    </motion.div>
  );
}

function ConversationPanel({ conv }: { conv: Conversation }) {
  const isDM = conv.type === 'dm' || conv.type === 'collab';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      {/* Platform header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100" style={{ borderTop: `3px solid ${conv.platformColor}` }}>
        <div className="w-2 h-2 rounded-full" style={{ background: conv.platformColor }} />
        <span className="text-sm font-semibold text-gray-700">{conv.platform}</span>
        <span className="text-xs text-gray-400 ml-auto">{conv.title}</span>
      </div>

      {/* Messages */}
      <div className="p-4 md:p-5 max-h-[280px] sm:max-h-[350px] md:max-h-[400px] overflow-y-auto bg-white overscroll-contain">
        {isDM
          ? conv.messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} isOT={msg.from === 'ot'} />
            ))
          : conv.messages.map((msg, i) => (
              <CommentThread key={i} msg={msg} />
            ))}
      </div>

      {/* Fake input bar */}
      {isDM && (
        <div className="flex items-center gap-3 px-5 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-xs text-gray-400">
            Message…
          </div>
          <div className="flex gap-2 text-gray-400">
            <Mic size={16} />
            <Image size={16} />
            <Smile size={16} />
          </div>
        </div>
      )}
      {!isDM && (
        <div className="flex items-center gap-3 px-5 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-xs text-gray-400">
            Add a comment…
          </div>
          <Smile size={16} className="text-gray-400" />
          <Send size={14} className="text-[#B88A44]" />
        </div>
      )}
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeConv, setActiveConv] = useState(0);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: '#ffffff' }}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal hero strip */}
        <div className="relative px-10 pt-12 pb-10" style={{ background: project.color }}>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X size={20} className="text-white" />
          </button>

          <p className="text-white/50 text-xs uppercase tracking-widest mb-2">{project.category}</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">{project.name}</h2>
          <p className="text-white/60 text-lg font-light mb-6">{project.tagline}</p>

          {/* Results row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {project.results.map((r) => (
              <div key={r.label} className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <p className="text-2xl font-serif font-bold text-white">{r.value}</p>
                <p className="text-white/50 text-xs mt-1">{r.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* White interior — conversations */}
        <div className="bg-white px-8 py-8">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle size={18} className="text-[#B88A44]" />
            <h3 className="text-lg font-serif font-bold text-[#121212]">The Conversation</h3>
            <p className="text-sm text-gray-400 ml-auto">How it really started</p>
          </div>

          {/* Conv tabs */}
          {project.conversations.length > 1 && (
            <div className="flex gap-2 mb-5">
              {project.conversations.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setActiveConv(i)}
                  className="text-xs px-4 py-2 rounded-full border transition-all font-medium"
                  style={{
                    background: activeConv === i ? '#121212' : 'transparent',
                    color: activeConv === i ? '#F6F1E8' : '#666',
                    borderColor: activeConv === i ? '#121212' : '#e5e5e5',
                  }}
                >
                  {c.platform}
                </button>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeConv}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ConversationPanel conv={project.conversations[activeConv]} />
            </motion.div>
          </AnimatePresence>

          {/* Footer CTA */}
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-500">Ready to start your own?</p>
              <p className="text-xs text-gray-400">Every great brand moment started with a single message.</p>
            </div>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-6 py-3 bg-[#B88A44] text-white rounded-full text-sm font-medium hover:bg-[#121212] transition-colors"
              onClick={onClose}
            >
              Start A Conversation <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main page ───────────────────────────────────────────── */

const Work = () => {
  const { content } = useContent();
  const [selected, setSelected] = useState<Project | null>(null);

  const mergedProjects: Project[] = projects.map((p, i) => {
    const w = content.work[i];
    if (!w) return p;
    return {
      ...p,
      name: w.name,
      handle: w.handle,
      metrics: w.metrics,
      stat: w.stat,
      tagline: w.tagline,
      results: w.results,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen"
      style={{ background: '#F6F1E8' }}
    >
      <SEO
        title="Our Work — Overtime Tea"
        description="Explore the conversations Overtime Tea has started for brands across industries — from social media growth to viral content campaigns."
      />

      {/* Hero */}
      <section className="pt-28 md:pt-40 pb-12 md:pb-20 px-4 md:px-6 bg-[#121212] text-[#F6F1E8]">
        <div className="container mx-auto">
          <motion.p
            className="text-[#B88A44] text-sm uppercase tracking-[0.3em] mb-4 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Case Studies
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Conversations<br />
            <span className="italic font-light text-[#B88A44]">We've Started</span>
          </motion.h1>
          <motion.p
            className="text-xl text-white/60 max-w-2xl font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Every brand has a story. We help tell it louder — and we saved the receipts.
          </motion.p>

          {/* Stat strip */}
          <motion.div
            className="flex flex-wrap gap-8 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { icon: <Users size={16} />, label: '50+ Brands' },
              { icon: <TrendingUp size={16} />, label: 'Avg 3x Growth' },
              { icon: <Eye size={16} />, label: '10M+ Content Views' },
              { icon: <MessageCircle size={16} />, label: '1000s of Conversations' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-white/40 text-sm">
                <span className="text-[#B88A44]">{s.icon}</span>
                {s.label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project grid */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <p className="text-center text-gray-400 text-xs uppercase tracking-widest mb-8 md:mb-12">Click any conversation to see what happened inside</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {mergedProjects.map((project, i) => (
              <motion.div
                key={project.name}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-black/8 hover:shadow-xl transition-all duration-500 bg-white"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelected(project)}
              >
                {/* Card top colour block */}
                <div className="h-36 relative overflow-hidden flex items-end p-6" style={{ background: project.color }}>
                  {/* Decorative rings */}
                  <div className="absolute right-6 top-6 w-20 h-20 rounded-full border border-white/10" />
                  <div className="absolute right-10 top-2 w-12 h-12 rounded-full border border-white/10" />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-medium px-3 py-1 rounded-full border border-white/20 text-white/70 mb-2 inline-block">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white">{project.name}</h3>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6 bg-white">
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{project.tagline}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-[#F6F1E8] rounded-xl p-3">
                      <p className="text-xl font-serif font-bold" style={{ color: project.color }}>{project.metrics}</p>
                      <p className="text-gray-500 text-[11px]">{project.stat}</p>
                    </div>
                    <div className="bg-[#F6F1E8] rounded-xl p-3">
                      <p className="text-base font-serif font-bold text-[#121212]">{project.followers}</p>
                      <p className="text-gray-500 text-[11px]">Follower growth</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[#B88A44] text-sm font-medium group-hover:gap-3 transition-all">
                    <MessageCircle size={14} />
                    <span>Read the conversation</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform ml-auto" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand logos */}
      <section className="py-16 border-t border-black/8 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-10">Brands we've started conversations with</p>
          <div className="flex flex-wrap justify-center gap-10 text-xl font-serif text-gray-300 hover:[&>span]:text-[#B88A44] [&>span]:transition-colors [&>span]:cursor-default">
            <span>Vessel Coffee</span>
            <span>Hum Studio</span>
            <span>The Basil Brand</span>
            <span>Lune Collective</span>
            <span>Drift & Co.</span>
            <span>Ora Beauty</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#121212]">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#F6F1E8] mb-6">
            Want to be <span className="italic text-[#B88A44]">next?</span>
          </h2>
          <p className="text-white/50 mb-10 text-lg">Your brand's best conversation hasn't started yet.</p>
          <Link href="/contact" className="inline-flex items-center gap-3 px-12 py-5 bg-[#B88A44] text-white rounded-full font-medium tracking-wide hover:bg-white hover:text-[#121212] transition-all duration-300 text-lg group">
            Start A Conversation
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Work;
