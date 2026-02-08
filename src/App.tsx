import { useState, useEffect } from "react";
import HackathonCards from "./HackathonCards";
import { Header } from "./Header";
import PrizePodium from "./PrizePodium";
import HackathonTopicsCarousel from "./HackathonTopics";
import Footer from "./Footer";
import LoadingScreen from "./components/LoadingScreen";

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
    <div className="bg-black text-white min-h-screen w-full ">
      <div className="flex flex-col min-w-full min-h-[50vh]">
        <Header />
      </div>
      <section className="flex justify-center px-6 py-16">
        <PrizePodium />
      </section>
      <HackathonTopicsCarousel />

      <section className="flex justify-center px-6 py-16 bg-black">
        <HackathonCards />
      </section>
      <Footer />
    </div>
  );
}
