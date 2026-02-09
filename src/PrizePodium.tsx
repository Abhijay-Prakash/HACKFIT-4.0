import React from "react";
import "./SectionStyles.css";

// Interface for TrophyIcon props
interface TrophyIconProps {
  colorClass: string;
  className?: string;
}

// Inline SVG Trophy Icon Component
const TrophyIcon: React.FC<TrophyIconProps> = ({
  colorClass,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${colorClass} ${className}`}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

// Interface for PodiumItem props
interface PodiumItemProps {
  place: "1st" | "2nd" | "3rd";
  title: string;
  prize: string;
  extras?: string;
  height: string;
  colorClass: string;
}

// Reusable Podium Item Component
const PodiumItem: React.FC<PodiumItemProps> = ({
  place,
  title,
  prize,
  extras,
  height,
  colorClass,
}) => {
  return (
    <div className={`podium-item podium-${place}`}>
      {/* Trophy Icon */}
      <div className="podium-trophy">
        <TrophyIcon
          colorClass={colorClass}
          className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
        />
      </div>

      {/* Glowing cylindrical base */}
      <div className={`podium-base ${height}`}>
        {/* Content inside the base */}
        <div className="podium-content">
          <h3 className={`podium-title ${colorClass}`}>{title}</h3>
          <p className={`podium-prize ${colorClass}`}>{prize}</p>
          {extras && <p className="podium-extra">{extras}</p>}
        </div>

        {/* Bottom glow */}
        <div className="podium-glow" />
      </div>
    </div>
  );
};

// Main Section Component
const PrizePodium: React.FC = () => {
  return (
    <section className="w-full py-8 sm:py-16 md:py-24 lg:py-32 px-2 sm:px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh]">
      {/* Section Title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-12 md:mb-16 lg:mb-20 text-center font-[progress] tracking-tight">
        Prize Pool
      </h2>

      {/* Podium Container */}
      <div className="prize-podium-container">
        {/* 2nd Place (Left) */}
        <div className="order-2 md:order-1">
          <PodiumItem
            place="2nd"
            title="2nd Place"
            prize="₹50,000"
            extras="+ SWAG"
            height="h-[140px] sm:h-[220px] md:h-[320px] lg:h-[400px] xl:h-[480px]"
            colorClass="text-green-500"
          />
        </div>

        {/* 1st Place (Center - Tallest) */}
        <div className="order-1 md:order-2">
          <PodiumItem
            place="1st"
            title="1st Place - Grand Prize"
            prize="₹1,00,000"
            extras=""
            height="h-[180px] sm:h-[280px] md:h-[400px] lg:h-[520px] xl:h-[640px]"
            colorClass="text-lime-400"
          />
        </div>

        {/* 3rd Place (Right - Shortest) */}
        <div className="order-3 md:order-3">
          <PodiumItem
            place="3rd"
            title="3rd Place"
            prize="₹25,000"
            height="h-[120px] sm:h-[180px] md:h-[280px] lg:h-[360px] xl:h-[440px]"
            colorClass="text-yellow-400"
          />
        </div>
      </div>
    </section>
  );
};

export default PrizePodium;
