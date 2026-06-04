"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const works = [
  {
    logos: ["/assets/logos/logo-bar-one-new.png"],
    client: "Bar One Lounge",
    category: "Building a Hospitality Brand from Zero",
    description: "Social growth, email marketing, partnerships, content strategy, event marketing.",
    link: null,
  },
  {
    logos: ["/assets/logos/logo-tier-one.png"],
    client: "Tier One Graphics",
    category: "Website Repositioning & Lead Generation",
    description: "Research, UX, SEO strategy, copywriting, web development.",
    link: "/assets/tier-one/tier-one-case-study.pdf",
  },
  {
    logos: ["/assets/logos/logo-acms-new.png"],
    client: "ACMS",
    category: "Brand Positioning & Visual Identity",
    description: "Research, strategy, brand architecture, presentation design.",
    link: "/assets/acms-brand-presentation.pdf",
  },
  {
    logos: ["/assets/logos/extra-logo-devoid.png"],
    client: "Devoid",
    category: "Brand Strategy & Identity System",
    description: "Naming, positioning, brand architecture, and packaging design for a science-forward ionized seltzer targeting health-conscious consumers.",
    link: "/assets/Devoid.pdf",
  },
  {
    logos: ["/assets/logos/logo-green-star.png"],
    client: "Green Star Brewery",
    category: "Brand Redesign & Positioning",
    description: "Logo, identity system, and strategy for Illinois's first organic brewery — built around a holistic, female-driven aesthetic to differentiate in a male-dominated craft beer market.",
    link: "/assets/Green Star Brewery.pdf",
  },
  {
    logos: ["/assets/logos/logo-coca-cola.png", "/assets/logos/logo-gshock.png"],
    client: "Coca-Cola × G-Shock",
    category: "Global Campaign Activation",
    description: "Email strategy, creative development, audience segmentation, A/B testing, partnership marketing.",
    link: "/assets/campaigns/cola-gshock-campaign.pdf",
  },
  {
    logos: ["/assets/logos/logo-gilde-new.png"],
    client: "Gilde Brewery",
    category: "Marketing & Event Growth",
    description: "Brand partnerships, events, media buying, content production.",
    link: "/assets/Gilde Two Pager.pdf",
  },
  {
    logos: ["/assets/logos/logo-endurance-pt-new.png"],
    client: "Endurance Physical Therapy",
    category: "Boutique Clinic Specialized in Longevity",
    description: "Research, website redesign, conversion strategy.",
    link: null,
  },
  {
    logos: ["/assets/logos/logo-no-warning-new.png"],
    client: "No Warning",
    category: "Social Impact Brand & Communications",
    description: "Brand strategy, mission alignment, storytelling.",
    link: null,
  },
];

export default function SelectedWork() {
  const reduce = useReducedMotion();

  return (
    <section id="selected-work" className="py-24 bg-[#E9E7E3]">
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6, bounce: 0 }}
          className="text-sm text-[#7B8C5A] tracking-widest uppercase mb-4"
        >
          Selected Work
        </motion.p>
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6, bounce: 0, delay: 0.05 }}
          className="font-serif text-[clamp(2rem,4vw,3rem)] text-[#111111] mb-12"
        >
          Projects &amp; Case Studies
        </motion.h2>
      </div>

      {/* Work rows */}
      <div className="divide-y divide-[#111111]/8">
        {works.map((work, i) => (
          <motion.div
            key={work.client}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.5, bounce: 0, delay: i * 0.05 }}
            className="px-6 md:px-12 lg:px-20 py-8 grid grid-cols-[80px_1fr_1fr_auto] gap-8 items-center max-w-7xl mx-auto"
          >
            {/* Logo */}
            <div className="flex items-center gap-2">
              {work.logos.length > 0 ? (
                work.logos.map((src, j) => (
                  <div key={j} className="relative h-8 w-10 flex-shrink-0">
                    <Image src={src} alt="" fill className="object-contain grayscale" />
                  </div>
                ))
              ) : (
                <span className="font-serif text-2xl text-[#111111]/20">—</span>
              )}
            </div>

            {/* Client + category */}
            <div>
              <p className="font-medium text-[#111111] text-sm">{work.client}</p>
              <p className="text-xs text-[#7B8C5A] mt-0.5">{work.category}</p>
            </div>

            {/* Description */}
            <p className="text-sm text-[#111111]/55 leading-relaxed">{work.description}</p>

            {/* Button */}
            <div>
              {work.link ? (
                <a
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs border border-[#7B8C5A] text-[#7B8C5A] px-4 py-2 rounded-full hover:bg-[#7B8C5A] hover:text-white transition-colors duration-200 active:scale-[0.97] whitespace-nowrap"
                >
                  View Project ↗
                </a>
              ) : (
                <span className="text-xs text-[#111111]/20 px-4 py-2">Coming Soon</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
