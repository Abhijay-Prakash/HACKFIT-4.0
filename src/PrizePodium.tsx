import React from 'react';
// Make sure to import your CSS file
// import './PrizeSection.css';

// Interface for TrophyIcon props
interface TrophyIconProps {
  colorClass: string;
  className?: string;
}

// Inline SVG Trophy Icon Component
const TrophyIcon: React.FC<TrophyIconProps> = ({ colorClass, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    // We apply the specific text color class here to color the SVG stroke
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

// Interface for PrizeCard props
interface PrizeCardProps {
  place: string; // Kept for interface compatibility, though unused in render
  title: string;
  reward: string;
  heightClass: string;
  borderClass: string;
  iconColorClass: string;
  textClass?: string; // Kept optional for interface compatibility, unused in render
}

// Reusable Prize Card Component
const PrizeCard: React.FC<PrizeCardProps> = ({
  title,
  reward,
  heightClass,
  borderClass,
  iconColorClass,
}) => {
  return (
    <div className={`flex flex-col items-center ${heightClass}`}>
      {/* Floating Trophy Icon */}
      <div className="mb-6">
        <TrophyIcon colorClass={iconColorClass} className="w-12 h-12" />
      </div>

      {/* The Card Element */}
      <div
        // We combine tailwind utilities with the custom 'circuit-bg' CSS class
        // Ensure 'circuit-bg' is defined in your imported CSS file
        className={`circuit-bg relative w-full flex-grow flex flex-col items-center justify-center p-6 rounded-2xl border-2 ${borderClass} text-center z-10`}
      >
        <h3 className="text-xl font-bold text-white uppercase mb-2">{title}</h3>
        <p className="text-white/90 font-medium">{reward}</p>
      </div>
    </div>
  );
};

// Main Section Component
const PrizePodium: React.FC = () => {
  return (
    // Main Container - Dark background (you might already have this on your body wrapper)
    <section className="w-full  py-20 px-4 flex flex-col items-center justify-center min-h-[600px]">
      {/* Section Title */}
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-20 text-center">
        Prize Section
      </h2>

      {/* Podium Container - items-end aligns them to the bottom to show height differences */}
      {/* Fixed typo: 'w-fullmax-w-5xl' changed to 'w-full max-w-5xl' */}
      <div className="flex flex-col md:flex-row items-end justify-center gap-6 md:gap-8 w-full max-w-5xl">

        {/* 2nd Place (Left - Medium Height) */}
        <div className="w-full md:w-1/3 order-2 md:order-1">
          <PrizeCard
            place="2"
            title="2nd Place"
            reward="$5,000 + SWAG"
            heightClass="h-[350px]" // Medium height
            borderClass="border-green-500 shadow-[0_0_15px_-3px_rgba(34,197,94,0.4)]" // Green border + subtle glow
            iconColorClass="text-green-500"
          />
        </div>

        {/* 1st Place (Center - Tallest Height) */}
        <div className="w-full md:w-1/3 order-1 md:order-2 z-20">
          <PrizeCard
            place="1"
            title="1st Place - Grand Prize"
            reward="$10,000 + Kit + Mentorship"
            heightClass="h-[420px]" // Tallest height
            // Using lime-400 for that bright yellow-green look
            borderClass="border-lime-400 shadow-[0_0_20px_-3px_rgba(163,230,53,0.5)]"
            iconColorClass="text-lime-400"
          />
        </div>

        {/* 3rd Place (Right - Shortest Height) */}
        <div className="w-full md:w-1/3 order-3 md:order-3">
          <PrizeCard
            place="3"
            title="3rd Place"
            reward="$2,500"
            heightClass="h-[300px]" // Shortest Height
            borderClass="border-yellow-400 shadow-[0_0_15px_-3px_rgba(250,204,21,0.4)]" // Yellow border
            iconColorClass="text-yellow-400"
          />
        </div>
      </div>
    </section>
  );
};

export default PrizePodium;