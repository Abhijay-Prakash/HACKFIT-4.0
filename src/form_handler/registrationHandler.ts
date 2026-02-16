
export interface MemberData {
  name: string;
  gender: string;
  institution: string;
  semester: string;
  division: string;
  department: string;
  email: string;
  contact: string;
  foodPreference: string;
  residentialStatus: string;
  teamName?: string;
}

export interface RegistrationPayload {
  teamSize: number;
  lead: MemberData;
  members: MemberData[];
  payment: {
    contact: string;
    screenshotDetails: {
      name: string;
      type: string;
      size: number;
    };
  };
  totalAmount: number;
  submittedAt: string;
}


const cleanString = (str: string) => {
  if (!str) return "";
  return str.trim().replace(/[<>"/\\;]/g, "");
};


const sanitizeMember = (member: MemberData): MemberData => ({
  name: cleanString(member.name),
  gender: member.gender,
  institution: cleanString(member.institution),
  semester: member.semester,
  division: member.division,
  department: cleanString(member.department),
  email: member.email.trim().toLowerCase(),
  contact: member.contact.trim(),
  foodPreference: member.foodPreference,
  residentialStatus: member.residentialStatus,
  teamName: member.teamName ? cleanString(member.teamName) : undefined,
});


export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
  
  const extension = file.name.split(".").pop()?.toLowerCase();
  
  if (!allowedTypes.includes(file.type)) {
    return { 
      isValid: false, 
      error: `Invalid file type: ${file.type}. Please upload a JPG, PNG, or WEBP image.` 
    };
  }
  
  if (!extension || !allowedExtensions.includes(extension)) {
    return { 
      isValid: false, 
      error: `Invalid file extension: .${extension}. Please use .jpg, .png, or .webp.` 
    };
  }

  // Check file size (e.g., max 5MB)
  if (file.size > 15 * 1024 * 1024) {
    return { 
      isValid: false, 
      error: "File size too large. Maximum allowed is 5MB." 
    };
  }

  return { isValid: true };
};

/**
 * Orchestrates the full registration package
 */
export const processRegistrationSubmission = async (
  teamSize: number,
  lead: MemberData,
  members: MemberData[],
  paymentContact: string,
  paymentFile: File,
  amount: number
): Promise<RegistrationPayload> => {
  
  // 1. File validation
  const fileCheck = validateImageFile(paymentFile);
  if (!fileCheck.isValid) {
    throw new Error(fileCheck.error);
  }

  // 2. Data Sanitization
  const sanitizedLead = sanitizeMember(lead);
  const sanitizedMembers = members.map(sanitizeMember);

  // 3. Construct JSON Payload
  const payload: RegistrationPayload = {
    teamSize,
    lead: sanitizedLead,
    members: sanitizedMembers,
    payment: {
      contact: paymentContact.trim(),
      screenshotDetails: {
        name: paymentFile.name,
        type: paymentFile.type,
        size: paymentFile.size,
      },
    },
    totalAmount: amount,
    submittedAt: new Date().toISOString(),
  };

  // 4. Final Validation (Example)
  if (!payload.lead.email || !payload.lead.contact) {
    throw new Error("Lead contact info is missing after processing.");
  }

  // MOCK LOGGING - This represents the JSON you'd send to the database
  console.log("FINAL REGISTRATION DATA (JSON):", JSON.stringify(payload, null, 2));

  // In a real scenario, you'd send this to your Express/Firebase/Supabase backend here:
  // await axios.post('/api/register', payload);

  return payload;
};
