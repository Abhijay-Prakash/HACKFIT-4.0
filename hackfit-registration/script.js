document.addEventListener('DOMContentLoaded', () => {
    /* State Management */
    const state = {
        teamSize: 3,
        price: 999,
        teamLead: {},
        members: [], // Only separate members (2..N)
        currentSection: 1
    };

    const PRICES = { 3: 999, 4: 1299, 5: 1599 };

    /* Elements */
    const els = {
        // Sections
        section1: document.getElementById('hackfit-acc-item-1'),
        section2: document.getElementById('hackfit-acc-item-2'),
        section3: document.getElementById('hackfit-acc-item-3'),
        status1: document.getElementById('hackfit-acc-status-1'),
        status2: document.getElementById('hackfit-acc-status-2'),
        status3: document.getElementById('hackfit-acc-status-3'),

        // Step 1 Controls
        decreaseBtn: document.getElementById('hackfit-decrease-size'),
        increaseBtn: document.getElementById('hackfit-increase-size'),
        sizeDisplay: document.getElementById('hackfit-team-size-number'),
        priceDisplay: document.getElementById('hackfit-total-price'),
        btnNext1: document.getElementById('hackfit-btn-step-1'),

        // Step 2 Container
        memberContainer: document.getElementById('hackfit-member-forms-container'),

        // Step 3
        finalPrice: document.getElementById('hackfit-final-price'),
        fileInput: document.getElementById('hackfit-payment-proof'),
        fileName: document.getElementById('hackfit-file-name'),
        btnSubmit: document.getElementById('hackfit-btn-submit'),
        successOverlay: document.getElementById('hackfit-success-overlay'),

        // Inputs Section 1
        inputsLead: {
            name: document.getElementById('hackfit-name'),
            institution: document.getElementById('hackfit-institution'),
            semester: document.getElementById('hackfit-semester'),
            department: document.getElementById('hackfit-department'),
            batch: document.getElementById('hackfit-batch'),
            email: document.getElementById('hackfit-email'),
            contact: document.getElementById('hackfit-contact'),
        },
        inputsFinal: {
            teamContact: document.getElementById('hackfit-team-contact')
        }
    };

    /* Init */
    updatePriceUI();

    /* Event Listeners */
    els.decreaseBtn.addEventListener('click', () => changeSize(-1));
    els.increaseBtn.addEventListener('click', () => changeSize(1));

    els.btnNext1.addEventListener('click', () => {
        if (validateSection1()) {
            completeSection(1);
            generateMemberForms();
            activateSection(2);
        }
    });

    els.fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            els.fileName.textContent = e.target.files[0].name;
            els.fileName.style.color = '#fff';
        }
    });

    document.getElementById('hackfit-form').addEventListener('submit', (e) => {
        e.preventDefault();
        handleFinalSubmit();
    });

    /* Functions */

    function changeSize(delta) {
        const newSize = state.teamSize + delta;
        if (newSize >= 3 && newSize <= 5) {
            state.teamSize = newSize;
            state.price = PRICES[newSize];
            updatePriceUI();
        }
    }

    function updatePriceUI() {
        els.sizeDisplay.textContent = state.teamSize;
        els.priceDisplay.textContent = state.price;
        els.finalPrice.textContent = `₹${state.price}`;
    }

    function validateSection1() {
        let isValid = true;
        Object.values(els.inputsLead).forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        return isValid;
    }

    function completeSection(num) {
        const section = num === 1 ? els.section1 : (num === 2 ? els.section2 : els.section3);
        section.classList.remove('active');
        section.classList.add('completed');
    }

    function activateSection(num) {
        const section = num === 1 ? els.section1 : (num === 2 ? els.section2 : els.section3);
        section.classList.remove('completed'); // just in case
        section.classList.add('active');

        // Scroll to view
        setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }

    function generateMemberForms() {
        els.memberContainer.innerHTML = '';
        state.memberCountCurrent = 1; // Start tracking from Member 2 (index relative to loop)
        showNextMemberForm();
    }

    function showNextMemberForm() {
        const memberIndex = state.memberCountCurrent + 1; // +1 because Lead is #1
        const totalMembers = state.teamSize;

        // If we have already collected all members (Lead + others)
        if (memberIndex > totalMembers) {
            // All done
            completeSection(2);
            activateSection(3);
            return;
        }

        const isLastMember = memberIndex === totalMembers;

        const html = `
            <div class="hackfit-member-block active-member-form" id="hackfit-member-form-current">
                <div class="hackfit-member-header">
                    <span>Enter Details for Member ${memberIndex}</span>
                    <span class="hackfit-note">(Member ${state.memberCountCurrent} of ${state.teamSize - 1} Additional Members)</span>
                </div>
                <div class="hackfit-form-grid">
                    <div class="hackfit-input-group full-width">
                        <label>Name *</label>
                        <input type="text" class="hackfit-input member-req" placeholder="Full Name">
                    </div>
                    <div class="hackfit-input-group full-width">
                        <label>Institution *</label>
                        <input type="text" class="hackfit-input member-req" placeholder="Institution">
                    </div>
                    <div class="hackfit-input-group full-width">
                        <label>Semester *</label>
                         <select class="hackfit-input member-req">
                            <option value="" disabled selected>Select</option>
                            <option value="S2">S2</option>
                            <option value="S4">S4</option>
                            <option value="S6">S6</option>
                            <option value="S8">S8</option>
                        </select>
                    </div>
                     <div class="hackfit-input-group full-width">
                        <label>Department *</label>
                        <input type="text" class="hackfit-input member-req" placeholder="Department">
                    </div>
                    <div class="hackfit-input-group full-width">
                        <label>Email *</label>
                        <input type="email" class="hackfit-input member-req" placeholder="Email">
                    </div>
                     <div class="hackfit-input-group full-width">
                        <label>Contact *</label>
                        <input type="tel" class="hackfit-input member-req" placeholder="Contact">
                    </div>
                </div>
                <div class="hackfit-action-center">
                    <button type="button" class="hackfit-btn-gradient" id="hackfit-btn-next-member">
                        ${isLastMember ? 'Finish & Proceed to Payment' : 'Save & Add Next Member'}
                    </button>
                </div>
            </div>
        `;

        // Clear previous form area (or append if we want to show history? Let's clear to keep it clean like a wizard step inside accordion)
        // Actually, let's show a summary of added members above the current form.

        // Create form wrapper if not exists
        let formWrapper = document.getElementById('hackfit-current-member-wrapper');
        if (!formWrapper) {
            formWrapper = document.createElement('div');
            formWrapper.id = 'hackfit-current-member-wrapper';
            els.memberContainer.appendChild(formWrapper);
        }

        formWrapper.innerHTML = html;

        // Bind Event
        document.getElementById('hackfit-btn-next-member').addEventListener('click', () => {
            if (validateCurrentMember()) {
                saveAndNextMember(memberIndex);
            }
        });
    }

    function validateCurrentMember() {
        let isValid = true;
        const inputs = document.querySelectorAll('#hackfit-member-form-current .member-req');
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        return isValid;
    }

    function saveAndNextMember(index) {
        // Here we would save the data to state.members array
        // For UI demo, we just create a "Saved" summary block
        const name = document.querySelector('#hackfit-member-form-current input[placeholder="Full Name"]').value;

        const summaryHtml = `
            <div class="hackfit-member-summary">
                <span class="hackfit-member-check">✓</span>
                <span>Member ${index}: <strong>${name}</strong> added</span>
            </div>
        `;

        // Insert summary before the wrapper
        const summaryDiv = document.createElement('div');
        summaryDiv.innerHTML = summaryHtml;
        els.memberContainer.insertBefore(summaryDiv.firstElementChild, document.getElementById('hackfit-current-member-wrapper'));

        // Increment and show next
        state.memberCountCurrent++;
        showNextMemberForm();
    }

    function handleFinalSubmit() {
        let isValid = true;

        // Validate Team Contact
        if (!els.inputsFinal.teamContact.value.trim()) {
            els.inputsFinal.teamContact.classList.add('error');
            isValid = false;
        } else {
            els.inputsFinal.teamContact.classList.remove('error');
        }

        // Validate File
        if (!els.fileInput.files.length) {
            // Visual cue
            const customBtn = document.querySelector('.hackfit-file-custom');
            customBtn.style.borderColor = '#ff4d4d';
            customBtn.style.color = '#ff4d4d';
            setTimeout(() => {
                customBtn.style.borderColor = '#444';
                customBtn.style.color = '#ccc';
            }, 2000);
            isValid = false;
        }

        if (isValid) {
            // Success
            els.successOverlay.classList.remove('hidden');
        }
    }
});
