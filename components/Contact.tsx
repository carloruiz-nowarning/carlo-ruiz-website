"use client";
import { motion, useReducedMotion } from "framer-motion";

const tiles = [
  {
    label: "Email",
    value: "carloruizmarketing@gmail.com",
    href: "mailto:carloruizmarketing@gmail.com",
    cta: "Send an email",
    icon: "✉",
  },
  {
    label: "LinkedIn",
    value: "carlo-ruiz-goldstein",
    href: "https://www.linkedin.com/in/carlo-ruiz-goldstein-628448179",
    cta: "View profile ↗",
    icon: "in",
    external: true,
  },
  {
    label: "Resume",
    value: "Download PDF",
    href: "/assets/resume/Carlo_Ruiz_Resume-website.pdf",
    cta: "Download ↓",
    icon: "↓",
    download: true,
  },
];

export default function Contact() {
  const reduce = useReducedMotion();

  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-20 bg-[#F0EDE8]">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6, bounce: 0 }}
          className="text-sm text-[#7B8C5A] tracking-widest uppercase mb-4"
        >
          Contact
        </motion.p>
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6, bounce: 0, delay: 0.05 }}
          className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-tight text-[#111111] mb-16"
        >
          Let&apos;s Talk.
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#111111]/8">
          {tiles.map((tile, i) => (
            <motion.a
              key={tile.label}
              href={tile.href}
              target={tile.external ? "_blank" : undefined}
              rel={tile.external ? "noopener noreferrer" : undefined}
              download={tile.download ? true : undefined}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.5, bounce: 0, delay: i * 0.08 }}
              className="group bg-[#F0EDE8] hover:bg-white p-10 flex flex-col gap-6 transition-colors duration-200 active:scale-[0.99]"
            >
              <div className="w-10 h-10 rounded-full border border-[#111111]/10 flex items-center justify-center text-[#7B8C5A] font-serif text-lg group-hover:border-[#7B8C5A] transition-colors duration-200">
                {tile.icon}
              </div>
              <div>
                <p className="text-xs text-[#111111]/40 tracking-widest uppercase mb-2">{tile.label}</p>
                <p className="text-[#111111] font-medium text-sm leading-relaxed break-all">{tile.value}</p>
              </div>
              <p className="text-sm text-[#7B8C5A] mt-auto group-hover:underline underline-offset-4">
                {tile.cta}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
