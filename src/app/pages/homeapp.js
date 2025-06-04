"use client";

import { useEffect, useState, useRef } from "react";
import Draggable from "react-draggable";
import TitleBar from "./titlebar";

function HomeApp() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const phrases = [
    "Fullstack Developer.  ",
    "Software Engineer.  ",
    "Web App Developer.  ",
  ];
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const nodeRef = useRef(null);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let typingSpeed = 150;

    if (isDeleting) {
      typingSpeed /= 1;
    }

    const timeout = setTimeout(() => {
      setText(currentPhrase.substring(0, charIndex));

      if (!isDeleting && charIndex === currentPhrase.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }

      setCharIndex((prevCharIndex) =>
        isDeleting ? prevCharIndex - 1 : prevCharIndex + 1
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  const handleStart = (e, data) => {
    console.log("Drag started", data);
  };

  const handleDrag = (e, data) => {
    console.log("Dragging", data);
  };

  const handleStop = (e, data) => {
    console.log("Drag stopped", data);
  };

  return (
    <div className="container w-10/12 mt-24 ">
      <Draggable
        nodeRef={nodeRef}
        axis="both"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={null}
        scale={1}
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}
      >
        <div ref={nodeRef} className=" flex flex-col justify-center items-center">
          <div className="handle w-6/12 ">
            <TitleBar title="Home" close={0} hiddenControl={1} roundedStyle={1}/>
          </div>
          <div className="container w-6/12 h-full bg-accent2/10 rounded-b-xl border-accent4 border-solid border-2  flex justify-center items-center flex-col">
            <div className="text-5xl font-sans text-center">
              <span className="text-white">
                Hi! I&apos;m <span className="text-accent3 font-bold">Purwao</span>
              </span>
            </div>
            <div className="typing-animation">
              <span className="text-4xl text-white">{text}</span>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default HomeApp;
