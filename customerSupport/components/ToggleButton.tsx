"use client";

import React, { useEffect } from "react";
import { useThemeStore } from "../store/themeStore";

export default function ToggleButton() {
  const { isDark, toggleTheme, setDark } = useThemeStore();

  // On mount, sync with system preference or localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTheme = localStorage.getItem("dark-mode");
    if (savedTheme === "true") {
      setDark(true);
    } else if (savedTheme === "false") {
      setDark(false);
    } else {
      // No saved preference, use system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(prefersDark);
    }
  }, [setDark]);

  return (
    <button
      aria-label="Toggle Dark Mode"
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-yellow-300 dark:bg-gray-700 transition-colors duration-500 focus:outline-none shadow-md"
    >
      {/* Sun */}
      <span
        className={`absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-yellow-500 shadow-md transform transition-transform duration-500 ${
          isDark ? "translate-x-6 opacity-0" : "translate-x-0 opacity-100"
        }`}
      >
        {/* Sun rays */}
        <svg
          className="w-full h-full text-yellow-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.364-7.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l1.414-1.414M6.05 6.05L4.636 4.636"
            stroke="currentColor"
          />
        </svg>
      </span>

      {/* Moon */}
      <span
        className={`absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-gray-800 shadow-md transform transition-transform duration-500 ${
          isDark ? "translate-x-6 opacity-100" : "translate-x-0 opacity-0"
        }`}
      >
        <svg
          className="w-full h-full text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
        </svg>
      </span>
    </button>
  );
}
