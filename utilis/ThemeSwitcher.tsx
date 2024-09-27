"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering until the theme is available
  if (!mounted) {
    return null;
  }

  // Set "light" as the fallback theme if undefined
  const isLightTheme = theme === "light";

  return (
    <div className="relative z-[100]">
      {isLightTheme ? (
        <BiMoon
          className="cursor-pointer text-black"
          size={25}
          onClick={() => setTheme("dark")}
        />
      ) : (
        <BiSun
          className="cursor-pointer text-white"
          size={25}
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
};
