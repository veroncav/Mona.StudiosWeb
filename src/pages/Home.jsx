import "./home.css";
import mainImg from "../assets/main.png";
import aboutImg from "../assets/about1.jpg";
import jewelryImg from "../assets/jewelry.jpg";
import paintingsImg from "../assets/paintings.jpg";
import totebagsImg from "../assets/totebags.jpg";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="home">

            {/* HERO */}
            <div className="hero__frame">
                <img className="hero__img" src={mainImg} alt="Mona Studios"/>

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
            <section className="about">
                <h2 className="about__title">О студии Mona</h2>

                <div className="about__content">
                    {/* текст */}
                    <div className="about__textBlock">
                        <div className="about__card">
                            <span className="about__heart">♥</span>
                            <p>
                                Mona Studios — творческая студия в Таллинне, где создаются душевные
                                мастер-классы и особенные события. Это пространство, наполненное
                                эстетикой, уютом и вниманием к каждой детали.
                            </p>
                        </div>

                        <div className="about__card about__card--pink">
                            <span className="about__heart">♥</span>
                            <p>
                                С 2024 года мы создаём незабываемые впечатления для каждого гостя.
                                Здесь можно расслабиться, творить в спокойной атмосфере и
                                воплотить свои идеи в красивый результат.
                            </p>
                        </div>
                    </div>

                    {/* фото */}
                    <div className="about__imageBlock">
                        <img src={aboutImg} alt="Studio"/>
                    </div>
                </div>
            </section>

            {/* WORKSHOPS (на главной) */}
            <section className="workshops" id="workshops">
                <div className="workshops__container">
                    <div className="workshops__head">
                        <div>
                            <h2 className="workshops__title">Мастер-классы</h2>
                            <p className="workshops__text">
                                Мы проводим творческие мастер-классы в стиле Pinterest в группах по нашему расписанию,
                                а также организовываем индивидуальные мероприятия от 2-х человек в любую удобную дату!
                            </p>
                        </div>

                        <a className="workshops__cta" href="#book">записаться</a>
                    </div>

                    <div className="workshops__grid">
                        <article className="wsCard">
                            <img className="wsCard__img" src={jewelryImg} alt="Украшения"/>
                            <div className="wsCard__body">
                                <h3 className="wsCard__title">Украшения</h3>
                                <p className="wsCard__meta">2 часа • материалы включены</p>
                                <a className="wsCard__link" href="/workshops#jewelry">подробнее →</a>
                            </div>
                        </article>

                        <article className="wsCard">
                            <img className="wsCard__img" src={paintingsImg} alt="Живопись"/>
                            <div className="wsCard__body">
                                <h3 className="wsCard__title">Живопись</h3>
                                <p className="wsCard__meta">2 часа • формат для новичков</p>
                                <a className="wsCard__link" href="/workshops#paintings">подробнее →</a>
                            </div>
                        </article>

                        <article className="wsCard">
                            <img className="wsCard__img" src={totebagsImg} alt="Роспись шопперов"/>
                            <div className="wsCard__body">
                                <h3 className="wsCard__title">Роспись шопперов</h3>
                                <p className="wsCard__meta">1.5–2 часа • свой дизайн</p>
                                <a className="wsCard__link" href="/workshops#totebags">подробнее →</a>
                            </div>
                        </article>
                    </div>

                    <div className="workshops__footer">
                        <a className="workshops__all" href="/workshops">Все мастер-классы →</a>
                    </div>
                </div>
            </section>

            {/* якорь для кнопок "записаться" */}
            <div id="book" className="bookAnchor"/>
        </div>
    );
}