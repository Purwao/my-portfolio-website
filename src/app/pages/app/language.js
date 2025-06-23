"use client";

import { useLanguage } from "@/app/context/languageContext";

export default function LanguageToggleBox() {
  const { lang, setLang } = useLanguage();

  const toggleLanguage = () => {
    setLang(lang === "en" ? "id" : "en");
  };

  return (
<div className="bg-black/80 p-2 rounded shadow border border-white/10 z-50">
  <button
    className="text-xl cursor-pointer px-3 py-1 rounded hover:bg-white/10 transition"
    onClick={toggleLanguage}
  >
 {lang === "en" ? (
      // UK Flag SVG
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="16">
<clipPath id="s">
	<path d="M0,0 v30 h60 v-30 z"/>
</clipPath>
<clipPath id="t">
	<path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
</clipPath>
<g clipPath="url(#s)">
	<path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
	<path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
	<path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
	<path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
	<path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
</g>
</svg>
    ) : (
      // Indonesia Flag SVG
      <svg width="24" height="16" viewBox="0 0 3 2">
        <rect width="3" height="1" y="0" fill="#e70011" />
        <rect width="3" height="1" y="1" fill="#ffffff" />
      </svg>
    )}
  </button>
</div>

  );
}
