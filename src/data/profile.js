import heroPortrait from '../assets/images/hero-portrait.png';
import profileTransparent from '../assets/images/profile-transparent.png';
import logoTransparent from '../assets/images/logo-transparent.png';
import candid1 from '../assets/images/about-candid-1.png';
import candid2 from '../assets/images/about-candid-2.png';
import resumePdf from '../assets/resume/Sriyokeshwar_S_Resume.pdf';
import tableauDashboard from '../assets/images/tableau-dashboard.png';

export const profile = {
  name: 'Sriyokeshwar S',
  role: 'Frontend Developer | UI/UX Designer | MERN Stack Developer | AI-assisted builder',
  rolesList: [
    'Frontend Developer',
    'UI/UX Designer',
    'MERN Stack Developer',
    'Data Analytics Enthusiast',
    'AI-assisted Builder',
  ],
  tagline:
    'Building modern, AI-assisted full stack web experiences from Tamil Nadu, India',
  aboutSummary:
    'MCA student and full-stack developer working across the MERN stack, with a UI/UX-first instinct picked up building real internship projects end to end — from data model to the pixel that ships.',
  location: 'Mayiladuthurai, Tamil Nadu, India',
  email: 'sriyokeshwar@gmail.com',
  phone: '+91 86672 46142',
  phoneRaw: '+918667246142',
  whatsappUrl: 'https://wa.me/918667246142',
  links: {
    github: 'https://github.com/Sriyokeshwar',
    linkedin: 'https://www.linkedin.com/in/Sriyokeshwar',
    leetcode: 'https://leetcode.com/u/4EExesklTX/',
    hackerrank: 'https://www.hackerrank.com/profile/sriyokeshwar',
    instagram: 'https://www.instagram.com/sri_ven_/',
    figma: 'https://www.figma.com/@sriyokeshwars',
    tableau:
      'https://public.tableau.com/app/profile/sriyokeshwar/viz/Analyzedstories/Learning?publish=yes',
    tableauEmbed:
      'https://public.tableau.com/views/Analyzedstories/Learning?:showVizHome=no&:embed=true',
  },
  assets: {
    heroPortrait,
    profileTransparent,
    logoTransparent,
    candid1,
    candid2,
    resumePdf,
    tableauDashboard,
  },
  education: [
    {
      degree: 'Master of Computer Applications (MCA)',
      institution: 'A.V.C. College of Engineering, Mannampandal',
      duration: '2025 – 2027',
      score: '82.36%',
      status: 'In Progress',
    },
    {
      degree: 'B.Sc Computer Science',
      institution: 'A.V.C. College (Autonomous), Mannampandal',
      duration: '2022 – 2025',
      score: 'CGPA 7.94',
      status: 'Completed',
    },
  ],
  stats: [
    { label: 'Internships Shipped', value: 2, suffix: '+' },
    { label: 'Full-Stack Projects', value: 4, suffix: '+' },
    { label: 'Certifications Earned', value: 7, suffix: '' },
    { label: 'CGPA Score', value: 7.94, decimal: true, suffix: '' },
  ],
  targetCompanies: [
    'Vercel',
    'Linear',
    'Stripe',
    'Framer',
    'Apple',
    'Google',
    'Microsoft',
    'Adobe',
    'Notion',
  ],
};
