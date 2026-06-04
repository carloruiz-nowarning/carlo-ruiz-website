"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* ─── Lightbox ────────────────────────────────────── */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ type: "spring", duration: 0.35, bounce: 0 }}
        className="relative max-w-5xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full h-full object-contain rounded-xl" />
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg transition-colors duration-150 active:scale-95"
        >
          ×
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Brand Logo Grid ────────────────────────────── */
const brandLogos = [
  { src: "/assets/logos/logo-acms-new.png",              name: "ACMS",                sector: "Public Sector / Disaster Recovery" },
  { src: "/assets/logos/logo-mobile-care-new.png",       name: "Mobile Care Chicago", sector: "Community Health" },
  { src: "/assets/logos/logo-endurance-pt-new.png",      name: "Endurance PT",        sector: "Healthcare" },
  { src: "/assets/logos/logo-bar-one-new.png",           name: "Bar One Lounge",      sector: "Luxury Hospitality" },
  { src: "/assets/logos/logo-no-warning-new.png",        name: "No Warning",          sector: "Social Impact" },
  { src: "/assets/logos/logo-tier-one.png",              name: "Tier One Graphics",   sector: "Manufacturing & Fabrication" },
  { src: "/assets/logos/logo-gilde-new.png",             name: "Gilde Brewery",       sector: "Food & Beverage" },
  { src: "/assets/logos/extra-logo-medford-acres.png",   name: "Medford Acres",       sector: "Real Estate" },
  { src: "/assets/logos/The Happy Camper.png",           name: "The Happy Camper",    sector: "CPG / E-Commerce" },
];

