import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Guard component that only renders children when the logged‑in user's role
 * matches the required role. Otherwise redirects to the login page.
 */
export default function RoleProtectedRoute({ requiredRole, children }) {
  const { user } = useAuth();

  // Not logged in → go to login (root)
  if (!user) return <Navigate to="/" replace />;

  // Role matches → render the protected component
  if (user.role === requiredRole) return children;

  // Wrong role → redirect to the appropriate dashboard for that role
  // Fallback to login if role is unknown
  const rolePath = {
    Admin: "/admin",
    Barber: "/barbar",
    Receptionist: "/receptionist",
    Customer: "/customer",
  }[user.role];

  return <Navigate to={rolePath || "/"} replace />;
}
