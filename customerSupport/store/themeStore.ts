import {create} from "zustand";

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  setDark: (dark: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  toggleTheme: () =>
    set((state) => {
      const newDark = !state.isDark;
      if (typeof window !== "undefined") {
        if (newDark) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
        localStorage.setItem("dark-mode", newDark ? "true" : "false");
      }
      return { isDark: newDark };
    }),
  setDark: (dark) =>
    set(() => {
      if (typeof window !== "undefined") {
        if (dark) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
        localStorage.setItem("dark-mode", dark ? "true" : "false");
      }
      return { isDark: dark };
    }),
}));
