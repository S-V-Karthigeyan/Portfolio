// Image paths point at /public/assets, which Vite serves as-is (stable filenames,
// not content-hashed). That matters because these paths get saved into the
// database as the *default* seed content — a hashed src/assets import would
// break after the next rebuild.
const brewHero = "/assets/brew-hero.png";
const brewMenu = "/assets/brew-menu.png";
const brewFooter = "/assets/brew-footer.png";
const barrelHero = "/assets/barrel-hero.png";
const barrelAbout = "/assets/barrel-about.png";
const barrelContact = "/assets/barrel-contact.png";
const lifeHero = "/assets/life-hero.png";
const lifeDashboard = "/assets/life-dashboard.png";
const lifeSettings = "/assets/life-settings.png";
const bdayLanding = "/assets/bday-landing.png";
const bdayModal = "/assets/bday-modal.png";
const bdayPlaylist = "/assets/bday-playlist.png";

export interface Project {
  number: string;
  name: string;
  category: string;
  desc: string;
  col1Image1: string | null;
  col1Image2: string | null;
  col2Image: string | null;
  /** Optional live URL. When present, a "View Project" link is shown on the card. */
  url?: string;
}

export const PROJECTS: Project[] = [
  {
    number: "01",
    name: "Brew and Chapters",
    category: "Full-stack café web app",
    desc: "A full-stack café web application featuring menu browsing, cart management, table reservations and event listings, with Firebase auth, real-time database operations and an admin dashboard for managing users, orders, menu items and events.",
    col1Image1: brewMenu,
    col1Image2: brewFooter,
    col2Image: brewHero,
  },
  {
    number: "02",
    name: "Black-Barrel",
    category: "E-commerce web app",
    desc: "A responsive e-commerce website with product browsing, category-based filtering, shopping cart, user authentication and secure checkout. Built with React, TypeScript, Tailwind CSS and Supabase for a modern, user-friendly shopping experience.",
    col1Image1: barrelAbout,
    col1Image2: barrelContact,
    col2Image: barrelHero,
    url: "https://black-barrel-seven.vercel.app",
  },
  {
    number: "03",
    name: "Life Dashboard",
    category: "Personal management app",
    desc: "A modern personal management application with task management, finance tracking, investment portfolio monitoring, savings goals, notes and calendar integration. Built with React and TypeScript, with secure authentication, state management and real-time data handling for interactive analytics across devices.",
    col1Image1: lifeSettings,
    col1Image2: lifeDashboard,
    col2Image: lifeHero,
  },
  {
    number: "04",
    name: "Interactive Birthday Website",
    category: "Interactive web experience",
    desc: "A dynamic and responsive birthday website built with HTML, CSS and JavaScript. Incorporates interactive features, animations and event-driven functionality, focused on clean UI design and smooth navigation for an engaging, personalized web interface.",
    col1Image1: bdayModal,
    col1Image2: bdayPlaylist,
    col2Image: bdayLanding,
  },
];

export interface Skill {
  number: string;
  title: string;
  desc: string;
  stack: string;
}

export const SKILLS: Skill[] = [
  {
    number: "01",
    title: "Web Development",
    desc: "Building responsive, interactive web applications and reusable UI components with clean, component-based structuring.",
    stack: "HTML5 · CSS3 · JavaScript · React.js · TypeScript · Tailwind CSS · Bootstrap",
  },
  {
    number: "02",
    title: "Tools & Platforms",
    desc: "Version control, collaborative development and building modern apps with backend-as-a-service platforms and AI-assisted tools.",
    stack: "Git · GitHub · VS Code · Firebase",
  },
  {
    number: "03",
    title: "Data Analytics",
    desc: "Interactive dashboards with filters that evaluate trends and deliver key business insights.",
    stack: "Power BI",
  },
];
