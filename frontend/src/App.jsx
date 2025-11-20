import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import './index.css';  

function App() {
  return (
    <Router>
      <div className="container">
        {/* Navigation */}
        <nav className="mb-6" style={{ display: "flex", gap: "16px" }}>
          <Link className="btn btn-blue" to="/login">Login</Link>
          <Link className="btn btn-green" to="/signup">Signup</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Login />} /> {/* default route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
