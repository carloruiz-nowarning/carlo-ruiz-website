"use client";
import { motion, useReducedMotion } from "framer-motion";

const aiTools = [
  { name: "Claude",       desc: "Strategy, copy, creative briefs, research synthesis" },
  { name: "ChatGPT",      desc: "Ideation, drafts, rapid iteration" },
  { name: "Perplexity",   desc: "Real-time research and source verification" },
  { name: "Higgsfield",   desc: "AI video generation and creative concepting" },
  { name: "Claw",         desc: "Workflow automation and data processing" },
];

export default function HowIUseAI() {
  const reduce = useReducedMotion();

  return (
    <section id="ai" className="py-24 px-6 md:px-12 lg:px-20 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6, bounce: 0 }}
          className="text-sm text-[#7B8C5A] tracking-widest uppercase mb-4"
        >
          How I Use AI
        </motion.p>
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6, bounce: 0, delay: 0.05 }}
          className="font-serif text-[clamp(1.6rem,3.2vw,3rem)] mb-[30px] leading-tight whitespace-nowrap"
        >
          I wield it. I do not defer to it.
        </motion.h2>

        {/* Two-tile bento layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/8">
          {/* Left tile — AI tools callouts */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.6, bounce: 0 }}
            className="bg-[#111111] p-10 flex flex-col gap-6"
          >
            <p className="text-xs text-[#7B8C5A] tracking-widest uppercase mb-2">Tools in the stack</p>
            {aiTools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={reduce ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", duration: 0.5, bounce: 0, delay: i * 0.07 }}
                className="flex items-start gap-4 group"
              >
                <div className="mt-0.5 w-2 h-2 rounded-full bg-[#7B8C5A] flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
                <div>
                  <p className="font-serif text-lg text-white">{tool.name}</p>
                  <p className="text-sm text-white/45 leading-relaxed mt-0.5">{tool.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right tile — philosophy text */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.6, bounce: 0, delay: 0.1 }}
            className="bg-white/[0.04] p-10 flex flex-col justify-center gap-6"
          >
            <p className="text-white/70 leading-relaxed text-lg">
              I use AI the way a good editor uses a red pen, not to write the piece for me, but to make what I&apos;m already thinking sharper and faster.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              In my work it collapses the gap between a brief and a first draft. Creatively it helps me pressure test ideas I already have. Where it becomes genuinely powerful is connecting siloed data across platforms into one view.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              Most organizations are sitting on insights they cannot see because their data lives in six different places. I have built a unified intelligence layer, pulling ad performance, CRM behavior, email engagement, and social analytics into a single engine that influences the next move.
            </p>
            <p className="text-white/50 leading-relaxed">
              But I wield it. I am the creative. I understand human connection, a finger on the pulse of culture, and what a specific market actually cares about right now.
            </p>
          </motion.div>
        </div>

        {/* 4 callout tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 mt-px">
          {[
            { label: "Brief → Draft", body: "Speed without sacrificing voice. I move from a client brief to a polished first draft in a fraction of the time, without losing the strategic nuance that makes it land." },
            { label: "Pressure Testing", body: "Validate ideas before spending. I use AI to stress-test creative concepts, messaging hierarchies, and campaign strategies before a dollar hits the media plan." },
            { label: "Unified Intelligence", body: "Connecting siloed data into one view. Ad performance, CRM behavior, email engagement, social analytics, synthesized into a single engine that shapes the next move." },
            { label: "Culture Pulse", body: "AI informs, human instinct decides. I use it to stay ahead of cultural shifts and emerging signals, then apply judgment about what actually matters for a specific brand and market." },
          ].map((tile, i) => (
            <motion.div
              key={tile.label}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.5, bounce: 0, delay: i * 0.07 }}
              className="bg-white/[0.03] p-8 flex flex-col gap-4"
            >
              <p className="font-serif text-xl text-white leading-snug">{tile.label}</p>
              <p className="text-sm text-white/50 leading-relaxed">{tile.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
