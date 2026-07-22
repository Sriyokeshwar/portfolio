import recipe1 from '../assets/projects/recipe-craft/1.png';
import recipe2 from '../assets/projects/recipe-craft/2.png';
import sip1 from '../assets/projects/sip-lumpsum/1.png';
import sip2 from '../assets/projects/sip-lumpsum/2.png';
import jobflow1 from '../assets/projects/jobflow/1.png';
import jobflow2 from '../assets/projects/jobflow/2.png';
import login1 from '../assets/projects/login-view/1.png';
import login2 from '../assets/projects/login-view/2.png';
import login3 from '../assets/projects/login-view/3.png';

export const projects = [
  {
    id: 'recipe-craft',
    title: 'Recipe Craft',
    year: '2026',
    category: 'Full Stack App',
    summary:
      'A fast, intuitive recipe discovery web application. Search by ingredients, filter by cuisine types, view detailed instructions, and save your favourite recipes.',
    problem:
      'Finding quick recipes based on available kitchen ingredients without clutter or intrusive ads.',
    solution:
      'Built a clean, responsive search system connected to real-time recipe API data, optimized for instant client-side filtering and bookmarking.',
    architecture:
      'Modular React frontend decoupled from external recipe REST APIs, utilizing custom state hooks for client-side search caching and instant reactive re-rendering.',
    keyFeatures: [
      'Multi-ingredient reactive search input with debounced query execution.',
      'Cuisine category filters and dietary preference tags.',
      'Local Storage recipe bookmarking for offline saved favorites.',
      'Fully responsive mobile layout with VisionOS glass aesthetic.',
    ],
    challenges:
      'Managing API rate limits and preventing unnecessary re-fetches when users rapidly modify ingredient query inputs.',
    lessonsLearned:
      'Implemented custom query debouncing and memory caching to reduce API payload overhead by 60%.',
    techStack: ['React', 'JavaScript', 'Tailwind CSS', 'REST API', 'Netlify'],
    live: 'https://recipe-craft-srii.netlify.app/',
    github: 'https://github.com/Sriyokeshwar/Recipe',
    images: [recipe1, recipe2],
    featured: true,
  },
  {
    id: 'sip-lumpsum',
    title: 'SIP & Lumpsum Calculator',
    year: '2026',
    category: 'Financial Tool',
    summary:
      'An interactive investment calculation tool that models Systematic Investment Plan (SIP) vs one-time Lumpsum wealth growth with real-time chart visualisations.',
    problem:
      'Retail investors struggle to visually project compounding returns over custom time horizons with variable expected annual return rates.',
    solution:
      'Designed a sleek mathematical engine with live interactive sliders and dynamic breakdown charts comparing principal investment vs estimated gains.',
    architecture:
      'Mathematical compounding engine calculated client-side in pure JS, wired directly to Chart.js canvas renderers for zero-latency slider feedback.',
    keyFeatures: [
      'Side-by-side financial comparison between monthly SIP and Lumpsum deposits.',
      'Interactive range sliders for Tenure (years), Expected Return (%), and Investment Amount.',
      'Real-time donut & trend charts displaying Total Invested vs Estimated Returns.',
      'Custom investment summary report table with breakdown schedules.',
    ],
    challenges:
      'Preventing chart canvas flicker and unnecessary re-renders during high-frequency slider movements.',
    lessonsLearned:
      'Optimized Chart.js instance updating using React refs and frame throttling for smooth 60fps interaction.',
    techStack: ['React', 'JavaScript', 'Chart.js', 'Tailwind CSS', 'Netlify'],
    live: 'https://siplump.netlify.app/',
    github: 'https://github.com/Sriyokeshwar/Sip---Lumpsum',
    images: [sip1, sip2],
    featured: true,
  },
  {
    id: 'jobflow',
    title: 'JobFlow — Job Portal',
    year: '2025',
    category: 'Web Application',
    summary:
      'A community job portal featuring user authentication, job posting workflows, applicant tracking, and an updated SaaS UI — validated with 14/14 automated E2E tests passing.',
    problem:
      'Small teams need a straightforward internal recruitment dashboard without heavy enterprise overhead.',
    solution:
      'Engineered a complete CRUD job board with filtered search, bookmarking, application modal flows, and automated test suite coverage.',
    architecture:
      'RESTful JSON Server backend architecture paired with modular ES6 JavaScript handlers and 14 automated end-to-end integration tests.',
    keyFeatures: [
      'Complete CRUD operations for creating, updating, and removing job postings.',
      'Role-based candidate application submission and tracking status.',
      'Dynamic filtering by salary range, location type (Remote/On-site), and experience level.',
      'Full 14/14 passing automated test suite for API contract and UI flow reliability.',
    ],
    challenges:
      'Ensuring consistent state sync between local JSON storage and client DOM elements during concurrent CRUD updates.',
    lessonsLearned:
      'Established strict asynchronous data handler abstractions and automated testing pipelines.',
    techStack: ['JavaScript', 'JSON Server', 'HTML5', 'CSS3', 'REST API'],
    github: 'https://github.com/Sriyokeshwar/JobFlow',
    images: [jobflow1, jobflow2],
    featured: true,
  },
  {
    id: 'login-view',
    title: 'Login View — User Management',
    year: '2025',
    category: 'MERN Application',
    summary:
      'A responsive full-stack authentication and user management system providing secure registration, JWT session verification, and structured admin data controls.',
    problem:
      'Building robust authentication flows with graceful error handling and clean responsive UI states.',
    solution:
      'Implemented secure auth controllers, password hashing, persistent sessions, and intuitive user management data tables.',
    architecture:
      'Full MERN Stack (MongoDB, Express, React, Node.js) with JWT authentication tokens passed in Authorization HTTP headers.',
    keyFeatures: [
      'User Registration & Login with bcrypt password encryption.',
      'JWT session token verification with auto-logout on expiration.',
      'Admin user management dashboard with active user status toggles.',
      'Responsive data tables with search and sorting capabilities.',
    ],
    challenges:
      'Handling secure token storage, CORS policies, and protected frontend route redirects gracefully.',
    lessonsLearned:
      'Designed HTTP interceptor patterns and centralized authentication context for seamless route protection.',
    techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT'],
    github: 'https://github.com/Sriyokeshwar/Login-view',
    images: [login1, login2, login3],
    featured: true,
  },
];
