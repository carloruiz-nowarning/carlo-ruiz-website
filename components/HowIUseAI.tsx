"use client";
import { motion, useReducedMotion } from "framer-motion";

const aiTools = [
  { name: "Claude",       desc: "Strategy, copy, creative briefs, research synthesis" },
  { name: "ChatGPT",      desc: "Ideation, drafts, rapid iteration" },
  { name: "Perplexity",   desc: "Real-time research and source verification" },
  { name: "Higgsfield",   desc: "AI video generation and creative concepting" },
  { name: "Claw",         desc: "Workflow automation and data processing" },
];

const canDo = [
  { label: "Brief → Draft", body: "Speed without losing strategic nuance. I move from a client brief to a polished first draft in a fraction of the time." },
  { label: "Pressure Testing", body: "Validate ideas before spending. I use AI to stress-test creative concepts, messaging hierarchies, and campaign strategies before a dollar hits the media plan." },
  { label: "Unified Intelligence", body: "Connecting siloed data into one view — a single engine that shapes the next move and gets the right data to the right people before they need it." },
  { label: "Culture Pulse", body: "AI informs. Human instinct decides. I use it to identify emerging signals, then apply judgment about what actually matters for a specific brand and audience." },
];

const cantDo = [
  { label: "Build Community", body: "Relationships are built on shared experience, vulnerability, and presence. AI can map the network — it cannot build the bond." },
  { label: "Instill Trust", body: "Trust is earned through consistency, accountability, and showing up. No algorithm replicates that." },
  { label: "Taste & Art Direction", body: "Knowing what's right for a brand at a specific cultural moment requires instinct, not inference." },
  { label: "Storytelling", body: "Real stories have tension, humanity, and perspective. AI can generate narrative structures — it cannot tell your story." },
];

export default function HowIUseAI() {
  const reduce = useReducedMotion();

  return (
    <section id="ai" className="py-28 md:py-40 px-6 md:px-12 lg:px-20 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6, bounce: 0 }}
          className="eyebrow text-sm text-[#7B8C5A] tracking-widest uppercase mb-4"
        >
          How I Use AI
        </motion.p>
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6, bounce: 0, delay: 0.05 }}
          className="font-serif text-[clamp(1.6rem,3.2vw,3rem)] leading-tight mb-6"
        >
          I wield it. I do not defer to it.
        </motion.h2>

        {/* Philosophy */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6, bounce: 0, delay: 0.1 }}
          className="text-white/60 leading-relaxed text-lg max-w-2xl mb-16"
        >
          AI accelerates execution, reveals patterns in complex data, and helps move ideas from concept to action. The judgment, strategy, and creative direction are still chosen by people.
        </motion.p>

        {/* Agentic Stack — full width horizontal */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6, bounce: 0 }}
          className="mb-px"
        >
          <div className="bg-[#111111] p-8 md:p-10">
            <p className="text-xs text-[#7B8C5A] tracking-widest uppercase mb-8">Agentic Stack</p>
            <div className="flex flex-wrap gap-3">
              {aiTools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0, delay: i * 0.07 }}
                  title={tool.desc}
                  className="border border-[#7B8C5A] rounded-full px-5 py-2 flex flex-col items-center gap-0.5 group hover:bg-[#7B8C5A]/10 transition-colors duration-200"
                >
                  <span className="text-sm text-white font-medium">{tool.name}</span>
                  <span className="text-[10px] text-white/40 leading-tight text-center max-w-[160px]">{tool.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Two-column grid: What AI is great at | What AI can't do */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/8 mt-px">

          {/* Left — What AI is great at */}
          <div className="bg-[#111111] flex flex-col">
            <div className="px-8 md:px-10 pt-10 pb-4">
              <p className="text-xs text-[#7B8C5A] tracking-widest uppercase">What AI is great at</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/8 flex-1">
              {canDo.map((tile, i) => (
                <motion.div
                  key={tile.label}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0, delay: i * 0.07 }}
                  className="bg-[#111111] p-6 flex flex-col gap-3"
                >
                  <p className="font-serif text-lg text-white leading-snug">{tile.label}</p>
                  <p className="text-sm text-white/50 leading-relaxed">{tile.body}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — What AI can't do */}
          <div className="bg-white/[0.03] flex flex-col">
            <div className="px-8 md:px-10 pt-10 pb-4">
              <p className="text-xs text-[#7B8C5A] tracking-widest uppercase">What AI can&apos;t do</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/8 flex-1">
              {cantDo.map((tile, i) => (
                <motion.div
                  key={tile.label}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0, delay: i * 0.07 }}
                  className="bg-white/[0.03] p-6 flex flex-col gap-3"
                >
                  <p className="font-serif text-lg text-white leading-snug">{tile.label}</p>
                  <p className="text-sm text-white/50 leading-relaxed">{tile.body}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
