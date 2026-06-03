"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const experiences = [
  { logo: "/assets/logos/EUNA.png",                name: "Euna Solutions",    role: "Digital Marketing Specialist", years: "2025–Present" },
  { logo: null,                                    name: "Independent",        role: "Founder & Consultant",         years: "2019–2025",    monogram: true },
  { logo: "/assets/logos/logo-bar-one-new.png",   name: "Bar One Lounge",    role: "Marketing Director",           years: "2023–2025" },
  { logo: "/assets/logos/logo-gilde-new.png",     name: "Gilde Brewery",     role: "Marketing & Events Manager",   years: "2022–2023" },
  { logo: "/assets/logos/The Happy Camper.png",   name: "The Happy Camper",  role: "Marketing Director",           years: "2021–2022" },
];

// All logos for the scrolling strip — greyed out
const stripLogos = [
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
  "/assets/logos/logo-brenda-nova.png",
  "/assets/logos/logo-kai-o-ken.png",
  "/assets/logos/logo-800latta.png",
];

function ExperienceItem({
  logo, name, role, years, monogram, delay,
}: {
  logo: string | null; name: string; role: string; years: string;
  placeholder?: boolean; monogram?: boolean; delay?: number; // placeholder kept in data for TODO comments
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", duration: 0.5, bounce: 0, delay: delay ?? 0 }}
      className="flex flex-col items-center gap-4 group"
    >
      <div className="relative h-12 w-full flex items-center justify-center">
        {logo ? (
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        ) : monogram ? (
          <span className="font-serif text-4xl text-[#111111]/20">CR</span>
        ) : (
          // TODO: replace placeholder with logo
          <span className="text-xs text-[#111111]/25 border border-dashed border-[#111111]/15 px-3 py-1.5 rounded">
            {name}
          </span>
        )}
      </div>
      <div className="w-6 h-px bg-[#111111]/10" />
      <div className="text-center">
        <p className="text-sm font-medium text-[#111111]">{name}</p>
        <p className="text-xs text-[#111111]/45 mt-0.5">{role}</p>
        <p className="text-xs text-[#7B8C5A] mt-1">{years}</p>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="py-24 bg-[#E9E7E3]">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.6, bounce: 0 }}
            className="text-sm text-[#7B8C5A] tracking-widest uppercase mb-16"
          >
            Where I&apos;ve Worked
          </motion.p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 mb-24">
            {experiences.map((exp, i) => (
              <ExperienceItem key={exp.name} {...exp} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </div>

      {/* Slow-scrolling logo strip */}
      <div className="overflow-hidden border-t border-[#111111]/8 pt-10">
        <div className="logo-scroll-track flex gap-12 w-max items-center px-12">
          {[...stripLogos, ...stripLogos].map((src, i) => (
            <div key={i} className="relative flex-shrink-0 h-8 w-24 opacity-25 grayscale">
              <Image src={src} alt="" fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
