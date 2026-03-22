import { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import api from "../../api/api";

export default function Profile() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [formData, setFormData] = useState({
        name: user?.name || "",
        city: user?.city || "",
        capital: user?.capital || 0,
        landArea: user?.landArea || 0
    });
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.patch("/auth/profile", formData);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            setUser(response.data.user);
            setMessage({ type: "success", text: "Profile updated successfully!" });
        } catch (err) {
            setMessage({ type: "danger", text: "Failed to update profile" });
        }
    };

    return (
        <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card border-0 shadow-sm p-4 p-md-5">
                            <h2 className="fw-bold mb-4" style={{ color: "#0f766e" }}>User Profile</h2>

                            {message.text && (
                                <div className={`alert alert-${message.type} mb-4`}>
                                    {message.text}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            className="form-control"
                                            value={formData.city}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Investment Budget (₹ Lakhs)</label>
                                        <input
                                            type="number"
                                            name="capital"
                                            className="form-control"
                                            value={formData.capital}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Land Area Available (sq ft)</label>
                                        <input
                                            type="number"
                                            name="landArea"
                                            className="form-control"
                                            value={formData.landArea}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-12 mt-5">
                                        <button className="btn btn-lg text-white px-5" style={{ backgroundColor: "#0f766e" }}>
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
