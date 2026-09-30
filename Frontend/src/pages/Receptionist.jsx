import { useState } from "react";
import {
  ClipboardList,
  UserPlus,
  Search,
  CheckCircle2,
  Clock,
  Scissors,
  Users,
  Calendar,
  Sparkles,
  Printer,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import BookingModal from "../components/BookingModal";
import "../css/Receptionist.css";

const CHAIR_STATUSES = [
  { id: "1", barber: "Marcus Vance", chair: "Station #1", status: "In Service", client: "Alex Mercer", service: "Premium Haircut", endsAt: "11:15 AM", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
  { id: "2", barber: "Sarah Chen", chair: "Station #2", status: "Available", client: null, service: null, endsAt: "Ready", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" },
  { id: "3", barber: "David Park", chair: "Station #3", status: "In Service", client: "Ryan Thompson", service: "Royal Shave", endsAt: "12:00 PM", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
];

const DISPATCH_LIST = [
  { id: "DISP-1", client: "Alex Mercer", phone: "9876543215", barber: "Marcus Vance", service: "Premium Haircut", time: "10:30 AM", status: "In Chair" },
  { id: "DISP-2", client: "Jessica Wilson", phone: "9876543216", barber: "Sarah Chen", service: "Full Hair Coloring", time: "11:30 AM", status: "Checked In" },
  { id: "DISP-3", client: "Ryan Thompson", phone: "9876543217", barber: "David Park", service: "Royal Shave", time: "01:00 PM", status: "Confirmed" },
  { id: "DISP-4", client: "Emily Davis", phone: "9876543220", barber: "Sarah Chen", service: "Premium Organic Facial", time: "02:30 PM", status: "Confirmed" },
];

function Receptionist() {
  const { user } = useAuth();
  const [dispatch, setDispatch] = useState(DISPATCH_LIST);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleCheckIn = (id) => {
    setDispatch(
      dispatch.map((item) =>
        item.id === id ? { ...item, status: "In Chair" } : item
      )
    );
  };

  const filteredDispatch = dispatch.filter(
    (d) =>
      d.client.toLowerCase().includes(search.toLowerCase()) ||
      d.service.toLowerCase().includes(search.toLowerCase()) ||
      d.barber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      {/* Top Banner */}
      <div className="dashboard-top-banner glass-card">
        <div className="banner-left">
          <span className="welcome-tag">FRONT DESK & DISPATCH CONCIERGE</span>
          <h1 className="serif-heading banner-title">
            Reception <span className="gold-gradient-text">Command Center</span>
          </h1>
          <p className="banner-sub">
            Guest check-ins, walk-in reservations, chair allocation, and billing receipt printout.
          </p>
        </div>

        <button
          onClick={() => setIsBookingOpen(true)}
          className="btn btn-gold btn-lg"
        >
          <UserPlus size={18} />
          <span>Walk-In Quick Register</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-gold">
            <ClipboardList size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Today's Bookings</span>
            <span className="stat-value">28</span>
            <span className="stat-trend" style={{ color: "var(--gold-light)" }}>
              4 Walk-in guests
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-success">
            <Scissors size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Chair Availability</span>
            <span className="stat-value">1 / 3 Free</span>
            <span className="stat-trend" style={{ color: "var(--success)" }}>
              Station #2 Ready
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-info">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Checked-In Guests</span>
            <span className="stat-value">2 In Salon</span>
            <span className="stat-trend" style={{ color: "var(--text-muted)" }}>
              VIP Lounge Occupied
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-warning">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Avg Wait Time</span>
            <span className="stat-value">4 min</span>
            <span className="stat-trend" style={{ color: "var(--success)" }}>
              Optimal Flow
            </span>
          </div>
        </div>
      </div>

      {/* Real-time Chair Availability Matrix */}
      <div className="customer-section-card glass-card">
        <div className="card-section-header">
          <div>
            <h3 className="serif-heading section-card-title">Live Chair & Artisan Matrix</h3>
            <p className="section-card-sub">Current occupancy status for each styling station</p>
          </div>
        </div>

        <div className="chair-matrix-grid">
          {CHAIR_STATUSES.map((chair) => {
            const isFree = chair.status === "Available";
            return (
              <div
                key={chair.id}
                className={`chair-status-card glass-panel ${isFree ? "chair-available" : "chair-occupied"
                  }`}
              >
                <div className="chair-card-top">
                  <span className="chair-number">{chair.chair}</span>
                  <span
                    className={`badge ${isFree ? "badge-success" : "badge-warning"}`}
                  >
                    {chair.status}
                  </span>
                </div>

                <div className="chair-barber-info">
                  <img src={chair.avatar} alt={chair.barber} className="chair-avatar" />
                  <div>
                    <h4 className="chair-stylist-name">{chair.barber}</h4>
                    <span className="chair-ends-text">
                      {isFree ? "Ready for client" : `Free at ${chair.endsAt}`}
                    </span>
                  </div>
                </div>

                {!isFree && (
                  <div className="chair-client-box">
                    <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Current Client:</span>
                    <strong style={{ color: "#fff", fontSize: "0.85rem", display: "block" }}>
                      {chair.client} ({chair.service})
                    </strong>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Front Desk Dispatch & Check-in Table */}
      <div className="customer-section-card glass-card">
        <div className="card-section-header">
          <div>
            <h3 className="serif-heading section-card-title">Today's Dispatch Board</h3>
            <p className="section-card-sub">Check in incoming arrivals and print receipts</p>
          </div>

          <div className="search-input-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search arrival..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
              style={{ padding: "6px 12px 6px 34px", fontSize: "0.85rem", width: "220px" }}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Guest Name</th>
                <th>Contact</th>
                <th>Service</th>
                <th>Assigned Stylist</th>
                <th>Arrival Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDispatch.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600, color: "#fff" }}>{item.client}</td>
                  <td style={{ color: "var(--text-muted)" }}>{item.phone}</td>
                  <td>{item.service}</td>
                  <td>{item.barber}</td>
                  <td style={{ color: "var(--gold-light)", fontWeight: 600 }}>{item.time}</td>
                  <td>
                    <span
                      className={`badge ${item.status === "In Chair"
                          ? "badge-warning"
                          : item.status === "Checked In"
                            ? "badge-info"
                            : "badge-success"
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      {item.status !== "In Chair" && (
                        <button
                          onClick={() => handleCheckIn(item.id)}
                          className="btn btn-gold btn-sm"
                        >
                          Seat Guest
                        </button>
                      )}
                      <button
                        onClick={() => alert(`Receipt printed for ${item.client}`)}
                        className="btn btn-secondary btn-sm"
                        title="Print Billing Receipt"
                      >
                        <Printer size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Walk-In Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBookingSuccess={(newApt) => {
          setDispatch([
            {
              id: `DISP-${Math.floor(100 + Math.random() * 900)}`,
              client: newApt.customerName,
              phone: "Walk-In Guest",
              barber: newApt.barber,
              service: newApt.service,
              time: newApt.time,
              status: "Checked In",
            },
            ...dispatch,
          ]);
        }}
      />
    </div>
  );
}

export default Receptionist;