function BrandLogoPanel() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        {brandLogos.map((logo, i) => (
          <motion.div
            key={logo.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0, delay: i * 0.04 }}
            className="bg-white p-5 flex flex-col items-center gap-3 group rounded-xl"
          >
            <div className="relative w-full h-10">
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-[#111111]">{logo.name}</p>
              <p className="text-[9px] text-[#111111]/40">{logo.sector}</p>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}

/* ─── Campaign — first 4, panning ───────────────── */
const campaignImages = [
  { src: "/assets/campaigns/cola-gshock-v1.png",        alt: "Coca-Cola × G-Shock V1" },
  { src: "/assets/campaigns/cola-gshock-v2.png",        alt: "Coca-Cola × G-Shock V2" },
  { src: "/assets/campaigns/bar-one-email.png",          alt: "Bar One Email Campaign" },
  { src: "/assets/campaigns/bar-one-800-collateral.png", alt: "Bar One / 800° Collateral" },
];

function CampaignPanel({ onLightbox }: { onLightbox: (src: string, alt: string) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        {campaignImages.map((img, i) => (
          <motion.div
            key={img.alt}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0, delay: i * 0.06 }}
            role="button"
            tabIndex={0}
            className="relative overflow-hidden cursor-zoom-in group"
            style={{ height: "180px" }}
            onClick={() => onLightbox(img.src, img.alt)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="campaign-pan absolute inset-0 w-full h-auto"
              style={{ minHeight: "100%", objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
              <span className="text-white/0 group-hover:text-white/80 text-xs tracking-widest uppercase transition-all duration-200">View</span>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}

/* ─── Content Video Tiles ─────────────────────── */
const vimeoVideos = [
  { id: "1197606183", title: "Bar One Reel" },
  { id: "1197606201", title: "Bar One Day Time TV" },
  { id: "1197606185", title: "Bar One Coffee ASMR" },
  { id: "1197606182", title: "Bar One Trending Reel" },
  { id: "1197606184", title: "Bar One Week Day Live Music" },
];

function ContentPanel() {
  const [active, setActive] = useState(0);
  const video = vimeoVideos[active];
  return (
    <div className="flex flex-col gap-4">
      <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
      {/* ~130% padding = taller portrait crop */}
      <div
        key={video.id}
        style={{ padding: "130% 0 0 0", position: "relative" }}
        className="bg-[#111111] overflow-hidden rounded-xl"
      >
        <iframe
          src={`https://player.vimeo.com/video/${video.id}?title=0&byline=0&portrait=0&badge=0&autopause=0&autoplay=1&muted=1&player_id=0&app_id=58479`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", borderRadius: "12px" }}
          title={video.title}
        />
      </div>
      <div className="flex gap-2 justify-center">
        {vimeoVideos.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              active === i ? "bg-[#7B8C5A] w-6" : "bg-[#111111]/20 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Design — full image, auto-cycle ─────────── */
const styleScapes = [
  { src: "/assets/style-scapes/tier-one.png",  alt: "Tier One, Industrial" },
  { src: "/assets/style-scapes/acms.png",       alt: "ACMS, Public Sector" },
  { src: "/assets/style-scapes/illum.png",      alt: "Illum, Brand" },
  { src: "/assets/style-scapes/devoid.png",     alt: "Devoid, Brand" },
  { src: "/assets/style-scapes/green-star.png", alt: "Green Star, Craft Beverage" },
];

function DesignPanel({ onLightbox }: { onLightbox: (src: string, alt: string) => void }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % styleScapes.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex flex-col gap-3">
      <div
        role="button"
        tabIndex={0}
        className="relative w-full bg-[#111111] overflow-hidden cursor-zoom-in group"
        style={{ height: "280px" }}
        onClick={() => onLightbox(styleScapes[idx].src, styleScapes[idx].alt)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={styleScapes[idx].src}
              alt={styleScapes[idx].alt}
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-200 flex items-center justify-center pointer-events-none">
          <span className="text-white/0 group-hover:text-white/80 text-xs tracking-widest uppercase transition-all duration-200">View</span>
        </div>
      </div>
      <div className="flex gap-2 justify-center">
        {styleScapes.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === i ? "bg-[#7B8C5A] w-5" : "bg-[#111111]/20 w-1.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Web — full image, auto-transition ───────── */
const webImages = [
  { src: "/assets/tier-one/wireframe.png",           alt: "Tier One Wireframe" },
  { src: "/assets/tier-one/wireframe-breakdown.png", alt: "Wireframe Breakdown" },
  { src: "/assets/tier-one/mock-page.png",           alt: "Tier One Final Page" },
];

function WebPanel({ onLightbox }: { onLightbox: (src: string, alt: string) => void }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % webImages.length), 3200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex flex-col gap-3">
      <div
        role="button"
        tabIndex={0}
        className="relative w-full bg-[#111111] overflow-hidden cursor-zoom-in group"
        style={{ height: "280px" }}
        onClick={() => onLightbox(webImages[idx].src, webImages[idx].alt)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={webImages[idx].src}
              alt={webImages[idx].alt}
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-200 flex items-center justify-center pointer-events-none">
          <span className="text-white/0 group-hover:text-white/80 text-xs tracking-widest uppercase transition-all duration-200">View</span>
        </div>
      </div>
      <div className="flex gap-2 justify-center">
        {webImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === i ? "bg-[#7B8C5A] w-5" : "bg-[#111111]/20 w-1.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Tab config ──────────────────────────────── */
const tabs = [
  {
    id: "brand", label: "Brand",
    approach: "I don't have a default design direction. I read the market, understand who I'm talking to, and build from there. The work looks different every time because I am solving for different goals each time.",
    outcome: "Brands across multiple sectors: manufacturing, public sector, SaaS, disaster recovery, CPG e-commerce, healthcare, luxury hospitality, community health, food and beverage, real estate, and social impact.",
    visual: "brand",
  },
  {
    id: "campaigns", label: "Campaigns",
    approach: "The brief tells me what it needs. I make sure it lands. I lead with data-backed strategy: segmentation, A/B testing, multi-channel management, GTM thinking, and follow through to execution.",
    outcome: "Global brand collaboration (Coca-Cola × G-Shock, 2024), 1,000+ person events at Gilde, gamified SMS/email segmentation at Bar One, e-commerce to distribution at Happy Camper.",
    visual: "campaigns",
  },
  {
    id: "content", label: "Content",
    approach: "Content is a revenue tool, not a vanity play. I built Bar One's presence from zero with one question driving every decision: what gets people through the door? Everything is content. It's knowing what to do with it.",
    outcome: "Grew Bar One from zero to 20k followers in under a year. Measurable increase in reservations and in-venue revenue driven by strategic content and partnerships.",
    visual: "content",
  },
  {
    id: "design", label: "Design",
    approach: "Good design gets noticed. Great design gets adopted. I design for context. The brief tells me what we need, then market data and culture tell me what it looks like.",
    outcome: "Range across 8+ sectors, multiple brand identities built end-to-end, creative teams built and run autonomously.",
    visual: "design",
  },
  {
    id: "web", label: "Web",
    approach: "I start with the goal, not the layout. Who is this for, what do they need to do, what do we need them to believe by the time they leave? The design follows from there with a human-first approach.",
    outcome: "Full website rebrand at Tier One Graphics and Euna Solutions: competitor analysis, market research, population targeting, wireframe, and execution.",
    visual: "web",
  },
];

function VisualPanel({
  type,
  onLightbox,
}: {
  type: string;
  onLightbox: (src: string, alt: string) => void;
}) {
  if (type === "brand")     return <BrandLogoPanel />;
  if (type === "campaigns") return <CampaignPanel onLightbox={onLightbox} />;
  if (type === "content")   return <ContentPanel />;
  if (type === "design")    return <DesignPanel onLightbox={onLightbox} />;
  if (type === "web")       return <WebPanel onLightbox={onLightbox} />;
  return null;
}

/* ─── Main Section ────────────────────────────── */
export default function WhatIDo() {
  const [active, setActive] = useState("brand");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const reduce = useReducedMotion();
  const tab = tabs.find((t) => t.id === active)!;

  return (
    <section id="what-i-do" className="py-24 px-6 md:px-12 lg:px-20 bg-[#E9E7E3]">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6, bounce: 0 }}
          className="text-sm text-[#7B8C5A] tracking-widest uppercase mb-3"
        >
          What I Bring to the Table
        </motion.p>
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6, bounce: 0, delay: 0.05 }}
          className="font-serif text-[clamp(2rem,4vw,3rem)] mb-12"
        >
          Creative Skills
        </motion.h2>

        {/* Pill tabs — active = olive green */}
        <div className="flex gap-2 mb-10 overflow-x-auto no-scrollbar pb-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`relative flex-shrink-0 px-5 py-2.5 text-sm rounded-full transition-colors duration-200 active:scale-[0.97] ${
                active === t.id
                  ? "text-white"
                  : "text-[#111111]/45 hover:text-[#111111]/70 hover:bg-[#111111]/5"
              }`}
            >
              <span className="relative z-10">{t.label}</span>
              {active === t.id && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-full bg-[#7B8C5A]"
                  transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          >
            <VisualPanel type={tab.visual} onLightbox={(src, alt) => setLightbox({ src, alt })} />
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xs text-[#7B8C5A] tracking-widest uppercase mb-3">Approach</p>
                <p className="text-[#111111]/80 leading-relaxed text-lg">{tab.approach}</p>
              </div>
              <div>
                <p className="text-xs text-[#7B8C5A] tracking-widest uppercase mb-3">Outcome</p>
                <p className="text-[#111111]/60 leading-relaxed">{tab.outcome}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            src={lightbox.src}
            alt={lightbox.alt}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
