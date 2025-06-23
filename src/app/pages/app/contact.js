"use client";

import React, { useRef, useState } from "react";
import TitleBar from "../titlebar";
import Draggable from "react-draggable";
import Image from "next/image";
import { IoMailOutline } from "react-icons/io5";
import { useLanguage } from "@/app/context/languageContext";

function Contact({ close }) {
  const nodeRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);
  const { lang } = useLanguage();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      close?.(1);
    }, 300);
  };

  const text = {
    title: lang === "en" ? "Contact" : "Kontak",
    headline: lang === "en" ? "Get in touch!" : "Hubungi aku!",
    description:
      lang === "en"
        ? "Got feedback, questions, or collaboration ideas? Drop me a line anytime. I check my inbox more often than socials."
        : "Punya masukan, pertanyaan, atau ide kolaborasi? Kirim saja kapan pun. Aku lebih sering cek email daripada sosmed.",
    emailLabel: lang === "en" ? "Open Mail App" : "Buka Aplikasi Email",
  };

  return (
    <div
      className={`fixed inset-0 z-40 pointer-events-none transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <Draggable nodeRef={nodeRef} handle=".handle" defaultPosition={{ x: 100, y: 100 }}>
        <div
          ref={nodeRef}
          className="pointer-events-auto absolute w-[30rem] rounded-2xl border border-accent4 bg-accent1/90 backdrop-blur-sm shadow-2xl overflow-hidden"
        >
          <div className="handle">
            <TitleBar
              title={text.title}
              close={handleClose}
              hiddenControl={0}
              roundedStyle={1}
              hiddenMoveMe={1}
            />
          </div>

          <div className="p-6 text-white flex flex-col items-center text-center space-y-5">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-accent3 shadow-lg">
              <Image
                src="https://avatars.githubusercontent.com/Purwao"
                width={100}
                height={100}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Headline */}
            <h2 className="text-xl font-bold font-mono tracking-wide">
              {text.headline}
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-300 max-w-sm">{text.description}</p>

            {/* Email Box */}
            <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 flex items-center space-x-3 text-left w-full max-w-xs shadow">
              <IoMailOutline className="text-2xl text-accent3" />
              <a
                href="mailto:purwaarda51@gmail.com"
                className="text-sm font-medium text-accent3 hover:underline"
              >
                purwaarda51@gmail.com
              </a>
            </div>

            {/* Button */}
            <a
              href="mailto:purwaarda51@gmail.com"
              className="mt-3 bg-accent3 text-accent2 font-semibold py-2 px-6 rounded-lg shadow hover:bg-accent3/80 transition"
            >
              {text.emailLabel}
            </a>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default Contact;
