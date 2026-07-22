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
  { name: 'React', category: 'frontend', level: 90, icon: 'Atom' },
  { name: 'HTML5', category: 'frontend', level: 95, icon: 'Code2' },
  { name: 'CSS3', category: 'frontend', level: 92, icon: 'Palette' },
  { name: 'Tailwind CSS', category: 'frontend', level: 88, icon: 'LayoutGrid' },
  { name: 'JavaScript (ES6+)', category: 'frontend', level: 90, icon: 'FileCode' },
  { name: 'Figma', category: 'frontend', level: 82, icon: 'Figma' },

  // Backend
  { name: 'Node.js', category: 'backend', level: 85, icon: 'Server' },
  { name: 'Express.js', category: 'backend', level: 86, icon: 'Cpu' },
  { name: 'REST APIs', category: 'backend', level: 90, icon: 'Network' },

  // Database
  { name: 'MongoDB', category: 'database', level: 84, icon: 'Database' },
  { name: 'MySQL', category: 'database', level: 80, icon: 'Table' },

  // Languages
  { name: 'JavaScript', category: 'languages', level: 90, icon: 'FileCode' },
  { name: 'Java', category: 'languages', level: 78, icon: 'Coffee' },
  { name: 'PHP', category: 'languages', level: 75, icon: 'Globe' },
  { name: 'Python', category: 'languages', level: 72, icon: 'Terminal' },

  // Tools
  { name: 'Git & GitHub', category: 'tools', level: 88, icon: 'GitBranch' },
  { name: 'VS Code', category: 'tools', level: 95, icon: 'Laptop' },
  { name: 'Postman', category: 'tools', level: 85, icon: 'Send' },
  { name: 'Canva & Express', category: 'tools', level: 82, icon: 'Image' },

  // AI Tools
  { name: 'Claude AI', category: 'ai', level: 92, icon: 'Sparkles' },
  { name: 'ChatGPT', category: 'ai', level: 90, icon: 'Bot' },
  { name: 'GitHub Copilot', category: 'ai', level: 88, icon: 'Wand2' },
  { name: 'Gemini', category: 'ai', level: 86, icon: 'Brain' },
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
