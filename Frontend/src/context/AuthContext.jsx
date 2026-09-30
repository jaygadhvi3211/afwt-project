import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const DEMO_ACCOUNTS = {
  Admin: {
    name: "Admin Director",
    email: "admin@gmail.com",
    role: "Admin",
    phone: "9876543210",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  Barber: {
    name: "Marcus Vance",
    email: "marcus@salon.com",
    role: "Barber",
    phone: "9876543211",
    specialty: "Master Stylist & Beard Specialist",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  Receptionist: {
    name: "Emily Roberts",
    email: "emily@salon.com",
    role: "Receptionist",
    phone: "9876543214",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  },
  Customer: {
    name: "Alex Mercer",
    email: "alex@example.com",
    role: "Customer",
    phone: "9876543215",
    loyaltyTier: "Gold VIP",
    points: 480,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("salon_user");
      return savedUser ? JSON.parse(savedUser) : DEMO_ACCOUNTS.Admin;
    } catch {
      return DEMO_ACCOUNTS.Admin;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("salon_token") || "demo_token_authenticated";
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("salon_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("salon_user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("salon_token", token);
    } else {
      localStorage.removeItem("salon_token");
    }
  }, [token]);

  const login = (userData, authToken = "authenticated_token") => {
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("salon_user");
    localStorage.removeItem("salon_token");
  };

  const switchDemoRole = (roleKey) => {
    const demoUser = DEMO_ACCOUNTS[roleKey];
    if (demoUser) {
      setUser(demoUser);
      setToken(`demo_token_${roleKey.toLowerCase()}`);
      return demoUser;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role: user?.role || "Guest",
        isAuthenticated: !!user,
        login,
        logout,
        switchDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
