import React from 'react';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Experience } from '../sections/Experience';
import { Projects } from '../sections/Projects';
import { Skills } from '../sections/Skills';
import { Certificates } from '../sections/Certificates';
import { Analytics } from '../sections/Analytics';
import { Contact } from '../sections/Contact';

export const Home = () => {
  return (
    <main className="relative z-10 space-y-12">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Certificates />
      <Analytics />
      <Contact />
    </main>
  );
};
