import React, { useState, useEffect } from 'react';
import './RegisterAccordion.css'; // Import the custom styles

// --- Types ---
type TeamSize = 3 | 4 | 5;

interface MemberData {
    name: string;
    institution: string;
    semester: string;
    division: string;
    department: string;
    email: string;
    contact: string;
}

interface LeadData extends MemberData {
    batch: string;
}

// --- Constants ---
const PRICES = { 3: 999, 4: 1299, 5: 1599 };

// --- Main Component ---
const RegisterAccordion: React.FC = () => {
    // State
    const [teamSize, setTeamSize] = useState<TeamSize>(3);
    const [currentSection, setCurrentSection] = useState<1 | 2 | 3>(1);

    // Section 2: Lead & Members - Combined Input State
    // We use one 'form' object to capture current input, whether it's Lead or Member
    const [formData, setFormData] = useState<any>({
        name: '', institution: '', semester: '', division: '', department: '', email: '', contact: ''
    });
    
    const [members, setMembers] = useState<MemberData[]>([]); // To store submitted members
    // Lead is stored separately once submitted, or just as the first member in a list?
    // The vanilla code implies sequential entry. Let's store Lead separate for clarity or just as member 0.
    // We'll store Lead in a separate state to match my previous logic, but adaptable.
    const [leadData, setLeadData] = useState<LeadData | null>(null);

    // Track entry index: 0 = Lead, 1..N = Members
    const [memberEntryIndex, setMemberEntryIndex] = useState(0);

    // Section 3: Payment
    const [teamContact, setTeamContact] = useState('');
    const [paymentFile, setPaymentFile] = useState<File | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    // Errors state for current form
    const [errors, setErrors] = useState<any>({});


    // --- Handlers ---

    // Step 1: Size
    const increaseSize = () => teamSize < 5 && setTeamSize((s: any) => s + 1 as TeamSize);
    const decreaseSize = () => teamSize > 3 && setTeamSize((s: any) => s - 1 as TeamSize);

    const handleStep1Next = () => {
        setCurrentSection(2);
        setMemberEntryIndex(0);
        setFormData({ name: '', institution: '', semester: '',division: '',  department: '', batch: '', email: '', contact: '' });
    };

    const handlePrevStep2 = () => {
        setCurrentSection(1);
        setMembers([]); // Reset on back? user didn't specify, but safer to reset or keep
        setLeadData(null);
        setMemberEntryIndex(0);
    };

    const handlePrevStep3 = () => {
        setCurrentSection(2);
    };

    // Step 2: Form Logic
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
        // Clear error
        if (value.trim()) setErrors((prev: any) => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors: any = {};
        let isValid = true;

        // Required fields based on index
        // If index 0 (Lead), all fields including Batch (maybe optional?)
        // User code says: input[required]

        if (!formData.name.trim()) { newErrors.name = "This field is required"; isValid = false; }
        if (!formData.institution.trim()) { newErrors.institution = "This field is required"; isValid = false; }
        if (!formData.semester) { newErrors.semester = "This field is required"; isValid = false; }
         if (!formData.division) { newErrors.division = "This field is required"; isValid = false; }
        if (!formData.department.trim()) { newErrors.department = "This field is required"; isValid = false; }
        if (!formData.email.trim()) { newErrors.email = "This field is required"; isValid = false; }
        if (!formData.contact.trim()) { newErrors.contact = "This field is required"; isValid = false; }

        setErrors(newErrors);
        return isValid;
    };

    const handleNextMember = () => {
        if (validateForm()) {
            if (memberEntryIndex === 0) {
                // Save Lead
                setLeadData(formData);
            } else {
                // Save Member
                setMembers(prev => [...prev, formData]);
            }

            // Logic check: are we done?
            // Total slots: teamSize
            // Index 0 = Lead (1st person)
            // Index teamSize-1 = Last person
            if (memberEntryIndex < teamSize - 1) {
                setMemberEntryIndex(prev => prev + 1);
                setFormData({ name: '', institution: '', semester: '', division: '', department: '', batch: '', email: '', contact: '' });
                setErrors({});
            } else {
                setCurrentSection(3);
            }
        }
    };

    // Step 3: Payment
    const handlePaymentSubmit = () => {
        if (!teamContact.trim()) {
            alert("Enter contact number");
            return;
        }
        if (!paymentFile) {
            alert("Upload payment screenshot");
            return;
        }
        setIsSuccess(true);
    };

    // Helpers
    const getPeopleIcons = (count: number) => "👤".repeat(count);

    const getCurrentTitle = () => {
        if (memberEntryIndex === 0) return "Team Lead";
        return `Member ${memberEntryIndex}`; // 0-based index means Member 1 is Lead, so next is Member 1? 
        // User script: `Member ${currentIndex}` where currentIndex starts at 1 for first member input? 
        // User script: currentIndex = 0 initially (Lead). Then increments.
        // User script: showForm(`Member ${currentIndex}`) -> Member 1, Member 2
        // Let's stick to "Member X"
    };

    return (
        <div className="register-accordion-container">
            <div className="main">
                {/* <h1 className="title">HACKFIT <span>4.0</span></h1> */}

                {/* STEP BAR */}
                <div className="steps">
                    <div className={`step ${currentSection === 1 ? 'active' : ''}`}>1 TEAM SIZE</div>
                    <div className={`step ${currentSection === 2 ? 'active' : ''}`}>2 MEMBER DETAILS</div>
                    <div className={`step ${currentSection === 3 ? 'active' : ''}`}>3 PAYMENT & QR</div>
                </div>

                {/* ================= STEP 1 ================= */}
                {currentSection === 1 && (
                    <div id="step1">
                        <div className="card">
                            <button
                                id="prevBtn"
                                className="arrow"
                                disabled={teamSize === 3}
                                onClick={decreaseSize}
                            >&#10094;</button>

                            <div className="card-inner">
                                <h2>TEAM SIZE: <span id="teamSize">{teamSize}</span></h2>
                                <div className="people">{getPeopleIcons(teamSize)}</div>
                                <p className="price">TOTAL PER TEAM: ₹<span id="price">{PRICES[teamSize]}</span></p>
                                <p className="extra">EACH ADDITIONAL MEMBER: +₹300</p>
                            </div>

                            <button
                                id="nextArrow"
                                className="arrow"
                                disabled={teamSize === 5}
                                onClick={increaseSize}
                            >&#10095;</button>
                        </div>

                        <button className="next-btn" id="nextBtnMain" onClick={handleStep1Next}>
                            NEXT →
                        </button>
                    </div>
                )}

                {/* ================= STEP 2 ================= */}
                {currentSection === 2 && (
                    <div id="step2">
                        <button id="prevStep2" className="prev-btn" onClick={handlePrevStep2}>
                            ← Previous
                        </button>

                        <h2 className="section-title">Team & Member Details</h2>

                        <div id="formsArea">
                            <div className="form-card">
                                <h3>{memberEntryIndex === 0 ? "Team Lead" : `Member ${memberEntryIndex + 1}`}</h3>

                                <label>Name *</label>
                                <input name="name" value={formData.name} onChange={handleInputChange} />
                                <div className="error">{errors.name}</div>

                                <label>Institution *</label>
                                <input name="institution" value={formData.institution} onChange={handleInputChange} />
                                <div className="error">{errors.institution}</div>

                                <label>Semester *</label>
                                <select name="semester" value={formData.semester} onChange={handleInputChange}>
                                    <option value="">Select</option>
                                    <option>S2</option>
                                    <option>S4</option>
                                    <option>S6</option>
                                    <option>S8</option>
                                </select>
                                <div className="error">{errors.semester}</div>

                                <label>Division *</label>
                                <select name="division" value={formData.division} onChange={handleInputChange}>
                                    <option value="">Select</option>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                    <option>D</option>
                                </select>
                                <div className="error">{errors.division}</div>

                                <label>Department *</label>
                                <input name="department" value={formData.department} onChange={handleInputChange} />
                                <div className="error">{errors.department}</div>

                                {/* Batch only for lead? User script had it generally available but maybe clearer to show for all if needed, or hide. Code had it. */}
                                {/* {memberEntryIndex === 0 && (
                                    <>
                                        <label>Batch</label>
                                        <select name="batch" value={formData.batch} onChange={handleInputChange}>
                                            <option value="">Select Batch</option>
                                            <option>A</option>
                                            <option>B</option>
                                            <option>C</option>
                                            <option>D</option>
                                        </select>
                                       
                                    </>
                                )} */}

                                <label>Email *</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                                <div className="error">{errors.email}</div>

                                <label>Contact Number *</label>
                                <input name="contact" value={formData.contact} onChange={handleInputChange} />
                                <div className="error">{errors.contact}</div>
                            </div>
                        </div>

                        <button id="addMemberBtn" className="next-btn" onClick={handleNextMember}>
                            {memberEntryIndex === 0 ? "+ Member 1 Details" : (memberEntryIndex === teamSize - 1 ? "Finish → Payment" : `+ Member ${memberEntryIndex + 2} Details`)}
                        </button>
                    </div>
                )}

                {/* ================= STEP 3 ================= */}
                {currentSection === 3 && (
                    <div id="step3">
                        <button id="prevStep3" className="prev-btn" onClick={handlePrevStep3}>
                            ← Previous
                        </button>

                        <h2 className="section-title">Payment & QR</h2>

                        <div className="payment-card">
                            <h3>Registration Fee</h3>
                            <p className="amount">₹ <span id="finalAmount">{PRICES[teamSize]}</span></p>
                            <p>Scan QR and complete payment</p>

                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=HackFitPayment" className="qr" alt="QR Code" />

                            <label>Team Contact Number *</label>
                            <input
                                id="paymentPhone"
                                placeholder="Phone number"
                                value={teamContact}
                                onChange={(e) => setTeamContact(e.target.value)}
                            />

                            <label>Upload Payment Screenshot *</label>
                            <input
                                type="file"
                                id="paymentProof"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files?.length) setPaymentFile(e.target.files[0]);
                                }}
                            />

                            <button className="next-btn" id="submitBtn" onClick={handlePaymentSubmit}>
                                Submit Registration
                            </button>

                            {isSuccess && (
                                <p id="successMsg" style={{ display: 'block', color: '#9cff5a', marginTop: '20px', fontWeight: 'bold' }}>
                                    Registration Successful ✅
                                </p>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default RegisterAccordion;
