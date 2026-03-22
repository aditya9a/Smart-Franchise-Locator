import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import api from "../../api/api";

export default function AddFranchise() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        category: "Food & Beverage",
        investment: "",
        land: "",
        city: "",
        cities: "",
        description: "",
        roi: "",
        breakeven: "",
        royaltyFee: "",
        established: "",
        totalOutlets: "",
        term: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...formData,
                investment: Number(formData.investment),
                land: Number(formData.land),
                roi: Number(formData.roi),
                breakeven: Number(formData.breakeven),
                royaltyFee: Number(formData.royaltyFee),
                established: Number(formData.established),
                totalOutlets: Number(formData.totalOutlets),
                term: Number(formData.term),
                cities: formData.cities.split(',').map(s => s.trim())
            };
            await api.post("/franchises", payload);
            alert("Franchise listed successfully!");
            navigate("/brand/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to add franchise");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
            <Navbar />
            <div className="container py-5">
                <div className="card border-0 shadow-sm p-4 p-md-5">
                    <h2 className="fw-bold mb-4" style={{ color: "#0f766e" }}>List Your Franchise</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Franchise Name</label>
                                <input type="text" name="name" className="form-control" onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Brand/Company Name</label>
                                <input type="text" name="brand" className="form-control" onChange={handleChange} required />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Category</label>
                                <select name="category" className="form-select" onChange={handleChange}>
                                    <option>Food & Beverage</option>
                                    <option>Retail</option>
                                    <option>Services</option>
                                    <option>Fitness</option>
                                    <option>Education</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Total Investment (₹ Lakhs)</label>
                                <input type="number" name="investment" className="form-control" onChange={handleChange} required />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Land Required (sq ft)</label>
                                <input type="number" name="land" className="form-control" onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Primary City</label>
                                <input type="text" name="city" className="form-control" onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Target Cities (comma separated)</label>
                                <input type="text" name="cities" className="form-control" placeholder="Mumbai, Delhi, Pune" onChange={handleChange} required />
                            </div>
                            <div className="col-12">
                                <label className="form-label fw-semibold">Description</label>
                                <textarea name="description" className="form-control" rows="3" onChange={handleChange} required></textarea>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label fw-semibold">ROI (%)</label>
                                <input type="number" name="roi" className="form-control" onChange={handleChange} required />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label fw-semibold">Break-even (Months)</label>
                                <input type="number" name="breakeven" className="form-control" onChange={handleChange} required />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label fw-semibold">Royalty Fee (%)</label>
                                <input type="number" name="royaltyFee" className="form-control" onChange={handleChange} required />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label fw-semibold">Established (Year)</label>
                                <input type="number" name="established" className="form-control" onChange={handleChange} required />
                            </div>
                            <div className="col-12 mt-5">
                                <button className="btn btn-lg text-white px-5" style={{ backgroundColor: "#0f766e" }} disabled={loading}>
                                    {loading ? "Processing..." : "Submit Listing"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
