import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../css/Layout.css";

function Layout() {
  const location = useLocation();
  // Check if current route is a dashboard route (where sidebar is especially useful)
  const isDashboardRoute = [
    "/admin",
    "/barber",
    "/receptionist",
    "/customer",
  ].includes(location.pathname);

  return (
    <div className="luxe-app-container">
      <Header />

      <div className="luxe-body-layout">
        {isDashboardRoute && <Sidebar />}

        <main className={`luxe-main-content ${!isDashboardRoute ? "full-width-page" : ""}`}>
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Layout;