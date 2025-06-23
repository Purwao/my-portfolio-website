"use client";

import { useEffect, useState } from "react";
import { IoMailOutline, IoInformationOutline } from "react-icons/io5";
import { GoLink } from "react-icons/go";
import { FaCode } from "react-icons/fa6";
import { TbUserQuestion } from "react-icons/tb";
import { IoIosArrowUp } from "react-icons/io";
import { FaWindows } from "react-icons/fa";

import { useLanguage } from "@/app/context/languageContext";

import About from "./app/about";
import Links from "./app/links";
import Work from "./app/work";
import Faq from "./app/faq";
import Contact from "./app/contact";

import OpenPage from "../storage/audio/open.wav";
import ClosePage from "../storage/audio/close.wav";
import Image from "next/image";

import zani from "../storage/photos/zani.jpeg";
import LanguageToggle from "./app/language";

function TaskbarIcon({ icon, label, onClick }) {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className="p-2 rounded hover:bg-white/10 transition text-white"
      >
        {icon}
      </button>
      <span className="absolute bottom-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-50">
        {label}
      </span>
    </div>
  );
}

export default function Taskbar() {
  const [time, setTime] = useState("");
  const [zCounter, setZCounter] = useState(100);

  const [showAbout, setShowAbout] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);


  const [zAbout, setZAbout] = useState(0);
  const [zLinks, setZLinks] = useState(0);
  const [zWork, setZWork] = useState(0);
  const [zFaq, setZFaq] = useState(0);
  const [zContact, setZContact] = useState(0);

  const { lang } = useLanguage();

  const playSound = (sound) => new Audio(sound).play();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
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

  const text = {
    about: lang === "en" ? "About" : "Tentang",
    links: lang === "en" ? "Links" : "Tautan",
    work: lang === "en" ? "Work" : "Karya",
    faq: lang === "en" ? "FAQ" : "Tanya Jawab",
    contact: lang === "en" ? "Contact" : "Kontak",
    search: lang === "en" ? "Type here to search" : "Ketik di sini untuk mencari",
    settings: lang === "en" ? "Settings" : "Pengaturan",
    more: lang === "en" ? "More" : "Lainnya",
  };

  return (
    <>
      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 w-full h-12 bg-black/80 backdrop-blur-sm flex items-center justify-between px-3 z-50 border-t border-white/10 font-sans">
        {/* Left side: Start + Search + App Icons */}
        <div className="flex items-center space-x-3">
          {/* Start Button */}
          <button className="p-2 hover:bg-white/10 rounded text-white">
           <FaWindows />
          </button>

          {/* Search Bar */}
          <div className="relative text-sm">
            <input
              type="text"
              placeholder="Type here to search"
              className="bg-white/10 text-white placeholder-white/70 rounded px-3 py-1 w-48 focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>

          {/* Taskbar App Icons */}
          <div className="flex items-center space-x-2 ">
            <TaskbarIcon
              icon={<IoInformationOutline className="text-xl" />}
              label={text.about}
              onClick={() => toggle(setShowAbout, showAbout, setZAbout)}
            />
            <TaskbarIcon
              icon={<GoLink className="text-xl" />}
              label={text.links}
              onClick={() => toggle(setShowLinks, showLinks, setZLinks)}
            />
            <TaskbarIcon
              icon={<FaCode className="text-xl" />}
              label={text.work}
              onClick={() => toggle(setShowWork, showWork, setZWork)}
            />
            <TaskbarIcon
              icon={<TbUserQuestion className="text-xl" />}
              label={text.faq}
              onClick={() => toggle(setShowFaq, showFaq, setZFaq)}
            />
            <TaskbarIcon
              icon={<IoMailOutline className="text-xl" />}
              label={text.contact}
              onClick={() => toggle(setShowContact, showContact, setZContact)}
            />
          </div>
        </div>

        {/* Right side: Clock + Language*/}
        <div className="flex flex-row gap-2 items-center justify-center">
            <TaskbarIcon
              icon={<IoIosArrowUp className="text-lg" />}
              label="More"
                onClick={() => setShowMoreMenu(!showMoreMenu)}
            />
           <div className="text-white text-sm font-mono pr-3">{time}</div>
        </div>
      </div>

      {/* Windows */}
      {showAbout && (
        <div
          style={{ position: "absolute", zIndex: zAbout }}
          onMouseDown={() => bringToFront(setZAbout)}
        >
          <About close={() => setShowAbout(false)} />
        </div>
      )}
      {showLinks && (
        <div
          style={{ position: "absolute", zIndex: zLinks }}
          onMouseDown={() => bringToFront(setZLinks)}
        >
          <Links close={() => setShowLinks(false)} />
        </div>
      )}
      {showWork && (
        <div
          style={{ position: "absolute", zIndex: zWork }}
          onMouseDown={() => bringToFront(setZWork)}
        >
          <Work close={() => setShowWork(false)} />
        </div>
      )}
      {showFaq && (
        <div
          style={{ position: "absolute", zIndex: zFaq }}
          onMouseDown={() => bringToFront(setZFaq)}
        >
          <Faq close={() => setShowFaq(false)} />
        </div>
      )}
      {showContact && (
        <div
          style={{ position: "absolute", zIndex: zContact }}
          onMouseDown={() => bringToFront(setZContact)}
        >
          <Contact close={() => setShowContact(false)} />
        </div>
      )}
      {showMoreMenu && (
        <div className="absolute right-16 bottom-12 bg-black/90 text-white rounded-md shadow-lg p-3 w-fit z-50 border border-white/10">
          
         <div>
          <div className="text-sm font-semibold mb-2">Settings</div>
          <hr className="border-white/10 mb-2" />
          <div><LanguageToggle /></div>
          
          </div> 
        </div>
      )}

    </>
  );
}
