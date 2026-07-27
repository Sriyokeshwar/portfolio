import React from 'react';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Education } from '../sections/Education';
import { Experience } from '../sections/Experience';
import { Projects } from '../sections/Projects';
import { Skills } from '../sections/Skills';
import { Certificates } from '../sections/Certificates';
import { Analytics } from '../sections/Analytics';
import { Contact } from '../sections/Contact';

export const Home = () => {
  return (
    <main className="relative z-10 space-y-0 flex flex-col">
      <Hero />
      <About />
      <Education />
      <Experience />
      <Projects />
      <Skills />
      <Certificates />
      <Analytics />
      <Contact />
    </main>
  );
};
