import { NavLink, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Workshops from "./pages/Workshops";
import Schedule from "./pages/Schedule";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    padding: "8px 12px",
    borderRadius: 8,
    color: "#111",
    background: isActive ? "rgba(0,0,0,0.08)" : "transparent",
});

export default function App() {
    return (
        <div style={{ fontFamily: "Arial, sans-serif" }}>
            <header style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>Mona Studio</div>
                <nav style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <NavLink to="/" style={linkStyle} end>Home</NavLink>
                    <NavLink to="/about" style={linkStyle}>About</NavLink>
                    <NavLink to="/workshops" style={linkStyle}>Workshops</NavLink>
                    <NavLink to="/schedule" style={linkStyle}>Schedule</NavLink>
                    <NavLink to="/gallery" style={linkStyle}>Gallery</NavLink>
                    <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
                </nav>
            </header>

            <main style={{ padding: 16 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/workshops" element={<Workshops />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </main>
        </div>
    );
}

