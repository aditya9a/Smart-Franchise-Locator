import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import api from "../../api/api";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    city: "",
    capital: "",
    landArea: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate(response.data.user.role === "investor" ? "/investor/dashboard" : "/brand/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="min-vh-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#f8fafc" }}
      >
        <div
          className="card shadow-lg border-0"
          style={{
            width: "100%",
            maxWidth: "540px",
            borderTop: "6px solid #0f766e"
          }}
        >
          <div className="card-body p-4 p-md-5">
            <h3 className="fw-bold text-center mb-1" style={{ color: "#0f766e" }}>
              Create Account
            </h3>
            <p className="text-center text-muted mb-4">
              Join and explore franchise opportunities
            </p>

            {error && (
              <div className="alert alert-danger py-2 small text-center mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {[
                ["name", "Full Name"],
                ["email", "Email"],
                ["password", "Password"]
              ].map(([name, label]) => (
                <div className="mb-3" key={name}>
                  <label className="form-label fw-semibold">{label}</label>
                  <input
                    type={name === "password" ? "password" : "text"}
                    name={name}
                    className="form-control form-control-lg"
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <div className="mb-3">
                <label className="form-label fw-semibold">Register as</label>
                <select
                  className="form-select form-select-lg"
                  name="role"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select role</option>
                  <option value="investor">Investor</option>
                  <option value="brand">Brand</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">City</label>
                <input
                  className="form-control form-control-lg"
                  name="city"
                  onChange={handleChange}
                  required
                />
              </div>

              {formData.role === "investor" && (
                <>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Capital (₹)
                    </label>
                    <input
                      className="form-control form-control-lg"
                      name="capital"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Land Area (sq ft)
                    </label>
                    <input
                      className="form-control form-control-lg"
                      name="landArea"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}

              <button
                className="btn btn-lg w-100 mt-3"
                style={{
                  backgroundColor: "#0f766e",
                  color: "white"
                }}
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}


