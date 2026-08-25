import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getSupabaseClient } from "@/lib/supabase";
import { SKILLS, PROJECTS, type Skill } from "./data";

export interface ProjectItem {
  number: string;
  name: string;
  category: string;
  desc: string;
  /** Small top-left frame */
  image1: string;
  /** Small bottom-left frame */
  image2: string;
  /** Large right-hand frame */
  imageMain: string;
  url?: string | undefined;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  desc: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  desc: string;
}

export interface GalleryShot {
  src: string;
  label: string;
}

export interface PortfolioContent {
  hero: { title: string; tagline: string; image: string };
  about: { heading: string; text: string };
  contact: { heading: string; blurb: string; email: string; footer: string };
  gallery: GalleryShot[];
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: ProjectItem[];
  marquee: { row1: string[]; row2: string[] };
}

export const DEFAULT_CONTENT: PortfolioContent = {
  hero: {
    title: "Hi, I'm Karthigeyan",
    tagline: "a web developer building responsive, interactive web applications with clean, user-centric design",
    image: "/assets/portrait.png",
  },
  about: {
    heading: "About me",
    text: "I'm S.V Karthigeyan, a web developer with hands-on experience building responsive and interactive web applications using HTML, CSS, JavaScript and React.js. Proficient in Git, GitHub, Firebase and AI-assisted development tools to build modern web applications — with strong problem-solving skills and a passion for creating clean, scalable, user-centric solutions while continuously learning emerging technologies.",
  },
  contact: {
    heading: "Contact",
    blurb:
      "Open to web development opportunities, freelance work and collaborations. The fastest way to reach me is email.",
    email: "svkarthigeyan@gmail.com",
    footer: "S.V Karthigeyan — 2026",
  },
  gallery: PROJECTS.flatMap((p) =>
    [p.col2Image, p.col1Image1, p.col1Image2]
      .filter((src): src is string => Boolean(src))
      .map((src) => ({ src, label: p.name })),
  ),
  experience: [
    {
      role: "Web Development Intern",
      company: "Zaalima Development (Remote)",
      period: "March — May 2026",
      desc: "Developed responsive web applications using modern frontend technologies. Built reusable UI components and interactive features with React.js, TypeScript, JavaScript and Tailwind CSS. Integrated APIs and optimized application performance. Used Git and GitHub for version control and collaborative development, applying debugging, testing and responsive design best practices in an agile environment.",
    },
    {
      role: "Front-End Development Intern",
      company: "Cognifyz Technologies (Remote)",
      period: "November — December 2025",
      desc: "Developed structured web pages using HTML and applied CSS styling techniques to enhance layout and visual design. Implemented responsive web design using media queries for cross-device compatibility. Built interactive UI features using JavaScript, including event handling and dynamic DOM manipulation, and designed validated web forms with Bootstrap-based component styling.",
    },
    {
      role: "Web Development Intern",
      company: "Oasis Infobyte (Remote)",
      period: "November — December 2025",
      desc: "Completed internship tasks including a Calculator, Tribute Page, To-Do App and Login Authentication Page. Implemented responsive layouts using HTML, CSS and JavaScript, gaining experience in UI design, DOM manipulation and clean component-based structuring while collaborating in a virtual internship environment.",
    },
  ],
  education: [
    {
      degree: "Bachelor of Computer Application",
      institution: "St. Pauls College",
      period: "2023 — 2026",
      desc: "",
    },
  ],
  skills: SKILLS,
  projects: PROJECTS.map(({ number, name, category, desc, col1Image1, col1Image2, col2Image, url }) => ({
    number,
    name,
    category,
    desc,
    image1: col1Image1 ?? "",
    image2: col1Image2 ?? "",
    imageMain: col2Image ?? "",
    url,
  })),
  marquee: { row1: [], row2: [] },
};

const TABLE = "portfolio_content";
const ROW_ID = "default";
const LOCAL_STORAGE_KEY = "portfolio-content-karthigeyan-v1";

export type SaveResult = { ok: true } | { ok: false; error: string };

interface Ctx {
  content: PortfolioContent;
  /** True once the initial load from the backend has finished (or failed). */
  ready: boolean;
  /** False if VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY aren't set. */
  isBackendConnected: boolean;
  setContent: (c: PortfolioContent) => Promise<SaveResult>;
  reset: () => Promise<SaveResult>;
}

const ContentContext = createContext<Ctx>({
  content: DEFAULT_CONTENT,
  ready: false,
  isBackendConnected: false,
  setContent: async () => ({ ok: false, error: "Not initialised" }),
  reset: async () => ({ ok: false, error: "Not initialised" }),
});

function mergeWithDefaults(partial: Partial<PortfolioContent>): PortfolioContent {
  return {
    ...DEFAULT_CONTENT,
    ...partial,
    hero: { ...DEFAULT_CONTENT.hero, ...partial.hero },
    about: { ...DEFAULT_CONTENT.about, ...partial.about },
    contact: { ...DEFAULT_CONTENT.contact, ...partial.contact },
    marquee: { ...DEFAULT_CONTENT.marquee, ...partial.marquee },
  };
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<PortfolioContent>(DEFAULT_CONTENT);
  const [ready, setReady] = useState(false);
  const client = useMemo(() => getSupabaseClient(), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!client) {
        // No backend connected yet — fall back to whatever was saved locally
        // in this browser before (e.g. from an earlier, pre-backend visit).
        try {
          const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
          if (raw && !cancelled) setContentState(mergeWithDefaults(JSON.parse(raw)));
        } catch {
          /* ignore */
        }
        if (!cancelled) setReady(true);
        return;
      }

      const { data, error } = await client.from(TABLE).select("content").eq("id", ROW_ID).maybeSingle();
      if (!cancelled) {
        if (!error && data?.content) {
          setContentState(mergeWithDefaults(data.content as Partial<PortfolioContent>));
        }
        setReady(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [client]);

  const value = useMemo<Ctx>(
    () => ({
      content,
      ready,
      isBackendConnected: Boolean(client),
      setContent: async (c) => {
        setContentState(c);

        if (!client) {
          try {
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(c));
          } catch {
            /* ignore */
          }
          return { ok: false, error: "Not connected to a backend — saved only in this browser." };
        }

        const { error } = await client
          .from(TABLE)
          .upsert({ id: ROW_ID, content: c, updated_at: new Date().toISOString() });

        if (error) return { ok: false, error: error.message };
        return { ok: true };
      },
      reset: async () => {
        setContentState(DEFAULT_CONTENT);

        if (!client) {
          try {
            window.localStorage.removeItem(LOCAL_STORAGE_KEY);
          } catch {
            /* ignore */
          }
          return { ok: false, error: "Not connected to a backend." };
        }

        const { error } = await client
          .from(TABLE)
          .upsert({ id: ROW_ID, content: DEFAULT_CONTENT, updated_at: new Date().toISOString() });

        if (error) return { ok: false, error: error.message };
        return { ok: true };
      },
    }),
    [content, ready, client],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function usePortfolioContent() {
  return useContext(ContentContext);
}
