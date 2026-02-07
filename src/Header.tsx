import React, { useState } from "react";
import GradientText from "./components/GradientText";
import UnicornScene from "unicornstudio-react";
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
export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "#" },
    { name: "About", link: "#about" },
    { name: "Schedule", link: "#schedule" },
    { name: "Prizes", link: "#prizes" },
    { name: "Register", link: "#register" },
  ];

  return (
    <header className="relative min-h-[80vh] text-white overflow-hidden min-w-[100%]">
      {/* Resizable Navbar */}
      <Navbar className="top-0 bg-black">
        <NavBody>
          <a
            href="#"
            className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-lime-400 font-[progress]"
          >
            <span className="font-bold text-2xl text-lime-400">
              HACKFIT 
            </span>
          </a>
          <NavItems
            items={navItems}
            className="!absolute inset-0 flex-1 flex-row items-center justify-center !text-lime-400 font-[progress] dark:!text-lime-400"
            onItemClick={() => setMobileOpen(false)}
          />
          <NavbarButton
            href="#register"
            className="relative z-20 ml-auto"
            variant="dark"
          >
            Register
          </NavbarButton>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <a
              href="#"
              className="relative z-20 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-lime-400 font-[progress]"
            >
              <span className="font-bold text-xl text-lime-400">
                HACKFIT 4.0
              </span>
            </a>
            <MobileNavToggle
              isOpen={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <NavbarButton
              href="#register"
              variant="dark"
              className="w-full justify-center"
            >
              Register
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Unicorn Studio WebGL Background */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <UnicornScene
          projectId="qcSz9g3TZ1R59X5U8IKC"
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
          width="100%"
          height="100%"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100vh] py-20 pt-40">
        {/* Centered HACKFIT Title */}
        <h1 className="text-[120px] font-bold mb-[200px] font-[progress] leading-tight flex flex-wrap items-center justify-center gap-1">
          <GradientText
            colors={["#93cd2d", "#d4e21c", "#e1ce10", "#93cd2d"]}
            animationSpeed={3}
            showBorder={false}
            className="text-[120px]"
            yoyo={true}
            pauseOnHover={true}
          >
            HACK
          </GradientText>
          <GradientText
            colors={["#1b759f", "#8cb798", "#32bbd2"]}
            animationSpeed={3}
            showBorder={false}
            className="text-[120px]"
            pauseOnHover={true}
          >
            FIT
          </GradientText>
          <span className="font-[paladins] flex m-0 text-lime-400 mt-[20px] palette-text text-[110px]">
            4.0
          </span>
        </h1>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-8 pt-8 text-center">
          <div>
            <p className="text-gray-400 text-sm">Date</p>
            <p className="text-lg font-semibold">Mar 15-17, 2026</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Location</p>
            <p className="text-lg font-semibold">Tech Hub Center</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Participants</p>
            <p className="text-lg font-semibold">500+ Hackers</p>
          </div>
        </div>
      </div>
    </header>
  );
};
