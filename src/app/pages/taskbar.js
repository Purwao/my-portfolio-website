"use client";

import { useEffect, useState } from "react";
import { IoMailOutline, IoInformationOutline } from "react-icons/io5";
import { GoLink } from "react-icons/go";
import { FaCode } from "react-icons/fa6";
import { TbUserQuestion } from "react-icons/tb";

import About from "./app/about";
import Links from "./app/links";
import Work from "./app/work";
import Faq from "./app/faq";
import Contact from "./app/contact";

import OpenPage from "../storage/audio/open.wav";
import ClosePage from "../storage/audio/close.wav";

export default function Taskbar() {
  const [time, setTime] = useState("");
  const [zCounter, setZCounter] = useState(100);

  const [showAbout, setShowAbout] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const [zAbout, setZAbout] = useState(0);
  const [zLinks, setZLinks] = useState(0);
  const [zWork, setZWork] = useState(0);
  const [zFaq, setZFaq] = useState(0);
  const [zContact, setZContact] = useState(0);

  const playSound = (sound) => new Audio(sound).play();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggle = (setter, visible, setZ) => {
    playSound(visible ? ClosePage : OpenPage);

    // Always bring window to front when opened
    if (!visible) {
      const newZ = zCounter + 1;
      setZCounter(newZ);
      setZ(newZ);
    }

    setter(!visible);
  };

  const bringToFront = (setZ) => {
    const newZ = zCounter + 1;
    setZCounter(newZ);
    setZ(newZ);
  };

  return (
    <>
      {/* Taskbar */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 bg-accent2/40 backdrop-blur-xl shadow-lg rounded-2xl px-4 py-2 flex items-center space-x-4 z-50 border border-accent4/90">
        <button onClick={() => toggle(setShowAbout, showAbout, setZAbout)} className="flex items-center space-x-2 p-2 rounded-xl hover:bg-white/20 transition text-white">
          <IoInformationOutline className="text-2xl" />
          <span className="text-sm font-mono">About</span>
        </button>
        <button onClick={() => toggle(setShowLinks, showLinks, setZLinks)} className="flex items-center space-x-2 p-2 rounded-xl hover:bg-white/20 transition text-white">
          <GoLink className="text-2xl" />
          <span className="text-sm font-mono">Links</span>
        </button>
        <button onClick={() => toggle(setShowWork, showWork, setZWork)} className="flex items-center space-x-2 p-2 rounded-xl hover:bg-white/20 transition text-white">
          <FaCode className="text-2xl" />
          <span className="text-sm font-mono">Work</span>
        </button>
        <button onClick={() => toggle(setShowFaq, showFaq, setZFaq)} className="flex items-center space-x-2 p-2 rounded-xl hover:bg-white/20 transition text-white">
          <TbUserQuestion className="text-2xl" />
          <span className="text-sm font-mono">FAQ</span>
        </button>
        <button onClick={() => toggle(setShowContact, showContact, setZContact)} className="flex items-center space-x-2 p-2 rounded-xl hover:bg-white/20 transition text-white">
          <IoMailOutline className="text-2xl" />
          <span className="text-sm font-mono">Contact</span>
        </button>
        <span className="ml-4 pl-4 border-l border-white/20 text-sm font-mono text-white">{time}</span>
      </div>

      {/* Windows */}
      {showAbout && (
        <div style={{ position: "absolute", zIndex: zAbout }} onMouseDown={() => bringToFront(setZAbout)}>
          <About close={() => setShowAbout(false)} />
        </div>
      )}
      {showLinks && (
        <div style={{ position: "absolute", zIndex: zLinks }} onMouseDown={() => bringToFront(setZLinks)}>
          <Links close={() => setShowLinks(false)} />
        </div>
      )}
      {showWork && (
        <div style={{ position: "absolute", zIndex: zWork }} onMouseDown={() => bringToFront(setZWork)}>
          <Work close={() => setShowWork(false)} />
        </div>
      )}
      {showFaq && (
        <div style={{ position: "absolute", zIndex: zFaq }} onMouseDown={() => bringToFront(setZFaq)}>
          <Faq close={() => setShowFaq(false)} />
        </div>
      )}
      {showContact && (
        <div style={{ position: "absolute", zIndex: zContact }} onMouseDown={() => bringToFront(setZContact)}>
          <Contact close={() => setShowContact(false)} />
        </div>
      )}
    </>
  );
}
