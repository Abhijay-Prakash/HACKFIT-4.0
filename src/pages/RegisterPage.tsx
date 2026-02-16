import RegistrationWizard from "../components/Registration/RegistrationWizard";
import VantaBackground from "../components/VantaBackground";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import "../components/Registration/Registration.css";
import "../SectionStyles.css";

export default function Register() {
  return (
    <div className="registration-page min-h-screen text-white">
      {/* Vanta.js NET Background */}
      <VantaBackground />

      {/* Navigation Bar */}
      <nav className="registration-navbar relative z-20">
        <div className="registration-nav-content">
          <a href="/" className="nav-logo">
            <span className="hack-text">HACKFIT</span>
            <span className="nav-version">4.0</span>
          </a>
          <a href="/" className="nav-back-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            BACK TO HOME
          </a>
        </div>
      </nav>

      {/* HACKFIT 4.0 Logo */}
      <div className="registration-header relative z-10">
        <h1 className="hackfit-logo">HACKFIT 4.0</h1>
      </div>

      {/* Registration Wizard (includes navbar + content) */}
      <div className="relative z-10">
        <RegistrationWizard />
      </div>

      {/* Contact Section */}
      <div className="relative z-10">
        <ContactSection />
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
