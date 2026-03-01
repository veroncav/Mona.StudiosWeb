import { Link } from "react-router-dom";
import logoImg from "../assets/logomona.jpg";
import "../pages/home.css";

export default function Header() {
    return (
        <header className="header">
            <Link to="/" className="header__logoLink">
                <img src={logoImg} className="header__logo" alt="Mona Studios" />
            </Link>

            <Link to="/contact" className="header__btn">
                записаться
            </Link>
        </header>
    );
}