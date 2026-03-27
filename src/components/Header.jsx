import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logoImg from "../assets/logomona.jpg";
import "./header.css";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <header className="appHeader">
                <div className="appHeader__inner">

                    {/* БУРГЕР */}
                    <button
                        className="appHeader__burger"
                        onClick={() => setOpen(true)}
                    >
                        <FaBars />
                    </button>

                    {/* ЛОГО */}
                    <Link to="/" className="appHeader__logoLink">
                        <img src={logoImg} className="appHeader__logo" alt="Mona Studios" />
                    </Link>

                    {/* КНОПКА */}
                    <Link to="/contact" className="appHeader__btn">
                        записаться
                    </Link>
                </div>
            </header>

            {/* БОКОВОЕ МЕНЮ */}
            <div className={`sideMenu ${open ? "open" : ""}`}>
                <button className="sideMenu__close" onClick={() => setOpen(false)}>
                    <FaTimes />
                </button>

                <nav className="sideMenu__nav">
                    <Link to="/about" onClick={() => setOpen(false)}>о студии</Link>
                    <Link to="/workshops" onClick={() => setOpen(false)}>мастер-классы</Link>
                    <Link to="/schedule" onClick={() => setOpen(false)}>расписание</Link>
                    <Link to="/events" onClick={() => setOpen(false)}>мероприятия</Link>
                    <Link to="/gallery" onClick={() => setOpen(false)}>галерея</Link>
                    <Link to="/faq" onClick={() => setOpen(false)}>faq</Link>
                </nav>
            </div>

            {/* ТЁМНЫЙ ФОН */}
            {open && <div className="overlay active" onClick={() => setOpen(false)} />}
        </>
    );
}