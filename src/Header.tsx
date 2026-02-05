import React from "react";
import GradientText from "./components/GradientText";
import { tr } from "framer-motion/client";

export const Header: React.FC = () => {
  return (
    <header className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
      {/* Hero Section */}
      <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto px-8 py-20">
        <div className="flex-1 space-y-6">
          <h1 className="text-6xl font-bold font-[progress] leading-tight flex flex-wrap items-center gap-2">
            <GradientText
              colors={["#93cd2d", "#d4e21c", "#e1ce10", "#93cd2d"]}
              animationSpeed={3}
              showBorder={false}
              className="text-6xl"
              yoyo={true}
              pauseOnHover={true}
            >
              HACK
            </GradientText>
            <GradientText
              colors={["#1b759f", "#8cb798", "#32bbd2"]}
              animationSpeed={3}
              showBorder={false}
              className="text-6xl"
              pauseOnHover={true}
            >
              FIT
            </GradientText>
            <span className="hack-text text-lime-400 text-6xl">4.0</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-lg"></p>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button className="bg-lime-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-lime-300 transition flex items-center gap-2">
              Register Now <span>↗</span>
            </button>
            <button className="border-2 border-lime-400 text-lime-400 px-8 py-3 rounded-full font-semibold hover:bg-lime-400/10 transition">
              Learn More
            </button>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-8 pt-8">
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

        {/* Prize Card */}
        <div className="flex-1 flex justify-end">
          <div className="border-2 border-lime-400 rounded-2xl p-8 bg-slate-800/50 backdrop-blur">
            <p className="text-lime-400 text-5xl font-bold">$15K+</p>
            <p className="text-gray-300 text-lg">in Prizes</p>
          </div>
        </div>
      </div>
    </header>
  );
};
