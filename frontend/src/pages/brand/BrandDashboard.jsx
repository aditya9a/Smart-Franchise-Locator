import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import api from "../../api/api";

export default function BrandDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        window.location.href = "/login";
        return;
      }
      const response = await api.get('/applications');
      setApplications(response.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleUpdate = async (id, status) => {
    try {
      await api.patch(`/applications/${id}`, { status });
      fetchApplications();
    } catch (err) {
      console.error("Error updating application:", err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">Brand Dashboard</h2>
            <p className="text-muted mb-0">Review and manage franchise applications</p>
          </div>
          <button
            className="btn text-white px-4 shadow-sm"
            style={{ backgroundColor: "#0f766e" }}
            onClick={() => window.location.href = '/brand/add-franchise'}
          >
            + Add New Franchise
          </button>
        </div>

        <div className="card border-0 shadow-sm p-4">
          {applications.length === 0 ? (
            <p className="text-muted mb-0">
              No applications received yet.
            </p>
          ) : (
            applications.map((app) => (
              <div
                key={app._id}
                className="d-flex justify-content-between align-items-center border-bottom py-3"
              >
                <div>
                  <strong>{app.franchiseName || app.name}</strong>
                  <br />
                  <small className="text-muted">
                    Applied on{" "}
                    {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "N/A"}
                  </small>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <span
                    className={`badge ${app.status === "Approved"
                      ? "bg-success"
                      : app.status === "Rejected"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                      }`}
                  >
                    {app.status}
                  </span>

                  {app.status === "Pending" && (
                    <>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          handleUpdate(app._id, "Approved")
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          handleUpdate(app._id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
