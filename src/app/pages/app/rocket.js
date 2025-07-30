/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import TitleBar from "../titlebar";
import AnimatedCard from "@/app/components/AnimatedCard";

function Rocket({ close }) {
  const nodeRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);
  const [Nasa, SetNasa] = useState({});

  const handleClose = (action) => {
    if (action === 1) {
      setIsClosing(true);
      setTimeout(() => close?.(1), 300);
    }
  };

  async function getNASAData() {
    const url =
      "https://api.nasa.gov/planetary/apod?api_key=DBckdtf98UGvPPoUOjATQBoEimuXLHzbjPZj8DTh";
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      SetNasa(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getNASAData();
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    > <AnimatedCard key="rocket">  <Draggable
        nodeRef={nodeRef}
        handle=".handle"
        defaultPosition={{ x: 180, y: 100 }}
      >
        <div
          ref={nodeRef}
          className="pointer-events-auto absolute flex flex-col w-[90vw] max-w-3xl h-[85vh] bg-neutral-900/80 backdrop-blur-md text-white border border-gray-700 rounded-2xl overflow-hidden shadow-2xl"
          role="dialog"
          aria-modal="true"
        >
          {/* Title Bar */}
          <div className="handle w-full">
            <TitleBar
              title="NASA APOD"
              close={handleClose}
              hiddenControl={0}
              roundedStyle={1}
              hiddenMoveMe={1}
            />
          </div>

          {/* Scrollable Content */}
          <div className="overflow-auto flex flex-col h-full px-6 py-6 gap-6">
            {/* Hero Image */}
            {Nasa.media_type === "image" && (
              <div className="w-full h-[250px] md:h-[360px] rounded-xl overflow-hidden border border-white/10 shadow-md">
                <img
                  src={Nasa.url}
                  alt={Nasa.title || "NASA APOD"}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Title + Meta */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
              <h2 className="text-2xl font-semibold text-white">
                {Nasa.title}
              </h2>
              <div className="flex items-center text-xs text-gray-400 gap-2">
                {Nasa?.copyright && (
                  <span className="text-white/80">{Nasa.copyright}</span>
                )}
                {Nasa.date && (
                  <>
                    <span className="text-gray-500">•</span>
                    <span>
                      {new Date(Nasa.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="text-sm text-gray-300 leading-relaxed overflow-y-auto pr-2">
              {Nasa.explanation}
            </div>
          </div>
        </div>
      </Draggable> </AnimatedCard>
     
    </div>
  );
}

export default Rocket;