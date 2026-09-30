import { Link, useLocation } from "react-router-dom";
import {
  UserCheck,
  Scissors,
  ClipboardList,
  ShieldAlert,
  Sparkles,
  Calendar,
  Layers,
  Award,
  DollarSign,
  Clock,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "../css/Sidebar.css";

function Sidebar() {
  const location = useLocation();
  const { user, role } = useAuth();

  const navLinks = [
    {
      path: "/customer",
      label: "Customer Portal",
      role: "Customer",
      icon: UserCheck,
      badge: "VIP",
    },
    {
      path: "/barber",
      label: "Barber Station",
      role: "Barber",
      icon: Scissors,
      badge: "6 Today",
    },
    {
      path: "/receptionist",
      label: "Reception Desk",
      role: "Receptionist",
      icon: ClipboardList,
      badge: "Live",
    },
    {
      path: "/admin",
      label: "Admin Command",
      role: "Admin",
      icon: ShieldAlert,
      badge: "HQ",
    },
  ];

  return (
    <aside className="luxe-sidebar">
      {/* User Card Profile Summary */}
      <div className="sidebar-profile-card">
        <div className="avatar-wrapper">
          <img
            src={
              user?.avatar ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
            }
            alt={user?.name}
            className="sidebar-avatar"
          />
          <span className="status-indicator" />
        </div>
        <div className="sidebar-user-meta">
          <h4 className="user-name">{user?.name || "Guest User"}</h4>
          <span className="user-role-badge">
            <Sparkles size={11} />
            {role || "Customer"}
          </span>
        </div>
      </div>

      {/* Navigation Group */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">Portals & Views</div>
        <nav className="sidebar-nav">
          {navLinks.filter(item => item.role === role).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const isUserRole = role === item.role;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive ? "active" : ""} ${
                  isUserRole ? "current-role" : ""
                }`}
              >
                <div className="sidebar-link-content">
                  <Icon size={18} className="sidebar-link-icon" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`sidebar-badge ${
                      isActive ? "badge-active" : ""
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Salon Working Hours Widget */}
      <div className="sidebar-hours-card">
        <div className="hours-header">
          <Clock size={16} className="hours-icon" />
          <span className="hours-title">Salon Hours</span>
        </div>
        <div className="hours-status">
          <span className="pulse-dot" />
          <span>Open Now • 09:00 - 20:00</span>
        </div>
        <p className="hours-note">Walk-ins & Online bookings active</p>
      </div>
    </aside>
  );
}

export default Sidebar;