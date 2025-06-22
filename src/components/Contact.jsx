import { useRef } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

function Contact() {
  const backgroundRef = useRef(null);
  
  return (
    <section className="relative w-full overflow-hidden py-24 px-6 text-white text-center">
      {/* Vanta Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0"
        style={{ filter: "brightness(0.3) contrast(2)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Let’s Connect</h2>
        <p className="text-lg text-gray-300 mb-6">
          I'm always open to new opportunities or interesting collaborations. Reach out via email or socials.
        </p>

        {/* Contact Buttons */}
        <div className="flex justify-center gap-6 flex-wrap mb-10">
          <a
            href="mailto:vinaypurohit270@gmail.com"
            className="flex items-center gap-2 border px-5 py-2 rounded hover:text-blue-400 hover:border-blue-400 transition"
          >
            <FaEnvelope /> vinaypurohit270@gmail.com
          </a>
          <a
            href="https://github.com/vinay162"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border px-4 py-2 rounded hover:text-blue-400 hover:border-blue-400 transition"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/vinay-purohit-58b3922b8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border px-4 py-2 rounded hover:text-blue-400 hover:border-blue-400 transition"
          >
            <FaLinkedin /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
