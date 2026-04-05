import "./contact.css";
import { FaInstagram, FaEnvelope } from "react-icons/fa";
import useReveal from "../hooks/useReveal";

export default function Contact() {
    const [titleRef, titleVisible] = useReveal();
    const [cardsRef, cardsVisible] = useReveal();
    const [addressRef, addressVisible] = useReveal();
    const [mapRef, mapVisible] = useReveal();
    const [buttonsRef, buttonsVisible] = useReveal();
    const [requestRef, requestVisible] = useReveal();

    return (
        <div className="contactPage">
            <div className="contactContainer">
                <div
                    ref={titleRef}
                    className={`reveal ${titleVisible ? "reveal-visible" : ""}`}
                >
                    <h1 className="contactTitle">Связаться с нами</h1>

                    <p className="contactLead">
                        Если у вас остались какие-либо вопросы или вы хотите прислать нам
                        свое предложение — напишите нам
                    </p>
                </div>

                <div
                    ref={cardsRef}
                    className={`contactCards reveal-left ${cardsVisible ? "reveal-visible" : ""}`}
                >
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

                <div
                    ref={addressRef}
                    className={`contactAddress reveal-right ${addressVisible ? "reveal-visible" : ""}`}
                >
                    Адрес: Tallinn, Türi tn 6
                </div>

                <div
                    ref={mapRef}
                    className={`contactMap reveal ${mapVisible ? "reveal-visible" : ""}`}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d179.44897347418134!2d24.7430868134029!3d59.41250191110372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692951661f974a1%3A0xbd5baed76c2b75e7!2sMona%20Studios!5e0!3m2!1sen!2see!4v1775389298856!5m2!1sen!2see"
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mona Studios map"
                    ></iframe>
                </div>

                <div
                    ref={buttonsRef}
                    className={`contactBottomActions reveal ${buttonsVisible ? "reveal-visible" : ""}`}
                >
                    <a href="/schedule" className="contactBtn">
                        запись на МК
                    </a>

                    <a href="/events" className="contactBtn contactBtn--outline">
                        хочу свой праздник
                    </a>
                </div>

                <div
                    ref={requestRef}
                    className={`request reveal ${requestVisible ? "reveal-visible" : ""}`}
                >
                    <div className="request__left">
                        <h2 className="requestTitle">Оставить заявку</h2>
                        <p className="requestText">
                            Напишите дату, количество людей и какой формат хочется —
                            мы ответим и предложим варианты.
                        </p>
                    </div>

                    <form className="request__form">
                        <label className="field">
                            Имя
                            <input type="text" placeholder="Ваше имя" />
                        </label>

                        <label className="field">
                            Контакт
                            <input type="text" placeholder="+372… / Telegram / Instagram" />
                        </label>

                        <label className="field field--full">
                            Сообщение
                            <textarea
                                rows={4}
                                placeholder="Дата, кол-во человек, формат, пожелания"
                            />
                        </label>

                        <button className="contactBtn field--full" type="button">
                            отправить
                        </button>

                        <div className="requestNote field--full">* демо-форма</div>
                    </form>
                </div>
            </div>
        </div>
    );
}