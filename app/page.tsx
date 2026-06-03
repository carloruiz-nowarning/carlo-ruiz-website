import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhatIDo from "@/components/WhatIDo";
import HowIUseAI from "@/components/HowIUseAI";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import WhoIAm from "@/components/WhoIAm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhatIDo />
        <HowIUseAI />
        <Skills />
        <Experience />
        <WhoIAm />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
