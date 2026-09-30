import { Scissors, Sparkles, Award, ShieldCheck, Heart, Users, CheckCircle } from "lucide-react";
import { BARBERS_LIST } from "../components/BookingModal";
import "../css/About.css";

function About() {
  return (
    <div className="about-page-container">
      {/* 1. Header Hero */}
      <section className="about-hero glass-card">
        <span className="badge badge-gold">OUR HERITAGE & PHILOSOPHY</span>
        <h1 className="about-title serif-heading">
          Redefining the Art of <span className="gold-gradient-text">Luxury Grooming</span>
        </h1>
        <p className="about-subtitle">
          Founded on the conviction that personal grooming is an elevated form of self-expression, LuxeSalon combines timeless European barbering traditions with modern botanical skincare and bespoke hair styling.
        </p>
      </section>

      {/* 2. Story Grid */}
      <section className="about-story-grid">
        <div className="story-card glass-card">
          <div className="story-icon-box">
            <Sparkles size={24} />
          </div>
          <h3 className="serif-heading">Our Mission</h3>
          <p>
            To deliver an uncompromisingly luxurious, restful, and transformative grooming experience tailored to each guest’s individuality, leaving them empowered and revitalized.
          </p>
        </div>

        <div className="story-card glass-card">
          <div className="story-icon-box">
            <Award size={24} />
          </div>
          <h3 className="serif-heading">Our Vision</h3>
          <p>
            To set the global gold standard for premier salons and spa retreats through artisanal craft, eco-luxe sustainability, and world-class digital hospitality.
          </p>
        </div>

        <div className="story-card glass-card">
          <div className="story-icon-box">
            <ShieldCheck size={24} />
          </div>
          <h3 className="serif-heading">Hygiene Protocol</h3>
          <p>
            We implement medical-grade autoclave sterilization for all precision instruments, hospital-level air purification, and single-use botanical linens.
          </p>
        </div>
      </section>

      {/* 3. Master Team Spotlight */}
      <section className="about-team-section">
        <div className="section-header-center">
          <span className="section-eyebrow">THE CRAFTSMEN</span>
          <h2 className="section-title serif-heading">
            Meet The <span className="gold-gradient-text">Master Artisans</span>
          </h2>
          <p className="section-subtitle">
            Every member of our styling team undergoes rigorous continuous education in London and Paris.
          </p>
        </div>

        <div className="team-grid">
          {BARBERS_LIST.map((barber) => (
            <div key={barber.id} className="team-member-card glass-card">
              <img src={barber.avatar} alt={barber.name} className="team-member-avatar" />
              <h3 className="team-name serif-heading">{barber.name}</h3>
              <span className="team-role">{barber.role}</span>
              <p className="team-bio">
                Specializing in precision scissor work, modern fades, and revitalizing scalp massage therapies.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Luxury Milestones */}
      <section className="milestones-section glass-card">
        <div className="milestone-item">
          <span className="milestone-number serif-heading">15,000+</span>
          <span className="milestone-label">Discerning Clients Served</span>
        </div>
        <div className="milestone-divider" />
        <div className="milestone-item">
          <span className="milestone-number serif-heading">99.4%</span>
          <span className="milestone-label">Five-Star Client Rating</span>
        </div>
        <div className="milestone-divider" />
        <div className="milestone-item">
          <span className="milestone-number serif-heading">12</span>
          <span className="milestone-label">Master Stylists & Colorists</span>
        </div>
        <div className="milestone-divider" />
        <div className="milestone-item">
          <span className="milestone-number serif-heading">8</span>
          <span className="milestone-label">National Grooming Awards</span>
        </div>
      </section>
    </div>
  );
}

export default About;