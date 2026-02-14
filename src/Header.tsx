import React, { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";

import GradientText from "./components/GradientText";
import patternBg from "./assets/patterb.webp";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./components/ui/resizable-navbar";
import "./Header.css";

const UnicornScene = lazy(() => import("unicornstudio-react"));

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unicornLoaded, setUnicornLoaded] = useState(false);
  const [shouldLoadUnicorn] = useState(true);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "#about" },
    { name: "Schedule", link: "#schedule" },
    { name: "Prizes", link: "#prizes" },
  ];

  return (
    <header className="relative min-h-[80vh] text-white overflow-hidden min-w-full">
      {/* Resizable Navbar */}
      <Navbar className="top-0 bg-black">
        <NavBody>
          <a
            href="#"
            className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-3xl font-bold text-lime-400 font-[progress]"
          >
            <span className="font-bold text-3xl text-lime-400">HACKFIT</span>
          </a>
          <NavItems
            items={navItems}
            className="!absolute inset-0 flex-1 flex-row items-center justify-center font-[progress]"
            onItemClick={() => setMobileOpen(false)}
          />
          <div className="relative z-20 ml-auto mr-6">
            <Link
              to="/register"
              className="register-button relative flex items-center gap-2 px-6 py-2.5 text-white font-[progress] font-semibold text-sm transition-all duration-300 group"
            >
              <span className="relative z-10">Register Now</span>
              <svg
                className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M17 7H7M17 7V17"
                />
              </svg>
            </Link>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <a
              href="#"
              className="relative z-20 flex items-center space-x-2 px-2 py-1 text-xl font-normal text-lime-400 font-[progress]"
            >
              <span className="font-bold text-xl text-lime-400">HACKFIT</span>
            </a>
            <MobileNavToggle
              isOpen={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu isOpen={mobileOpen}>
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className={`text-sm font-semibold text-white rounded-full px-4 py-3 transition-colors duration-200 hover:text-black ${idx < Math.floor(navItems.length / 2) ? "hover:bg-[#d4e21c]" : "hover:bg-[#8cb798]"}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <NavbarButton as={Link} to="/register" variant="dark" className="w-full justify-center">
              Register
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Static fallback background - always visible */}
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          background: `url(${patternBg}) center/cover, linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)`,
        }}
      />

      {/* Unicorn Studio WebGL Background - fades in over fallback */}
      <div
        className={`absolute inset-0 z-0 h-full w-full unicorn-fade-in ${unicornLoaded ? "unicorn-loaded" : ""}`}
      >
        {shouldLoadUnicorn ? (
          <Suspense fallback={null}>
            <UnicornScene
              projectId="qcSz9g3TZ1R59X5U8IKC"
              sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
              width="100%"
              height="100%"
              onLoad={() => {
                setTimeout(() => setUnicornLoaded(true), 200);
              }}
              onError={() => {
                // Silently handle error - fallback background remains visible
                setUnicornLoaded(false);
              }}
            />
          </Suspense>
        ) : null}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-20 pt-40 px-4">
        {/* Centered HACKFIT Title */}
        <h1 className="hackfit-hero-title font-bold mb-8 font-[progress] leading-tight flex flex-wrap items-center justify-center">
          <div className="flex items-center hackfit-title-wrapper">
            <GradientText
              colors={["#93cd2d", "#d4e21c", "#e1ce10", "#93cd2d"]}
              animationSpeed={3}
              showBorder={false}
              className="hackfit-gradient-text"
              yoyo={true}
              pauseOnHover={true}
            >
              HACK
            </GradientText>
            <GradientText
              colors={["#1b759f", "#8cb798", "#32bbd2"]}
              animationSpeed={3}
              showBorder={false}
              className="hackfit-gradient-text"
              pauseOnHover={true}
            >
              FIT
            </GradientText>
            <span className="font-[paladins] flex m-0 text-lime-400 palette-text hackfit-version-text">
              4.0
            </span>
          </div>
        </h1>

        {/* Prize Pool & Dates – Hero Highlights */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 mb-12 mt-4">
          {/* 🏆 Prize Pool */}
          <div className="prize-highlight flex items-center gap-4 px-8 py-5 rounded-2xl border border-[#d4e21c]/30 bg-black/60 backdrop-blur-md">
            {/* Trophy SVG */}

            <div className="flex flex-col items-start">
              <span className="font-[progress] text-[#d4e21c] text-lg tracking-widest uppercase">
                Prize Pool
              </span>
              <span className="font-[paladins] text-5xl md:text-6xl text-white prize-glow leading-none">
                ₹50K
              </span>
            </div>
          </div>

          {/* 📅 Dates */}
          <div className="flex items-center gap-4 px-8 py-5 rounded-2xl border border-[#32bbd2]/30 bg-black/60 backdrop-blur-md">
            {/* Calendar SVG */}

            <div className="flex flex-col items-start">
              <span className="font-[progress] text-[#32bbd2] text-lg tracking-widest uppercase">
                MARK the DateS
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-[paladins] text-4xl md:text-5xl text-white leading-none">
                  6
                </span>
                <span className="font-[raceguard] text-2xl text-[#8cb798]">
                  •
                </span>
                <span className="font-[paladins] text-4xl md:text-5xl text-white leading-none">
                  7
                </span>
                <span className="font-[raceguard] text-2xl text-[#8cb798]">
                  •
                </span>
                <span className="font-[paladins] text-4xl md:text-5xl text-white leading-none">
                  8
                </span>
                <span className="font-[progress] text-xl text-[#8cb798] ml-2 self-end mb-1">
                  MARCH
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only Register Button */}
        <div className="md:hidden mt-8 w-full flex justify-center">
          <Link
            to="/register"
            className="register-button relative flex items-center gap-2 px-8 py-3 text-white font-[progress] font-semibold text-base transition-all duration-300 group"
          >
            <span className="relative z-10">Register Now</span>
            <svg
              className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </Link>
        </div>

        {/* Info Grid */}
      </div>

      {/* Black overlay to hide UnicornStudio watermark */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-16 md:h-20 bg-black" />
       
    </header>
  );
};
