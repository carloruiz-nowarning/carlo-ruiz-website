"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const heroLogos = [
  "/assets/logos/logo-acms-new.png",
  "/assets/logos/logo-bar-one-new.png",
  "/assets/logos/logo-endurance-pt-new.png",
  "/assets/logos/logo-gilde-new.png",
  "/assets/logos/logo-mobile-care-new.png",
  "/assets/logos/logo-no-warning-new.png",
  "/assets/logos/logo-tier-one.png",
  "/assets/logos/logo-green-star.png",
  "/assets/logos/logo-gshock.png",
  "/assets/logos/logo-coca-cola.png",
  "/assets/logos/logo-nupro.png",
  "/assets/logos/logo-sycamore.png",
];

export default function Hero() {
  const reduce = useReducedMotion();
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax: image drifts up ~6% of its height as it scrolls through
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);
  // Subtle zoom: starts slightly larger, settles in as you scroll
  const scale = useTransform(scrollYProgress, [0, 0.4], reduce ? [1, 1] : [1.07, 1]);

  return (
    <section className="bg-[#E9E7E3]">

      {/* ── Text + Buttons ─────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-20 pt-20 pb-6">
        <div className="flex items-end justify-between gap-8">

          {/* LEFT — label, name, tagline */}
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
              Give me a brand and a goal. I&apos;ll build the strategy, make the content, ship the site, run the campaigns, and track the data.
            </motion.p>
          </div>

          {/* RIGHT — buttons, bottom-aligned with tagline */}
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
              href="/assets/resume/Carlo_Ruiz_Resume-website.pdf"
              download
              className="inline-block border border-[#111111] text-[#111111] text-sm px-8 py-3.5 rounded-full hover:bg-[#111111]/5 transition-colors duration-200 active:scale-[0.97] text-center whitespace-nowrap"
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
          style={{ "--duration": "28s" } as React.CSSProperties}
        >
          {[...heroLogos, ...heroLogos].map((src, i) => (
            <div key={i} className="relative flex-shrink-0 h-7 w-20 grayscale opacity-35">
              <Image src={src} alt="" fill className="object-contain" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Full-bleed image — parallax + subtle zoom on scroll ── */}
      <div ref={imageRef} className="relative w-full overflow-hidden" style={{ height: "92vh" }}>
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
      </div>

    </section>
  );
}
