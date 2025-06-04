import React, { useRef, useState } from "react";
import TitleBar from "../titlebar";
import Draggable from "react-draggable";
import Do from "../../storage/audio/do.wav";
import Re from "../../storage/audio/re.wav";
import Mi from "../../storage/audio/mi.wav";
import Fa from "../../storage/audio/fa.wav";
import So from "../../storage/audio/so.wav";
import La from "../../storage/audio/la.wav";
import Ti from "../../storage/audio/ti.wav";
import Do1 from "../../storage/audio/do1.wav";

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

  return (
    <div className={`fixed top-0 left-0 w-full h-full z-40 pointer-events-none transition-opacity duration-300 ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}>
      <Draggable
        nodeRef={nodeRef}
        handle=".handle"
        defaultPosition={{ x: 100, y: 100 }}
      >
        <div
          ref={nodeRef}
          className="pointer-events-auto absolute flex flex-col items-center w-3/5 bg-accent1/90 backdrop-blur-sm shadow-2xl border border-accent4 rounded-2xl  overflow-hidden"
        >
          <div className="handle w-full">
            <TitleBar
              title="Work"
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
                Accepting work offers via my{" "}
                <a
                  href="mailto:purwaarda51@gmail.com"
                  className="text-accent3 underline"
                >
                  work email!
                </a>
              </p>
              <p className="text-sm mt-1">
                I do web/app
                development. {":)"}
              </p>
            </div>

            {/* Skills Grid */}
            <div className="w-[90%] grid grid-cols-2 gap-6 text-white">
              {/* Tools Section */}
              <div>
                <h2 className="text-xl font-bold text-white mb-2">TOOLS</h2>
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
                      className="px-3 py-1 bg-accent3/20 border border-accent4 rounded-md text-sm shadow-sm transition hover:translate-y-1  duration-150 font-consolas "
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Development Section */}
              <div>
                <h2 className="text-xl font-bold text-white mb-2">
                  DEVELOPMENT
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
                      className="px-3 py-1 bg-accent3/20 border border-accent4  rounded-md text-sm shadow-sm transition hover:translate-y-1  duration-150"
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
