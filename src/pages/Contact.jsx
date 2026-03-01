import "./contact.css";
import { FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Contact() {
    return (
        <div className="contactPage">
            <div className="contactContainer">

                <h1 className="contactTitle">Связаться с нами</h1>

                <p className="contactLead">
                    Если у вас остались какие-либо вопросы или вы хотите прислать нам
                    свое предложение — напишите нам
                </p>

                <div className="contactCards">

                    {/* Instagram */}
                    <a
                        href="https://instagram.com/mona.studios"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contactCard"
                    >
                        <FaInstagram className="contactIcon" />
                        <div>
                            <div className="contactLabel">Instagram</div>
                            <div className="contactValue">@mona.studios</div>
                        </div>
                    </a>

                    {/* Email */}
                    <a
                        href="mailto:monastuudio@gmail.com"
                        className="contactCard"
                    >
                        <FaEnvelope className="contactIcon" />
                        <div>
                            <div className="contactLabel">Email</div>
                            <div className="contactValue">monastuudio@gmail.com</div>
                        </div>
                    </a>

                </div>

                <div className="contactAddress">
                    Tallinn, Türi tn 6
                </div>

            </div>
        </div>
    );
}