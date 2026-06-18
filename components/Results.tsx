"use client";
import { motion, useReducedMotion } from "framer-motion";

const results = [
  {
    client: "Bar One Lounge",
    metrics: [
      { stat: "0 → 20,000+", label: "Social followers in under 12 months" },
      { stat: "60,000+", label: "Email & SMS local subscribers managed" },
      { stat: "Full-Funnel Ownership", label: "Content, events, paid media, partnerships, and operations" },
      { stat: "Revenue Growth", label: "Increased reservations and in-venue demand by elevating the brand through strategic marketing" },
    ],
  },
  {
    client: "Tier One Graphics",
    metrics: [
      { stat: "+68%", label: "Organic website traffic" },
      { stat: "+21%", label: "Website form submissions" },
      { stat: "SEO + Web Strategy", label: "Full website repositioning and optimization" },
      { stat: "Lead Generation", label: "Expanded demand beyond referrals" },
    ],
  },
  {
    client: "ACMS",
    metrics: [
      { stat: "Brand Strategy", label: "Positioning and messaging development" },
      { stat: "Executive Alignment", label: "Leadership-facing growth presentations" },
      { stat: "Audience Communication", label: "Simplified complex healthcare messaging" },
      { stat: "Scalable Systems", label: "Brand framework for future growth" },
    ],
  },
  {
    client: "Gilde Brewery",
    metrics: [
      { stat: "2,000+ Attendees", label: "Event marketing and promotion" },
      { stat: "Integrated Campaigns", label: "TV, radio, outdoor, digital, and partnerships" },
      { stat: "Team Leadership", label: "Cross-functional marketing management" },
      { stat: "Go-To-Market Strategy", label: "Brand visibility and audience growth" },
    ],
  },
];

export default function Results() {
  const reduce = useReducedMotion();

  return (
    <section id="results" className="py-28 md:py-40 px-6 md:px-12 lg:px-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6, bounce: 0 }}
          className="eyebrow text-sm text-[#7B8C5A] tracking-widest uppercase mb-4"
        >
          Results
        </motion.p>
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6, bounce: 0, delay: 0.05 }}
          className="font-serif text-[clamp(2rem,4vw,3rem)] text-white mb-12"
        >
          Work that moved the needle.
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/8">
          {results.map((item, i) => (
            <motion.div
              key={item.client}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.5, bounce: 0, delay: i * 0.08 }}
              className="bg-[#111111] p-10 flex flex-col gap-8"
            >
              <p className="text-xs text-[#7B8C5A] tracking-widest uppercase">{item.client}</p>
              <div className="grid grid-cols-2 gap-6">
                {item.metrics.map((m, j) => (
                  <div key={j} className="flex flex-col gap-1.5">
                    <p className="font-serif text-xl text-white leading-tight">{m.stat}</p>
                    <p className="text-xs text-white/45 leading-relaxed">{m.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
