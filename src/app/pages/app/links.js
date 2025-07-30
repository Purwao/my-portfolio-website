"use client";
import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import { FaDiscord, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import TitleBar from "../titlebar";
import { useLanguage } from "@/app/context/languageContext";
import AnimatedCard from "@/app/components/AnimatedCard";

function Links(props) {
  const nodeRef = useRef(null);

  const [isClosing, setIsClosing] = useState(false);

  const handleClose = (action) => {
    if (action == 1) {
      setIsClosing(true);
      setTimeout(() => {
        console.log("Closing the Links page");
        props.close?.(1);
      }, 300);
    }
  };
  const { lang } = useLanguage();
  const text = {
    link: lang === "en" ? "Links" : "Tautan",
    linkDesc:
      lang === "en"
        ? "Clicking any link above will open a new tab!"
        : "Klik link diatas akan membuka tab baru!",
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-40 pointer-events-none transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
       <AnimatedCard key="links">      <Draggable
        nodeRef={nodeRef}
        handle=".handle"
        defaultPosition={{ x: 100, y: 100 }}
      >
        <div
          ref={nodeRef}
          className="pointer-events-auto absolute flex flex-col items-center w-2/6 bg-accent1/90 backdrop-blur-sm shadow-2xl border border-accent4 rounded-2xl  overflow-hidden"
        >
          <div className="handle w-full">
            <TitleBar
              title={text.link}
              close={handleClose}
              hiddenControl={0}
              roundedStyle={1}
              hiddenMoveMe={1}
            />
          </div>
          <div className="w-full h-max container flex flex-col justify-center items-center gap-6">
            <div className="grid grid-cols-3 gap-4 text-center   text-white text-2xl">
              <a
                href="https://discord.gg/tZexMYqH9U"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center hover:text-accent3"
              >
                <FaDiscord size={40} />
                <span className="text-lg mt-1 font-sans">Discord</span>
              </a>
              <a
                href="https://instagram.com/purwrdan26"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center hover:text-accent3"
              >
                <FaInstagram size={40} />
                <span className="text-lg mt-1 font-sans">Instagram</span>
              </a>
              <a
                href="mailto:purwaarda51@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center hover:text-accent3"
              >
                <MdEmail size={40} />
                <span className="text-lg mt-1 font-sans">Email</span>
              </a>
            </div>
            <div className="w-full flex justify-center items-center text-white/90 font-consolas p-3 bg-accent1/90 text-xs">
              <h1>{text.linkDesc}</h1>
            </div>
          </div>
        </div>
      </Draggable>
         </AnimatedCard>
 
    </div>
  );
}

export default Links;
