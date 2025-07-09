"use client";

import { useState, useRef, useEffect } from "react";
import Bonfire from "./app/bonfire";
import Rocket from "./app/rocket";
import Bonfirejpg from "../storage/photos/Bonfire.png";
import Rocketjpg from "../storage/photos/Rocket.png";
import Image from "next/image";

import { useLanguage } from "../context/languageContext";

import OpenPage from "../storage/audio/open.wav";
import hoverPage from "../storage/audio/vordt.m4a";

function Appbar() {
  const [bonfire, setBonfire] = useState(false);
  const [rocket, setRocket] = useState(false);
  const openSoundRef = useRef(null);
  const hoverSoundRef = useRef(null);

  const {lang}=useLanguage();

  useEffect(() => {
    // Only run this on client
    if (typeof window !== "undefined") {
      openSoundRef.current = new Audio(OpenPage);
      hoverSoundRef.current = new Audio(hoverPage);
    }
  }, []);

  const openBonfire = () => {
    setBonfire(true);
    const audio = openSoundRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.volume = 1;
      audio.play();
    }
  };
  const openRocket = () => {
    setRocket(true);
    const audio = openSoundRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.volume = 1;
      audio.play();
    }
  };

  const handleHoverBonfire = () => {
    const hoverAudio = hoverSoundRef.current;
    if (hoverAudio) {
      hoverAudio.currentTime = 0;
      hoverAudio.volume = 0.3;
      hoverAudio.play();
    }
  };

  const stopHoverBonfire = () => {
    const hoverAudio = hoverSoundRef.current;
    if (hoverAudio) {
      hoverAudio.pause();
      hoverAudio.currentTime = 0;
    }
  };

  const handleBonfireClose = (action) => {
    if (action === 1) {
      setBonfire(false);
    }
  };

  const handleRocketClose = (action) => {
    if (action === 1) {
      setRocket(false);
    }
  };

  const text={
    coolStuff: lang=== "en" ? "Cool stuff" : "Hal Keren",
    APOD: lang=== "en" ? "Space Stuff" : "Luar Angkasa",
  }

  return (
    <div className="app-bar flex flex-col gap-8 justify-center items-center w-1/12 h-full">
      <button
        id="bonfire"
        onMouseEnter={handleHoverBonfire}
        onMouseLeave={stopHoverBonfire}
        onClick={openBonfire}
        className="app-box about-me cursor-pointer flex flex-col gap-1 justify-center items-center transition duration-300 ease-in-out hover:scale-110"
      >
        <Image src={Bonfirejpg} width={50} height={50} alt="Bonfire" />
        <h2 className="app-title font-consolas text-white text-sm">
          {text.coolStuff}
        </h2>
      </button>
      <button
        id="rocket"
        onClick={openRocket}
        className="app-box cursor-pointer flex flex-col gap-1 justify-center items-center transition duration-300 ease-in-out hover:scale-110"
      >
        <Image src={Rocketjpg} width={50} height={50} alt="Bonfire" />
        <h2 className="app-title font-consolas text-white text-sm">
          {text.APOD}
        </h2>
      </button>


      {bonfire && <Bonfire close={handleBonfireClose} />}
      {rocket && <Rocket close={handleRocketClose} />}
    </div>
  );
}

export default Appbar;
