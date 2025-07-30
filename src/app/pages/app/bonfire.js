"use client";

import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import TitleBar from "../titlebar";
import Image from "next/image";
import AnimatedCard from "@/app/components/AnimatedCard";

function Bonfire({ close }) {
  const nodeRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = (action) => {
    if (action === 1) {
      setIsClosing(true);
      setTimeout(() => close?.(1), 300);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
   
      <AnimatedCard key="bonfire">
   <Draggable
        nodeRef={nodeRef}
        handle=".handle"
        defaultPosition={{ x: 180, y: 100 }}
      >
        <div
          ref={nodeRef}
          className="pointer-events-auto absolute flex flex-col w-[90vw] max-w-5xl h-[85vh] bg-accent1/90 backdrop-blur-md  text-white border border-gray-700 rounded-2xl overflow-hidden shadow-xl"
          role="dialog"
          aria-modal="true"
        >
          {/* GitHub-style draggable title */}
          <div className="handle w-full">
            <TitleBar
              title="Cool Stuff"
              close={handleClose}
              hiddenControl={0}
              roundedStyle={1}
              hiddenMoveMe={1}
            />
          </div>

          {/* Scrollable content */}
          <div className="overflow-auto flex flex-row gap-5 h-full container">
            <div className="w-1/4 bg-accent2 flex flex-col justify-center items-center">
              <Image
                className=" rounded-full"
                alt="profile img"
                src="https://avatars.githubusercontent.com/Purwao"
                width={120}
                height={120}
              />
              <h1 className="text-4xl text-white font-bold font-sans">
                Purwao
              </h1>
            </div>
        <div className="w-3/4 bg-accent2 p-5 space-y-10">
  {/* Project of the Month */}
  <div>
    <h1 className="font-bold px-4 text-lg mb-2">Project of the Month</h1>
    <div className="w-full bg-accent1/70 border border-[#30363d] rounded-lg p-4 hover:border-[#58a6ff] transition flex gap-4 items-center justify-between">
      {/* Left Image */}
      <div className="min-w-[80px]">
        <Image
          className="w-20 h-20 object-cover rounded-md border border-[#30363d]"
          alt="R2C preview"
          src="https://raw.githubusercontent.com/Purwao/R2C/refs/heads/main/storage/assets/desktopicon.jpeg"
          width={80}
          height={80}
        />
      </div>

      {/* Right content and button wrapper */}
      <div className="flex flex-1 justify-between items-center">
        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-accent3 font-semibold text-base">R2C</h3>
            <span className="text-xs px-2 py-0.5 border border-[#30363d] rounded-xl text-white/60">
              Public
            </span>
          </div>
          <p className="text-sm text-white/40">Your Desktop Companion!</p>
          <div className="flex items-center text-xs text-white/60 pt-1">
            <span className="w-3 h-3 rounded-full mr-1 bg-yellow-400" />
            <span>JavaScript</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 text-center">
          <a
            href="https://github.com/Purwao/R2C/releases/tag/v1.3.2"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-4 py-1.5 text-sm rounded-md bg-accent4/40 hover:bg-accent3/80 transition text-white font-semibold"
          >
            Download
          </a>
          <a
            href="https://github.com/Purwao/R2C"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-4 py-1.5 text-sm rounded-md bg-accent4/40 hover:bg-accent3/80 transition text-white font-semibold"
          >
            Repository
          </a>
        </div>
      </div>
    </div>
  </div>

  {/* Next Up Section */}
  <div>
    <h1 className="font-bold px-4 text-lg mb-2">Next Up</h1>
    <div className="w-full bg-accent1/70 border border-[#30363d] rounded-lg p-4 opacity-50 cursor-not-allowed flex gap-4 items-center justify-between">
      {/* Placeholder Icon */}
      <div className="min-w-[80px] h-20 bg-[#30363d] rounded-md flex items-center justify-center text-white/40 text-2xl font-bold">
        ?
      </div>

      {/* Right content */}
      <div className="flex flex-1 justify-between items-center">
        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-accent3 font-semibold text-base">
              SecondBrain Terminal
            </h3>
            <span className="text-xs px-2 py-0.5 border border-[#30363d] rounded-xl text-white/40">
              Work in Progress
            </span>
          </div>
          <p className="text-sm text-white/30 italic">
            Modular terminal-style productivity engine
          </p>
          <div className="flex items-center text-xs text-white/40 pt-1">
            <span className="w-3 h-3 rounded-full mr-1 bg-blue-400" />
            <span>JavaScript</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

          </div>
        </div>
      </Draggable>
      </AnimatedCard>
 
    </div>
  );
}

export default Bonfire;
