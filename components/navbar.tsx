"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Bebas_Neue } from "next/font/google";
import GooeyNav from "./GooeyNav";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

export function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const navItems = [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Project", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 hidden w-full justify-center transition-all duration-500 ease-in-out md:flex ${
        isScrolled ? "top-2" : "top-0"
      }`}
    >
      <div
        className={`relative flex h-14 w-full items-center justify-between rounded-full border border-transparent bg-transparent transition-all duration-500 ease-in-out md:px-6 ${
          isScrolled
            ? "max-w-4xl border-white bg-white/65 backdrop-blur-xl"
            : "max-w-full border-transparent bg-transparent"
        }`}
      >
        {/* Logo di Kiri */}
        <div
          className={`flex items-center transition-all duration-500 ease-in-out`}
        >
          <Link
            href="/"
            className={`${bebasNeue.className} mr-6 flex items-center space-x-2`}
          >
            <span className="inline-block text-2xl">ZM</span>
          </Link>
        </div>

        {/* Menu Navigasi di Tengah */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
          <GooeyNav items={navItems} />
        </div>

        {/* Toggle Dark/Light Mode di Kanan */}
        <div className="flex items-center justify-end">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <Sun className={`h-[1.2rem] w-[1.2rem] transition-all duration-500 ease-in-out ${isDarkMode ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
            <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500 ease-in-out ${isDarkMode ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
