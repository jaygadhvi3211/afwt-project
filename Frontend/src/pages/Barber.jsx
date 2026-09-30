import { useState } from "react";
import {
  Scissors,
  Clock,
  User,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Play,
  Check,
  TrendingUp,
  Star,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "../css/Barber.css";

const BARBER_SCHEDULE = [
  {
    id: "APT-B1",
    customer: "Alex Mercer",
    service: "Premium Haircut & Styling",
    time: "10:00 AM",
    duration: "45 min",
    price: 35,
    notes: "Skin fade #1, textured crown",
    status: "Completed",
  },
  {
    id: "APT-B2",
    customer: "David Goggins",
    service: "Beard Sculpting & Trim",
    time: "11:15 AM",
    duration: "30 min",
    price: 25,
    notes: "Sharp cheek lines, hot towel",
    status: "In Chair",
  },
  {
    id: "APT-B3",
    customer: "Jonathan Rea",
    service: "Royal Shave Treatment",
    time: "01:00 PM",
    duration: "35 min",
    price: 30,
    notes: "Sensitive neck area",
    status: "Upcoming",
  },
  {
    id: "APT-B4",
    customer: "Carlos Sainz",
    service: "Full Haircut & Styling",
    time: "02:30 PM",
    duration: "45 min",
    price: 35,
    notes: "Executive taper cut",
    status: "Upcoming",
  },
  {
    id: "APT-B5",
    customer: "Robert Downey",
    service: "Deep Conditioning Hair Spa",
    time: "04:00 PM",
    duration: "50 min",
    price: 45,
    notes: "VIP guest, prefers botanical lavender oil",
    status: "Upcoming",
  },
];

function Barber() {
  const { user } = useAuth();
  const [schedule, setSchedule] = useState(BARBER_SCHEDULE);
  const [isAvailable, setIsAvailable] = useState(true);

  const updateStatus = (id, newStatus) => {
    setSchedule(
      schedule.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const totalEarningsToday = schedule
    .filter((s) => s.status === "Completed" || s.status === "In Chair")
    .reduce((acc, curr) => acc + curr.price * 0.35, 0);

  return (
    <div className="dashboard-container">
      {/* Top Banner */}
      <div className="dashboard-top-banner glass-card">
        <div className="banner-left">
          <span className="welcome-tag">BARBER & STYLIST WORKSTATION</span>
          <h1 className="serif-heading banner-title">
            Chair Station: <span className="gold-gradient-text">{user?.name || "Marcus Vance"}</span>
          </h1>
          <p className="banner-sub">
            Master Stylist • 35% Commission Rate • Chair #1
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => setIsAvailable(!isAvailable)}
            className={`btn ${isAvailable ? "btn-secondary" : "btn-gold"}`}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: isAvailable ? "var(--success)" : "var(--warning)",
                display: "inline-block",
              }}
            />
            <span>{isAvailable ? "Status: Active On Duty" : "Status: On Break"}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-gold">
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Daily Commission</span>
            <span className="stat-value">${totalEarningsToday.toFixed(0)}</span>
            <span className="stat-trend" style={{ color: "var(--success)" }}>
              <TrendingUp size={12} /> Projected: $145 today
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-info">
            <Scissors size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Today's Clients</span>
            <span className="stat-value">{schedule.length}</span>
            <span className="stat-trend" style={{ color: "var(--gold-light)" }}>
              2 Completed • 1 In Chair
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-warning">
            <Star size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Barber Rating</span>
            <span className="stat-value">4.95★</span>
            <span className="stat-trend" style={{ color: "var(--gold-light)" }}>
              Based on 140 Reviews
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-success">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Shift Timing</span>
            <span className="stat-value" style={{ fontSize: "1.3rem" }}>09:00 - 18:00</span>
            <span className="stat-trend" style={{ color: "var(--text-muted)" }}>
              Next Break: 03:00 PM
            </span>
          </div>
        </div>
      </div>

      {/* Queue & Schedule Timeline */}
      <div className="customer-section-card glass-card">
        <div className="card-section-header">
          <div>
            <h3 className="serif-heading section-card-title">Today's Appointment Queue</h3>
            <p className="section-card-sub">Chronological client schedule and chair controls</p>
          </div>
          <span className="badge badge-gold">{schedule.length} Bookings</span>
        </div>

        <div className="barber-timeline-list">
          {schedule.map((slot) => {
            const isInChair = slot.status === "In Chair";
            const isCompleted = slot.status === "Completed";

            return (
              <div
                key={slot.id}
                className={`barber-slot-card glass-panel ${isInChair ? "active-chair-slot" : ""
                  }`}
              >
                <div className="slot-time-box">
                  <span className="slot-time-text">{slot.time}</span>
                  <span className="slot-duration-text">{slot.duration}</span>
                </div>

                <div className="slot-client-info">
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <h4 className="serif-heading slot-client-name">{slot.customer}</h4>
                    <span
                      className={`badge ${isInChair
                          ? "badge-warning"
                          : isCompleted
                            ? "badge-success"
                            : "badge-info"
                        }`}
                    >
                      {slot.status}
                    </span>
                  </div>

                  <p className="slot-service-name">{slot.service}</p>
                  {slot.notes && (
                    <p className="slot-notes-text">
                      <strong>Client Note:</strong> "{slot.notes}"
                    </p>
                  )}
                </div>

                <div className="slot-price-actions">
                  <span className="slot-price-tag">${slot.price}.00</span>

                  <div className="slot-action-buttons">
                    {slot.status === "Upcoming" && (
                      <button
                        onClick={() => updateStatus(slot.id, "In Chair")}
                        className="btn btn-gold btn-sm"
                      >
                        <Play size={14} />
                        <span>Seat In Chair</span>
                      </button>
                    )}

                    {slot.status === "In Chair" && (
                      <button
                        onClick={() => updateStatus(slot.id, "Completed")}
                        className="btn btn-secondary btn-sm"
                        style={{ borderColor: "var(--success)", color: "var(--success)" }}
                      >
                        <Check size={14} />
                        <span>Complete Service</span>
                      </button>
                    )}

                    {slot.status === "Completed" && (
                      <span style={{ fontSize: "0.8rem", color: "var(--success)", display: "flex", alignItems: "center", gap: "4px" }}>
                        <CheckCircle2 size={16} /> Finished
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Barber;