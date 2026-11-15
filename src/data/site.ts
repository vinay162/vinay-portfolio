// Site-wide facts. Pages read from here so nothing is written twice.

export interface CardLink {
  label: string;
  url: string;
}

export interface Figure {
  value: string;
  label: string;
}

/** A project shown on the home page that has no page of its own yet. */
export interface UpcomingProject {
  order: number;
  title: string;
  summary: string;
  stack: string;
  note?: string;
  ongoing?: boolean;
  links: CardLink[];
  figures: [Figure, Figure];
}

export const site = {
  name: 'Vinay Purohit',
  // Same title as the resume, so the two always match.
  role: 'Software Engineer | Full-Stack, Backend & AI/GenAI',
  jobTitle: 'Software Engineer',
  location: 'Mumbai, India',
  title: 'Vinay Purohit, Software Engineer | Full-Stack, Backend & AI/GenAI',
  // Shown under the title in link previews and search results: key facts first.
  description:
    'Nearly 3 years of experience. Sole developer of a social app with 10,000+ users, and built a booking app with online payments, live on Google Play. Based in Mumbai.',
  // <b> marks the two facts that should stand out in the opening paragraph.
  lede: '<b>Nearly 3 years of experience</b> across mobile, web and AI. Sole developer of <b>a social app with 10,000+ users</b>, and built <b>a booking app with online payments</b>, live on Google Play. Based in Mumbai.',
  email: 'vinaypurohit270@gmail.com',
  links: {
    linkedin: 'https://linkedin.com/in/vinay-purohit-58b3922b8',
    github: 'https://github.com/vinay162',
  },
  resumePath: '/Vinay_Purohit_Resume.pdf',

  // A third-person summary for llms.txt and structured data, where a reader
  // (or an AI tool) meets the site without the page around it.
  about: {
    summary:
      'Vinay Purohit is a software engineer in Mumbai, India, with nearly 3 years of experience building mobile and web apps, covering frontend, backend and AI features. He has been the sole developer of Buddy Up Network, a social app for people with disabilities and their caregivers with more than 10,000 users, since its launch, and built rentmyclass, a classroom booking app with online payments that is live on Google Play.',
    facts: [
      "Current role: Software Developer (Founders' Office) at Spoton Fintech, Mumbai, since May 2024.",
      'Earlier: Applied AI Intern at Kluster, Bangalore, January to April 2024.',
      'Education: B.Tech in Computer Engineering, NMIMS Mumbai, 2020 to 2024. Schooling at The Lawrence School, Lovedale, 2011 to 2020.',
      'Strengths: building a product alone from first requirement to app-store release, making slow systems faster and measuring the result, and shipping AI features with test suites and safety checks.',
      'Tools: Python, TypeScript, JavaScript, SQL, Dart, FastAPI, PostgreSQL, Supabase, Firebase, Google Cloud Functions, React, Flutter, OpenAI API, Ollama, retrieval-augmented generation.',
      'Suited to: full-stack, backend and applied AI engineering roles.',
      'All figures on this site are measured results from his own work.',
    ],
    skills: [
      'Python', 'TypeScript', 'JavaScript', 'SQL', 'Dart', 'FastAPI', 'PostgreSQL', 'Supabase', 'Firebase',
      'Google Cloud Functions', 'React', 'Flutter', 'OpenAI API', 'Retrieval-augmented generation',
    ],
  },

  otherWork: [
    {
      title: 'Image and video descriptions',
      text: 'Written descriptions of photos and videos in Buddy Up Network, for people who use a screen reader. Runs in the background without slowing the app.',
    },
    {
      title: 'Travel document reader',
      text: "Reads flight bookings, passports and visas and fills in the details automatically, for a client's travel app (React, Supabase).",
    },
    {
      title: 'Pipeline monitoring app',
      text: 'Flutter app for Polmon Instruments that connects to a Raspberry Pi Pico 2 W over Bluetooth to monitor industrial pipelines, with wireless device updates.',
    },
  ],

  experience: [
    {
      when: 'May 2024 to now',
      title: "Software Developer, Founders' Office, Spoton Fintech",
      text: 'Mumbai. Apps for clients, from first requirements to app-store release.',
    },
    {
      when: 'Jan to Apr 2024',
      title: 'Applied AI Intern, Kluster',
      text: 'Bangalore. Faster document search, and a comparison of three embedding models.',
    },
    {
      when: '2020 to 2024',
      title: 'B.Tech, Computer Engineering, NMIMS Mumbai',
      text: 'CGPA 3.57 of 4.0.',
    },
    {
      when: '2011 to 2020',
      title: 'The Lawrence School, Lovedale',
      text: 'Schooling, Nilgiris.',
    },
  ],

  // Move an entry out of here once its file exists in src/content/projects/.
  upcoming: [] as UpcomingProject[],
};
