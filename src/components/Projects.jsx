import { useRef } from "react";
import {
  SiFlutter, SiFirebase, SiPython, SiGooglesheets, SiGooglecloud, SiBluetooth, SiAgora, SiWebflow,
  SiRaspberrypi
} from "react-icons/si";

function Projects() {
  const backgroundRef = useRef(null);

  const flutterFirebaseApps = [
    {
      name: "Buddy Up Network",
      desc: "Inclusive friendship app with Chat and Video + Voice call features.",
      play: "https://play.google.com/store/apps/details?id=com.network.buddyup",
      appstore: "https://apps.apple.com/in/app/buddy-up-network/id6569240717",
      // Add logoSrc here
      logoSrc: "https://play-lh.googleusercontent.com/ypZZ5SGcK8RY-YKONc0GmpGgOw57NPhhJ3pFJ3idSuZwggbjJlzRyIp8A0HplT17GTIW=w240-h480-rw", // <--- REPLACE WITH ACTUAL URL
      techIcons: [
        <SiFlutter className="text-[#027DFD] text-4xl" key="flutter" />,
        <SiFirebase className="text-[#FFCA28] text-4xl" key="firebase" />,
        <SiAgora className="text-[#00c2ff] text-6xl" key="agora" />
      ],
    },
    {
      name: "Spoton Fintech",
      desc: "Client app with full-stack automation and deployment. Features real-time data & web scraping.",
      play: "https://play.google.com/store/apps/details?id=ind.spotonfintech",
      appstore: "https://apps.apple.com/in/app/spoton-fintech/id6502514373",
      // Add logoSrc here
      logoSrc: "https://play-lh.googleusercontent.com/T4-nttGvIwczUHiF-yo8M1QNJLPWJFyqmtibj7AET6tHFusl5aoteMOabuUD7AGRy9I=w240-h480-rw", // <--- REPLACE WITH ACTUAL URL
      techIcons: [
        <SiFlutter className="text-[#027DFD] text-4xl" key="flutter" />,
        <SiFirebase className="text-[#FFCA28] text-4xl" key="firebase" />,
        <SiPython className="text-[#306998] text-4xl" key="python" />,
        // <SiGooglecloudfunctions className="text-[#669DF6] text-3xl" key="gcf" />,
      ],
    },
    {
      name: "Wise Friends",
      desc: "Social app for people in their Golden years with Chat and Video + Voice call features.",
      play: "https://play.google.com/store/apps/details?id=com.wisefriends.buddy",
      // Add logoSrc here
      logoSrc: "https://play-lh.googleusercontent.com/nHWTf0Rm9qX0T5AfsEecA1yiIDTeCk-HfkE_vEDygq77M8b3FChFvM-8U9w33wVIDcVH=w240-h480-rw", // <--- REPLACE WITH ACTUAL URL
      techIcons: [
        <SiFlutter className="text-[#027DFD] text-4xl" key="flutter" />,
        <SiFirebase className="text-[#FFCA28] text-4xl" key="firebase" />,
        <SiAgora className="text-[#00c2ff] text-6xl" key="agora" />
      ],
    },
  ];

  return (
    <section className="relative w-full overflow-hidden text-white">
      <div
        ref={backgroundRef}
        className="absolute inset-0"
        style={{ filter: "brightness(0.3) contrast(2)" }}
      />

      <div className="relative z-10 flex flex-col">

        {/* FlutterFlow Apps Group */}
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-15">
          <h2 className="text-4xl font-bold mb-2">Production-Grade Mobile Apps</h2>
          <p className="text-gray-400 text-lg mb-8">
            Built at Spoton Fintech Pvt. Ltd.
            </p>
          <div className="flex flex-col md:flex-row gap-10 justify-center">
            {flutterFirebaseApps.map(app => (
              <div
                key={app.name}
                className="border border-gray-600 rounded-xl p-6 w-72 text-center bg-black/30 hover:border-blue-500 transition"
              >
                {/* App Logo goes here */}
                {app.logoSrc && (
                  <img
                    src={app.logoSrc}
                    alt={`${app.name} Logo`}
                    className="w-20 h-20 mx-auto mb-4 object-contain rounded-lg" // Adjust w- and h- as needed
                  />
                )}
                <h3 className="text-2xl font-semibold mb-2">{app.name}</h3>
                <p className="text-gray-300 mb-4">{app.desc}</p>
                <div className="flex gap-2 justify-center mb-3">
                  {app.techIcons}
                </div>
                <div className="flex gap-3 justify-center">
                  {app.play && (
                    <a href={app.play} target="_blank" rel="noopener noreferrer" className="border px-3 py-1 rounded hover:text-blue-400">Play Store</a>
                  )}
                  {app.appstore && (
                    <a href={app.appstore} target="_blank" rel="noopener noreferrer" className="border px-3 py-1 rounded hover:text-blue-400">App Store</a>
                  )}
                  {!app.play && !app.appstore && (
                    <span className="text-gray-400 text-sm">Release Pending</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IoT BLE Logger Highlight */}
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <h2 className="text-4xl font-bold mb-2">Corrosion Monitor</h2>
          <p className="text-gray-400 text-lg mb-6">
            Built at Spoton Fintech Pvt. Ltd.
          </p>
          <p className="max-w-4xl text-center text-2xl text-gray-300 mb-6">
            Developed a RAM & storage-efficient BLE data logger on Raspberry Pi Pico 2 W (MicroPython).
            Implements chunked data transfer with ACK handling, timestamp validation, and OTA firmware
            updates via a FlutterFlow app. The app enables device configuration, Firebase authentication
            for user access, and handles local data storage before uploading to Firebase for cloud storage.
          </p>
          <div className="flex gap-4">
            <SiPython className="text-[#306998] text-5xl" />
            <SiBluetooth className="text-[#007AC9] text-5xl" />
            <SiFlutter className="text-[#027DFD] text-5xl" />
            <SiRaspberrypi className="text-[#027DFD] text-5xl" />
          </div>
        </div>

        {/* Other Projects */}
        <div className="py-15 px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Other Automation Tools</h2>
          <div className="space-y-6">
            <div className="border border-gray-700 rounded-lg p-6 bg-black/30">
              <h3 className="text-xl font-semibold text-blue-400">Automation Scripts</h3>
              <p className="text-gray-400 text-sm mb-2">
                Developed to streamline internal workflows at Spoton
              </p>
              <p className="text-gray-300 mt-2">
                Automated trading data processing: Python for web scraping and Firebase integration, Google Apps Script for Firebase-to-Sheet reporting and email alerts.
              </p>
              <div className="flex gap-3 mt-3">
                <SiPython className="text-[#306998] text-2xl" />
                <SiGooglesheets className="text-green-500 text-2xl" />
                <SiGooglecloud className="text-[#4285F4] text-2xl" />
              </div>
            </div>
            <div className="border border-gray-700 rounded-lg p-6 bg-black/30">
              <h3 className="text-xl font-semibold text-blue-400">Excel Summary Automation</h3>
              <p className="text-gray-400 text-sm mb-2">
                Freelance Project
              </p>
              <p className="text-gray-300 mt-2">
                Automated Python tool converting Excel data into clean PDF summaries via Pandas, ReportLab, and Tkinter.
              </p>
              <div className="flex gap-3 mt-3">
                <SiPython className="text-[#306998] text-2xl" />
                {/* Keep this commented out or replace with a working icon if available */}
                {/* <SiMicrosoftexcel className="text-green-600 text-2xl" /> */}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Projects;