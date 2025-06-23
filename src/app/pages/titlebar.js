"use client";
import React from "react";
import ClosePage from "../storage/audio/close.wav";
import MinimizePage from "../storage/audio/minimize.wav";

function TitleBar(props) {
  // Audio functions
  const playCloseAudio = () => new Audio(ClosePage).play();
  const playMinimizeAudio = () => new Audio(MinimizePage).play();

  // Button handlers
  const handleClose = () => {
    playCloseAudio();
    props.close?.(1); // parent handles fade + unmount
  };

  const handleMinimize = () => {
    playMinimizeAudio();
    props.close?.(1); // you can separate minimize logic if needed
  };

  // Optional style props
  const roundedStyle =
    props.roundedStyle === 1
      ? {
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }
      : {};

  const visibilityStyle = props.close === 1 ? { visibility: "hidden" } : {};
  const titleControlStyle =
    props.hiddenControl === 1 ? { visibility: "hidden" } : {};
  const moveMeStyle = props.hiddenMoveMe === 1 ? { visibility: "hidden" } : {};

  return (
    <div
      className="w-full h-7 bg-accent4 px-3 flex justify-around items-center titlebar-container cursor-pointer"
      style={{ ...visibilityStyle, ...roundedStyle }}
    >
      {/* Title */}
      <div className="w-1/2 font-consolas text-accent1 text-lg font-bold">
        <h1>{props.title}</h1>
      </div>

      {/* Move hint */}
      <h2
        style={moveMeStyle}
        className="text-xs font-light flex text-accent1 w-full justify-center items-center font-consolas"
      >
        {props.movemeText}
      </h2>

      {/* Controls */}
      <div
        className="w-1/2 font-consolas text-accent1 text-lg font-bold flex justify-end items-center titlebarcontrol"
        style={titleControlStyle}
      >
        {/* Minimize Button
        <button
          onClick={handleMinimize}
          className="hover:bg-accent1/70 rounded-lg p-2 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#332D56"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button> */}

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="hover:bg-accent1/30 rounded-lg p-2 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#332D56"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TitleBar;
