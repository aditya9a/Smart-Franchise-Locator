import Navbar from "../../components/common/Navbar";
import FranchiseMap from "../../components/map/FranchiseMap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApplications } from "../../utils/applications";
import api from "../../api/api";


export default function InvestorDashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [franchises, setFranchises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          navigate("/login");
          return;
        }
        const [appsRes, franchisesRes] = await Promise.all([
          api.get(`/applications?investorId=${user.id}`),
          api.get("/franchises")
        ]);
        setApplications(appsRes.data);
        setFranchises(franchisesRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);



  return (
    <>
      <Navbar />

      <div className="container py-5">

        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold" style={{ color: "#0f172a" }}>
            Investor Dashboard
          </h2>
          <p className="text-muted">
            Overview of your franchise opportunities and activity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="row mb-5">
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm border-0 h-100 p-2">
              <div className="card-body">
                <h6 className="text-muted small">Available Opportunities</h6>
                <h3 className="fw-bold" style={{ color: "#0f766e" }}>
                  {franchises.length}
                </h3>
              </div>
            </div>
          </div>
          <h4 className="fw-bold mb-3" style={{ color: "#0f172a" }}>
            Franchise Opportunities Map
          </h4>

          <div className="card shadow-sm border-0 p-3 mb-5">
            <FranchiseMap opportunities={franchises} />
          </div>


          <div className="col-md-3 mb-4">
            <div className="card shadow-sm border-0 h-100 p-2">
              <div className="card-body">
                <h6 className="text-muted small">Active Applications</h6>
                <h3 className="fw-bold" style={{ color: "#0f766e" }}>
                  {applications.length}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow-sm border-0 h-100 p-2 d-flex flex-column" onClick={() => navigate("/investor/partners")} style={{ cursor: "pointer" }}>
              <div className="card-body d-flex flex-column">
                <h6 className="text-muted small mb-3">Potential Partners</h6>
                <button className="btn text-white fw-bold mt-auto w-100 py-2 shadow-sm" style={{ backgroundColor: "#0f766e" }}>
                  Connect
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow-sm border-0 h-100 p-2 d-flex flex-column" onClick={() => navigate("/investor/franchises")} style={{ cursor: "pointer" }}>
              <div className="card-body d-flex flex-column">
                <h6 className="text-muted small mb-3">AI Recommendations</h6>
                <button className="btn text-white fw-bold mt-auto w-100 py-2 shadow-sm" style={{ backgroundColor: "#0f766e" }}>
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>
        <h4 className="fw-bold mb-3">Your Applications</h4>

        <div className="card border-0 shadow-sm p-3 mb-5">
          {applications.length === 0 ? (
            <p className="text-muted mb-0">
              You have not applied for any franchises yet.
            </p>
          ) : (
            applications.map((app) => (
              <div
                key={app.id}
                className="d-flex justify-content-between align-items-center border-bottom py-2"
              >
                <div>
                  <strong>{app.name}</strong>
                  <br />
                  <small className="text-muted">
                    Applied on {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "N/A"}
                  </small>
                </div>

                <span className="badge bg-warning text-dark">
                  {app.status}
                </span>
              </div>
            ))
          )}
        </div>


        {/* Quick Actions */}
        <div>
          <h4 className="fw-bold mb-3" style={{ color: "#0f172a" }}>
            Quick Actions
          </h4>

          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h5 className="fw-bold" style={{ color: "#0f766e" }}>
                    Explore Franchises
                  </h5>
                  <p className="text-muted mt-2">
                    View franchise opportunities not available in your city.
                  </p>
                  <button
                    className="btn btn-outline-teal mt-3"
                    onClick={() => navigate("/investor/franchises")}
                  >
                    View Opportunities
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h5 className="fw-bold" style={{ color: "#0f766e" }}>
                    Find Investment Partners
                  </h5>
                  <p className="text-muted mt-2">
                    Partner with others to combine capital and land.
                  </p>
                  <button
                    className="btn btn-outline-teal mt-3"
                    onClick={() => navigate("/investor/partners")}
                  >
                    Find Partners
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h5 className="fw-bold" style={{ color: "#0f766e" }}>
                    Ask AI Advisor
                  </h5>
                  <p className="text-muted mt-2">
                    Get franchise recommendations based on your inputs.
                  </p>
                  <button
                    className="btn btn-outline-teal mt-3"
                    onClick={() => navigate("/investor/ai-advisor")}
                  >
                    Get Advice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
