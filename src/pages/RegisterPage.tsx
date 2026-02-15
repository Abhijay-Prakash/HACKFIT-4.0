import RegistrationWizard from "../components/Registration/RegistrationWizard";
import VantaBackground from "../components/VantaBackground";
import "../components/Registration/Registration.css";
import "../SectionStyles.css";

export default function Register() {
  return (
    <div className="registration-page min-h-screen text-white">
      {/* Vanta.js NET Background */}
      <VantaBackground />

      {/* HACKFIT 4.0 Logo */}
      <div className="registration-header relative z-10">
        <h1 className="hackfit-logo">HACKFIT 4.0</h1>
      </div>

      {/* Registration Wizard (includes navbar + content) */}
      <div className="relative z-10">
        <RegistrationWizard />
      </div>
    </div>
  );
}
