import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  Scissors,
} from "lucide-react";
import "../css/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Classic Haircut",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", service: "Classic Haircut", message: "" });
    }, 4000);
  };

  return (
    <div className="contact-page-container">
      <div className="contact-header-center">
        <span className="badge badge-gold">DIRECT CONCIERGE</span>
        <h1 className="contact-title serif-heading">
          Get in Touch with Our <span className="gold-gradient-text">Salon Concierge</span>
        </h1>
        <p className="contact-subtitle">
          Have an inquiry regarding bespoke wedding packages, executive memberships, or custom treatments? We are at your service.
        </p>
      </div>

      <div className="contact-grid">
        {/* Left: Info Cards */}
        <div className="contact-info-column">
          <div className="info-card glass-card">
            <div className="info-icon-box">
              <MapPin size={22} />
            </div>
            <div>
              <h3 className="serif-heading info-label">Salon Location</h3>
              <p className="info-value">450 Madison Avenue, Suite 400<br />New York, NY 10022</p>
              <span className="info-extra">Valet parking available at entrance</span>
            </div>
          </div>

          <div className="info-card glass-card">
            <div className="info-icon-box">
              <Phone size={22} />
            </div>
            <div>
              <h3 className="serif-heading info-label">Telephone Concierge</h3>
              <p className="info-value">+1 (800) 589-3322</p>
              <span className="info-extra">Direct booking line open 09:00 - 20:00</span>
            </div>
          </div>

          <div className="info-card glass-card">
            <div className="info-icon-box">
              <Mail size={22} />
            </div>
            <div>
              <h3 className="serif-heading info-label">Email Inquiries</h3>
              <p className="info-value">concierge@luxesalon.com</p>
              <span className="info-extra">Response within 2 hours</span>
            </div>
          </div>

          <div className="info-card glass-card">
            <div className="info-icon-box">
              <Clock size={22} />
            </div>
            <div>
              <h3 className="serif-heading info-label">Salon Hours</h3>
              <p className="info-value">Mon – Fri: 09:00 – 20:00<br />Sat: 09:00 – 19:00 | Sun: 10:00 – 17:00</p>
            </div>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="contact-form-column glass-card">
          <h2 className="serif-heading form-heading">Send Concierge Message</h2>
          <p className="form-subheading">Fill out the form below and our front desk manager will reply promptly.</p>

          {isSubmitted ? (
            <div className="contact-success-state">
              <CheckCircle2 size={44} color="var(--success)" />
              <h3 className="serif-heading" style={{ fontSize: "1.4rem" }}>Message Dispatched!</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                Thank you, {formData.name || "Guest"}. Our concierge will be in touch with you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form-inner">
              <div className="form-group">
                <label className="form-label">Your Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Lord / Lady / Mr. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Treatment of Interest</label>
                <select
                  className="form-select"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option>Classic Haircut & Styling</option>
                  <option>Beard Sculpting & Royal Shave</option>
                  <option>Organic Facial Spa Treatment</option>
                  <option>Full Hair Coloring Transformation</option>
                  <option>VIP Groom / Wedding Party Package</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Your Inquiry or Special Request</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="Tell us about any specific preferences, time constraints, or group requests..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn btn-gold btn-lg" style={{ width: "100%" }}>
                <Send size={18} />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;