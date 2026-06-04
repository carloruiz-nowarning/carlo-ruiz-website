"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const paragraphs = [
  "I'm a marketing leader who came up through graphic design and food science, which means I understand how things look, how they're made, and why people want them. I've built brands from nothing, led creative teams to run without me, and driven revenue across multiple sectors. I work best when the strategy, creative and execution are the same job.",
  "Whatever the scope calls for, I’m hands on — it’s what lets me see the full picture and own the full cycle.",
  "Outside of work I'm in the mountains, at farmers markets, behind a bar making cocktails, or in a kitchen cooking something from a part of the world I haven't been to yet. I'm into local live music, lighting design, pruning my plants, and caring for dogs. I stay curious on purpose. It makes the work better.",
];

export default function WhoIAm() {
  const reduce = useReducedMotion();

  return (
    <section id="who-i-am" className="py-24 bg-[#E9E7E3]">
      <div className="px-6 md:px-12 lg:px-20">
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6, bounce: 0 }}
          className="text-sm text-[#7B8C5A] tracking-widest uppercase mb-16 max-w-7xl mx-auto"
        >
          Who I Am
        </motion.p>
      </div>

      {/* Three-column layout — photo | text | video placeholder */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] gap-8 lg:gap-10 items-start">

        {/* Left — B&W photo */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.7, bounce: 0 }}
          className="relative aspect-[3/4] overflow-hidden"
        >
          <Image
            src="/assets/carlo-who-i-am.png"
            alt="Carlo Ruiz-Goldstein"
            fill
            className="object-cover object-top"
          />
        </motion.div>

        {/* Center — text */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.7, bounce: 0, delay: 0.08 }}
          className="flex flex-col gap-7 lg:pt-8"
        >
          {paragraphs.map((p, i) => (
            <p key={i} className="text-[#111111]/70 leading-relaxed text-[clamp(0.95rem,1.4vw,1.1rem)]">
              {p}
            </p>
          ))}
          <p className="text-sm text-[#111111]/30 italic pt-4 border-t border-[#111111]/8">
            Also building something of my own — more soon.
          </p>
        </motion.div>

        {/* Right — video placeholder */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.7, bounce: 0, delay: 0.15 }}
          className="relative aspect-video md:aspect-[3/4] bg-[#111111] flex items-center justify-center overflow-hidden"
        >
          {/* TODO: replace with personal life video */}
          <span className="font-serif text-[6rem] text-white/10 select-none">CR</span>
          <div className="absolute bottom-5 left-0 right-0 text-center">
            <span className="text-[10px] text-white/20 tracking-widest uppercase">Video Coming Soon</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
