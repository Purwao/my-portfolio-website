"use client";

import { useRef, useState } from "react";
import TitleBar from "../titlebar";
import Draggable from "react-draggable";
import zani from "../../storage/photos/zani.jpeg";
import Image from "next/image";
import { useLanguage } from "@/app/context/languageContext";

function About(props) {
  const [isClosing, setIsClosing] = useState(false);

  const nodeRef = useRef(null);

  function handleClose(action) {
    console.log(action);
    if (action == 1) {
      setIsClosing(true);
      setTimeout(() => {
        props.close?.(1);
        console.log("Closing the About page");
      }, 300);
    }
  }

  const { lang } = useLanguage();

  const text = {
  about: lang === "en"? "About":"Tentang",
  greeting: lang === "en" ? "Hi! I'm Purwao 👋" : "Hai! Saya Purwao 👋",
   iDo: lang === "en"
    ? "👤 WHAT I LOVE BUILDING:"
    : "👤 HAL YANG SAYA SUKA KERJAKAN:",

  doWebsite: lang === "en"
    ? "Creating and refining user-friendly"
    : "Membuat dan menyempurnakan",

  website: lang === "en"
    ? "web experiences"
    : "pengalaman web yang nyaman",

  doDesktop: lang === "en"
    ? "Prototyping ideas into useful"
    : "Mewujudkan ide lewat",

  desktop: lang === "en"
    ? "desktop tools"
    : "alat desktop yang berguna",

  doAndroid: lang === "en"
    ? "Creating practical and lightweight"
    : "Membuat aplikasi Android yang ringan dan praktis",

  android: lang === "en"
    ? "Android apps"
    : "aplikasi Android",

    education: lang === "en" ? "🎓 EDUCATION:" : "🎓 PENDIDIKAN:",
    degree:
    lang === "en"
        ? "Bachelor's of Science in Computer Science at"
        : "Sarjana di bidang Ilmu Komputer di",
    pursuing:
    lang === "en" ? "(currently pursuing)" : "(sedang menempuh pendidikan)",

    interest: 
    lang === "en" ? "🧪 OTHER INTEREST:" : "🧪 MINAT LAIN:",
    music: 
    lang === "en" ? "Music" : "Musik",
    chess: 
    lang === "en" ? "Chess" : "Catur",
    soulslike:
    lang === "en"
        ? "Souls-like gaem eheheh :p"
        : "Game genre Souls-like eheheh :p",

    language:
    lang === "en" ? "🌍 LANGUAGE PROFICIENCY:" : "🌍 KEMAMPUAN BAHASA:",
    fluency: 
    lang === "en" ? "I have fluency in" : "Saya fasih berbahasa",
    english: 
    lang === "en" ? "English" : "Inggris",
    indonesian: 
    lang === "en" ? "Indonesia" : "Indonesia",
    extraLangNote:
    lang === "en"
        ? "i speak a little Japanese and Germany, but at very pre-school proficiency :)"
        : "Saya bisa sedikit Bahasa Jepang dan Jerman, tapi masih tingkat balita :)",

    fullstack: lang === "en" ? "FullStack Developer." : "Pengembang FullStack.",
  };

  return (
    <div
      id="about"
      className={`fixed top-0 left-0 w-full h-full z-40 pointer-events-none transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <Draggable
        nodeRef={nodeRef}
        handle=".handle"
        defaultPosition={{ x: 100, y: 100 }}
      >
        <div
          ref={nodeRef}
          className={`pointer-events-auto absolute flex flex-col items-center w-3/6 bg-accent1/90 backdrop-blur-md border border-accent4 rounded-2xl shadow-xl overflow-hidden transition-opacity duration-300`}
        >
          <div className="handle w-full">
            <TitleBar
              title={text.about}
              close={handleClose}
              hiddenControl={0}
              roundedStyle={1}
              hiddenMoveMe={1}
            />
          </div>

          {/* Profile Section */}
          <div className="flex items-start gap-4 p-6 bg-accent2 w-full text-white">
            <Image
              src="https://avatars.githubusercontent.com/Purwao"
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-accent3 object-cover"
              width={96}
              height={96}
            />
            <div>
              <h1 className="text-4xl font-bold text-accent3">
                Purwao{" "}
                <span className="text-accent4 font-medium text-xl align-middle">
                  Lalalawrens
                </span>
              </h1>
              <p className="text-lg mt-1">{text.fullstack}</p>
            </div>
          </div>

          {/* Scrollable Bio Section */}
          <div className="px-6 pb-6 h-64 w-full overflow-y-auto bg-accent1/80 text-white">
            <p className="mb-4 text-xl">{text.greeting}</p>

            <p className="text-2xl font-consolas">{text.iDo}</p>
            <ul className="list-disc list-inside space-y-1 text-md">
              <li>
                {text.doWebsite}{" "}
                <span className="text-accent3/90 font-bold">
                  {text.website}
                </span>
              </li>
              <li>
                {text.doDesktop}{" "}
                <span className="text-accent3/90 font-bold">
                  {text.desktop}
                </span>
              </li>
              <li>
                {text.doAndroid}{" "}
                <span className="text-accent3/90 font-bold">
                  {text.android}
                </span>
              </li>
            </ul>

            <p className="mt-4 text-2xl font-consolas">{text.education}</p>
            <ul className="list-none list-inside space-y-1 text-md">
              <li>
                <p>
                  {text.degree}{" "}
                  <a
                    href="https://www.upnjatim.ac.id/"
                    target="._blank"
                    className="text-accent3 underline font-medium hover:text-accent4"
                  >
                    UPNVJT
                  </a>
                </p>
              </li>
              <li className="list-none text-accent4/90">{text.pursuing}</li>
            </ul>

            <p className="mt-4 text-2xl font-consolas">{text.interest}</p>
            <ul className="list-disc list-inside space-y-1 text-md">
              <li>{text.music}</li>
              <li>{text.chess}</li>
              <li>{text.soulslike}</li>
            </ul>

            <p className="mt-4 text-2xl font-consolas">{text.language}</p>
            <ul className="list-disc list-inside space-y-1 text-md">
              <li className="list-none">
                <p>
                  {text.fluency}{" "}
                  <span className="text-accent3/90 font-bold">
                    {text.english}
                  </span>{" "}
                  and{" "}
                  <span className="text-accent3/90 font-bold">
                    {text.indonesian}
                  </span>
                  !
                </p>
              </li>
              <li className="list-none text-xs font-light text-accent4/90">
                {text.extraLangNote}
              </li>
            </ul>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default About;
