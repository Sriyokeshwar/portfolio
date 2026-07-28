export const skillCategories = [
  { id: 'all', label: 'All Skills' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'languages', label: 'Languages' },
  { id: 'tools', label: 'Tools' },
  { id: 'ai', label: 'AI Tools' },
];

export const skills = [
  // Frontend
  { name: 'React.js', category: 'frontend', level: 92, icon: 'Atom' },
  { name: 'Next.js', category: 'frontend', level: 88, icon: 'Layers' },
  { name: 'TypeScript', category: 'frontend', level: 86, icon: 'Code2' },
  { name: 'Tailwind CSS', category: 'frontend', level: 90, icon: 'LayoutGrid' },
  { name: 'HTML5', category: 'frontend', level: 94, icon: 'Code2' },
  { name: 'CSS3', category: 'frontend', level: 92, icon: 'Palette' },
  { name: 'Framer Motion', category: 'frontend', level: 84, icon: 'Sparkles' },
  { name: 'GSAP', category: 'frontend', level: 80, icon: 'Zap' },

  // Backend
  { name: 'Node.js', category: 'backend', level: 86, icon: 'Server' },
  { name: 'Express.js', category: 'backend', level: 84, icon: 'Cpu' },
  { name: 'REST APIs', category: 'backend', level: 90, icon: 'Network' },
  { name: 'JWT Authentication', category: 'backend', level: 82, icon: 'Shield' },

  // Database
  { name: 'MongoDB', category: 'database', level: 88, icon: 'Database' },
  { name: 'Mongoose', category: 'database', level: 84, icon: 'Table' },
  { name: 'MySQL', category: 'database', level: 80, icon: 'Table' },

  // Languages
  { name: 'JavaScript', category: 'languages', level: 90, icon: 'FileCode' },
  { name: 'TypeScript', category: 'languages', level: 86, icon: 'Code2' },
  { name: 'Java', category: 'languages', level: 78, icon: 'Coffee' },
  { name: 'Python', category: 'languages', level: 74, icon: 'Terminal' },
  { name: 'SQL', category: 'languages', level: 80, icon: 'Database' },

  // Tools
  { name: 'Git', category: 'tools', level: 88, icon: 'GitBranch' },
  { name: 'GitHub', category: 'tools', level: 90, icon: 'Github' },
  { name: 'VS Code', category: 'tools', level: 95, icon: 'Laptop' },
  { name: 'Postman', category: 'tools', level: 85, icon: 'Send' },
  { name: 'Figma', category: 'tools', level: 82, icon: 'Figma' },
  { name: 'Vercel', category: 'tools', level: 84, icon: 'Rocket' },

  // AI Tools
  { name: 'ChatGPT', category: 'ai', level: 90, icon: 'Bot' },
  { name: 'Cursor AI', category: 'ai', level: 86, icon: 'Sparkles' },
  { name: 'Claude AI', category: 'ai', level: 84, icon: 'Brain' },
  { name: 'GitHub Copilot', category: 'ai', level: 88, icon: 'Wand2' },
  { name: 'Gemini', category: 'ai', level: 82, icon: 'Brain' },
  { name: 'Perplexity AI', category: 'ai', level: 80, icon: 'Search' },
];

export const processSteps = [
  {
    step: '01',
    title: 'Understand & Research',
    description:
      'Analyze requirements, target audience, and user flows before writing a single line of code.',
  },
  {
    step: '02',
    title: 'Architect & Wireframe',
    description:
      'Design modular component trees, clean data schemas, and vision-driven UI layouts in Figma.',
  },
  {
    step: '03',
    title: 'Build & Iterate',
    description:
      'Develop reactive full-stack features with clean code, modern animations, and continuous local validation.',
  },
  {
    step: '04',
    title: 'Polish & Ship',
    description:
      'Optimize bundle performance, test responsive breakpoints, refine micro-interactions, and deploy to production.',
  },
];
