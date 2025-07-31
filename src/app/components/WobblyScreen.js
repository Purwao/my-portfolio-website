"use client";

import React, { useState } from "react";
import { useLanguage } from "@/app/context/languageContext";

function WobblyScreen() {
    const [showMobileWarning, setShowMobileWarning] = useState(true);
    
  const { lang } = useLanguage();
   const text = {
  about: lang === "en"? " Hey! this website is best viewed on a desktop screen, it might be a wobbly experience if you use it on phone or something.":"Hai! Website ini bakal lebih bagus kalau dilihat dari layar desktop, bakalan sedikit ",
  greeting: lang === "en" ? "Hi! I'm Purwao 👋" : "Hai! Saya Purwao 👋",

  };
  return (
    <>
      {showMobileWarning && (
        <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 max-w-xs w-[90%] bg-accent2 border border-accent3 text-accent3 px-4 py-3 rounded-2xl text-sm shadow-xl backdrop-blur-md text-center pointer-events-auto">
          <p>
            Hey! this website is best viewed on a desktop screen, it might be a
            wobbly experience if you use it on phone or something. thank you kindly!
          </p>
          <button
            onClick={() => setShowMobileWarning(false)}
            className="mt-2 underline text-xs text-accent4 hover:text-accent3"
          >
            got it!
          </button>
        </div>
      )}
    </>
  );
}

export default WobblyScreen;
