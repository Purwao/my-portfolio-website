import React, { useRef, useState } from "react";
import TitleBar from "../titlebar";
import Draggable from "react-draggable";
import Do from "../../storage/audio/do.wav";
import Re from "../../storage/audio/re.wav";
import Mi from "../../storage/audio/mi.wav";
import Fa from "../../storage/audio/fa.wav";
import So from "../../storage/audio/so.wav";
import { useLanguage } from "@/app/context/languageContext";

function Work(props) {
   const nodeRef = useRef(null);
  const noteIndexRef = useRef(0); // shared index for cycling notes
  const [isClosing,setIsClosing]=useState(false);

  const audioNotes = [
    new Audio(Do),
    new Audio(Re),
    new Audio(Mi),
    new Audio(Fa),
    new Audio(So),
  ];

  audioNotes.forEach((audio) => {
  audio.volume = 0.3;
  });

  const handleClose = (action) => {
    if (action == 1) {
      setIsClosing(true);
      setTimeout(() => {
        console.log("Closing the Work page");
        props.close?.(1);
      }, 300);
    }
  };

  const playNoteSequence = () => {
    const audio = audioNotes[noteIndexRef.current];
    audio.currentTime = 0;
    audio.play();

    noteIndexRef.current = (noteIndexRef.current + 1) % audioNotes.length;
  };

  const {lang}=useLanguage();

const text = {
  work: lang === "en" ? "Work" : "Karya",
  workDesc:
    lang === "en"
      ? "Feel free to reach out — I'm open for collaboration and projects!"
      : "Jangan ragu untuk menghubungi — saya terbuka untuk kolaborasi dan proyek!",

  emailPitch:
    lang === "en"
      ? "Accepting work offers via my"
      : "Menerima tawaran kerja melalui",

  emailNote:
    lang === "en"
      ? "I do web/app development. (ᵔ◡ᵔ)"
      : "Saya mengerjakan pengembangan web dan aplikasi. (ᵔ◡ᵔ)",

  toolsHeader: lang === "en" ? "TOOLS" : "ALAT",
  devHeader: lang === "en" ? "DEVELOPMENT" : "PENGEMBANGAN",
};
  return (
<div className={`fixed top-0 left-0 w-full h-full z-40 pointer-events-none transition-opacity duration-300 ${isClosing ? "opacity-0" : "opacity-100"}`}>
  <Draggable
    nodeRef={nodeRef}
    handle=".handle"
    defaultPosition={{ x: 100, y: 100 }}
  >
    <div
      ref={nodeRef}
      className="pointer-events-auto absolute flex flex-col items-center w-3/5 bg-accent1/90 backdrop-blur-sm shadow-2xl border border-accent4 rounded-2xl overflow-hidden"
    >
      <div className="handle w-full">
        <TitleBar
          title={text.work}
          close={handleClose}
          hiddenControl={0}
          roundedStyle={1}
          hiddenMoveMe={1}
        />
      </div>

      <div className="w-full h-max container flex flex-col justify-center items-center gap-6">
        {/* Banner */}
        <div className="bg-accent4/30 text-white border border-white p-4 rounded-md w-[90%]">
          <p className="font-semibold">
            {text.emailPitch}{" "}
            <a
              href="mailto:purwaarda51@gmail.com"
              className="text-accent3 underline"
            >
              work email!
            </a>
          </p>
          <p className="text-sm mt-1">{text.emailNote}</p>
        </div>

        {/* Skills Grid */}
        <div className="w-[90%] grid grid-cols-2 gap-6 text-white">
          {/* Tools Section */}
          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              {text.toolsHeader}
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Visual Studio",
                "Android Studio",
                "Laragon",
                "Visual Studio Code",
                "Figma",
              ].map((tool) => (
                <span
                  key={tool}
                  onMouseEnter={playNoteSequence}
                  className="px-3 py-1 bg-accent3/20 border border-accent4 rounded-md text-sm shadow-sm transition hover:translate-y-1 duration-150 font-consolas"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Development Section */}
          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              {text.devHeader}
            </h2>
            <div className="flex flex-wrap font-consolas gap-2">
              {[
                "HTML/CSS",
                "JavaScript",
                "React",
                "Next.js",
                "Vite",
                "Java",
                "Python",
                "C#",
                "PHP",
                "Laravel",
              ].map((lang) => (
                <span
                  key={lang}
                  onMouseEnter={playNoteSequence}
                  className="px-3 py-1 bg-accent3/20 border border-accent4 rounded-md text-sm shadow-sm transition hover:translate-y-1 duration-150"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Draggable>
</div>

  );
}

export default Work;
