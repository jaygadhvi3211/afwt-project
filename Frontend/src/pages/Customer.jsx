import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Scissors,
  Award,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle,
  Star,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import BookingModal, { SERVICES_LIST } from "../components/BookingModal";
import "../css/Customer.css";
import { fetchProducts } from "../services/ProductService";

const INITIAL_APPOINTMENTS = [
  {
    id: "APT-9481",
    customerName: "Alex Mercer",
    service: "Premium Haircut & Styling",
    barber: "Marcus Vance",
    date: "2026-08-25",
    time: "10:30 AM",
    price: 35,
    status: "Confirmed",
    notes: "Low skin fade with textured top",
  },
  {
    id: "APT-7320",
    customerName: "Alex Mercer",
    service: "Beard Sculpting & Trim",
    barber: "David Park",
    date: "2026-09-02",
    time: "02:00 PM",
    price: 25,
    status: "Confirmed",
    notes: "Hot towel treatment preferred",
  },
];

const PAST_VISITS = [
  {
    id: "VIS-332",
    date: "14 Jul 2026",
    service: "Classic Haircut",
    barber: "Marcus Vance",
    price: 20,
    rating: 5,
  },
  {
    id: "VIS-298",
    date: "28 Jun 2026",
    service: "Premium Organic Facial",
    barber: "Sarah Chen",
    price: 65,
    rating: 5,
  },
  {
    id: "VIS-214",
    date: "10 May 2026",
    service: "Royal Shave Treatment",
    barber: "David Park",
    price: 30,
    rating: 5,
  },
];

