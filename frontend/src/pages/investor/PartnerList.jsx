import { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import api from "../../api/api";

export default function PartnerList() {
    const [pools, setPools] = useState([]);
    const [franchises, setFranchises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFranchise, setSelectedFranchise] = useState("All");
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newPool, setNewPool] = useState({ franchiseId: "", targetCapital: "", city: "" });

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [poolsRes, franchisesRes] = await Promise.all([
                    api.get('/pools'),
                    api.get('/franchises')
                ]);
                setPools(poolsRes.data);
                setFranchises(franchisesRes.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleJoin = async (poolId) => {
        if (!user) return alert("Please login to join a pool");
        const amount = prompt("Enter investment amount (in Lakhs):", "5");
        if (amount && !isNaN(amount)) {
            try {
                const response = await api.post('/pools/join', { poolId, amount: Number(amount) });
                const updatedPool = response.data;
                setPools(pools.map(p => p._id === poolId ? updatedPool : p));
                alert("Successfully joined the pool!");
            } catch (err) {
                alert("Failed to join pool");
            }
        }
    };

    const handleCreatePool = async (e) => {
        e.preventDefault();
        if (!user) return alert("Please login to start a pool");

        const selectedFran = franchises.find(f => f._id === newPool.franchiseId);

        try {
            const response = await api.post('/pools', {
                ...newPool,
                franchiseName: selectedFran.name,
                creatorId: user.id,
                creatorName: user.name,
                currentCapital: 0,
                membersCount: 1,
                status: "Active"
            });
            setPools([response.data, ...pools]);
            setShowCreateForm(false);
            setNewPool({ franchiseId: "", targetCapital: "", city: "" });
            alert("New pool started successfully!");
        } catch (err) {
            alert("Failed to start pool");
        }
    };

    const filteredPools = pools.filter(pool =>
        selectedFranchise === "All" || pool.franchiseName === selectedFranchise
    );

    const uniqueFranchises = ["All", ...new Set(pools.map(p => p.franchiseName))];

    if (loading) return (
        <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
            <Navbar />
            <div className="container py-5 text-center">
                <div className="spinner-border text-teal" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
            <Navbar />

            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold" style={{ color: "#0f172a" }}>Co-Investment Pools</h2>
                        <p className="text-muted">Partner with other investors to share capital and risks.</p>
                    </div>
                    <button
                        className="btn text-white px-4"
                        style={{ backgroundColor: "#0f766e" }}
                        onClick={() => setShowCreateForm(!showCreateForm)}
                    >
                        {showCreateForm ? "Cancel" : "Start a New Pool"}
                    </button>
                </div>

                {/* Create Pool Form */}
                {showCreateForm && (
                    <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderLeft: "4px solid #0f766e" }}>
                        <h5 className="fw-bold mb-3">Start a Co-Investment Pool</h5>
                        <form onSubmit={handleCreatePool} className="row g-3">
                            <div className="col-md-4">
                                <label className="form-label small fw-semibold">Select Franchise</label>
                                <select
                                    className="form-select"
                                    required
                                    value={newPool.franchiseId}
                                    onChange={(e) => setNewPool({ ...newPool, franchiseId: e.target.value })}
                                >
                                    <option value="">Choose one...</option>
                                    {franchises.map(f => (
                                        <option key={f._id} value={f._id}>{f.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label small fw-semibold">Target Capital (₹ Lakhs)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    required
                                    value={newPool.targetCapital}
                                    onChange={(e) => setNewPool({ ...newPool, targetCapital: e.target.value })}
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label small fw-semibold">City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    value={newPool.city}
                                    onChange={(e) => setNewPool({ ...newPool, city: e.target.value })}
                                />
                            </div>
                            <div className="col-md-2 d-flex align-items-end">
                                <button type="submit" className="btn text-white w-100" style={{ backgroundColor: "#0f766e" }}>
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Filters */}
                <div className="card border-0 shadow-sm p-3 mb-4">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <label className="fw-semibold small text-muted">Filter by Franchise</label>
                            <select
                                className="form-select"
                                value={selectedFranchise}
                                onChange={(e) => setSelectedFranchise(e.target.value)}
                            >
                                {uniqueFranchises.map(name => (
                                    <option key={name} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {filteredPools.map(pool => {
                        const progress = (pool.currentCapital / pool.targetCapital) * 100;
                        return (
                            <div className="col-md-6 col-lg-4 mb-4" key={pool._id}>
                                <div className="card border-0 shadow-sm h-100 overflow-hidden">
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <h5 className="fw-bold mb-0" style={{ color: "#0f766e" }}>{pool.franchiseName}</h5>
                                                <small className="text-muted"><i className="bi bi-geo-alt me-1"></i>{pool.city}</small>
                                            </div>
                                            <span className="badge bg-success-soft text-success border border-success-subtle">
                                                {pool.status}
                                            </span>
                                        </div>

                                        <div className="mb-4">
                                            <div className="d-flex justify-content-between x-small text-muted mb-1">
                                                <span>Raised: ₹{pool.currentCapital}L / ₹{pool.targetCapital}L</span>
                                                <span>{Math.round(progress)}%</span>
                                            </div>
                                            <div className="progress" style={{ height: "8px", borderRadius: "10px" }}>
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{ width: `${progress}%`, backgroundColor: "#14b8a6" }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="row g-2 mb-4 text-center">
                                            <div className="col-6">
                                                <div className="p-2 bg-light rounded shadow-sm">
                                                    <div className="x-small text-muted">Partners</div>
                                                    <div className="fw-bold">{pool.membersCount}</div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="p-2 bg-light rounded shadow-sm">
                                                    <div className="x-small text-muted">Leader</div>
                                                    <div className="fw-bold text-truncate">{pool.creatorName?.split(' ')[0] || "User"}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            className="btn w-100 fw-semibold"
                                            style={{
                                                backgroundColor: "#0f766e",
                                                color: "white",
                                                boxShadow: "0 4px 12px rgba(15, 118, 110, 0.2)"
                                            }}
                                            onClick={() => handleJoin(pool._id)}
                                        >
                                            Join this Pool
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {filteredPools.length === 0 && (
                        <div className="col-12 text-center py-5">
                            <p className="text-muted">No active pools found for this selection.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
