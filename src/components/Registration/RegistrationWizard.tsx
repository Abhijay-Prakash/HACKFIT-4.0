import { useState } from "react";
import TeamSizeSelector from "./TeamSizeSelector";
import "./Registration.css";
import { processRegistrationSubmission } from "../../form_handler/registrationHandler";
import type { MemberData } from "../../form_handler/registrationHandler";

const PRICES: Record<number, number> = { 3: 999, 4: 1299, 5: 1599 };

export default function RegistrationWizard() {
  const [step, setStep] = useState(1);
  const [teamSize, setTeamSize] = useState(3);

  // Form state for member data entry
  const [formData, setFormData] = useState<MemberData>({
    name: "",
    gender: "",
    institution: "",
    semester: "",
    division: "",
    department: "",
    email: "",
    contact: "",
    foodPreference: "",
    residentialStatus: "",
    teamName: "",
  });
  const [members, setMembers] = useState<MemberData[]>([]);
  const [leadData, setLeadData] = useState<MemberData | null>(null);
  const [memberEntryIndex, setMemberEntryIndex] = useState(0);
  const [errors, setErrors] = useState<
    Partial<Record<keyof MemberData, string>>
  >({});

  // Payment state
  const [teamContact, setTeamContact] = useState("");
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const steps = [
    { number: 1, label: "TEAM SIZE" },
    { number: 2, label: "MEMBER DETAILS" },
    { number: 3, label: "PAYMENT & QR" },
  ];

  const prevStep = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
    if (step === 2) {
      setMembers([]);
      setLeadData(null);
      setMemberEntryIndex(0);
      setFormData({
        name: "",
        gender: "",
        institution: "",
        semester: "",
        division: "",
        department: "",
        email: "",
        contact: "",
        foodPreference: "",
        residentialStatus: "",
        teamName: "",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev: MemberData) => ({ ...prev, [name]: value }));
    if (value.trim()) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  // Non-destructive checks used for showing UI indicators (don't set errors)
  const isStep2Filled = () => {
    if (!formData.name.trim()) return false;
    if (!formData.gender) return false;
    if (!formData.institution.trim()) return false;
    if (!formData.semester) return false;
    if (!formData.division) return false;
    if (!formData.department.trim()) return false;
    if (!formData.email.trim() || !validateEmail(formData.email)) return false;
    if (!formData.contact.trim() || !validatePhone(formData.contact))
      return false;
    if (!formData.foodPreference) return false;
    if (!formData.residentialStatus) return false;
    if (memberEntryIndex === 0 && !formData.teamName?.trim()) return false;
    return true;
  };

  const isRegistrationDataComplete = () => {
    // ensure lead + members collected
    const requiredMembers = teamSize - 1;
    const haveAllMembers =
      leadData !== null && members.length === requiredMembers;
    // payment fields
    const paymentReady = teamContact.trim() !== "" && paymentFile !== null;
    return haveAllMembers && paymentReady;
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof MemberData, string>> = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }

    if (!formData.institution.trim()) {
      newErrors.institution = "Institution is required";
      isValid = false;
    }

    if (!formData.semester) {
      newErrors.semester = "Semester is required";
      isValid = false;
    }

    if (!formData.division) {
      newErrors.division = "Division is required";
      isValid = false;
    }

    if (!formData.department.trim()) {
      newErrors.department = "Branch/Department is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "Phone number is required";
      isValid = false;
    } else if (!validatePhone(formData.contact)) {
      newErrors.contact = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    if (!formData.foodPreference) {
      newErrors.foodPreference = "Food preference is required";
      isValid = false;
    }

    if (!formData.residentialStatus) {
      newErrors.residentialStatus = "Residential status is required";
      isValid = false;
    }

    if (memberEntryIndex === 0 && !formData.teamName?.trim()) {
      newErrors.teamName = "Team name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextMember = () => {
    if (validateForm()) {
      if (memberEntryIndex === 0) {
        setLeadData(formData);
      } else {
        setMembers((prev) => [...prev, formData]);
      }

      if (memberEntryIndex < teamSize - 1) {
        setMemberEntryIndex((prev) => prev + 1);
        setFormData({
          name: "",
          gender: "",
          institution: "",
          semester: "",
          division: "",
          department: "",
          email: "",
          contact: "",
          foodPreference: "",
          residentialStatus: "",
          teamName: "",
        });
        setErrors({});
      } else {
        setStep(3);
      }
    }
  };

  const handlePaymentSubmit = async () => {
    if (!teamContact.trim()) {
      alert("Enter contact number");
      return;
    }
    if (!paymentFile) {
      alert("Upload payment screenshot");
      return;
    }

    if (!leadData) {
      alert("Lead data is missing. Please go back and fill Member 1 details.");
      return;
    }

    try {
      // Call the backend handler to process, sanitize and construct JSON
      await processRegistrationSubmission(
        teamSize,
        leadData,
        members,
        teamContact,
        paymentFile,
        PRICES[teamSize],
      );

      setIsSuccess(true);
      // Optional: scroll to top or show success modal
    } catch (err: any) {
      alert(err.message || "An error occurred during submission");
    }
  };

  const handleStep1Next = () => {
    setStep(2);
    setMemberEntryIndex(0);
    setFormData({
      name: "",
      gender: "",
      institution: "",
      semester: "",
      division: "",
      department: "",
      email: "",
      contact: "",
      foodPreference: "",
      residentialStatus: "",
      teamName: "",
    });
  };

  return (
    <div className="wizard-container">
      {/* Dynamic Progress Wizard Navbar */}
      <div className="wizard-navbar">
        {steps.map((stepInfo, index) => (
          <div key={stepInfo.number}>
            <div
              className={`wizard-step ${step === stepInfo.number ? "wizard-step-active" : ""}`}
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
              <TeamSizeSelector teamSize={teamSize} setTeamSize={setTeamSize} />
              <button className="wizard-next-btn" onClick={handleStep1Next}>
                NEXT →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="wizard-step-content">
              <button className="wizard-prev-btn" onClick={prevStep}>
                ← PREVIOUS
              </button>

              <h2 className="wizard-section-title">TEAM & MEMBER DETAILS</h2>

              <div className="wizard-form-card">
                <h3 className="wizard-form-title">
                  {memberEntryIndex === 0
                    ? "TEAM LEAD"
                    : `MEMBER ${memberEntryIndex + 1}`}
                </h3>

                {memberEntryIndex === 0 && (
                  <>
                    <label className="wizard-label">Team Name *</label>
                    <input
                      className="wizard-input"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleInputChange}
                      placeholder="Enter your team name"
                    />
                    {errors.teamName && (
                      <div className="wizard-error">{errors.teamName}</div>
                    )}
                  </>
                )}

                <label className="wizard-label">Full Name *</label>
                <input
                  className="wizard-input"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                />
                {errors.name && (
                  <div className="wizard-error">{errors.name}</div>
                )}

                <label className="wizard-label">Gender *</label>
                <select
                  className="wizard-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                {errors.gender && (
                  <div className="wizard-error">{errors.gender}</div>
                )}

                <label className="wizard-label">Phone Number *</label>
                <input
                  className="wizard-input"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="Enter 10-digit phone number"
                  maxLength={10}
                />
                {errors.contact && (
                  <div className="wizard-error">{errors.contact}</div>
                )}

                <label className="wizard-label">Email Address *</label>
                <input
                  className="wizard-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <div className="wizard-error">{errors.email}</div>
                )}

                <label className="wizard-label">Semester *</label>
                <select
                  className="wizard-select"
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                >
                  <option value="">Select Semester</option>
                  <option>S2</option>
                  <option>S4</option>
                  <option>S6</option>
                  <option>S8</option>
                </select>
                {errors.semester && (
                  <div className="wizard-error">{errors.semester}</div>
                )}

                <label className="wizard-label">Branch *</label>
                <select
                  className="wizard-select"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                >
                  <option value="">Select Branch</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">
                    Information Technology
                  </option>
                  <option value="Electronics & Communication">
                    Electronics & Communication
                  </option>
                  <option value="Electrical & Electronics">
                    Electrical & Electronics
                  </option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                  <option value="Other">Other</option>
                </select>
                {errors.department && (
                  <div className="wizard-error">{errors.department}</div>
                )}

                <label className="wizard-label">Institution *</label>
                <input
                  className="wizard-input"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  placeholder="Enter institution name"
                />
                {errors.institution && (
                  <div className="wizard-error">{errors.institution}</div>
                )}

                <label className="wizard-label">Division *</label>
                <select
                  className="wizard-select"
                  name="division"
                  value={formData.division}
                  onChange={handleInputChange}
                >
                  <option value="">Select Division</option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                </select>
                {errors.division && (
                  <div className="wizard-error">{errors.division}</div>
                )}

                <label className="wizard-label">Food Preferences *</label>
                <select
                  className="wizard-select"
                  name="foodPreference"
                  value={formData.foodPreference}
                  onChange={handleInputChange}
                >
                  <option value="">Select Food Preference</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
                {errors.foodPreference && (
                  <div className="wizard-error">{errors.foodPreference}</div>
                )}

                <label className="wizard-label">
                  Are you a Dayscholar or Hosteler? *
                </label>
                <select
                  className="wizard-select"
                  name="residentialStatus"
                  value={formData.residentialStatus}
                  onChange={handleInputChange}
                >
                  <option value="">Select Residential Status</option>
                  <option value="Dayscholar">Dayscholar</option>
                  <option value="Hosteler">Hosteler</option>
                </select>
                {errors.residentialStatus && (
                  <div className="wizard-error">{errors.residentialStatus}</div>
                )}
              </div>

              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  textAlign: "center",
                }}
              >
                {!isStep2Filled() && (
                  <div>
                    <div className="required-text">
                      Please fill all required fields above
                    </div>
                  </div>
                )}

                <button className="wizard-next-btn" onClick={handleNextMember}>
                  {memberEntryIndex === 0
                    ? "+ MEMBER 2 DETAILS"
                    : memberEntryIndex === teamSize - 1
                      ? "FINISH → PAYMENT"
                      : `+ MEMBER ${memberEntryIndex + 2} DETAILS`}
                </button>

                {!isStep2Filled() && (
                  <span
                    aria-hidden
                    className="red-indicator"
                    title="Required fields missing"
                  ></span>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="wizard-step-content">
              <button className="wizard-prev-btn" onClick={prevStep}>
                ← PREVIOUS
              </button>

              <h2 className="wizard-section-title">PAYMENT & QR</h2>

              <div className="wizard-payment-card">
                <h3 className="wizard-payment-title">REGISTRATION FEE</h3>
                <p className="wizard-payment-amount">₹ {PRICES[teamSize]}</p>
                <p className="wizard-payment-instruction">
                  Scan QR code and complete payment
                </p>

                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=HackFitPayment"
                  className="wizard-qr"
                  alt="Payment QR Code"
                />

                <label className="wizard-label">Team Contact Number *</label>
                <input
                  className="wizard-input"
                  placeholder="Enter contact number"
                  value={teamContact}
                  onChange={(e) => setTeamContact(e.target.value)}
                />

                <label className="wizard-label">
                  Upload Payment Screenshot *
                </label>
                <input
                  className="wizard-file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.length)
                      setPaymentFile(e.target.files[0]);
                  }}
                />

                {/** show helper text above submit if earlier data missing or payment fields not provided */}
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    textAlign: "center",
                  }}
                >
                  {!isRegistrationDataComplete() && (
                    <div>
                      <div className="required-text">
                        Some required details are missing — please complete
                        earlier steps
                      </div>
                    </div>
                  )}

                  <button
                    className="wizard-next-btn"
                    onClick={handlePaymentSubmit}
                  >
                    SUBMIT REGISTRATION
                  </button>

                  {!isRegistrationDataComplete() && (
                    <span
                      aria-hidden
                      className="red-indicator"
                      title="Some required details are missing; go back to complete them"
                    ></span>
                  )}
                </div>

                {isSuccess && (
                  <p className="wizard-success">✅ REGISTRATION SUCCESSFUL</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
