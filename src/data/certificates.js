import ibmPdf from '../assets/certificates/prompt-engineering-ibm.pdf';
import nptelPdf from '../assets/certificates/nptel-rtos.pdf';
import phpIitbPdf from '../assets/certificates/php-mysql-iitb.pdf';
import vebboxJpg from '../assets/certificates/vebbox-fsd-intern.jpg';
import noviTechPdf from '../assets/certificates/noviTech-3m-intern.pdf';
import participantPdf from '../assets/certificates/participant-certificate.pdf';
import internshipPdf from '../assets/certificates/internship-certificate.pdf';

export const certificates = [
  {
    id: 'ibm-prompt',
    title: 'Prompt Engineering: Shaping Better AI Responses',
    issuer: 'IBM SkillsBuild',
    year: '2025',
    category: 'AI & Engineering',
    file: ibmPdf,
    type: 'pdf',
    description:
      'Mastered techniques for crafting effective prompts, zero-shot/few-shot learning, and AI model steering.',
  },
  {
    id: 'nptel-rtos',
    title: 'Real Time Operating System',
    issuer: 'NPTEL / IIT Kharagpur',
    year: '2026',
    category: 'Systems & OS',
    file: nptelPdf,
    type: 'pdf',
    description:
      'Rigorous certification covering RTOS architecture, task scheduling algorithms, and embedded system fundamentals.',
  },
  {
    id: 'php-mysql-iitb',
    title: 'PHP and MySQL Training',
    issuer: 'Spoken Tutorial / IIT Bombay',
    year: '2026',
    score: '83.33%',
    category: 'Full Stack',
    file: phpIitbPdf,
    type: 'pdf',
    description:
      'Certified proficiency in PHP server-side scripting, relational MySQL queries, and web application security.',
  },
  {
    id: 'vebbox-internship',
    title: 'Full Stack Developer Internship Certificate',
    issuer: 'Vebbox Software Solutions',
    year: '2026',
    category: 'Industry Experience',
    file: vebboxJpg,
    type: 'image',
    description:
      'Official internship completion certificate for full-stack frontend and API development at Vebbox Software Solutions.',
  },
  {
    id: 'novitech-internship',
    title: 'MERN Stack Internship Certificate (3 Months)',
    issuer: 'NoviTech R&D Private Limited',
    year: '2026',
    category: 'Industry Experience',
    file: noviTechPdf,
    type: 'pdf',
    description:
      'Comprehensive 3-month internship certification covering MongoDB, Express, React, and Node.js web development.',
  },
  {
    id: 'java-workshop',
    title: 'Java Workshop Certificate',
    issuer: 'A.V.C. College of Engineering',
    year: '2024',
    category: 'Programming',
    file: participantPdf,
    type: 'pdf',
    description:
      'Hands-on workshop training in Java object-oriented programming concepts, GUI design, and data structures.',
  },
  {
    id: 'general-internship',
    title: 'Web Development Internship Completion',
    issuer: 'Tech Academy & Industry Partner',
    year: '2025',
    category: 'Industry Experience',
    file: internshipPdf,
    type: 'pdf',
    description:
      'Practical training certification for web development, UI design principles, and modern framework integration.',
  },
];
