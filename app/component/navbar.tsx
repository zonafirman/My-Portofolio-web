"use client";

import { useState } from "react";
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-4">
      <div className="container flex h-14 items-center px-4 md:px-6">
        <div className="flex flex-1 items-center justify-start">
          {/* Logo di Kiri */}
          <Link href="/" className={`${bebasNeue.className} mr-6 flex items-center space-x-2`}>
            <span className="inline-block text-2xl">
              ZM
            </span>
          </Link>
        </div>

        {/* Menu Navigasi di Tengah */}
        <GooeyNav items={navItems} />

        {/* Toggle Dark/Light Mode di Kanan */}
        <div className="flex flex-1 items-center justify-end">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <Sun
              className={`h-[1.2rem] w-[1.2rem] transition-all ${
                isDarkMode ? "rotate-90 scale-0" : "rotate-0 scale-100"
              }`}
            />
            <Moon
              className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
                isDarkMode ? "rotate-0 scale-100" : "-rotate-90 scale-0"
              }`}
            />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
