"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Create context
const LanguageContext = createContext();

// Hook for consuming context
export function useLanguage() {
  return useContext(LanguageContext);
}

// Provider component
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  // Optional: Load language from localStorage
  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) setLang(storedLang);
  }, []);

  // Optional: Persist language to localStorage
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
