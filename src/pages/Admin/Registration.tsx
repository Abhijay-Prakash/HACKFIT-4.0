// src/pages/Admin/Registrations.tsx
import { useState, useEffect } from "react";
import { api } from "../../lib/api";

// More realistic type with optional fields (based on your actual DB data)
type Registration = {
  _id: string;
  teamSize: number;
  teamName?: string;              // sometimes exists at root level
  lead?: {
    name: string;
    gender?: string;
    institution: string;
    semester?: string;
    division?: string;
    department?: string;
    email: string;
    contact: string;
    foodPreference?: string;
    residentialStatus?: string;
    teamName?: string;
  };
  members: Array<{
    name: string;
    // ... other member fields
  }>;
  payment?: {
    contact: string;
    screenshotUrl: string;
  };
  totalAmount?: number;
  submittedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function AdminRegistrations() {
  const [data, setData] = useState<{
    totalTeams: number;
    currentPage: number;
    data: Registration[];
  } | null>(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const limit = 10;
  const apiKey = sessionStorage.getItem("admin-api-key") || "";

  const fetchRegistrations = async () => {
    if (!apiKey) {
      setError("No API key found. Please log in again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await api.getRegistrations({
        page,
        limit,
        search,
        apiKey,
      });

      setData(result);
    } catch (err: any) {
      setError(err.message || "Failed to load registrations");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [page, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // reset to first page on new search
  };

  if (!apiKey) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "#666" }}>
        Please log in as admin first.
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>
      <h1>Admin Panel – Registrations</h1>

      <div
        style={{
          margin: "1.5rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <strong>Total teams registered:</strong>{" "}
          {data ? data.totalTeams : "Loading..."}
        </div>

        <input
          type="text"
          placeholder="Search by team name..."
          value={search}
          onChange={handleSearch}
          style={{
            padding: "10px 14px",
            width: "320px",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />
      </div>

      {error && (
        <div
          style={{
            color: "crimson",
            margin: "1rem 0",
            padding: "12px",
            background: "#ffebee",
            borderRadius: "6px",
          }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: "6rem 0", color: "#666" }}>
          Loading registrations...
        </div>
      ) : (
        <>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "1rem",
                background: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <thead>
                <tr style={{ background: "#f8f9fa", textAlign: "left" }}>
                  <th style={{ padding: "14px 12px" }}>Team Name</th>
                  <th style={{ padding: "14px 12px" }}>College</th>
                  <th style={{ padding: "14px 12px", textAlign: "center" }}>Size</th>
                  <th style={{ padding: "14px 12px", textAlign: "center" }}>Amount</th>
                  <th style={{ padding: "14px 12px" }}>Lead Contact</th>
                  <th style={{ padding: "14px 12px", textAlign: "center" }}>Payment SS</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        textAlign: "center",
                        padding: "4rem 1rem",
                        color: "#777",
                      }}
                    >
                      No registrations found
                    </td>
                  </tr>
                ) : (
                  data?.data?.map((reg) => (
                    <tr
                      key={reg._id}
                      style={{
                        borderBottom: "1px solid #eee",
                        background: "white",
                      }}
                    >
                      <td style={{ padding: "14px 12px" }}>
                        {reg.lead?.teamName || reg.teamName || "—"}
                      </td>
                      <td style={{ padding: "14px 12px" }}>
                        {reg.lead?.institution || "—"}
                      </td>
                      <td style={{ padding: "14px 12px", textAlign: "center" }}>
                        {reg.teamSize ?? "—"}
                      </td>
                      <td style={{ padding: "14px 12px", textAlign: "center" }}>
                        {reg.totalAmount ? `₹${reg.totalAmount}` : "—"}
                      </td>
                      <td style={{ padding: "14px 12px" }}>
                        {reg.payment?.contact || "—"}
                      </td>
                      <td style={{ padding: "14px 12px", textAlign: "center" }}>
                        {reg.payment?.screenshotUrl ? (
                          <a
                            href={reg.payment.screenshotUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#0066cc",
                              textDecoration: "none",
                              fontWeight: 500,
                            }}
                          >
                            View
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {data && (
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || loading}
                style={{
                  padding: "10px 20px",
                  background: page === 1 ? "#eee" : "#0066cc",
                  color: page === 1 ? "#999" : "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: page === 1 ? "not-allowed" : "pointer",
                }}
              >
                Previous
              </button>

              <span style={{ fontWeight: 500 }}>
                Page {page} of {Math.ceil(data.totalTeams / limit) || 1}
              </span>

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={data.data.length < limit || loading}
                style={{
                  padding: "10px 20px",
                  background:
                    data.data.length < limit ? "#eee" : "#0066cc",
                  color: data.data.length < limit ? "#999" : "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: data.data.length < limit ? "not-allowed" : "pointer",
                }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}