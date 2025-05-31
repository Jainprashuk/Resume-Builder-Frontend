"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function NavbarComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Helper for closing dropdowns when clicking outside
  React.useEffect(() => {
    function handleClickOutside() {
      setActiveMenu(null);
    }
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Prevent closing dropdown when clicking inside menu
  function handleMenuClick(e: React.MouseEvent) {
    e.stopPropagation();
  }

  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    // Check local storage for saved mode
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <div className="relative w-full flex items-center justify-between px-6 bg-white text-black dark:bg-zinc-900 dark:text-white">
      <div className="absolute left-10 top-11 flex space-x-4 z-50">LOGO</div>

      <nav className="fixed top-10 left-1/2 transform -translate-x-1/2 max-w-2xl w-full bg-gray-200 dark:bg-zinc-800 rounded-md shadow-lg z-50">
        <ul className="flex justify-around p-4">
          {/* Services */}
          <li
            className="relative cursor-pointer"
            
              onClick={() => router.push("/")}
          
           
          >
            <span className="px-4 py-2 hover:text-emerald-600 dark:hover:text-emerald-400">
              Home
            </span>

            
          </li>

          {/* Products */}
          <li
            className="relative cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenu(activeMenu === "products" ? null : "products");
            }}
            onMouseEnter={() => setActiveMenu("products")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <span className="px-4 py-2 hover:text-emerald-600 dark:hover:text-emerald-400">
              Products
            </span>

            {activeMenu === "products" && (
              <div
                onClick={handleMenuClick}
                className="absolute top-full mt-2 left-0 w-[450px] bg-gray-100 dark:bg-zinc-700 rounded-md shadow-lg p-6 grid grid-cols-2 gap-6 text-gray-800 dark:text-gray-300"
              >
                {[
                  {
                    title: "Algochurn",
                    href: "https://algochurn.com",
                    description:
                      "Prepare for tech interviews like never before.",
                    src: "https://assets.aceternity.com/demos/algochurn.webp",
                  },
                  {
                    title: "Tailwind Master Kit",
                    href: "https://tailwindmasterkit.com",
                    description:
                      "Production ready Tailwind css components for your next project",
                    src: "https://assets.aceternity.com/demos/tailwindmasterkit.webp",
                  },
                  {
                    title: "Moonbeam",
                    href: "https://gomoonbeam.com",
                    description:
                      "Never write from scratch again. Go from idea to blog in minutes.",
                    src: "https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png",
                  },
                  {
                    title: "Rogue",
                    href: "https://userogue.com",
                    description:
                      "Respond to government RFPs, RFIs and RFQs 10x faster using AI",
                    src: "https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png",
                  },
                ].map(({ title, href, description, src }) => (
                  <a
                    key={title}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex space-x-4 hover:bg-gray-300 dark:hover:bg-zinc-600 p-3 rounded-md"
                  >
                    <img
                      src={src}
                      alt={title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-semibold">{title}</h4>
                      <p className="text-xs">{description}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </li>

          {/* Pricing */}
          <li
            className="relative cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenu(activeMenu === "pricing" ? null : "pricing");
            }}
            onMouseEnter={() => setActiveMenu("pricing")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <span className="px-4 py-2 hover:text-emerald-600 dark:hover:text-emerald-400">
              Pricing
            </span>

            {activeMenu === "pricing" && (
              <div
                onClick={handleMenuClick}
                className="absolute top-full mt-2 left-0 w-40 bg-gray-100 dark:bg-zinc-700 rounded-md shadow-lg p-4 flex flex-col space-y-2 text-sm text-gray-800 dark:text-gray-300"
              >
                <a
                  href="/hobby"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Hobby
                </a>
                <a
                  href="/individual"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Individual
                </a>
                <a
                  href="/team"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Team
                </a>
                <a
                  href="/enterprise"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Enterprise
                </a>
              </div>
            )}
          </li>

          <li>
            <label
              htmlFor="dark-mode-toggle"
              className="flex items-center cursor-pointer select-none"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  id="dark-mode-toggle"
                  className="sr-only"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                />
                <div className="w-12 h-6 bg-gray-300 dark:bg-zinc-700 rounded-full shadow-inner transition-colors"></div>
                <div
                  className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-md transition-transform ${
                    isDarkMode ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </div>
              <span className="ml-3 text-sm font-medium text-black dark:text-white select-none">
                {isDarkMode ? "☀️" : "🌙"}
              </span>
            </label>
          </li>
        </ul>
      </nav>

      {pathname === "/" && (
        <div className="absolute right-6 top-10 flex space-x-4 z-50">
          <button
            onClick={() => router.push("/login")}
            className="relative group rounded-full bg-gray-300 dark:bg-slate-800 p-2 px-4 text-xs font-semibold text-black dark:text-white shadow-lg shadow-zinc-900"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 opacity-0 transition-opacity group-hover:opacity-100"></span>
            <span className="relative z-10">Login</span>
          </button>

          <button
            onClick={() => router.push("/signup")}
            className="relative group rounded-full bg-gray-300 dark:bg-slate-800 p-2 px-4 text-xs font-semibold text-black dark:text-white shadow-lg shadow-zinc-900"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 opacity-0 transition-opacity group-hover:opacity-100"></span>
            <span className="relative z-10">Sign Up</span>
          </button>
        </div>
      )}
    </div>
  );
}
