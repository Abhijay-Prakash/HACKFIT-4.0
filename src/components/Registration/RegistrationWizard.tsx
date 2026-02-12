import { useState } from "react";

export default function RegistrationWizard() {
  const [step, setStep] = useState(1);
  
  const steps = [
    { number: 1, label: "TEAM SIZE" },
    { number: 2, label: "MEMBER DETAILS" },  
    { number: 3, label: "PAYMENT & QR" }
  ];

  const nextStep = () => setStep(prev => prev < 3 ? prev + 1 : prev);
  const prevStep = () => setStep(prev => prev > 1 ? prev - 1 : prev);

  return (
    <div className="wizard-container">
      {/* Dynamic Progress Wizard Navbar */}
      <div className="wizard-navbar">
        {steps.map((stepInfo, index) => (
          <div key={stepInfo.number}>
            <div 
              className={`wizard-step ${step === stepInfo.number ? 'wizard-step-active' : ''}`}
              onClick={() => setStep(stepInfo.number)}
            >
              <span className="step-number">{stepInfo.number}</span>
              <span className="step-label">{stepInfo.label}</span>
            </div>
            {/* Add arrow between steps (except after last step) */}
            {index < steps.length - 1 && <div className="wizard-arrow"></div>}
          </div>
        ))}
      </div>

      {/* Registration Content */}
      <div className="registration-content">
        <div className="registration-content-box">
          {step === 1 && (
            <div>
              <h2>Step 1: Team Size Content</h2>
              <button onClick={nextStep}>Next</button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2>Step 2: Member Details Content</h2>
              <button onClick={prevStep}>Previous</button>
              <button onClick={nextStep}>Next</button>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2>Step 3: Payment & QR Content</h2>
              <button onClick={prevStep}>Previous</button>
              <button>Submit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}