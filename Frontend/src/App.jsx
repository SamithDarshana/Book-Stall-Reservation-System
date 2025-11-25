import { Routes, Route, Link, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Reservations from "./pages/Reservations";
import Users from "./pages/Users";
import "./index.css";
import "./Style/Dashboard.css";
import "./Style/Reservation.css";
import "./Style/Users.css";

export default function App() {
  const location = useLocation();

  // Show login/signup nav only on login and signup pages
  const showAuthNav = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/";

  return (
    <div className="container">
      {showAuthNav && (
        <nav style={{ display: "flex", gap: 16, padding: 12 }}>
          <Link className="btn btn-blue" to="/login">Login</Link>
          <Link className="btn btn-green" to="/signup">Signup</Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/users" element={<Users />} />

      </Routes>
    </div>
  );
}
