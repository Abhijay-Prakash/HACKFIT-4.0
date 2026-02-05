import { useState } from "react";
import HackathonCards from "./HackathonCards";
import { Header } from "./Header";
import { div } from "framer-motion/client";
import VideoHeader from "./components/VideoHeader"

export default function App() {
  return (
    <div>
      <div className="p-2 m-0 flex flex-row min-w-screen min-h-[50vh]">
        <Header />
      </div>
          <div>
        <VideoHeader />
      </div>
      <div className="p-22 m-20 flex flex-row">
        <HackathonCards />
      </div>
      
    </div>
  );
}
