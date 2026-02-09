import { useState, useEffect } from "react";
import HackathonCards from "./HackathonCards";
import { Header } from "./Header";
import PrizePodium from "./PrizePodium";
import HackathonTopicsCarousel from "./HackathonTopics";
import LoadingScreen from "./components/LoadingScreen";
import Footer from "./components/Footer";
import ContactSection from "./components/ContactSection";
import CyberDivider from "./components/CyberDivider";
import "./SectionStyles.css";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simply wait 2 seconds for everything to load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="bg-black text-white min-h-screen w-full">
      <div className="flex flex-col min-w-full min-h-[50vh]">
        <Header />
      </div>

      {/* Prize Section with dither texture */}
      <section className="section-dither flex justify-center px-4 sm:px-6 py-12 sm:py-16 relative">
        <div className="relative z-10 w-full">
          <PrizePodium />
        </div>
      </section>

      {/* Divider after Prize Section */}
      <CyberDivider />

      {/* Topics Section with dither texture */}
      <div className="section-dither">
        <HackathonTopicsCarousel />
      </div>

      {/* Divider before HackathonCards */}
      <CyberDivider />

      {/* HackathonCards Section with dither texture */}
      <section className="section-dither relative flex justify-center px-4 sm:px-6 py-12 sm:py-16">
        <div className="relative z-10 w-full max-w-7xl">
          <HackathonCards />
        </div>
      </section>

      {/* Divider before Contact Section */}
      <CyberDivider />

      {/* Contact Section - plain black to blend with footer */}
      <div className="bg-black">
        <ContactSection />
      </div>

      <Footer />
    </div>
  );
}
