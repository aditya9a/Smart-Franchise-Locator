import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { calculateMatchScore, getScoreColor } from "../../utils/matchScore";

export default function FranchiseList() {
  const navigate = useNavigate();
  const [franchises, setFranchises] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(true);
  const [maxBudget, setMaxBudget] = useState(50);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchFranchises = async () => {
      try {
        const response = await api.get('/franchises');
        setFranchises(response.data);
      } catch (err) {
        console.error("Error fetching franchises:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFranchises();
  }, []);

  const filteredFranchises = franchises.filter((item) => {
    const budgetMatch = item.investment <= maxBudget;
    const categoryMatch =
      category === "All" || item.category === category;
    return budgetMatch && categoryMatch;
  });

  return (
    <>
      <Navbar />

      <div className="container py-5">
        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold" style={{ color: "#0f172a" }}>
            Franchise Opportunities
          </h2>
          <p className="text-muted">
            Browse and filter franchise opportunities based on your preferences
          </p>
        </div>

        {/* Filters */}
        <div className="card border-0 shadow-sm p-3 mb-4">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <label className="fw-semibold">
                Maximum Investment (₹ {maxBudget}L)
              </label>
              <input
                type="range"
                className="form-range"
                min="10"
                max="100"
                step="5"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
              />
            </div>

            <div className="col-md-4">
              <label className="fw-semibold">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>All</option>
                <option>Food</option>
                <option>Clothing</option>
                <option>Fitness</option>
              </select>
            </div>
          </div>
        </div>

        {/* Franchise Cards */}
        <div className="row">
          {filteredFranchises.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="fw-bold mb-0" style={{ color: "#0f766e" }}>
                      {item.name}
                    </h5>
                    {user?.role === 'investor' && (
                      <div
                        className="badge text-white"
                        style={{ backgroundColor: getScoreColor(calculateMatchScore(user, item)) }}
                        title="AI Match Score"
                      >
                        {calculateMatchScore(user, item)}% Match
                      </div>
                    )}
                  </div>
                  <p className="text-muted mb-2">
                    Category: {item.category}
                  </p>

                  <p className="mb-1">
                    💰 Investment: ₹{item.investment} L
                  </p>
                  <p className="mb-1">
                    📐 Land Required: {item.land} sq ft
                  </p>
                  <p className="mb-3">
                    📍 City: {item.city}
                  </p>

                  <button
                    className="btn w-100"
                    style={{
                      borderColor: "#0f766e",
                      color: "#0f766e"
                    }}
                    onClick={() => navigate(`/investor/franchise/${item._id || item.id}`)}
                  >
                    View Details
                  </button>

                </div>
              </div>
            </div>
          ))}

          {filteredFranchises.length === 0 && (
            <p className="text-muted text-center">
              No franchises match your filters.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
