import RegistrationWizard from "../components/Registration/RegistrationWizard";
import "../components/Registration/Registration.css";

export default function Register() {
  return (
    <div className="registration-page min-h-screen bg-black text-white">
      {/* HACKFIT 4.0 Logo */}
      <div className="registration-header">
        <h1 className="hackfit-logo">HACKFIT 4.0</h1>
      </div>

      {/* Registration Wizard (includes navbar + content) */}
      <RegistrationWizard />
    </div>
  );
}