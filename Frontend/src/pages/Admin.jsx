import { useState, useEffect } from "react";
import {
  DollarSign,
  Calendar,
  Users,
  TrendingUp,
  Scissors,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Filter,
  Search,
  Package,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "../css/Admin.css";

const INITIAL_APPOINTMENTS = [
  {
    id: "APT-1001",
    customer: "Alex Mercer",
    barber: "Marcus Vance",
    service: "Premium Haircut & Styling",
    date: "2026-08-25",
    time: "10:30 AM",
    price: 35,
    status: "Confirmed",
  },
  {
    id: "APT-1002",
    customer: "Jessica Wilson",
    barber: "Sarah Chen",
    service: "Full Hair Coloring",
    date: "2026-08-25",
    time: "11:30 AM",
    price: 60,
    status: "Pending",
  },
  {
    id: "APT-1003",
    customer: "Ryan Thompson",
    barber: "David Park",
    service: "Royal Shave Treatment",
    date: "2026-08-25",
    time: "01:00 PM",
    price: 30,
    status: "Confirmed",
  },
  {
    id: "APT-1004",
    customer: "Sophia Loren",
    barber: "Sarah Chen",
    service: "Premium Organic Facial",
    date: "2026-08-25",
    time: "02:30 PM",
    price: 65,
    status: "Completed",
  },
  {
    id: "APT-1005",
    customer: "Michael Scott",
    barber: "Marcus Vance",
    service: "Classic Haircut",
    date: "2026-08-25",
    time: "04:00 PM",
    price: 20,
    status: "Pending",
  },
];

const STAFF_ROSTER = [
  { id: "1", name: "Marcus Vance", role: "Master Stylist", exp: "5 Yrs", commission: "30%", active: true, email: "marcus@salon.com" },
  { id: "2", name: "Sarah Chen", role: "Color & Spa Specialist", exp: "3 Yrs", commission: "25%", active: true, email: "sarah@salon.com" },
  { id: "3", name: "David Park", role: "Beard Artist", exp: "7 Yrs", commission: "35%", active: true, email: "david@salon.com" },
  { id: "4", name: "Emily Roberts", role: "Head Receptionist", exp: "4 Yrs", commission: "10%", active: true, email: "emily@salon.com" },
];

const INVENTORY_ITEMS = [
  { id: "1", name: "Moroccan Argan Hair Oil (100ml)", category: "Hair Care", stock: 28, minLevel: 10, price: 42, status: "In Stock" },
  { id: "2", name: "Botanical Beard Balm & Butter", category: "Beard Grooming", stock: 4, minLevel: 10, price: 24, status: "Low Stock" },
  { id: "3", name: "Organic Lavender Facial Scrub", category: "Spa Care", stock: 16, minLevel: 8, price: 38, status: "In Stock" },
  { id: "4", name: "Precision Stainless Razor Blades", category: "Barber Tools", stock: 2, minLevel: 15, price: 18, status: "Critical" },
];

function Admin() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("appointments");
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: newStatus } : apt
      )
    );
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = statusFilter === "All" || apt.status === statusFilter;
    const matchesSearch =
      apt.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.barber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="dashboard-container">
      {/* Top Banner */}
      <div className="dashboard-top-banner glass-card">
        <div className="banner-left">
          <span className="welcome-tag">EXECUTIVE COMMAND CENTER</span>
          <h1 className="serif-heading banner-title">
            Salon <span className="gold-gradient-text">Operations HQ</span>
          </h1>
          <p className="banner-sub">
            Real-time business performance, staff commissions, dispatch, and inventory analytics.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-gold">
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Monthly Gross</span>
            <span className="stat-value">$48,650</span>
            <span className="stat-trend" style={{ color: "var(--success)" }}>
              <TrendingUp size={12} /> +14.8% vs last mo
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-info">
            <Calendar size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Appointments</span>
            <span className="stat-value">342</span>
            <span className="stat-trend" style={{ color: "var(--success)" }}>
              <TrendingUp size={12} /> +8.2% booking rate
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-warning">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Active Staff</span>
            <span className="stat-value">6</span>
            <span className="stat-trend" style={{ color: "var(--gold-light)" }}>
              100% Chair Occupancy
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-success">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Retention Rate</span>
            <span className="stat-value">84.5%</span>
            <span className="stat-trend" style={{ color: "var(--success)" }}>
              VIP Repeat Clients
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-nav-tabs">
        <button
          onClick={() => setActiveTab("appointments")}
          className={`admin-tab-btn ${activeTab === "appointments" ? "active" : ""}`}
        >
          <Calendar size={16} />
          <span>Appointment Dispatch</span>
        </button>
        <button
          onClick={() => setActiveTab("staff")}
          className={`admin-tab-btn ${activeTab === "staff" ? "active" : ""}`}
        >
          <Users size={16} />
          <span>Staff & Commissions</span>
        </button>
        <button
          onClick={() => setActiveTab("inventory")}
          className={`admin-tab-btn ${activeTab === "inventory" ? "active" : ""}`}
        >
          <Package size={16} />
          <span>Inventory & Stock</span>
        </button>
      </div>

      {/* Tab 1: Appointments Table */}
      {activeTab === "appointments" && (
        <div className="customer-section-card glass-card">
          <div className="card-section-header">
            <div>
              <h3 className="serif-heading section-card-title">Live Appointment Dispatch</h3>
              <p className="section-card-sub">Manage, confirm, and complete appointments in real-time</p>
            </div>

            <div className="table-filter-bar">
              <div className="search-input-box">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search client, barber, service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input"
                  style={{ padding: "6px 12px 6px 34px", fontSize: "0.85rem", width: "240px" }}
                />
              </div>

              <div className="filter-chips">
                {["All", "Pending", "Confirmed", "Completed"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`filter-chip ${statusFilter === filter ? "active" : ""}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Master Stylist</th>
                  <th>Date & Time</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((apt) => (
                  <tr key={apt.id}>
                    <td>
                      <strong style={{ color: "#fff" }}>{apt.customer}</strong>
                    </td>
                    <td>{apt.service}</td>
                    <td>{apt.barber}</td>
                    <td>
                      {apt.date} • <span style={{ color: "var(--gold-light)" }}>{apt.time}</span>
                    </td>
                    <td style={{ fontWeight: 700, color: "var(--gold-light)" }}>${apt.price}</td>
                    <td>
                      <span
                        className={`badge ${apt.status === "Confirmed"
                          ? "badge-info"
                          : apt.status === "Completed"
                            ? "badge-success"
                            : "badge-warning"
                          }`}
                      >
                        {apt.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "6px" }}>
                        {apt.status === "Pending" && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, "Confirmed")}
                            className="btn btn-gold btn-sm"
                          >
                            Confirm
                          </button>
                        )}
                        {apt.status !== "Completed" && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, "Completed")}
                            className="btn btn-secondary btn-sm"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Staff Roster */}
      {activeTab === "staff" && (
        <div className="customer-section-card glass-card">
          <div className="card-section-header">
            <div>
              <h3 className="serif-heading section-card-title">Staff Roster & Commission Plans</h3>
              <p className="section-card-sub">Active stylists, experience tiers, and revenue sharing</p>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Staff Member</th>
                  <th>Role</th>
                  <th>Experience</th>
                  <th>Commission Rate</th>
                  <th>Contact Email</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
                {STAFF_ROSTER.map((staff) => (
                  <tr key={staff.id}>
                    <td style={{ fontWeight: 600, color: "#fff" }}>{staff.name}</td>
                    <td>{staff.role}</td>
                    <td>{staff.exp}</td>
                    <td>
                      <span className="badge badge-gold">{staff.commission}</span>
                    </td>
                    <td style={{ color: "var(--text-muted)" }}>{staff.email}</td>
                    <td>
                      <span className="badge badge-success">Active On-Duty</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Inventory */}
      {activeTab === "inventory" && (
        <div className="customer-section-card glass-card">
          <div className="card-section-header">
            <div>
              <h3 className="serif-heading section-card-title">Botanical Inventory & Supplies</h3>
              <p className="section-card-sub">Stock tracking for salon retail & backbar treatments</p>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Stock In Hand</th>
                  <th>Min Threshold</th>
                  <th>Retail Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {INVENTORY_ITEMS.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600, color: "#fff" }}>{item.name}</td>
                    <td>{item.category}</td>
                    <td>
                      <strong style={{ fontSize: "1.05rem" }}>{item.stock}</strong> units
                    </td>
                    <td>{item.minLevel} units</td>
                    <td style={{ color: "var(--gold-light)", fontWeight: 700 }}>${item.price}</td>
                    <td>
                      <span
                        className={`badge ${item.status === "In Stock"
                          ? "badge-success"
                          : item.status === "Low Stock"
                            ? "badge-warning"
                            : "badge-danger"
                          }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;