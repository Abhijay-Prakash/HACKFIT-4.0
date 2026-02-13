import HackathonCards from "../HackathonCards";
import { Header } from "../Header";
import PrizePodium from "../PrizePodium";
import HackathonTopicsCarousel from "../HackathonTopics";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import CyberDivider from "../components/CyberDivider";
import { AnimatedSection } from "../components/AnimatedSection";
import { LazyComponent } from "../components/LazyComponent";
import "../SectionStyles.css";

export default function HomePage() {
  return (
    <div className="bg-black text-white min-h-screen w-full">
      <div className="flex flex-col min-w-full min-h-[50vh]">
        <Header />
      </div>

      {/* Prize Section with dither texture */}
      <AnimatedSection
        animationType="fadeUp"
        className="section-dither flex justify-center px-4 sm:px-6 py-12 sm:py-16 relative"
        threshold={0.2}
      >
        <div className="relative z-10 w-full">
          <LazyComponent threshold={0.1}>
            <PrizePodium />
          </LazyComponent>
        </div>
      </AnimatedSection>

      {/* Divider after Prize Section */}
      <AnimatedSection animationType="fadeIn" delay={200}>
        <CyberDivider />
      </AnimatedSection>

      {/* Topics Section with dither texture */}
      <div className="section-dither">
        <AnimatedSection animationType="slideInLeft" threshold={0.2}>
          <LazyComponent threshold={0.1}>
            <HackathonTopicsCarousel />
          </LazyComponent>
        </AnimatedSection>
      </div>

      {/* Divider before HackathonCards */}
      <AnimatedSection animationType="fadeIn" delay={300}>
        <CyberDivider />
      </AnimatedSection>

      {/* HackathonCards Section with dither texture */}
      <AnimatedSection
        animationType="fadeUp"
        className="section-dither relative flex justify-center px-4 sm:px-6 py-12 sm:py-16"
        threshold={0.2}
      >
        <div className="relative z-10 w-full max-w-7xl">
          <LazyComponent threshold={0.1}>
            <HackathonCards />
          </LazyComponent>
        </div>
      </AnimatedSection>

      {/* Divider before Contact Section */}
      <AnimatedSection animationType="fadeIn" delay={400}>
        <CyberDivider />
      </AnimatedSection>

      {/* Contact Section - plain black to blend with footer */}
      <div className="bg-black">
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
  );
}