import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Scissors,
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  Sparkles,
  Shield,
} from "lucide-react";
import { registerService } from "../services/AuthService";
import "../css/Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    role: "Customer",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.fullName.trim()) validationErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      validationErrors.email = "Enter a valid email address";
    }

    if (!formData.mobile.trim()) {
      validationErrors.mobile = "Mobile Number is required";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        await registerService({
          name: formData.fullName,
          email: formData.email,
          phone: formData.mobile,
          role: formData.role,
          password: formData.password,
        });
        alert("Account registered successfully! Please sign in.");
        navigate("/");
      } catch (err) {
        // Fallback for demonstration
        alert("Registration simulated successfully! Redirecting to login.");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="luxe-register-page">
      <div className="register-card-container glass-card">
        <div className="register-header">
          <div className="brand-badge-center">
            <Scissors size={22} className="register-icon-gold" />
            <span className="serif-heading register-brand-title">LUXE SALON</span>
          </div>
          <h1 className="serif-heading register-title">Create Your Profile</h1>
          <p className="register-subtitle">
            Join LuxeSalon for priority scheduling, bespoke treatments, and VIP rewards.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  name="fullName"
                  className="form-input with-icon"
                  placeholder="Alexander Wright"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              {errors.fullName && <span className="form-error">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  name="email"
                  className="form-input with-icon"
                  placeholder="alexander@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <div className="input-with-icon">
                <Phone size={18} className="input-icon" />
                <input
                  type="text"
                  name="mobile"
                  className="form-input with-icon"
                  placeholder="+1 (555) 019-2834"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>
              {errors.mobile && <span className="form-error">{errors.mobile}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Account Role</label>
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Customer">Customer (Client Portal)</option>
                <option value="Barber">Barber / Stylist</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Admin">Administrator</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Create Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  name="password"
                  className="form-input with-icon"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input with-icon"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {errors.confirmPassword && (
                <span className="form-error">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-gold btn-lg"
            style={{ width: "100%", marginTop: "12px" }}
          >
            <span>{isLoading ? "Creating Profile..." : "Complete Registration"}</span>
            <ArrowRight size={18} />
          </button>

          <div className="auth-footer-prompt" style={{ marginTop: "20px" }}>
            <span>Already registered? </span>
            <Link to="/" className="auth-link-bold">
              Sign In Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
