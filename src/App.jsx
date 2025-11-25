import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import "./Dashboard.css";

export default function App() {
  return (
    <div className="container">
      {/* Top Navigation shortcuts (optional) */}
      <nav style={{ display: "flex", gap: 16, padding: 12 }}>
        <Link className="btn btn-blue" to="/login">Login</Link>
        <Link className="btn btn-green" to="/signup">Signup</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
