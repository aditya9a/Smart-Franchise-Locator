import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import api from "../../api/api";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate(response.data.user.role === "investor" ? "/investor/dashboard" : "/brand/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
            maxWidth: "460px",
            borderTop: "6px solid #0f766e"
          }}
        >
          <div className="card-body p-4 p-md-5">
            <h3 className="fw-bold text-center mb-1" style={{ color: "#0f766e" }}>
              Welcome Back
            </h3>
            <p className="text-center text-muted mb-4">
              Login to your account
            </p>

            {error && (
              <div className="alert alert-danger py-2 small text-center mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-lg"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-lg"
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                className="btn btn-lg w-100 mt-3"
                style={{
                  backgroundColor: "#0f766e",
                  color: "white"
                }}
              >
                Login
              </button>
            </form>

            <p className="text-center mt-4 text-muted">
              Don’t have an account?{" "}
              <a href="/register" style={{ color: "#0f766e" }}>
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}


