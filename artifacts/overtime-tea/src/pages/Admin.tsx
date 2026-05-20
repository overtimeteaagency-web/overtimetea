import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent, SiteContent, defaultContent } from '@/context/ContentContext';
import {
  LogOut, Save, RotateCcw, ChevronDown, ChevronUp, Eye, EyeOff, Lock, User,
  Upload, Trash2, Copy, Check, ImageIcon, Star,
} from 'lucide-react';

/* ── Auth ───────────────────────────────────────────────── */
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'OvertimeTea@2025';

/* ── Types ──────────────────────────────────────────────── */
interface SiteImage {
  id: number;
  filename: string;
  originalName: string;
  url: string;
  label: string;
  createdAt: string;
}

/* ── Small helpers ──────────────────────────────────────── */
const Field = ({
  label, value, onChange, multiline = false, placeholder = '',
}: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs uppercase tracking-widest text-[#B88A44] font-semibold">{label}</label>
    {multiline ? (
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-[#1e1e1e] border border-white/10 rounded-lg px-3 py-2 text-[#F6F1E8] text-sm focus:outline-none focus:border-[#B88A44] resize-y"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-[#1e1e1e] border border-white/10 rounded-lg px-3 py-2 text-[#F6F1E8] text-sm focus:outline-none focus:border-[#B88A44]"
      />
    )}
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white/5 hover:bg-white/8 transition-colors text-left"
      >
        <span className="font-serif text-[#F6F1E8] text-lg">{title}</span>
        {open ? <ChevronUp size={16} className="text-[#B88A44]" /> : <ChevronDown size={16} className="text-[#B88A44]" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 py-5 flex flex-col gap-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Tab panels ─────────────────────────────────────────── */

const GlobalTab = ({ draft, setDraft }: { draft: SiteContent; setDraft: (d: SiteContent) => void }) => {
  const g = draft.global;
  const set = (key: keyof typeof g) => (v: string) => setDraft({ ...draft, global: { ...g, [key]: v } });
  return (
    <div className="flex flex-col gap-4">
      <Section title="Brand & Contact">
        <Field label="Brand Name" value={g.brandName} onChange={set('brandName')} />
        <Field label="Email Address" value={g.email} onChange={set('email')} />
        <Field label="Footer Tagline" value={g.footerTagline} onChange={set('footerTagline')} multiline />
      </Section>
      <Section title="Social Links">
        <Field label="Instagram URL" value={g.instagramUrl} onChange={set('instagramUrl')} placeholder="https://instagram.com/..." />
        <Field label="LinkedIn URL" value={g.linkedinUrl} onChange={set('linkedinUrl')} placeholder="https://linkedin.com/..." />
        <Field label="Twitter / X URL" value={g.twitterUrl} onChange={set('twitterUrl')} placeholder="https://x.com/..." />
      </Section>
    </div>
  );
};

const HomeTab = ({ draft, setDraft }: { draft: SiteContent; setDraft: (d: SiteContent) => void }) => {
  const h = draft.home;
  const set = (key: keyof typeof h) => (v: string) => setDraft({ ...draft, home: { ...h, [key]: v } });
  return (
    <div className="flex flex-col gap-4">
      <Section title="Hero">
        <Field label="Headline Line 1" value={h.heroLine1} onChange={set('heroLine1')} />
        <Field label="Headline Line 2" value={h.heroLine2} onChange={set('heroLine2')} />
        <Field label="Tagline / Subtitle" value={h.heroTagline} onChange={set('heroTagline')} multiline />
        <Field label="CTA Button Text" value={h.heroCta} onChange={set('heroCta')} />
      </Section>
      <Section title="Floating Badges (Phone Mockup)">
        <Field label="Badge 1" value={h.badge1} onChange={set('badge1')} />
        <Field label="Badge 2" value={h.badge2} onChange={set('badge2')} />
        <Field label="Badge 3" value={h.badge3} onChange={set('badge3')} />
      </Section>
      <Section title="Stats Counter">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Stat 1 Number" value={h.stat1Number} onChange={set('stat1Number')} />
          <Field label="Stat 1 Label" value={h.stat1Label} onChange={set('stat1Label')} />
          <Field label="Stat 2 Number" value={h.stat2Number} onChange={set('stat2Number')} />
          <Field label="Stat 2 Label" value={h.stat2Label} onChange={set('stat2Label')} />
          <Field label="Stat 3 Number" value={h.stat3Number} onChange={set('stat3Number')} />
          <Field label="Stat 3 Label" value={h.stat3Label} onChange={set('stat3Label')} />
        </div>
      </Section>
    </div>
  );
};

const ServicesTab = ({ draft, setDraft }: { draft: SiteContent; setDraft: (d: SiteContent) => void }) => {
  return (
    <div className="flex flex-col gap-4">
      {draft.services.map((svc, i) => (
        <Section key={i} title={`${svc.num}. ${svc.title}`}>
          <Field label="Title" value={svc.title} onChange={(v) => { const next = [...draft.services]; next[i] = { ...next[i], title: v }; setDraft({ ...draft, services: next }); }} />
          <Field label="Tagline" value={svc.tagline} onChange={(v) => { const next = [...draft.services]; next[i] = { ...next[i], tagline: v }; setDraft({ ...draft, services: next }); }} />
          <Field label="Description" value={svc.desc} onChange={(v) => { const next = [...draft.services]; next[i] = { ...next[i], desc: v }; setDraft({ ...draft, services: next }); }} multiline />
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-[#B88A44] font-semibold">Deliverables (one per line)</label>
            <textarea rows={5} value={svc.deliverables.join('\n')} onChange={(e) => { const next = [...draft.services]; next[i] = { ...next[i], deliverables: e.target.value.split('\n') }; setDraft({ ...draft, services: next }); }} className="bg-[#1e1e1e] border border-white/10 rounded-lg px-3 py-2 text-[#F6F1E8] text-sm focus:outline-none focus:border-[#B88A44] resize-y" />
          </div>
        </Section>
      ))}
    </div>
  );
};

const ProcessTab = ({ draft, setDraft }: { draft: SiteContent; setDraft: (d: SiteContent) => void }) => {
  return (
    <div className="flex flex-col gap-4">
      {draft.process.map((step, i) => (
        <Section key={i} title={`${step.num}. ${step.name} — ${step.verb}`}>
          <Field label="Step Name" value={step.name} onChange={(v) => { const next = [...draft.process]; next[i] = { ...next[i], name: v }; setDraft({ ...draft, process: next }); }} />
          <Field label="Verb" value={step.verb} onChange={(v) => { const next = [...draft.process]; next[i] = { ...next[i], verb: v }; setDraft({ ...draft, process: next }); }} />
          <Field label="Tagline" value={step.tagline} onChange={(v) => { const next = [...draft.process]; next[i] = { ...next[i], tagline: v }; setDraft({ ...draft, process: next }); }} />
          <Field label="Description" value={step.desc} onChange={(v) => { const next = [...draft.process]; next[i] = { ...next[i], desc: v }; setDraft({ ...draft, process: next }); }} multiline />
          <Field label="Insight Quote" value={step.insight} onChange={(v) => { const next = [...draft.process]; next[i] = { ...next[i], insight: v }; setDraft({ ...draft, process: next }); }} multiline />
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-[#B88A44] font-semibold">Deliverables (one per line)</label>
            <textarea rows={5} value={step.deliverables.join('\n')} onChange={(e) => { const next = [...draft.process]; next[i] = { ...next[i], deliverables: e.target.value.split('\n') }; setDraft({ ...draft, process: next }); }} className="bg-[#1e1e1e] border border-white/10 rounded-lg px-3 py-2 text-[#F6F1E8] text-sm focus:outline-none focus:border-[#B88A44] resize-y" />
          </div>
        </Section>
      ))}
    </div>
  );
};

const WorkTab = ({ draft, setDraft }: { draft: SiteContent; setDraft: (d: SiteContent) => void }) => {
  return (
    <div className="flex flex-col gap-4">
      {draft.work.map((proj, i) => (
        <Section key={i} title={proj.name}>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Brand Name" value={proj.name} onChange={(v) => { const next = [...draft.work]; next[i] = { ...next[i], name: v }; setDraft({ ...draft, work: next }); }} />
            <Field label="Handle" value={proj.handle} onChange={(v) => { const next = [...draft.work]; next[i] = { ...next[i], handle: v }; setDraft({ ...draft, work: next }); }} />
            <Field label="Category" value={proj.category} onChange={(v) => { const next = [...draft.work]; next[i] = { ...next[i], category: v }; setDraft({ ...draft, work: next }); }} />
            <Field label="Followers Growth" value={proj.followers} onChange={(v) => { const next = [...draft.work]; next[i] = { ...next[i], followers: v }; setDraft({ ...draft, work: next }); }} />
            <Field label="Metric Value (e.g. +240%)" value={proj.metrics} onChange={(v) => { const next = [...draft.work]; next[i] = { ...next[i], metrics: v }; setDraft({ ...draft, work: next }); }} />
            <Field label="Metric Label (e.g. Engagement Rate)" value={proj.stat} onChange={(v) => { const next = [...draft.work]; next[i] = { ...next[i], stat: v }; setDraft({ ...draft, work: next }); }} />
          </div>
          <Field label="Tagline" value={proj.tagline} onChange={(v) => { const next = [...draft.work]; next[i] = { ...next[i], tagline: v }; setDraft({ ...draft, work: next }); }} multiline />
          <div>
            <label className="text-xs uppercase tracking-widest text-[#B88A44] font-semibold mb-2 block">Results (4 rows)</label>
            <div className="flex flex-col gap-2">
              {proj.results.map((r, j) => (
                <div key={j} className="grid grid-cols-2 gap-2">
                  <input value={r.label} onChange={(e) => { const next = [...draft.work]; const results = [...next[i].results]; results[j] = { ...results[j], label: e.target.value }; next[i] = { ...next[i], results }; setDraft({ ...draft, work: next }); }} placeholder="Label" className="bg-[#1e1e1e] border border-white/10 rounded-lg px-3 py-2 text-[#F6F1E8] text-sm focus:outline-none focus:border-[#B88A44]" />
                  <input value={r.value} onChange={(e) => { const next = [...draft.work]; const results = [...next[i].results]; results[j] = { ...results[j], value: e.target.value }; next[i] = { ...next[i], results }; setDraft({ ...draft, work: next }); }} placeholder="Value" className="bg-[#1e1e1e] border border-white/10 rounded-lg px-3 py-2 text-[#F6F1E8] text-sm focus:outline-none focus:border-[#B88A44]" />
                </div>
              ))}
            </div>
          </div>
        </Section>
      ))}
    </div>
  );
};

const InsightsTab = ({ draft, setDraft }: { draft: SiteContent; setDraft: (d: SiteContent) => void }) => {
  return (
    <div className="flex flex-col gap-4">
      {draft.insights.map((post, i) => (
        <Section key={i} title={`Post ${i + 1}: ${post.title.slice(0, 40)}…`}>
          <Field label="Title" value={post.title} onChange={(v) => { const next = [...draft.insights]; next[i] = { ...next[i], title: v }; setDraft({ ...draft, insights: next }); }} multiline />
          <Field label="Excerpt" value={post.excerpt} onChange={(v) => { const next = [...draft.insights]; next[i] = { ...next[i], excerpt: v }; setDraft({ ...draft, insights: next }); }} multiline />
          <div className="grid grid-cols-3 gap-3">
            <Field label="Date" value={post.date} onChange={(v) => { const next = [...draft.insights]; next[i] = { ...next[i], date: v }; setDraft({ ...draft, insights: next }); }} />
            <Field label="Read Time" value={post.read} onChange={(v) => { const next = [...draft.insights]; next[i] = { ...next[i], read: v }; setDraft({ ...draft, insights: next }); }} />
            <Field label="Category" value={post.category} onChange={(v) => { const next = [...draft.insights]; next[i] = { ...next[i], category: v }; setDraft({ ...draft, insights: next }); }} />
          </div>
          <Field label="Image URL" value={post.imageUrl} onChange={(v) => { const next = [...draft.insights]; next[i] = { ...next[i], imageUrl: v }; setDraft({ ...draft, insights: next }); }} placeholder="https://... or pick from Images tab" />
        </Section>
      ))}
    </div>
  );
};

const ContactTab = ({ draft, setDraft }: { draft: SiteContent; setDraft: (d: SiteContent) => void }) => {
  const c = draft.contact;
  const set = (key: keyof typeof c) => (v: string) => setDraft({ ...draft, contact: { ...c, [key]: v } });
  return (
    <div className="flex flex-col gap-4">
      <Section title="Hero">
        <Field label="Headline Line 1" value={c.heroHeadline1} onChange={set('heroHeadline1')} />
        <Field label="Headline Line 2 (italic gold)" value={c.heroHeadline2} onChange={set('heroHeadline2')} />
        <Field label="Subtitle" value={c.heroSubtext} onChange={set('heroSubtext')} />
        <Field label="Contact Email" value={c.email} onChange={set('email')} />
      </Section>
      <Section title="Who We Are Section">
        <Field label="Headline Line 1" value={c.aboutHeadline1} onChange={set('aboutHeadline1')} />
        <Field label="Headline Line 2 (italic gold)" value={c.aboutHeadline2} onChange={set('aboutHeadline2')} />
        <Field label="Paragraph 1" value={c.aboutText1} onChange={set('aboutText1')} multiline />
        <Field label="Paragraph 2" value={c.aboutText2} onChange={set('aboutText2')} multiline />
      </Section>
      <Section title="Stats">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Stat 1" value={c.stat1} onChange={set('stat1')} />
          <Field label="Stat 1 Label" value={c.stat1Label} onChange={set('stat1Label')} />
          <Field label="Stat 2" value={c.stat2} onChange={set('stat2')} />
          <Field label="Stat 2 Label" value={c.stat2Label} onChange={set('stat2Label')} />
          <Field label="Stat 3" value={c.stat3} onChange={set('stat3')} />
          <Field label="Stat 3 Label" value={c.stat3Label} onChange={set('stat3Label')} />
          <Field label="Stat 4" value={c.stat4} onChange={set('stat4')} />
          <Field label="Stat 4 Label" value={c.stat4Label} onChange={set('stat4Label')} />
        </div>
      </Section>
      <Section title="Values">
        <Field label="Value 1 Title" value={c.value1Title} onChange={set('value1Title')} />
        <Field label="Value 1 Description" value={c.value1Desc} onChange={set('value1Desc')} multiline />
        <Field label="Value 2 Title" value={c.value2Title} onChange={set('value2Title')} />
        <Field label="Value 2 Description" value={c.value2Desc} onChange={set('value2Desc')} multiline />
        <Field label="Value 3 Title" value={c.value3Title} onChange={set('value3Title')} />
        <Field label="Value 3 Description" value={c.value3Desc} onChange={set('value3Desc')} multiline />
      </Section>
    </div>
  );
};

/* ── Images Tab ─────────────────────────────────────────── */

const ImagesTab = ({
  draft,
  setDraft,
}: {
  draft: SiteContent;
  setDraft: (d: SiteContent) => void;
}) => {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);

  const loadImages = () => {
    fetch('/api/admin/images')
      .then((r) => r.json())
      .then((j: { images: SiteImage[] }) => setImages(j.images))
      .catch(() => {});
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleUpload = async (file: File, label: string) => {
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('label', label);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const json = (await res.json()) as { image: SiteImage };
      if (label === 'logo') {
        setDraft({ ...draft, global: { ...draft.global, logoUrl: json.image.url } });
      }
      loadImages();
    } catch {}
    setUploading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this image?')) return;
    await fetch(`/api/admin/images/${id}`, { method: 'DELETE' });
    if (images.find((img) => img.id === id)?.url === draft.global.logoUrl) {
      setDraft({ ...draft, global: { ...draft.global, logoUrl: '' } });
    }
    loadImages();
  };

  const copyUrl = (id: number, url: string) => {
    navigator.clipboard.writeText(url).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const setAsLogo = (url: string) => {
    setDraft({ ...draft, global: { ...draft.global, logoUrl: url } });
  };

  const currentLogo = draft.global.logoUrl;

  return (
    <div className="flex flex-col gap-6">
      {/* Logo Section */}
      <div className="border border-white/10 rounded-xl overflow-hidden">
        <div className="px-5 py-4 bg-white/5 flex items-center gap-3">
          <Star size={16} className="text-[#B88A44]" />
          <span className="font-serif text-[#F6F1E8] text-lg">Site Logo</span>
        </div>
        <div className="px-5 py-5 flex flex-col gap-4">
          <p className="text-white/40 text-sm">Upload a logo image to replace the text "Overtime Tea" in the navbar. Leave blank to keep the text logo.</p>
          <div className="flex items-center gap-4">
            {currentLogo ? (
              <div className="relative group">
                <img src={currentLogo} alt="Logo" className="h-14 rounded-lg border border-white/20 bg-white/5 object-contain px-2" />
                <button
                  onClick={() => setDraft({ ...draft, global: { ...draft.global, logoUrl: '' } })}
                  className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={10} className="text-white" />
                </button>
              </div>
            ) : (
              <div className="h-14 w-32 rounded-lg border border-dashed border-white/20 flex items-center justify-center text-white/30 text-xs">
                No logo set
              </div>
            )}
            <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f, 'logo'); e.target.value = ''; }} />
            <button
              onClick={() => logoRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 border border-[#B88A44] text-[#B88A44] rounded-lg text-sm hover:bg-[#B88A44] hover:text-black transition-all"
            >
              <Upload size={14} />
              {uploading ? 'Uploading…' : 'Upload Logo'}
            </button>
          </div>
          <Field label="Or paste logo URL directly" value={currentLogo} onChange={(v) => setDraft({ ...draft, global: { ...draft.global, logoUrl: v } })} placeholder="https://..." />
        </div>
      </div>

      {/* Image Library */}
      <div className="border border-white/10 rounded-xl overflow-hidden">
        <div className="px-5 py-4 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ImageIcon size={16} className="text-[#B88A44]" />
            <span className="font-serif text-[#F6F1E8] text-lg">Image Library</span>
            <span className="text-white/30 text-sm">({images.length} files)</span>
          </div>
          <div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f, 'general'); e.target.value = ''; }} />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 bg-[#B88A44] text-black rounded-lg text-sm font-semibold hover:bg-[#a67b3b] transition-colors"
            >
              <Upload size={14} />
              {uploading ? 'Uploading…' : 'Upload Image'}
            </button>
          </div>
        </div>
        <div className="px-5 py-5">
          {images.length === 0 ? (
            <div className="text-center py-12 text-white/30">
              <ImageIcon size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No images uploaded yet.</p>
              <p className="text-xs mt-1">Upload images to use them across the site.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {images.map((img) => {
                const isLogo = img.url === currentLogo;
                return (
                  <div key={img.id} className={`relative group rounded-xl overflow-hidden border transition-all ${isLogo ? 'border-[#B88A44]' : 'border-white/10 hover:border-white/30'}`}>
                    <div className="aspect-square bg-white/5 flex items-center justify-center overflow-hidden">
                      <img src={img.url} alt={img.originalName} className="w-full h-full object-cover" />
                    </div>
                    {isLogo && (
                      <div className="absolute top-1 left-1 bg-[#B88A44] text-black text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star size={8} /> LOGO
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                      <p className="text-white text-[10px] text-center truncate w-full px-1">{img.originalName}</p>
                      <div className="flex gap-1 flex-wrap justify-center">
                        <button
                          onClick={() => copyUrl(img.id, img.url)}
                          title="Copy URL"
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                          {copied === img.id ? <Check size={13} /> : <Copy size={13} />}
                        </button>
                        <button
                          onClick={() => setAsLogo(img.url)}
                          title="Set as Logo"
                          className={`p-1.5 rounded-lg transition-colors text-white ${isLogo ? 'bg-[#B88A44]' : 'bg-white/10 hover:bg-[#B88A44]/60'}`}
                        >
                          <Star size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(img.id)}
                          title="Delete"
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-red-500/60 text-white transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <p className="text-white/30 text-xs text-center">
        Tip: After uploading, use "Copy URL" to paste image URLs into any content field.
      </p>
    </div>
  );
};

/* ── Main Admin component ───────────────────────────────── */

const TABS = ['Global', 'Home', 'Services', 'Process', 'Work', 'Insights', 'Contact', 'Images'] as const;
type Tab = typeof TABS[number];

export default function Admin() {
  const { content, updateContent, resetContent } = useContent();

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('Global');
  const [draft, setDraft] = useState<SiteContent>(content);
  const [saved, setSaved] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (loggedIn) setDraft(content);
  }, [content, loggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setLoggedIn(true);
      setLoginError('');
      setDraft(content);
    } else {
      setLoginError('Incorrect username or password.');
    }
  };

  const handleSave = async () => {
    await updateContent(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    if (confirm('Reset all content to factory defaults? This cannot be undone.')) {
      resetContent();
      setDraft(defaultContent);
    }
  };

  /* ── Login Screen ────────────── */
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <p className="text-[#B88A44] text-xs uppercase tracking-[0.3em] mb-3">Admin Panel</p>
            <h1 className="text-4xl font-serif font-bold text-[#F6F1E8]">Overtime Tea</h1>
            <p className="text-white/40 text-sm mt-2">Content Management System</p>
          </div>

          <form onSubmit={handleLogin} className="bg-[#161616] border border-white/10 rounded-2xl p-8 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-widest text-[#B88A44] font-semibold">Username</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg pl-9 py-3 text-[#F6F1E8] text-sm focus:outline-none focus:border-[#B88A44]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-widest text-[#B88A44] font-semibold">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg pl-9 pr-10 py-3 text-[#F6F1E8] text-sm focus:outline-none focus:border-[#B88A44]"
                />
                <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {loginError && <p className="text-red-400 text-sm text-center">{loginError}</p>}

            <button type="submit" className="mt-2 py-3 bg-[#B88A44] text-[#121212] rounded-lg font-semibold tracking-wide hover:bg-[#a67b3b] transition-colors">
              Sign In
            </button>
          </form>

          <p className="text-center text-white/20 text-xs mt-6">
            This page is not linked from the public website.
          </p>
        </motion.div>
      </div>
    );
  }

  /* ── Dashboard ───────────────── */
  const tabContent: Record<Tab, React.ReactNode> = {
    Global: <GlobalTab draft={draft} setDraft={setDraft} />,
    Home: <HomeTab draft={draft} setDraft={setDraft} />,
    Services: <ServicesTab draft={draft} setDraft={setDraft} />,
    Process: <ProcessTab draft={draft} setDraft={setDraft} />,
    Work: <WorkTab draft={draft} setDraft={setDraft} />,
    Insights: <InsightsTab draft={draft} setDraft={setDraft} />,
    Contact: <ContactTab draft={draft} setDraft={setDraft} />,
    Images: <ImagesTab draft={draft} setDraft={setDraft} />,
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#F6F1E8]">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-[#111]/90 backdrop-blur border-b border-white/10 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <button
            className="md:hidden p-1.5 rounded-lg border border-white/10 text-white/50 hover:text-white/80"
            onClick={() => setMobileNavOpen((o) => !o)}
          >
            <ChevronDown size={16} className={`transition-transform ${mobileNavOpen ? 'rotate-180' : ''}`} />
          </button>
          <span className="text-[#B88A44] text-xs uppercase tracking-widest font-semibold hidden sm:inline">Admin</span>
          <span className="text-white/20 hidden sm:inline">·</span>
          <span className="font-serif text-sm md:text-lg text-[#F6F1E8] truncate">Overtime Tea CMS</span>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank" rel="noopener noreferrer" className="hidden md:flex text-xs text-white/40 hover:text-white/70 transition-colors items-center gap-1">
            View Site ↗
          </a>
          <button onClick={handleReset} className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/50 hover:border-white/30 hover:text-white/80 text-sm transition-all">
            <RotateCcw size={14} />
            Reset
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-3 md:px-5 py-2 rounded-lg text-sm font-semibold transition-all ${saved ? 'bg-green-600 text-white' : 'bg-[#B88A44] text-[#121212] hover:bg-[#a67b3b]'}`}
          >
            <Save size={14} />
            <span className="hidden sm:inline">{saved ? 'Saved!' : 'Save Changes'}</span>
          </button>
          <button onClick={() => setLoggedIn(false)} className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg border border-white/10 text-white/50 hover:border-white/30 hover:text-white/80 text-sm transition-all">
            <LogOut size={14} />
          </button>
        </div>
      </header>

      {/* Mobile nav dropdown */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-[#111] border-b border-white/10"
          >
            <div className="p-3 grid grid-cols-4 gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setMobileNavOpen(false); }}
                  className={`text-center py-2 px-1 rounded-lg text-xs transition-colors ${activeTab === tab ? 'bg-[#B88A44]/20 text-[#B88A44]' : 'text-white/50 hover:text-white/80'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* Sidebar — desktop only */}
        <aside className="hidden md:flex w-52 shrink-0 border-r border-white/10 h-[calc(100vh-65px)] sticky top-[65px] pt-6 flex-col">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left px-6 py-3 text-sm transition-colors ${activeTab === tab ? 'text-[#B88A44] border-r-2 border-[#B88A44] bg-white/5' : 'text-white/50 hover:text-white/80'}`}
            >
              {tab}
            </button>
          ))}
        </aside>

        {/* Content */}
        <main className="flex-1 px-4 md:px-8 py-6 md:py-8 max-w-4xl overflow-x-hidden">
          <h2 className="font-serif text-xl md:text-2xl text-[#F6F1E8] mb-2">{activeTab}</h2>
          <p className="text-white/30 text-sm mb-6">
            Edit content below, then click <strong className="text-[#B88A44]">Save Changes</strong> to publish to the site.
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
