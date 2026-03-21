import { Link } from "react-router-dom";
import logoImg from "../assets/logomona.jpg";
import "./header.css";

export default function Header() {
    return (
        <header className="appHeader">
            <div className="appHeader__inner">
                <nav className="appHeader__nav">
                    <Link to="/about">о студии</Link>
                    <Link to="/workshops">мастер-классы</Link>
                    <Link to="/schedule">расписание</Link>
                    <Link to="/events">мероприятия</Link>
                    <Link to="/gallery">галерея</Link>
                    <Link to="/faq">faq</Link>
                </nav>

                <Link to="/" className="appHeader__logoLink">
                    <img src={logoImg} className="appHeader__logo" alt="Mona Studios" />
                </Link>

                <Link to="/contact" className="appHeader__btn">
                    записаться
                </Link>
            </div>
        </header>
    );
}