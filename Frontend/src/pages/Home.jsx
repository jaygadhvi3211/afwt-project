import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Scissors,
  Calendar,
  Sparkles,
  Award,
  Clock,
  ShieldCheck,
  Star,
  ChevronRight,
  Coffee,
  CheckCircle,
} from "lucide-react";
import BookingModal, { SERVICES_LIST, BARBERS_LIST } from "../components/BookingModal";
import "../css/Home.css";

function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Hair", "Beard", "Spa", "Color"];

  const filteredServices =
    activeCategory === "All"
      ? SERVICES_LIST
      : SERVICES_LIST.filter((s) => s.category === activeCategory);

  const handleBookService = (service) => {
    setSelectedServiceForBooking(service);
    setIsBookingOpen(true);
  };

  return (
    <div className="home-page-container">
      {/* 1. Hero Section */}
      <section className="luxe-hero-section">
        <div className="hero-content-wrapper">
          <div className="hero-text-content">
            <div className="hero-tag-badge">
              <Sparkles size={14} className="tag-sparkle" />
              <span>Bespoke Hair, Beard & Spa Sanctuary</span>
            </div>

            <h1 className="hero-headline serif-heading">
              Where <span className="gold-gradient-text">Master Craft</span> Meets Timeless Luxury
            </h1>

            <p className="hero-description">
              Immerse yourself in precision grooming, handcrafted styling, and restorative spa rituals delivered by internationally recognized artisans in our private executive suites.
            </p>

            <div className="hero-cta-group">
              <button
                onClick={() => {
                  setSelectedServiceForBooking(null);
                  setIsBookingOpen(true);
                }}
                className="btn btn-gold btn-lg"
              >
                <Calendar size={18} />
                <span>Reserve Appointment</span>
              </button>

              <a href="#services-catalog" className="btn btn-secondary btn-lg">
                <span>Explore Menu</span>
                <ChevronRight size={18} />
              </a>
            </div>

            <div className="hero-highlights-strip">
              <div className="highlight-item">
                <span className="highlight-number serif-heading">4.9★</span>
                <span className="highlight-label">2,800+ Client Reviews</span>
              </div>
              <div className="highlight-divider" />
              <div className="highlight-item">
                <span className="highlight-number serif-heading">15+</span>
                <span className="highlight-label">Master Stylists</span>
              </div>
              <div className="highlight-divider" />
              <div className="highlight-item">
                <span className="highlight-number serif-heading">100%</span>
                <span className="highlight-label">Organic Luxury Care</span>
              </div>
            </div>
          </div>

          <div className="hero-media-wrapper">
            <div className="hero-image-frame glass-card animate-float">
              <img
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80"
                alt="Luxury Salon Experience"
                className="hero-main-img"
              />
              <div className="floating-card top-float glass-panel">
                <div className="float-icon-gold">
                  <Award size={20} />
                </div>
                <div>
                  <div className="float-title">Vogue Award Winner</div>
                  <div className="float-sub">Best Luxury Barber 2025</div>
                </div>
              </div>

              <div className="floating-card bottom-float glass-panel">
                <div className="float-icon-success">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="float-title">VIP Lounge Access</div>
                  <div className="float-sub">Complimentary Bar & Wifi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services Catalog Section */}
      <section id="services-catalog" className="services-section">
        <div className="section-header-center">
          <span className="section-eyebrow">SIGNATURE EXPERIENCES</span>
          <h2 className="section-title serif-heading">
            Our Curated <span className="gold-gradient-text">Service Menu</span>
          </h2>
          <p className="section-subtitle">
            Every treatment is customized to your facial anatomy, hair texture, and individual aesthetic.
          </p>

          {/* Category Filter Pills */}
          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`category-pill ${activeCategory === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="services-grid">
          {filteredServices.map((service) => (
            <div key={service.id} className="service-card glass-card">
              <div className="service-card-top">
                <span className="service-icon-large">{service.icon}</span>
                <span className="service-price">${service.price}</span>
              </div>
              <h3 className="service-title serif-heading">{service.name}</h3>
              <div className="service-duration">
                <Clock size={14} />
                <span>{service.duration} Session</span>
              </div>
              <p className="service-desc">
                Includes precision consultation, customized botanical scalp treatment, and premium hot towel finish.
              </p>
              <button
                onClick={() => handleBookService(service)}
                className="btn btn-outline-gold btn-sm service-book-btn"
              >
                <span>Book This Treatment</span>
                <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Master Stylists & Artisans */}
      <section className="stylists-section">
        <div className="section-header-center">
          <span className="section-eyebrow">WORLD-CLASS ARTISANS</span>
          <h2 className="section-title serif-heading">
            Meet Our <span className="gold-gradient-text">Master Stylists</span>
          </h2>
          <p className="section-subtitle">
            Trained in London, Paris, and Milan to deliver unmatched precision and artistry.
          </p>
        </div>

        <div className="stylists-grid">
          {BARBERS_LIST.map((barber) => (
            <div key={barber.id} className="stylist-card glass-card">
              <div className="stylist-img-box">
                <img src={barber.avatar} alt={barber.name} className="stylist-photo" />
                <span className="stylist-rating-badge">
                  <Star size={13} fill="var(--gold-primary)" color="var(--gold-primary)" />
                  {barber.rating}
                </span>
              </div>
              <div className="stylist-info">
                <h3 className="stylist-name serif-heading">{barber.name}</h3>
                <p className="stylist-role">{barber.role}</p>
                <div className="stylist-perks">
                  <span>✓ 7+ Yrs Exp</span>
                  <span>✓ Master Certified</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedServiceForBooking(null);
                    setIsBookingOpen(true);
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ width: "100%", marginTop: "14px" }}
                >
                  Book with {barber.name.split(" ")[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Luxury Experience Pillars */}
      <section className="pillars-section">
        <div className="pillars-grid">
          <div className="pillar-card glass-card">
            <div className="pillar-icon-box">
              <Coffee size={24} />
            </div>
            <h3 className="serif-heading">Private VIP Lounge</h3>
            <p>
              Relax before your session with single-origin espresso, champagne, and high-speed executive fiber wifi.
            </p>
          </div>

          <div className="pillar-card glass-card">
            <div className="pillar-icon-box">
              <ShieldCheck size={24} />
            </div>
            <h3 className="serif-heading">Clinical Sanitation</h3>
            <p>
              Hospital-grade autoclave sterilization for all metal instruments with single-use organic linen.
            </p>
          </div>

          <div className="pillar-card glass-card">
            <div className="pillar-icon-box">
              <Sparkles size={24} />
            </div>
            <h3 className="serif-heading">Organic Formulations</h3>
            <p>
              Exclusively paired with cruelty-free, paraben-free botanical oils imported from Provence.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Booking Modal Trigger Banner */}
      <section className="cta-banner-section">
        <div className="cta-banner-card glass-card">
          <div className="cta-banner-text">
            <span className="badge badge-gold" style={{ marginBottom: "12px" }}>
              LIMITED SLOTS DAILY
            </span>
            <h2 className="serif-heading" style={{ fontSize: "2rem", marginBottom: "8px" }}>
              Ready For A Transformative Styling Experience?
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "540px" }}>
              Join over 2,800 discerning clients who trust LuxeSalon for their bespoke grooming and signature style.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedServiceForBooking(null);
              setIsBookingOpen(true);
            }}
            className="btn btn-gold btn-lg"
          >
            <Calendar size={18} />
            <span>Book Your Session Now</span>
          </button>
        </div>
      </section>

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={selectedServiceForBooking}
      />
    </div>
  );
}

export default Home;