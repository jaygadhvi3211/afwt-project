import { useState } from "react";
import { X, Calendar, Clock, User, Scissors, Sparkles, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const SERVICES_LIST = [
  { id: "1", name: "Classic Haircut", category: "Hair", price: 20, duration: "30 min", icon: "✂️" },
  { id: "2", name: "Premium Haircut & Styling", category: "Hair", price: 35, duration: "45 min", icon: "💈" },
  { id: "3", name: "Beard Sculpting & Trim", category: "Beard", price: 25, duration: "30 min", icon: "🧔" },
  { id: "4", name: "Royal Shave Treatment", category: "Shave", price: 30, duration: "35 min", icon: "🪒" },
  { id: "5", name: "Full Hair Coloring", category: "Color", price: 60, duration: "90 min", icon: "🎨" },
  { id: "6", name: "Premium Organic Facial", category: "Spa", price: 65, duration: "60 min", icon: "✨" },
  { id: "7", name: "Deep Conditioning Hair Spa", category: "Spa", price: 45, duration: "50 min", icon: "💆" },
];

export const BARBERS_LIST = [
  { id: "1", name: "Marcus Vance", role: "Master Stylist", rating: 4.9, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80" },
  { id: "2", name: "Sarah Chen", role: "Color & Spa Specialist", rating: 5.0, avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80" },
  { id: "3", name: "David Park", role: "Beard & Grooming Artist", rating: 4.8, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80" },
];

const TIME_SLOTS = [
  "09:30 AM", "10:30 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM", "06:30 PM"
];

function BookingModal({ isOpen, onClose, onBookingSuccess, initialService = null }) {
  const { user } = useAuth();
  const [selectedService, setSelectedService] = useState(
    initialService || SERVICES_LIST[0]
  );
  const [selectedBarber, setSelectedBarber] = useState(BARBERS_LIST[0]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[1]);
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onBookingSuccess) {
        onBookingSuccess({
          id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
          customerName: user?.name || "Guest Client",
          service: selectedService.name,
          barber: selectedBarber.name,
          date: selectedDate,
          time: selectedTime,
          price: selectedService.price,
          status: "Confirmed",
          notes: notes,
        });
      }
    }, 600);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleResetAndClose}>
      <div
        className="modal-container"
        style={{ maxWidth: "620px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "var(--gold-gradient)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000",
              }}
            >
              <Scissors size={18} />
            </div>
            <div>
              <h3 className="modal-title serif-heading">Book Salon Service</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
                Instant confirmation with our master artisans
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="btn-secondary btn-icon"
            style={{ padding: "6px" }}
          >
            <X size={18} />
          </button>
        </div>

        {isSuccess ? (
          <div style={{ padding: "40px 24px", textAlign: "center" }}>
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                background: "var(--success-bg)",
                border: "1px solid var(--success)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                color: "var(--success)",
              }}
            >
              <CheckCircle2 size={38} />
            </div>
            <h2 className="serif-heading" style={{ fontSize: "1.6rem", marginBottom: "8px" }}>
              Appointment Confirmed!
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "400px", margin: "0 auto 24px" }}>
              We've reserved your slot for <strong style={{ color: "var(--gold-light)" }}>{selectedService.name}</strong> with <strong style={{ color: "var(--text-primary)" }}>{selectedBarber.name}</strong> on <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>.
            </p>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                padding: "16px",
                maxWidth: "380px",
                margin: "0 auto 28px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Total Estimated:</span>
              <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--gold-primary)" }}>
                ${selectedService.price}.00
              </span>
            </div>
            <button onClick={handleResetAndClose} className="btn btn-gold btn-lg" style={{ width: "100%", maxWidth: "300px" }}>
              Done & View Schedule
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Select Service */}
              <div>
                <label className="form-label" style={{ marginBottom: "8px", display: "block" }}>
                  1. Choose Service
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
                    gap: "10px",
                  }}
                >
                  {SERVICES_LIST.map((svc) => {
                    const isSelected = selectedService.id === svc.id;
                    return (
                      <div
                        key={svc.id}
                        onClick={() => setSelectedService(svc)}
                        style={{
                          padding: "12px",
                          borderRadius: "var(--radius-sm)",
                          background: isSelected ? "rgba(212, 175, 55, 0.12)" : "rgba(255, 255, 255, 0.03)",
                          border: `1px solid ${isSelected ? "var(--gold-primary)" : "var(--border-subtle)"}`,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                          <span style={{ fontSize: "1.2rem" }}>{svc.icon}</span>
                          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--gold-light)" }}>
                            ${svc.price}
                          </span>
                        </div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: isSelected ? "#fff" : "var(--text-secondary)", lineHeight: 1.2 }}>
                          {svc.name}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
                          {svc.duration}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Select Specialist */}
              <div>
                <label className="form-label" style={{ marginBottom: "8px", display: "block" }}>
                  2. Select Master Stylist
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                  {BARBERS_LIST.map((barber) => {
                    const isSelected = selectedBarber.id === barber.id;
                    return (
                      <div
                        key={barber.id}
                        onClick={() => setSelectedBarber(barber)}
                        style={{
                          padding: "10px",
                          borderRadius: "var(--radius-sm)",
                          background: isSelected ? "rgba(212, 175, 55, 0.12)" : "rgba(255, 255, 255, 0.03)",
                          border: `1px solid ${isSelected ? "var(--gold-primary)" : "var(--border-subtle)"}`,
                          cursor: "pointer",
                          textAlign: "center",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <img
                          src={barber.avatar}
                          alt={barber.name}
                          style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            margin: "0 auto 6px",
                            border: `2px solid ${isSelected ? "var(--gold-primary)" : "transparent"}`,
                          }}
                        />
                        <div style={{ fontSize: "0.825rem", fontWeight: 600, color: "var(--text-primary)" }}>
                          {barber.name}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "var(--gold-light)", marginTop: "2px" }}>
                          ★ {barber.rating}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date and Time Slot */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">3. Select Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">4. Time Slot</label>
                  <select
                    className="form-select"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Special Requests / Preferences (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Skin sensitive, specific fade style, beverage preference"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <div style={{ marginRight: "auto", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Total Due at Salon</span>
                <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--gold-primary)" }}>
                  ${selectedService.price}.00
                </span>
              </div>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-gold"
                style={{ minWidth: "160px" }}
              >
                {isSubmitting ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default BookingModal;
