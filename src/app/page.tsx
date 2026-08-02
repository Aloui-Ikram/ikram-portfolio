import { RevealObserver } from "@/components/reveal-observer";
import { SiteNav, SiteFooter } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { OpenSource } from "@/components/sections/open-source";
import { Research } from "@/components/sections/research";
import { Writing } from "@/components/sections/writing";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Ticker } from "@/components/sections/ticker";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main" className="flex-1">
        <Hero />
        <Ticker />
        <About />
        <Experience />
        <OpenSource />
        <Research />
        <Writing />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}
