import { useRef } from "react";

import {
  SiFlutter, SiFirebase, SiPython, SiJavascript, SiGooglecloud, SiGit,
  SiTailwindcss, SiReact, SiDart, SiSelenium
} from "react-icons/si";
// import { FaRegUser } from "react-icons/fa"; // outlined person icon
import { CiUser } from "react-icons/ci";

const techStack = [
  { name: "Flutter", icon: <SiFlutter className="text-6xl text-[#027DFD]" /> }, // Flutter Blue (Sky Blue)
  { name: "Firebase", icon: <SiFirebase className="text-6xl text-[#FFCA28]" /> }, // Firebase Yellow (primary flame color)
  { name: "Python", icon: <SiPython className="text-6xl text-[#306998]" /> }, // Python Blue
  { name: "JavaScript", icon: <SiJavascript className="text-6xl text-[#F7DF1E]" /> }, // JavaScript Yellow
  { name: "Git", icon: <SiGit className="text-6xl text-[#f44c27]" /> }, // Git Orange
  { name: "Google Cloud", icon: <SiGooglecloud className="text-6xl text-[#4285F4]" /> }, // Google Cloud Blue
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-6xl text-[#06B6D4]" /> }, // Tailwind's signature Teal/Cyan
  { name: "React", icon: <SiReact className="text-6xl text-[#61DAFB]" /> }, // React Blue
  { name: "Dart", icon: <SiDart className="text-6xl text-[#0175C2]" /> }, // Dart Blue
  { name: "Selenium", icon: <SiSelenium className="text-6xl text-[#43B02A]" /> }, // Selenium Green (from logo)
];

function About() {
  const backgroundRef = useRef(null);

  return (
    <section className="relative w-full h-auto overflow-hidden py-20 px-6 md:px-12">
      {/* Vanta Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0"
        style={{ filter: "brightness(0.3) contrast(2)" }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center text-white">
        {/* LEFT: Icon + Bio */}
        <div className="flex flex-col items-center text-center gap-6">
          <CiUser className="text-[150px] text-blue-400" />
          {/* <h2 className="text-4xl font-bold text-white">About Me</h2> */}
          <p className="text-[20px] leading-relaxed text-left text-gray-100 max-w-xl">
            Hi, I'm a software developer who enjoys solving real problems and making life a little easier with code.
            I'm naturally curious and love building things that are genuinely useful, from small tools to larger systems.
            I'm a firm believer in lifelong learning, always picking up new tech, better ways to build, and fresh ways
            of thinking. I'm committed to crafting clean, reliable, and meaningful code.
            <br /><br />
            I'm currently seeking new opportunities.
          </p>
        </div>

        {/* RIGHT: Tech Stack Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 justify-items-center">
          {techStack.map(({ name, icon }) => (
            <div
              key={name}
              className="flex flex-col items-center justify-center gap-2 border-3 border-gray-600 rounded-xl px-4 py-5 w-35 h-35 text-center hover:border-blue-500 hover:text-blue-400 transition-all"
            >
              {icon}
              <span className="text-sm font-medium text-gray-200">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
