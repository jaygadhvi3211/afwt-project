import { Scissors, MapPin, Phone, Mail, Clock, Globe, Share2, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import "../css/Footer.css";

function Footer() {
  return (
    <footer className="luxe-footer">
      <div className="footer-top">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <div className="footer-brand-icon">
                <Scissors size={20} />
              </div>
              <span className="footer-brand-title serif-heading">LUXE SALON</span>
            </div>
            <p className="footer-description">
              Curators of refined grooming, bespoke hair design, and restorative spa rituals. Experience craftsmanship elevated to art.
            </p>
            <div className="footer-socials">
              <a href="#social" className="social-icon" title="Global Community">
                <Globe size={18} />
              </a>
              <a href="#social" className="social-icon" title="Social Feed">
                <Share2 size={18} />
              </a>
              <a href="#social" className="social-icon" title="Client Chat">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/home">Home Retreat</Link></li>
              <li><Link to="/about">Our Story & Artisans</Link></li>
              <li><Link to="/customer">Client Portal</Link></li>
              <li><Link to="/contact">Concierge & Contact</Link></li>
              <li><Link to="/admin">Staff Command</Link></li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="footer-col">
            <h4 className="footer-heading">Salon Hours</h4>
            <ul className="footer-schedule">
              <li>
                <span>Monday – Friday</span>
                <span className="time-highlight">09:00 – 20:00</span>
              </li>
              <li>
                <span>Saturday</span>
                <span className="time-highlight">09:00 – 19:00</span>
              </li>
              <li>
                <span>Sunday</span>
                <span className="time-highlight">10:00 – 17:00</span>
              </li>
            </ul>
          </div>

          {/* Concierge & Location */}
          <div className="footer-col">
            <h4 className="footer-heading">Concierge</h4>
            <div className="footer-contact-item">
              <MapPin size={16} className="contact-icon" />
              <span>450 Madison Avenue, New York, NY</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={16} className="contact-icon" />
              <span>+1 (800) 589-3322</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} className="contact-icon" />
              <span>concierge@luxesalon.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© {new Date().getFullYear()} LuxeSalon Management Portal. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#hygiene">Hygiene Guarantee</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;