function Customer() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(true);
  const [productError, setProductError] = useState(null);

  const handleCancelAppointment = (id) => {
    if (window.confirm("Are you sure you wish to cancel this appointment?")) {
      setAppointments(appointments.filter((apt) => apt.id !== id));
    }
  };

  // fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setProductLoading(true);
        const data = await fetchProducts();
        if (data && data.success) {
          setProducts(data.data);
        } else {
          setProductError('Failed to load products');
        }
      } catch (err) {
        setProductError(err.message || 'Error fetching products');
      } finally {
        setProductLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleBookingSuccess = (newApt) => {
    setAppointments([newApt, ...appointments]);
  };

  return (
    <div className="dashboard-container">
      {/* Top Banner Header */}
      <div className="dashboard-top-banner glass-card">
        <div className="banner-left">
          <div className="welcome-tag">
            <Sparkles size={14} color="var(--gold-primary)" />
            <span>VIP CLIENT RETREAT</span>
          </div>
          <h1 className="serif-heading banner-title">
            Welcome, <span className="gold-gradient-text">{user?.name || "Guest Client"}</span>
          </h1>
          <p className="banner-sub">
            Gold Member • <strong>480 Reward Points</strong> accumulated ($48 redemption value).
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedService(null);
            setIsBookingOpen(true);
          }}
          className="btn btn-gold btn-lg banner-action-btn"
        >
          <Plus size={18} />
          <span>Book New Service</span>
        </button>
      </div>

      {/* KPI Stat Cards */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-gold">
            <Calendar size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Upcoming Visits</span>
            <span className="stat-value">{appointments.length}</span>
            <span className="stat-trend" style={{ color: "var(--success)" }}>
              <TrendingUp size={12} /> Next: Aug 25th
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-success">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Completed Sessions</span>
            <span className="stat-value">{PAST_VISITS.length + 11}</span>
            <span className="stat-trend" style={{ color: "var(--text-muted)" }}>
              Since March 2025
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-warning">
            <Award size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Loyalty Points</span>
            <span className="stat-value">480</span>
            <span className="stat-trend" style={{ color: "var(--gold-light)" }}>
              Gold VIP Status
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-info">
            <Scissors size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Preferred Artisan</span>
            <span className="stat-value" style={{ fontSize: "1.25rem" }}>Marcus Vance</span>
            <span className="stat-trend" style={{ color: "var(--gold-light)" }}>
              ★ 4.9 Master Stylist
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Active Appointments + Past Visits */}
      <div className="customer-main-grid">
        {/* Left Column: Upcoming Appointments */}
        <div className="customer-section-card glass-card">
          <div className="card-section-header">
            <div>
              <h2 className="serif-heading section-card-title">Upcoming Appointments</h2>
              <p className="section-card-sub">Your scheduled grooming & spa sessions</p>
            </div>
            <span className="badge badge-gold">{appointments.length} Active</span>
          </div>

          {appointments.length === 0 ? (
            <div className="empty-state-box">
              <Calendar size={36} color="var(--text-muted)" />
              <p>You have no upcoming appointments scheduled.</p>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="btn btn-outline-gold btn-sm"
                style={{ marginTop: "10px" }}
              >
                Book a Session Now
              </button>
            </div>
          ) : (
            <div className="appointments-list">
              {appointments.map((apt) => (
                <div key={apt.id} className="appointment-card glass-panel">
                  <div className="apt-left-meta">
                    <div className="apt-date-badge">
                      <span className="apt-month">
                        {new Date(apt.date).toLocaleString("default", { month: "short" }).toUpperCase()}
                      </span>
                      <span className="apt-day">
                        {new Date(apt.date).getDate() || "25"}
                      </span>
                    </div>
                    <div>
                      <h3 className="serif-heading apt-service-title">{apt.service}</h3>
                      <div className="apt-details-row">
                        <span className="apt-meta-item">
                          <Clock size={14} color="var(--gold-primary)" /> {apt.time}
                        </span>
                        <span className="apt-meta-item">
                          <User size={14} color="var(--gold-primary)" /> {apt.barber}
                        </span>
                        <span className="apt-price">${apt.price}.00</span>
                      </div>
                      {apt.notes && <p className="apt-notes">Note: "{apt.notes}"</p>}
                    </div>
                  </div>

                  <div className="apt-actions">
                    <span className="badge badge-success">{apt.status}</span>
                    <button
                      onClick={() => handleCancelAppointment(apt.id)}
                      className="btn btn-danger btn-sm"
                      title="Cancel Appointment"
                    >
                      <Trash2 size={14} />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Recommended Treatments & Visit History */}
        <div className="customer-side-column">
          {/* Quick Recommendations */}
          <div className="customer-section-card glass-card">
            <div className="card-section-header">
              <div>
                <h3 className="serif-heading section-card-title">Curated For You</h3>
                <p className="section-card-sub">Based on your past grooming profile</p>
              </div>
            </div>

            {/* Product List */}
            <div className="product-section-card glass-card">
              <div className="card-section-header">
                <div>
                  <h3 className="serif-heading section-card-title">Products</h3>
                  <p className="section-card-sub">Shop salon‑approved products</p>
                </div>
              </div>

              {productLoading ? (
                <p>Loading products...</p>
              ) : productError ? (
                <p className="error-text">{productError}</p>
              ) : (
                <div className="product-list">
                  {products.map((prod) => (
                    <div key={prod._id} className="product-item glass-panel">
                      <h4>{prod.name}</h4>
                      <span className="product-price">${prod.price}.00</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Past Visits Log */}
          <div className="customer-section-card glass-card">
            <div className="card-section-header">
              <div>
                <h3 className="serif-heading section-card-title">Recent Completed Visits</h3>
              </div>
            </div>

            <div className="past-visits-list">
              {PAST_VISITS.map((visit) => (
                <div key={visit.id} className="past-visit-row">
                  <div className="visit-left">
                    <span className="visit-service">{visit.service}</span>
                    <span className="visit-meta">{visit.date} • with {visit.barber}</span>
                  </div>
                  <div className="visit-right">
                    <div className="rating-stars">
                      {[...Array(visit.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="var(--gold-primary)" color="var(--gold-primary)" />
                      ))}
                    </div>
                    <span className="visit-price">${visit.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBookingSuccess={handleBookingSuccess}
        initialService={selectedService}
      />
    </div>
  );
}

export default Customer;