import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Workshops from "./pages/Workshops.jsx";
import Schedule from "./pages/Schedule.jsx";
import Events from "./pages/Events.jsx";
import Gallery from "./pages/Gallery.jsx";
import FAQ from "./pages/FAQ.jsx";
import Contact from "./pages/Contact.jsx";

import AdminLogin from "./pages/AdminLogin.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import useCursorFlowers from "./hooks/useCursorFlowers"; // 👈 ДОБАВЬ

function App() {

    useCursorFlowers();

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/workshops" element={<Workshops />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/events" element={<Events />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="/admin-login" element={<AdminLogin />} />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminPanel />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;