import InvestorDashboard from "./pages/investor/InvestorDashboard";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRef } from "react";
import FranchiseDetails from "./pages/investor/FranchiseDetails";


import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import FranchiseList from "./pages/investor/FranchiseList";
import PartnerList from "./pages/investor/PartnerList";
import BrandDashboard from "./pages/brand/BrandDashboard";
import AddFranchise from "./pages/brand/AddFranchise";
import Profile from "./pages/common/Profile";
import AIAdvisor from "./pages/investor/AIAdvisor";

function AnimatedRoutes() {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <TransitionGroup className="route-wrapper">
      <CSSTransition
        key={location.pathname}
        nodeRef={nodeRef}
        classNames="route"
        timeout={400}
        unmountOnExit
      >
        <div ref={nodeRef} className="route-page">
          <Routes location={location}>
            <Route path="/investor/dashboard" element={<InvestorDashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/investor/franchises" element={<FranchiseList />} />
            <Route path="/investor/franchise/:id" element={<FranchiseDetails />} />
            <Route path="/investor/partners" element={<PartnerList />} />
            <Route path="/brand/dashboard" element={<BrandDashboard />} />
            <Route path="/brand/add-franchise" element={<AddFranchise />} />
            <Route path="/investor/ai-advisor" element={<AIAdvisor />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
