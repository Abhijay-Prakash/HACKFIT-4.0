import React from "react";
import { VideoText } from "./ui/video-text";
import video from "../Ocean_Aurora_Video_Generation.mp4";

export default function VideoHeader() {
  return (
    <div className="relative flex  flex-row h-[500px] w-[70%] p-0   ">
      <VideoText
      className="m-0"
        fontFamily={"Sprintura"}
        fontSize={5}
        fontWeight={"bold"}
        src={video}
      >
        HACKFIT 
      </VideoText>
        <h1 className="text-8xl absolute font-bold font-[progress] leading-tight  gap-1">
            <span className="font-[paladins]   m-0  text-lime-400 flex-2 text-[90px]">4.0</span>
          </h1>
    </div>
  );
}
