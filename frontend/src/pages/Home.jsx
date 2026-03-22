import Navbar from "../components/common/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Page animation wrapper */}

        {/* Hero Section */}
        <section
          className="py-5 text-center"
          style={{
            background: "linear-gradient(135deg, #0f766e, #14b8a6)",
            color: "#f8fafc"
          }}
        >
          <div className="container py-5">
            <h1 className="display-5 fw-bold">
              Smarter Way to Discover Franchise Opportunities
            </h1>
            <p className="lead mt-3" style={{ color: "#e6fffa" }}>
              Match your capital, land, and location with the right franchise
            </p>

            <div className="mt-4">
              <a href="/register" className="btn btn-light btn-lg me-3">
                Start Investing
              </a>
              <a href="/register" className="btn btn-outline-light btn-lg">
                For Brands
              </a>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-5" style={{ backgroundColor: "#f8fafc" }}>
          <div className="container">
            <h2 className="text-center fw-bold mb-5" style={{ color: "#0f172a" }}>
              How It Works
            </h2>

            <div className="row text-center">
              <div className="col-md-4 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h5 className="fw-bold" style={{ color: "#0f766e" }}>
                      Share Your Details
                    </h5>
                    <p className="text-muted">
                      Provide your capital, land area, and preferred city.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h5 className="fw-bold" style={{ color: "#0f766e" }}>
                      Discover Opportunities
                    </h5>
                    <p className="text-muted">
                      Find franchises that are not yet available in your area.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h5 className="fw-bold" style={{ color: "#0f766e" }}>
                      Partner & Invest
                    </h5>
                    <p className="text-muted">
                      Invest solo or partner with others — we guide the process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Is It For */}
        <section className="py-5">
          <div className="container">
            <h2 className="text-center fw-bold mb-5" style={{ color: "#0f172a" }}>
              Built For Everyone Involved
            </h2>

            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h4 className="fw-bold" style={{ color: "#0f766e" }}>
                      Investors
                    </h4>
                    <p className="text-muted mt-3">
                      Make informed franchise investments based on real constraints
                      like capital, land, and location.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h4 className="fw-bold" style={{ color: "#0f766e" }}>
                      Brands
                    </h4>
                    <p className="text-muted mt-3">
                      Expand efficiently by connecting with verified investors
                      in target regions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section
          className="py-5 text-center"
          style={{ backgroundColor: "#0f766e", color: "#f8fafc" }}
        >
          <div className="container">
            <h2 className="fw-bold mb-3">
              Start Your Franchise Journey Today
            </h2>
            <a href="/register" className="btn btn-light btn-lg">
              Get Started
            </a>
          </div>
        </section>

    </>
  );
}


