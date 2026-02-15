import HackathonCards from "../HackathonCards";
import { Header } from "../Header";
import PrizePodium from "../PrizePodium";
import HackathonTopicsCarousel from "../HackathonTopics";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import CyberDivider from "../components/CyberDivider";
import { AnimatedSection } from "../components/AnimatedSection";
import { LazyComponent } from "../components/LazyComponent";
import WhatIsHackfit from "../components/WhatIsHackfit";
import TimelineSection from "../components/TimelineSection";
import VantaBackground from "../components/VantaBackground";
import "../SectionStyles.css";

export default function HomePage() {
  return (
    <div className="text-white min-h-screen w-full">
      {/* Vanta.js NET Background */}
      <VantaBackground />

      <div className="flex flex-col min-w-full min-h-[50vh] relative z-10">
        <Header />
      </div>

      <div className="relative z-10">
        <AnimatedSection animationType="fadeUp" threshold={0.15}>
          <CyberDivider />
          <WhatIsHackfit />
        </AnimatedSection>

        {/* Prize Section */}
        <AnimatedSection
          animationType="fadeUp"
          className="section-dither section-overlay-darker flex justify-center px-4 sm:px-6 py-12 sm:py-16 relative"
          threshold={0.2}
        >
          <div className="relative z-10 w-full">
            <CyberDivider />
            <LazyComponent threshold={0.1}>
              <PrizePodium />
            </LazyComponent>
          </div>
        </AnimatedSection>

        {/* Topics Section */}
        <div className="section-dither section-overlay-dark">
          <AnimatedSection animationType="slideInLeft" threshold={0.2}>
            <LazyComponent threshold={0.1}>
              <HackathonTopicsCarousel />
            </LazyComponent>
          </AnimatedSection>
        </div>
           <AnimatedSection animationType="fadeIn" delay={400}>
          <CyberDivider />
        </AnimatedSection>

        {/* Timeline */}
        <AnimatedSection
          animationType="fadeUp"
          threshold={0.2}
          className="section-dither px-4 sm:px-6"
        >
          <TimelineSection />
        </AnimatedSection>

        <AnimatedSection animationType="fadeIn" delay={300}>
          <CyberDivider />
        </AnimatedSection>

        {/* HackathonCards Section */}
        {/* <AnimatedSection
          animationType="fadeUp"
          className="section-dither relative flex justify-center px-4 sm:px-6 py-12 sm:py-16"
          threshold={0.2}
        >
          <div className="relative z-10 w-full max-w-7xl">
            <LazyComponent threshold={0.1}>
              <HackathonCards />
            </LazyComponent>
          </div>
        </AnimatedSection> */}

        {/* <AnimatedSection animationType="fadeIn" delay={400}>
          <CyberDivider />
        </AnimatedSection> */}

        {/* Contact Section */}
        <div>
          <AnimatedSection animationType="slideInRight" threshold={0.3}>
            <LazyComponent>
              <ContactSection />
            </LazyComponent>
          </AnimatedSection>
        </div>

        <AnimatedSection animationType="fadeUp" threshold={0.3}>
          <LazyComponent>
            <Footer />
          </LazyComponent>
        </AnimatedSection>
      </div>
    </div>
  );
}
