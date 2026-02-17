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

export const validateImageFile = (
  file: File
): { isValid: boolean; error?: string } => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const allowedExtensions = ["jpg", "jpeg", "png", "webp"];

  const extension = file.name.split(".").pop()?.toLowerCase();

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid file type: ${file.type}. Please upload JPG, PNG, or WEBP.`,
    };
  }

  if (!extension || !allowedExtensions.includes(extension)) {
    return {
      isValid: false,
      error: `Invalid file extension: .${extension}`,
    };
  }

  
  if (file.size > 5 * 1024 * 1024) {
    return {
      isValid: false,
      error: "File size too large. Maximum allowed is 5MB.",
    };
  }

  return { isValid: true };
};



export const processRegistrationSubmission = async (
  teamSize: number,
  lead: MemberData,
  members: MemberData[],
  paymentContact: string,
  paymentFile: File,
  amount: number
) => {
  
  const fileCheck = validateImageFile(paymentFile);
  if (!fileCheck.isValid) {
    throw new Error(fileCheck.error);
  }

  
  const sanitizedLead = sanitizeMember(lead);
  const sanitizedMembers = members.map(sanitizeMember);

  
  const formData = new FormData();

  formData.append("teamSize", String(teamSize));
  formData.append("teamContact", paymentContact.trim());
  formData.append("amount", String(amount));

  formData.append("leadData", JSON.stringify(sanitizedLead));
  formData.append("members", JSON.stringify(sanitizedMembers));

  formData.append("paymentScreenshot", paymentFile);

  
  const response = await fetch(
    "http://localhost:5000/api/registrations",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};
