import React from "react";
import GradientText from "./components/GradientText";
import { tr } from "framer-motion/client";

export const Header: React.FC = () => {
  return (
    <header className="min-h-[50vh] bg-gradient-to-br  from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden  min-w-[100%] *:relative">
      {/* Hero Section */}
      <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto px-8  min-h-[50vh] py-20">
        <div className="flex-1 space-y-6">
          <h1 className="text-8xl  font-bold font-[progress] leading-tight flex flex-wrap items-center gap-1">
            <GradientText
              colors={["#93cd2d", "#d4e21c", "#e1ce10", "#93cd2d"]}
              animationSpeed={3}
              showBorder={false}
              className="text-8xl"
              yoyo={true}
              pauseOnHover={true}
            >
              HACK
            </GradientText>
            <GradientText
              colors={["#1b759f", "#8cb798", "#32bbd2"]}
              animationSpeed={3}
              showBorder={false}
              className="text-8xl"
              pauseOnHover={true}
            >
              FIT
            </GradientText>
            <span className="font-[paladins] flex m-0  text-lime-400 flex text-[90px]">4.0</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-lg"></p>

          {/* Buttons */}


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

      </div>
    </header>
  );
};
