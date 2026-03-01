import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Workshops from "./pages/Workshops.jsx";
import Schedule from "./pages/Schedule.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import Events from "./pages/Events.jsx";

import "./App.css";

export default function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/about" element={<About />} />
                <Route path="/workshops" element={<Workshops />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/events" element={<Events />} />
            </Routes>
        </>
    );
}