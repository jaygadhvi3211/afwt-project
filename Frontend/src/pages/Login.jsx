import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Scissors,
  Lock,
  Mail,
  Shield,
  Sparkles,
  ArrowRight,
  UserCheck,
  CheckCircle2,
} from "lucide-react";
import { useAuth, DEMO_ACCOUNTS } from "../context/AuthContext";
import { loginService } from "../services/AuthService";
import "../css/Login.css";

function Login() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin@1234");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, switchDemoRole } = useAuth();

  const handleDemoQuickFill = (roleKey) => {
    const account = DEMO_ACCOUNTS[roleKey];
    if (account) {
      setEmail(account.email);
      setPassword(roleKey === "Admin" ? "admin@1234" : "demo123");
      // Instant demo login
      switchDemoRole(roleKey);
      if (roleKey === "Admin") navigate("/admin");
      else if (roleKey === "Barber") navigate("/barber");
      else if (roleKey === "Receptionist") navigate("/receptionist");
      else if (roleKey === "Customer") navigate("/customer");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = "Email address is required";
    }
    if (!password.trim()) {
      validationErrors.password = "Password is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await loginService({ email, password });
        if (response.data) {
          const userPayload = response.data.user || {
            name: email.split("@")[0],
            email,
            role: email.includes("admin")
              ? "Admin"
              : email.includes("barber")
              ? "Barber"
              : email.includes("recep")
              ? "Receptionist"
              : "Customer",
          };
          login(userPayload, response.data.token || "token_jwt_auth");
          
          if (userPayload.role === "Admin") navigate("/admin");
          else if (userPayload.role === "Barber") navigate("/barber");
          else if (userPayload.role === "Receptionist") navigate("/receptionist");
          else navigate("/customer");
        }
      } catch (error) {
        // Fallback demo authentication if backend is unreachable
        console.warn("Backend offline or auth failed, fallback to role match:", error);
        let matchedRole = "Customer";
        if (email.toLowerCase().includes("admin")) matchedRole = "Admin";
        else if (email.toLowerCase().includes("barber") || email.toLowerCase().includes("marcus")) matchedRole = "Barber";
        else if (email.toLowerCase().includes("recep") || email.toLowerCase().includes("emily")) matchedRole = "Receptionist";

        handleDemoQuickFill(matchedRole);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="luxe-auth-page">
      <div className="auth-card-container glass-card">

        <div className="auth-form-side">
          <div className="form-inner">
            <div className="form-header">
              <h1 className="serif-heading form-title">Sign In</h1>
              <p className="form-subtitle">Welcome back! Please enter your credentials.</p>
            </div>


            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    className="form-input with-icon"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label className="form-label">Password</label>
                  <a href="#forgot" className="forgot-link">
                    Forgot password?
                  </a>
                </div>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input
                    type="password"
                    className="form-input with-icon"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errors.password && <span className="form-error">{errors.password}</span>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-gold btn-lg auth-submit-btn"
              >
                <span>{isLoading ? "Authenticating..." : "Sign In to Portal"}</span>
                <ArrowRight size={18} />
              </button>

              <div className="auth-footer-prompt">
                <span>Don't have an account? </span>
                <Link to="/register" className="auth-link-bold">
                  Create Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
