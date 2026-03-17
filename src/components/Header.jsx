import { Link } from "react-router-dom";
import logoImg from "../assets/logomona.jpg";
import "./header.css";

export default function Header() {
    return (
        <header className="header">

            <div className="header__inner">

                {/* Логотип */}
                <Link to="/" className="header__logoLink">
                    <img src={logoImg} className="header__logo" alt="Mona Studios" />
                </Link>

                {/* Навигация */}
                <nav className="header__nav">
                    <Link to="/about">о студии</Link>
                    <Link to="/workshops">мастер-классы</Link>
                    <Link to="/schedule">расписание</Link>
                    <Link to="/events">мероприятия</Link>
                    <Link to="/gallery">галерея</Link>
                    <Link to="/faq">faq</Link>
                    <Link to="/contact">контакты</Link>
                </nav>

                {/* Кнопка */}
                <Link to="/contact" className="header__btn">
                    записаться
                </Link>

            </div>

        </header>
    );
}