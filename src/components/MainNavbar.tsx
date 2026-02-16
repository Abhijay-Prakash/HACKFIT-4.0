import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./ui/resizable-navbar";
import "../Header.css";

const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "#about" },
  { name: "Schedule", link: "#schedule" },
  { name: "Prizes", link: "#prizes" },
];

const MainNavbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Navbar className="top-0 bg-black z-30">
      <NavBody>
        <a
          href="#"
          className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-3xl font-bold text-lime-400 font-[progress]"
        >
          <span className="font-bold text-3xl text-lime-400">HACKFIT</span>
        </a>
        <NavItems
          items={navItems}
          className="absolute! inset-0 flex-1 flex-row items-center justify-center font-[progress]"
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
          <NavbarButton
            as={Link}
            to="/register"
            variant="dark"
            className="w-full justify-center"
          >
            Register
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default MainNavbar;
