"use client";
import { useRef, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

const skillRows = [
  ["Brand Strategy", "Brand Identity", "Art Direction", "Creative Direction", "Campaign Strategy", "Go-to-Market", "Integrated Marketing", "Paid Media", "Google Ads", "Meta Ads", "LinkedIn Ads", "TikTok Ads", "SEO/SEM"],
  ["Email Marketing", "SMS Marketing", "Marketing Automation", "A/B Testing", "Conversion Optimization", "CRO", "Lead Generation", "Performance Reporting", "Budget Management", "Team Leadership", "Agency Management", "Project Management"],
  ["Content Strategy", "Social Media Strategy", "Short-Form Video", "Photography", "Video Production", "Copywriting", "UX-Informed Design", "Community Engagement", "Event Marketing", "Public Relations", "Stakeholder Presentations", "Agentic AI Workflows", "Data Analytics"],
];

const speeds = [0.6, 0.45, 0.55]; // px per frame per row

function AutoScrollRow({ skills, speed, reverse }: { skills: string[]; speed: number; reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const frameRef = useRef<number>(0);
  const reduce = useReducedMotion();

  const doubled = [...skills, ...skills];

  const getContentWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    // Half width (since content is doubled)
    return track.scrollWidth / 2;
  }, []);

  useEffect(() => {
    if (reduce) return;
    const dir = reverse ? 1 : -1;

    const animate = () => {
      if (!isHovered.current && !isDragging.current) {
        xRef.current += dir * speed;
        const width = getContentWidth();
        if (width > 0) {
          // Wrap: reset seamlessly
          if (xRef.current <= -width) xRef.current += width;
          if (xRef.current >= 0) xRef.current -= width;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${xRef.current}px)`;
        }
      }
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [speed, reverse, reduce, getContentWidth]);

  const handleMouseEnter = () => { isHovered.current = true; };
  const handleMouseLeave = () => { isHovered.current = false; };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartScroll.current = xRef.current;
    if (trackRef.current) trackRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - dragStartX.current;
    xRef.current = dragStartScroll.current + delta;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${xRef.current}px)`;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  return (
    <div
      className="overflow-hidden py-1 cursor-grab select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => { handleMouseLeave(); handleMouseUp(); }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div ref={trackRef} className="flex gap-3 w-max">
        {doubled.map((skill, i) => (
          <span
            key={i}
            className="flex-shrink-0 border border-[#111111]/15 text-[#111111]/60 text-sm px-5 py-2 rounded-full hover:border-[#7B8C5A] hover:text-[#111111] transition-colors duration-200 whitespace-nowrap"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

const toolGroups = [
  {
    label: "Marketing & Analytics",
    tools: ["Google Ads", "Meta Ads Manager", "LinkedIn Campaign Manager", "HubSpot", "Pardot", "Salesforce", "GA4", "Looker Studio", "Sprout Social", "Mailchimp", "Klaviyo"],
  },
  {
    label: "Creative & Production",
    tools: ["Adobe Photoshop", "Illustrator", "Premiere Pro", "After Effects", "InDesign", "Lightroom", "Figma", "Canva", "CapCut"],
  },
  {
    label: "Web & Operations",
    tools: ["Webflow", "WordPress", "Notion", "Basecamp"],
  },
];

export default function Skills() {
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="py-24 overflow-hidden bg-[#E9E7E3]">
      <div className="px-6 md:px-12 lg:px-20 mb-10">
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6, bounce: 0 }}
          className="text-sm text-[#7B8C5A] tracking-widest uppercase mb-2"
        >
          Skills
        </motion.p>
      </div>

      {/* Auto-scrolling rows — hover to pause, drag to reposition */}
      <div className="flex flex-col gap-3 mb-24 px-6 md:px-12 lg:px-20">
        {skillRows.map((row, i) => (
          <AutoScrollRow
            key={i}
            skills={row}
            speed={speeds[i]}
            reverse={i % 2 === 1}
          />
        ))}
      </div>

      {/* Tools */}
      <div className="px-6 md:px-12 lg:px-20">
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6, bounce: 0 }}
          className="text-sm text-[#7B8C5A] tracking-widest uppercase mb-10"
        >
          What I Use
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {toolGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.5, bounce: 0, delay: i * 0.08 }}
            >
              <p className="text-xs text-[#111111]/35 tracking-widest uppercase mb-5 pb-3 border-b border-[#111111]/10">
                {group.label}
              </p>
              <ul className="space-y-2.5">
                {group.tools.map((tool) => (
                  <li key={tool} className="text-sm text-[#111111]/65">{tool}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
