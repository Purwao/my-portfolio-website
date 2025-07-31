/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import TitleBar from "../titlebar";
import AnimatedCard from "@/app/components/AnimatedCard";

function Rocket({ close }) {
  const nodeRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);


  const [isClosing, setIsClosing] = useState(false);
  const [Nasa, SetNasa] = useState({});

  const handleClose = (action) => {
    if (action === 1) {
      setIsClosing(true);
      setTimeout(() => close?.(1), 300);
    }
  };

async function getNASAData(date = "") {
  setLoading(true);
  try {
    const baseUrl = "https://api.nasa.gov/planetary/apod";
    const apiKey = "DBckdtf98UGvPPoUOjATQBoEimuXLHzbjPZj8DTh";
    const url = date
      ? `${baseUrl}?date=${date}&api_key=${apiKey}`
      : `${baseUrl}?api_key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    SetNasa(data);
  } catch (error) {
    console.error(error.message);
  } finally {
    setLoading(false);
  }
}


  useEffect(() => {
    getNASAData();
  }, []);

useEffect(() => {
  if (!selectedDate) return;

  const delay = setTimeout(() => {
    getNASAData(selectedDate);
  }, 500); // 500ms debounce

  return () => clearTimeout(delay); // cleanup if user changes quickly
}, [selectedDate]);



  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const containerHeight = container.clientHeight;

    const handleImageLoad = () => {
      const imageHeight = image.scrollHeight;
      if (imageHeight <= containerHeight) return; // No need to pan

      let start = Date.now();
      let direction = 1;
      const duration = 30000; // 30 seconds for full up/down cycle

      const animate = () => {
        const now = Date.now();
        const elapsed = (now - start) / (duration / 2); // Half duration per direction
        const maxOffset = imageHeight - containerHeight;
        let offset;

        if (direction === 1) {
          offset = Math.min(maxOffset, maxOffset * elapsed);
          if (elapsed >= 1) {
            direction = -1;
            start = now;
          }
        } else {
          offset = Math.max(0, maxOffset - maxOffset * elapsed);
          if (elapsed >= 1) {
            direction = 1;
            start = now;
          }
        }

        image.style.transform = `translateY(-${offset}px)`;
        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    };

    if (image.complete) {
      handleImageLoad();
    } else {
      image.onload = handleImageLoad;
    }

    return () => {
      if (image) {
        image.onload = null;
        image.style.transform = "";
      }
    };
  }, [Nasa.url]);

  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <AnimatedCard key="rocket">
        <Draggable
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
                <div
                  ref={containerRef}
                  className="w-full h-[360px] md:h-[420px] rounded-xl overflow-hidden border border-white/10 shadow-md relative"
                >
                  <img
                    ref={imageRef}
                    src={Nasa.url}
                    alt={Nasa.title || "NASA APOD"}
                    className="w-full object-contain will-change-transform transition-transform ease-in-out"
                  />
                </div>
              )}

              {/* Title + Meta */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                <h2 className="text-3xl font-semibold text-accent3">
                  {Nasa.title}
                </h2>
                <div className="flex items-center text-xs text-gray-400 gap-2">
                  {Nasa?.copyright && (
                    <span className="text-white/80">{Nasa.copyright}</span>
                  )}
                  {Nasa.date && (
                    <>
                      <span className="text-gray-500">•</span>
                      <input
                          type="date"
                          value={selectedDate || Nasa.date || ""}
                          max={new Date().toISOString().split("T")[0]}
                          min="1995-06-16"
                          onChange={(e) => setSelectedDate(e.target.value)}
                          disabled={loading}
                          className=" dark:bg-white dark:text-black dark:border-black text-white border border-white px-2 py-1 rounded text-xs disabled:opacity-50"
                      />

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
        </Draggable>
      </AnimatedCard>
    </div>
  );
}

export default Rocket;
