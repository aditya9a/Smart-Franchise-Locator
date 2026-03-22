import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg border-bottom sticky-top bg-white">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center me-2"
            style={{ width: "32px", height: "32px", backgroundColor: "#0f766e" }}
          >
            <i className="bi bi-rocket-takeoff text-white x-small"></i>
          </div>
          <span className="fw-bold" style={{ color: "#0f172a", letterSpacing: "-0.5px" }}>Franchise<span style={{ color: "#0f766e" }}>Locator</span></span>
        </Link>
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3" to={user.role === 'investor' ? "/investor/dashboard" : "/brand/dashboard"}>Dashboard</Link>
                </li>
                {user.role === 'investor' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link px-3" to="/investor/franchises">Explore</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link px-3" to="/investor/partners">Partners</Link>
                    </li>
                  </>
                )}
                <li className="nav-item ms-lg-3">
                  <div className="dropdown">
                    <button className="btn btn-sm d-flex align-items-center gap-2 rounded-pill px-3 border shadow-sm" type="button" data-bs-toggle="dropdown">
                      <div className="rounded-circle bg-teal-soft" style={{ width: "20px", height: "20px" }}>
                        <i className="bi bi-person text-teal x-small"></i>
                      </div>
                      <span className="small fw-semibold">{user.name?.split(' ')[0] || "User"}</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2">
                      <li><Link className="dropdown-item small" to="/profile">My Profile</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><button className="dropdown-item small text-danger" onClick={handleLogout}>Logout</button></li>
                    </ul>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/login">Login</Link>
                </li>
                <li className="nav-item ms-lg-2">
                  <Link className="btn btn-teal btn-sm rounded-pill px-4 shadow-sm" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
