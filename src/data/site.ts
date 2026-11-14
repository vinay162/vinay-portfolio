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
  links: CardLink[];
  figures: [Figure, Figure];
}

export const site = {
  name: 'Vinay Purohit',
  role: 'Software Engineer who builds apps from start to finish',
  jobTitle: 'Software Engineer',
  location: 'Mumbai, India',
  title: 'Vinay Purohit, Software Engineer',
  description:
    'Vinay Purohit is a software engineer in Mumbai who builds mobile and web apps from start to finish: frontend, backend and AI features.',
  // <b> marks the two facts that should stand out in the opening paragraph.
  lede: 'Frontend, backend and AI features. Built and launched <b>a social app with 10,000+ users</b> and <b>a booking app with online payments</b>, live on Google Play. Based in Mumbai.',
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
      'Vinay Purohit is a software engineer in Mumbai, India, with more than two years of experience building mobile and web apps from start to finish: frontend, backend and AI features. He built and launched Buddy Up Network, a social app for people with disabilities and their caregivers that has more than 10,000 users, and rentmyclass, a classroom booking app with online payments that is live on Google Play.',
    facts: [
      "Current role: Software Developer (Founders' Office) at Spoton Fintech, Mumbai, since May 2024.",
      'Earlier: Applied AI Intern at Kluster, Bangalore, January to April 2024.',
      'Education: B.Tech in Computer Engineering, NMIMS Mumbai, 2020 to 2024.',
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
      text: 'Flutter app that connects to a Raspberry Pi Pico 2 W over Bluetooth to monitor industrial pipelines, with wireless device updates.',
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
  ],

  // Move an entry out of here once its file exists in src/content/projects/.
  upcoming: [
    {
      order: 1,
      title: 'Buddy Up Network',
      summary:
        'Social app for people with disabilities and their caregivers, on iOS and Android. Built, launched and maintained solo. Works with screen readers and includes chat, voice calls and video calls.',
      stack: 'Flutter, Firebase, Cloud Functions (Google Cloud).',
      note: 'Built at Spoton Fintech for a client.',
      links: [
        { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.network.buddyup' },
        { label: 'App Store', url: 'https://apps.apple.com/in/app/buddy-up-network/id6569240717' },
      ],
      figures: [
        { value: '10,000+', label: 'users' },
        { value: '1 to 2.5 s', label: 'search time, down from 8 to 15 s' },
      ],
    },
    {
      order: 2,
      title: 'Support assistant for Buddy Up Network',
      summary:
        'Help assistant inside the app. The answer bot already existed. Built everything around it: a three-layer safety check, a set of test cases, monitoring and rate limiting.',
      stack: 'TypeScript, Cloud Functions, OpenAI API, Firestore.',
      links: [],
      figures: [
        { value: '68 of 68', label: 'safety test cases passed in the final run' },
        { value: '223', label: 'automated tests' },
      ],
    },
    {
      order: 3,
      title: 'rentmyclass',
      summary:
        'Classroom booking app with online payments. Built solo for a freelance client: Android app, backend and admin dashboard. Two people cannot book the same slot, and unpaid bookings are cancelled automatically.',
      stack: 'Flutter, Supabase (PostgreSQL), Razorpay, React.',
      links: [
        { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.rentmyclass.rent_my_class' },
      ],
      figures: [
        { value: 'Live', label: 'on Google Play' },
        { value: '10 min', label: 'before an unpaid booking is cancelled' },
      ],
    },
  ] as UpcomingProject[],
};
