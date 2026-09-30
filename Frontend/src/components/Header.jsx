import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Scissors, Calendar, User, LogOut, Menu, X, Shield, Sparkles, ChevronDown } from "lucide-react";
import { useAuth, DEMO_ACCOUNTS } from "../context/AuthContext";
import BookingModal from "./BookingModal";
import "../css/Header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, logout, switchDemoRole, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSwitchRole = (roleKey) => {
    switchDemoRole(roleKey);
    setIsRoleDropdownOpen(false);
    // Navigate to role's dashboard
    if (roleKey === "Admin") navigate("/admin");
    else if (roleKey === "Barber") navigate("/barber");
    else if (roleKey === "Receptionist") navigate("/receptionist");
    else if (roleKey === "Customer") navigate("/customer");
  };

  const getDashboardPath = () => {
    if (role === "Admin") return "/admin";
    if (role === "Barber") return "/barber";
    if (role === "Receptionist") return "/receptionist";
    return "/customer";
  };

  return (
    <>
      <header className="luxe-header">
        <div className="header-inner">
          {/* Logo */}
          <Link to="/home" className="brand-logo">
            <div className="brand-icon-box">
              <Scissors size={20} className="brand-icon" />
            </div>
            <div className="brand-text-wrapper">
              <span className="brand-title serif-heading">LUXE SALON</span>
              <span className="brand-sub">HAIR & SPA RETREAT</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <Link to="/home" className={`nav-link ${location.pathname === "/home" ? "active" : ""}`}>
              Home
            </Link>
            <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}>
              About
            </Link>
            <Link to="/contact" className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}>
              Contact
            </Link>
            <Link to={getDashboardPath()} className={`nav-link ${["/admin", "/barber", "/receptionist", "/customer"].includes(location.pathname) ? "active" : ""}`}>
              Dashboard
            </Link>
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            {/* Quick Book Appointment */}
            <button
              onClick={() => setIsBookingOpen(true)}
              className="btn btn-gold btn-sm book-cta"
            >
              <Calendar size={16} />
              <span>Book Service</span>
            </button>



            {/* User Profile / Logout */}
            <div className="user-profile-badge">
              <img
                src={
                  user?.avatar ||
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                }
                alt={user?.name || "User"}
                className="user-avatar"
              />
              <button
                onClick={handleLogout}
                className="btn-logout"
                title="Sign out"
              >
                <LogOut size={16} />
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-toggle"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <Link to="/home" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <Link to={getDashboardPath()} onClick={() => setIsMenuOpen(false)}>
              My Dashboard ({role})
            </Link>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsBookingOpen(true);
              }}
              className="btn btn-gold"
              style={{ width: "100%", marginTop: "10px" }}
            >
              Book Service
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-danger"
              style={{ width: "100%", marginTop: "6px" }}
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}

export default Header;