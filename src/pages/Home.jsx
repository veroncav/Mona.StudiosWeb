import "./home.css";
import mainImg from "../assets/main.png";
import aboutImg from "../assets/about1.jpg";
import jewelryImg from "../assets/jewelry.jpg";
import paintingsImg from "../assets/paintings.jpg";
import totebagsImg from "../assets/totebags.jpg";
import atmo1 from "../assets/atmo1.jpg";
import atmo2 from "../assets/atmo2.jpg";
import eventsVideo from "../assets/events.mp4";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import useReveal from "../hooks/useReveal";

export default function Home() {
    const [heroRef, heroVisible] = useReveal();
    const [aboutRef, aboutVisible] = useReveal();
    const [workshopsRef, workshopsVisible] = useReveal();
    const [celebrationRef, celebrationVisible] = useReveal();
    const [contactsRef, contactsVisible] = useReveal();

    const formats = [
        { title: "Праздник под ключ", link: "/events#birthday" },
        { title: "Девичники и дни рождения", link: "/events#bachelorette" },
        { title: "Детский ДР", link: "/events#kids" },
        { title: "Baby Shower", link: "/events#baby" },
        { title: "Арт-свидание", link: "/events#date" },
        { title: "Выездные мастер-классы", link: "/events#outside" },
    ];

    return (
        <div className="home">
            {/* HERO */}
            <div
                ref={heroRef}
                className={`hero__frame reveal ${heroVisible ? "reveal-visible" : ""}`}
            >
                <img className="hero__img" src={mainImg} alt="Mona Studios" />
                <div className="hero__buttons">
                    <Link to="/events" className="hero__btn hero__btn--primary">
                        Твой праздник у нас
                    </Link>
                    <Link to="/schedule" className="hero__btn hero__btn--secondary">
                        Расписание мастер-классов
                    </Link>
                </div>
            </div>

            {/* ABOUT */}
            <section
                ref={aboutRef}
                className={`about reveal ${aboutVisible ? "reveal-visible" : ""}`}
            >
                <h2 className="about__title">О студии Mona</h2>
                <div className="about__content">
                    <div className="about__textBlock">
                        <div className="about__card">
                            <span className="about__heart">♥</span>
                            <p>
                                Мы студия по организации душевных мастер-классов и особенных праздников. Пропитанное любовью и уютом пространство в Таллинне. Создаём для Вас незабываемые мероприятия с 2024 года!
                            </p>
                        </div>
                        <div className="about__card about__card--pink">
                            <span className="about__heart">♥</span>

                            <p>
                                Здесь можно расслабиться, творить и создать красивый результат своими руками.
                            </p>
                        </div>
                    </div>
                    <div className="about__imageBlock">
                        <img src={aboutImg} alt="Studio" />
                    </div>
                </div>
            </section>

            {/* WORKSHOPS */}
            <section
                ref={workshopsRef}
                className={`workshops reveal ${workshopsVisible ? "reveal-visible" : ""}`}
                id="workshops"
            >
                <div className="workshops__container">
                    <div className="workshops__head">
                        <div>
                            <h2 className="workshops__title">Мастер-классы</h2>
                            <p className="workshops__text">
                                Мы проводим эстетичные творческие мастер-классы в группах по нашему расписанию, а также
                                организовываем индивидуальные мероприятия от 2-х человек как в студии, так и на выезд!
                            </p>
                        </div>
                        <a className="workshops__cta" href="#book">записаться</a>
                    </div>

                    <div className="workshops__grid">
                        <article className="wsCard">
                            <img className="wsCard__img" src={jewelryImg} alt="Украшения" />
                            <div className="wsCard__body">
                                <h3 className="wsCard__title">Украшения</h3>
                                <p className="wsCard__meta">2 часа • материалы включены</p>
                                <a className="wsCard__link" href="/workshops#jewelry">подробнее →</a>
                            </div>
                        </article>

                        <article className="wsCard">
                            <img className="wsCard__img" src={paintingsImg} alt="Живопись" />
                            <div className="wsCard__body">
                                <h3 className="wsCard__title">Живопись</h3>
                                <p className="wsCard__meta">2 часа • для новичков</p>
                                <a className="wsCard__link" href="/workshops#paintings">подробнее →</a>
                            </div>
                        </article>

                        <article className="wsCard">
                            <img className="wsCard__img" src={totebagsImg} alt="Шопперы" />
                            <div className="wsCard__body">
                                <h3 className="wsCard__title">Шопперы</h3>
                                <p className="wsCard__meta">1.5–2 часа • свой дизайн</p>
                                <a className="wsCard__link" href="/workshops#totebags">подробнее →</a>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* CELEBRATION */}
            <section
                ref={celebrationRef}
                className={`celebration reveal ${celebrationVisible ? "reveal-visible" : ""}`}
            >
                <div className="celebration__container">
                    <h2 className="celebration__title">Твой праздник у нас</h2>
                    <p className="celebration__lead">
                        У нас можно отметить День Рождения, девичник, детский праздник, устроить арт-свидание или Baby Shower и провести время красиво и увлекательно!
                    </p>

                    <div className="celebration__content">
                        <div className="celebration__videoBlock">
                            <video src={eventsVideo} autoPlay muted loop />
                        </div>
                        <div className="celebration__photos">
                            <img src={atmo1} alt="Праздник" />
                            <img src={atmo2} alt="Атмосфера" />
                        </div>
                    </div>

                    <div className="celebration__textBlock">
                        <h3 className="celebration__subtitle">Праздник под ключ</h3>

                        <p>
                            ♥ Мастер-класс на выбор: Картины на холсте, создание украшений или росписи по шопперам
                        </p>

                        <p>
                            ♥ Особенное событие с мастер-классом у нас в студии — в любой удобный день и время
                            для вашей компании от 4 до 12 человек.
                        </p>

                        <p>
                            ♥ Смонтированное видео в подарок о вашем празднике.
                        </p>
                    </div>

                    <div className="celebration__info">
                        <Link to="/events" className="celebration__cta">Оставить заявку</Link>

                        <div className="celebration__formats">
                            {formats.map((f, idx) => (
                                <a key={idx} href={f.link} className="celebration__format">
                                    {f.title}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section
                ref={contactsRef}
                className={`contacts reveal ${contactsVisible ? "reveal-visible" : ""}`}
            >
                <div className="contacts__container">
                    <h2 className="contacts__title">Контакты</h2>

                    <div className="contacts__grid">
                        <div className="contacts__card">
                            <p><strong>📍 Локация</strong></p>
                            <p>Türi tn 6, Tallinn, Estonia</p>
                        </div>

                        <div className="contacts__card">
                            <p><strong>📩 Связаться с нами </strong></p>
                            <p>
                                <a
                                    href="https://www.instagram.com/mona.studios/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        fontWeight: "500"
                                    }}
                                >
                                    <FaInstagram size={24} color="#E1306C" />
                                    <span>@mona.studios</span>
                                </a>
                            </p>
                            <p>Email: monastudios@email.com</p>

                            <Link to="/contact" className="contacts__btn">
                                Связаться с нами
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <div id="book" className="bookAnchor" />
        </div>
    );
}