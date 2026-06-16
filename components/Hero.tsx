"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const sectors = [
  "Manufacturing", "Public Sector", "SaaS", "Disaster Recovery",
  "CPG & E-Commerce", "Healthcare", "Luxury Hospitality",
  "Community Health", "Food & Beverage", "Real Estate", "Social Impact",
];

function SectorsDropdown({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState(false);
  const btnColor = light
    ? "text-white underline underline-offset-2 decoration-white/40"
    : "text-[#111111]/65 underline underline-offset-2 decoration-[#111111]/30";
  const dropBg = light ? "bg-black/80 backdrop-blur-sm" : "bg-[#111111]";

  return (
    <span className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`${btnColor} text-inherit font-inherit leading-inherit cursor-pointer`}
      >
        multiple sectors {open ? "▴" : "▾"}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ type: "spring", duration: 0.25, bounce: 0 }}
            className={`absolute left-0 top-full mt-2 z-[100] ${dropBg} rounded-lg px-4 py-3 min-w-[200px] shadow-xl`}
          >
            <ul className="flex flex-col gap-1.5">
              {sectors.map((s) => (
                <li key={s} className="text-xs text-white/70 tracking-wide">{s}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

const heroLogos = [
  "/assets/logos/EUNA.png",
  "/assets/logos/The Happy Camper.png",
  "/assets/logos/extra-logo-494-systems.png",
  "/assets/logos/extra-logo-creates-a-lott.png",
  "/assets/logos/extra-logo-devoid.png",
  "/assets/logos/extra-logo-medford-acres.png",
  "/assets/logos/extra-logo-s-gothic.png",
  "/assets/logos/extra-logo-s-organic.png",
  "/assets/logos/extra-logo-sneak-shock.png",
  "/assets/logos/logo-800latta.png",
  "/assets/logos/logo-acms-new.png",
  "/assets/logos/logo-bar-one-new.png",
  "/assets/logos/logo-brenda-nova.png",
  "/assets/logos/logo-coca-cola.png",
  "/assets/logos/logo-endurance-pt-new.png",
  "/assets/logos/logo-gilde-new.png",
  "/assets/logos/logo-green-star.png",
  "/assets/logos/logo-gshock.png",
  "/assets/logos/logo-kai-o-ken.png",
  "/assets/logos/logo-mobile-care-new.png",
  "/assets/logos/logo-no-warning-new.png",
  "/assets/logos/logo-nupro.png",
  "/assets/logos/logo-sycamore.png",
  "/assets/logos/logo-tier-one.png",
];

export default function Hero() {
  const reduce = useReducedMotion();
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);
  const scale = useTransform(scrollYProgress, [0, 0.4], reduce ? [1, 1] : [1.07, 1]);

  return (
    <section className="bg-[#E9E7E3]">

      {/* ── Text + Buttons ─────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-20 pt-20 pb-6">

        {/* Desktop: flex row — text left, buttons right bottom-aligned */}
        <div className="hidden md:flex items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "spring", duration: 0.8, bounce: 0, delay: 0.2 }}
              className="text-sm text-[#7B8C5A] tracking-widest uppercase mb-5"
            >
              Marketing &amp; Creative Director
            </motion.p>
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", duration: 0.7, bounce: 0, delay: 0.3 }}
              className="font-serif text-[clamp(3rem,6vw,5.5rem)] leading-[1.02] text-[#111111] mb-6"
            >
              Carlo Ruiz&#8209;Goldstein
            </motion.h1>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", duration: 0.7, bounce: 0, delay: 0.4 }}
              className="text-[clamp(1rem,1.8vw,1.25rem)] leading-relaxed text-[#111111]/70 max-w-xl"
            >
              You provide a brand and a goal. I&apos;ll build the strategy, craft the content, ship the site, run the campaigns, and track the data.
            </motion.p>
          </div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.7, bounce: 0, delay: 0.5 }}
            className="flex flex-col gap-3 flex-shrink-0"
          >
            <a
              href="#contact"
              className="inline-block bg-[#7B8C5A] text-white text-sm px-8 py-3.5 rounded-full hover:bg-[#5f6e43] transition-colors duration-200 active:scale-[0.97] text-center whitespace-nowrap"
            >
              Let&apos;s Talk
            </a>
            <a
              href="/assets/resume/Carlo_Ruiz_Resume_Website.docx"
              download
              className="inline-block border border-[#111111] text-[#111111] text-sm px-8 py-3.5 rounded-full hover:bg-[#111111]/5 transition-colors duration-200 active:scale-[0.97] text-center whitespace-nowrap"
            >
              Resume
            </a>
          </motion.div>
        </div>

        {/* Mobile: stacked — label, name, tagline, then buttons */}
        <div className="md:hidden flex flex-col">
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", duration: 0.8, bounce: 0, delay: 0.2 }}
            className="text-sm text-[#7B8C5A] tracking-widest uppercase mb-5"
          >
            Marketing &amp; Creative Director
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.7, bounce: 0, delay: 0.3 }}
            className="font-serif text-[clamp(2.6rem,10vw,4rem)] leading-[1.02] text-[#111111] mb-6"
          >
            Carlo Ruiz&#8209;Goldstein
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.7, bounce: 0, delay: 0.4 }}
            className="text-[1.05rem] leading-relaxed text-[#111111]/70 mb-8"
          >
            Give me a brand and a goal. I&apos;ll build the strategy, craft the content, ship the site, run the campaigns, and track the data.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.7, bounce: 0, delay: 0.5 }}
            className="flex flex-col gap-3"
          >
            <a
              href="#contact"
              className="inline-block bg-[#7B8C5A] text-white text-sm px-8 py-3.5 rounded-full hover:bg-[#5f6e43] transition-colors duration-200 active:scale-[0.97] text-center"
            >
              Let&apos;s Talk
            </a>
            <a
              href="/assets/resume/Carlo_Ruiz_Resume_Website.docx"
              download
              className="inline-block border border-[#111111] text-[#111111] text-sm px-8 py-3.5 rounded-full hover:bg-[#111111]/5 transition-colors duration-200 active:scale-[0.97] text-center"
            >
              Resume
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Logo strip — full bleed ─────────────────────── */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", duration: 0.8, bounce: 0, delay: 0.6 }}
        className="overflow-hidden py-6 pointer-events-none"
      >
        <div
          className="marquee-track flex gap-10 items-center"
          style={{ "--duration": "36s" } as React.CSSProperties}
        >
          {[...heroLogos, ...heroLogos].map((src, i) => (
            <div key={i} className="relative flex-shrink-0 h-7 w-20 grayscale opacity-35">
              <Image src={src} alt="" fill className="object-contain" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Mobile: image flush left + text right ──────── */}
      <div className="md:hidden flex" style={{ height: "56vw" }}>
        <div className="relative w-[55%] overflow-hidden flex-shrink-0">
          <Image
            src="/assets/carlo-hero.png"
            alt="Carlo Ruiz-Goldstein"
            fill
            priority
            className="object-cover object-top"
            sizes="55vw"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div className="flex-1 flex items-end pb-6 px-5 bg-[#E9E7E3]">
          <p className="text-[0.8rem] text-[#111111]/65 leading-relaxed">
            I work best where strategy, creative, and execution are the same job. Six years across <SectorsDropdown light={false} />.
          </p>
        </div>
      </div>

      {/* ── Desktop: Full-bleed image — parallax + subtle zoom ── */}
      <div ref={imageRef} className="hidden md:block relative w-full overflow-hidden" style={{ height: "92vh" }}>
        <motion.div
          style={{ y, scale }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="/assets/carlo-hero.png"
            alt="Carlo Ruiz-Goldstein"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-20 pb-12 max-w-3xl">
          <p className="text-white/90 text-[clamp(1rem,1.6vw,1.2rem)] leading-relaxed">
            I work best where strategy, creative, and execution are the same job. Six years across <SectorsDropdown light={true} />.
          </p>
        </div>
      </div>

    </section>
  );
}
