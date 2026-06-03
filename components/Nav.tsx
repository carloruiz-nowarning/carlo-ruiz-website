"use client";
import { motion, useReducedMotion } from "framer-motion";

const links = [
  { label: "What I Bring", href: "#what-i-do" },
  { label: "AI", href: "#ai" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Who I Am", href: "#who-i-am" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const reduce = useReducedMotion();
  return (
    <motion.nav
      initial={reduce ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.6, bounce: 0 }}
      className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-[#E9E7E3]/95 backdrop-blur-sm border-b border-[#111111]/5"
    >
      <span className="font-serif text-xl tracking-tight">CRG</span>
      <ul className="hidden md:flex gap-8 text-sm text-[#111111]/55">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="hover:text-[#111111] transition-colors duration-200">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className="text-sm border border-[#7B8C5A] text-[#7B8C5A] px-5 py-2 rounded-full hover:bg-[#7B8C5A] hover:text-white transition-colors duration-200 active:scale-[0.97]"
      >
        Let&apos;s Talk
      </a>
    </motion.nav>
  );
}
