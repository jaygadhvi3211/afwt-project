import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Customer from "./pages/Customer";
import Barber from "./pages/Barber";
import Receptionist from "./pages/Receptionist";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Layout from "./components/Layout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/barber" element={<Barber />} />
            <Route path="/receptionist" element={<Receptionist />} />
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;