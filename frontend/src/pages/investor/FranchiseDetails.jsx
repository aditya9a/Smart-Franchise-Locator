import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import api from "../../api/api";
import { calculateMatchScore, getScoreColor } from "../../utils/matchScore";

export default function FranchiseDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [franchise, setFranchise] = useState(null);
    const [loading, setLoading] = useState(true);
    const [calcInvestment, setCalcInvestment] = useState(0);

    useEffect(() => {
        const fetchFranchise = async () => {
            try {
                const response = await api.get(`/franchises/${id}`);
                setFranchise(response.data);
                setCalcInvestment(response.data.investment);
            } catch (err) {
                console.error("Error fetching franchise details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFranchise();
    }, [id]);

    const handleApply = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) {
                alert("Please login to apply");
                navigate("/login");
                return;
            }
            await api.post("/applications", {
                franchiseId: franchise._id,
                franchiseName: franchise.name,
                investorId: user.id,
                investorName: user.name
            });
            alert("Application submitted successfully!");
            navigate("/investor/dashboard");
        } catch (err) {
            console.error("Error submitting application:", err);
            alert("Failed to submit application");
        }
    };

    if (!franchise) {
        return (
            <>
                <Navbar />
                <div className="container py-5">
                    <h4>Franchise not found</h4>
                </div>
            </>
        );
    }

    return (
        <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
            <Navbar />

            {/* Hero Section */}
            <div
                className="py-5 mb-5 shadow-sm"
                style={{
                    background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                    color: "white"
                }}
            >
                <div className="container py-4">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <span className="badge bg-light text-dark mb-2 px-3 py-2 rounded-pill shadow-sm">
                                {franchise.category} Franchise
                            </span>
                            <div className="d-flex align-items-center gap-3">
                                <h1 className="display-4 fw-bold mt-2 mb-0">{franchise.name}</h1>
                                {JSON.parse(localStorage.getItem("user"))?.role === 'investor' && (
                                    <span
                                        className="badge mt-2 px-3 py-2 rounded-pill shadow-sm"
                                        style={{
                                            backgroundColor: "rgba(255,255,255,0.2)",
                                            border: `1px solid ${getScoreColor(calculateMatchScore(JSON.parse(localStorage.getItem("user")), franchise))}`
                                        }}
                                    >
                                        AI Match: {calculateMatchScore(JSON.parse(localStorage.getItem("user")), franchise)}%
                                    </span>
                                )}
                            </div>
                            <p className="lead opacity-75 mt-3" style={{ maxWidth: "600px" }}>
                                {franchise.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container pb-5">
                <div className="row">
                    {/* Main Content */}
                    <div className="col-lg-8">
                        {/* Key Metrics Grid */}
                        <div className="row g-3 mb-4">
                            <div className="col-md-4">
                                <div className="card border-0 shadow-sm text-center p-3 h-100">
                                    <div className="text-muted small mb-1">Total Investment</div>
                                    <div className="h4 fw-bold mb-0" style={{ color: "#0f766e" }}>
                                        ₹{franchise.investment} L
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card border-0 shadow-sm text-center p-3 h-100">
                                    <div className="text-muted small mb-1">Expected ROI</div>
                                    <div className="h4 fw-bold mb-0" style={{ color: "#0f766e" }}>
                                        {franchise.roi}%
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card border-0 shadow-sm text-center p-3 h-100">
                                    <div className="text-muted small mb-1">Break-even</div>
                                    <div className="h4 fw-bold mb-0" style={{ color: "#0f766e" }}>
                                        {franchise.breakeven} Mo
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Breakdown */}
                        <div className="card border-0 shadow-sm p-4 mb-4">
                            <h5 className="fw-bold mb-4" style={{ color: "#0f172a" }}>Financial & Operational Details</h5>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <div className="text-muted small">Royalty Fee</div>
                                        <div className="fw-semibold">{franchise.royaltyFee}% per month</div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="text-muted small">Agreement Term</div>
                                        <div className="fw-semibold">{franchise.term} Years</div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="text-muted small">Land Required</div>
                                        <div className="fw-semibold">{franchise.land} sq ft</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <div className="text-muted small">Established</div>
                                        <div className="fw-semibold">Year {franchise.established}</div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="text-muted small">Total Outlets</div>
                                        <div className="fw-semibold">{franchise.totalOutlets}+ Nationwide</div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="text-muted small">Target Cities</div>
                                        <div className="fw-semibold">{franchise.cities.join(", ")}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ROI Calculator Placeholder */}
                        <div className="card border-0 shadow-sm p-4 mb-4">
                            <h5 className="fw-bold mb-3" style={{ color: "#0f172a" }}>Potential ROI Calculator</h5>
                            <div className="row align-items-center">
                                <div className="col-md-7">
                                    <label className="form-label small text-muted">Adjust Investment Amount (₹ {calcInvestment} L)</label>
                                    <input
                                        type="range"
                                        className="form-range custom-range"
                                        min={franchise.investment}
                                        max={franchise.investment * 3}
                                        step="5"
                                        value={calcInvestment}
                                        onChange={(e) => setCalcInvestment(Number(e.target.value))}
                                    />
                                    <div className="d-flex justify-content-between x-small text-muted mt-1">
                                        <span>Min: ₹{franchise.investment}L</span>
                                        <span>Max: ₹{franchise.investment * 3}L</span>
                                    </div>
                                </div>
                                <div className="col-md-5 text-center bg-light rounded p-3 mt-3 mt-md-0">
                                    <div className="small text-muted mb-1">Estimated Annual Profit</div>
                                    <div className="h4 fw-bold text-success mb-0">
                                        ₹{((calcInvestment * franchise.roi) / 100).toFixed(2)} L
                                    </div>
                                    <div className="x-small text-muted">Based on {franchise.roi}% ROI</div>
                                </div>
                            </div>
                        </div>

                        {/* Requirements Section */}
                        <div className="card border-0 shadow-sm p-4 h-100">
                            <h5 className="fw-bold mb-3" style={{ color: "#0f172a" }}>Expansion Strategy</h5>
                            <p className="text-muted">
                                {franchise.name} is looking to expand in prime commercial locations within {franchise.cities[0]} and neighboring regions. We offer full training, supply chain support, and marketing assistance to our franchise partners.
                            </p>
                            <ul className="list-group list-group-flush mt-2">
                                <li className="list-group-item bg-transparent px-0 py-2 border-0">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    Full Training & Operational Manuals
                                </li>
                                <li className="list-group-item bg-transparent px-0 py-2 border-0">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    Site Selection & Interior Design Support
                                </li>
                                <li className="list-group-item bg-transparent px-0 py-2 border-0">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    Integrated Marketing & POS Systems
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Sticky Application Sidebar */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-lg p-4 sticky-top" style={{ top: "100px", zIndex: 10 }}>
                            <h5 className="fw-bold mb-3">Begin Your Journey</h5>
                            <p className="text-muted small mb-4">
                                Fill out your application to schedule a 1-on-1 meeting with the {franchise.name} brand representative.
                            </p>

                            <button
                                className="btn btn-lg w-100 text-white mb-3"
                                style={{
                                    backgroundColor: "#0f766e",
                                    boxShadow: "0 4px 14px rgba(15, 118, 110, 0.4)"
                                }}
                                onClick={handleApply}
                            >
                                Apply Now
                            </button>

                            <button
                                className="btn btn-outline-secondary w-100"
                                onClick={() => navigate(-1)}
                            >
                                ← Back to Listings
                            </button>

                            <div className="mt-3 text-center">
                                <p className="x-small text-muted mb-2">Short on capital? Join a pool instead.</p>
                                <button
                                    className="btn btn-sm btn-outline-teal w-100 rounded-pill"
                                    style={{ color: "#0f766e", borderColor: "#0f766e" }}
                                    onClick={() => navigate("/investor/partners")}
                                >
                                    Look for Co-investors
                                </button>
                            </div>

                            <div className="mt-4 pt-3 border-top text-center">
                                <span className="text-muted small">
                                    Verified Franchise Opportunity <i className="bi bi-patch-check-fill text-primary ms-1"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
