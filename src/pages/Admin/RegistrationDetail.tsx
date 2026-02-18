// src/pages/Admin/RegistrationDetail.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


export default function RegistrationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [registration, setRegistration] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = sessionStorage.getItem("admin-api-key") || "";

  useEffect(() => {
    if (!id || !apiKey) {
      setError("Missing ID or API key");
      setLoading(false);
      return;
    }

    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        // Assuming your backend has a GET /api/admin/registrations/:id endpoint
        // If not, you can implement it or fetch all and filter client-side (not ideal)
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/registrations/${id}`,
          {
            headers: { "x-api-key": apiKey },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch details");

        const data = await res.json();
        setRegistration(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, apiKey]);

  if (loading) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "#9ca3af" }}>
        Loading details...
      </div>
    );
  }

  if (error || !registration) {
    return (
      <div style={{ padding: "4rem", color: "#ef4444", textAlign: "center" }}>
        {error || "Registration not found"}
        <button
          onClick={() => navigate("/admin/registrations")}
          style={{
            marginTop: "1rem",
            padding: "10px 20px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Back to list
        </button>
      </div>
    );
  }

  const { lead, members, payment, teamSize, totalAmount, submittedAt, teamName } = registration;

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <button
        onClick={() => navigate("/admin/registrations")}
        style={{
          marginBottom: "1.5rem",
          padding: "10px 20px",
          background: "#374151",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ← Back to List
      </button>

      <h1 style={{ color: "#f3f4f6", marginBottom: "2rem" }}>Registration Details</h1>

      <div style={{ background: "#1f2937", padding: "2rem", borderRadius: "12px", color: "#f3f4f6" }}>
        {/* Team Info */}
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "#60a5fa", marginBottom: "1rem" }}>Team Information</h2>
          <p><strong>Team Name:</strong> {teamName || lead?.teamName || "—"}</p>
          <p><strong>Team Size:</strong> {teamSize}</p>
          <p><strong>Total Amount:</strong> {totalAmount ? `₹${totalAmount}` : "—"}</p>
          <p><strong>Submitted At:</strong> {submittedAt ? new Date(submittedAt).toLocaleString() : "—"}</p>
        </section>

        {/* Lead Info */}
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "#60a5fa", marginBottom: "1rem" }}>Team Lead</h2>
          {lead ? (
            <div style={{ display: "grid", gap: "0.8rem" }}>
              <p><strong>Name:</strong> {lead.name}</p>
              <p><strong>Email:</strong> {lead.email}</p>
              <p><strong>Contact:</strong> {lead.contact}</p>
              <p><strong>Institution:</strong> {lead.institution}</p>
              <p><strong>Department:</strong> {lead.department || "—"}</p>
              <p><strong>Semester:</strong> {lead.semester || "—"}</p>
              <p><strong>Gender:</strong> {lead.gender || "—"}</p>
              <p><strong>Food Preference:</strong> {lead.foodPreference || "—"}</p>
              <p><strong>Residential Status:</strong> {lead.residentialStatus || "—"}</p>
            </div>
          ) : (
            <p>No lead data available</p>
          )}
        </section>

        {/* Members */}
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "#60a5fa", marginBottom: "1rem" }}>Team Members</h2>
          {members?.length > 0 ? (
            members.map((member: any, index: number) => (
              <div
                key={index}
                style={{
                  background: "#111827",
                  padding: "1.2rem",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                }}
              >
                <h3 style={{ color: "#93c5fd", marginBottom: "0.8rem" }}>Member {index + 1}</h3>
                <p><strong>Name:</strong> {member.name}</p>
                <p><strong>Email:</strong> {member.email}</p>
                <p><strong>Contact:</strong> {member.contact}</p>
                <p><strong>Institution:</strong> {member.institution}</p>
                <p><strong>Department:</strong> {member.department || "—"}</p>
                <p><strong>Semester:</strong> {member.semester || "—"}</p>
                <p><strong>Gender:</strong> {member.gender || "—"}</p>
                <p><strong>Food Preference:</strong> {member.foodPreference || "—"}</p>
                <p><strong>Residential Status:</strong> {member.residentialStatus || "—"}</p>
              </div>
            ))
          ) : (
            <p>No members listed</p>
          )}
        </section>

        {/* Payment */}
        <section>
          <h2 style={{ color: "#60a5fa", marginBottom: "1rem" }}>Payment Info</h2>
          {payment ? (
            <div style={{ display: "grid", gap: "0.8rem" }}>
              <p><strong>Contact:</strong> {payment.contact}</p>
              <p>
                <strong>Screenshot:</strong>{" "}
                {payment.screenshotUrl ? (
                  <a
                    href={payment.screenshotUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#60a5fa", textDecoration: "underline" }}
                  >
                    View Payment Screenshot
                  </a>
                ) : (
                  "No screenshot"
                )}
              </p>
            </div>
          ) : (
            <p>No payment info available</p>
          )}
        </section>
      </div>
    </div>
  );
}