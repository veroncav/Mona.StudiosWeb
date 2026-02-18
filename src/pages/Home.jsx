import "./home.css";

const workshops = [
    { title: "Бенто-тортики", tag: "Sweet", meta: "2–2.5 часа • от 45€" },
    { title: "Кремовая флористика", tag: "Flowers", meta: "2 часа • от 49€" },
    { title: "Свечи и арома-саше", tag: "Aroma", meta: "1.5–2 часа • от 39€" },
    { title: "Украшения", tag: "Jewelry", meta: "2 часа • от 45€" },
    { title: "Картина в стиле Pinterest", tag: "Art", meta: "2 часа • от 45€" },
    { title: "Сезонный мастер-класс", tag: "Season", meta: "по расписанию" },
];

export default function Home() {
    return (
        <div className="home">
            {/* HERO */}
            <section className="hero">
                <div className="container hero__inner">
                    <div className="hero__content">
                        <div className="pill">Mona Studios • Tallinn</div>
                        <h1 className="h1">Творческая студия для мастер-классов и событий</h1>
                        <p className="lead">
                            Атмосфера уюта, эстетики и заботы. Форматы для новичков и для компаний —
                            сделаем красиво и спокойно.
                        </p>

                        <div className="hero__actions">
                            <a className="btn btn--primary" href="#book">Записаться</a>
                            <a className="btn btn--ghost" href="/workshops">Мастер-классы</a>
                        </div>
                    </div>

                    <div className="hero__card">
                        <div className="hero__cardTitle">Ближайшие форматы</div>
                        <ul className="miniList">
                            <li>Группы по расписанию</li>
                            <li>События под ключ</li>
                            <li>Сертификаты</li>
                        </ul>
                        <div className="note">* для диплома можно оставить как “демо”</div>
                    </div>
                </div>
            </section>

            {/* ABOUT */}
            <section className="section">
                <div className="container">
                    <header className="section__head">
                        <h2 className="h2">О студии</h2>
                        <p className="muted">
                            Пространство, где можно выдохнуть, творить и уйти с красивым результатом.
                        </p>
                    </header>

                    <div className="grid2">
                        <div className="panel">
                            <p>
                                Mona Studios — мастер-классы в стиле Pinterest, мероприятия для друзей
                                и компаний, и эстетика в деталях.
                            </p>
                            <div className="chips">
                                <span className="chip">Подходит новичкам</span>
                                <span className="chip">Материалы включены</span>
                                <span className="chip">Уютная атмосфера</span>
                            </div>
                        </div>

                        <div className="panel panel--accent">
                            <h3 className="h3">Мероприятие под ключ</h3>
                            <p className="muted">
                                День рождения, девичник, свидание, корпоратив — подберём формат и тайминг.
                            </p>
                            <a className="btn btn--primary" href="/events">Смотреть форматы</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* WORKSHOPS */}
            <section className="section">
                <div className="container">
                    <header className="section__head">
                        <h2 className="h2">Мастер-классы</h2>
                        <p className="muted">Популярные форматы — аккуратно, красиво, без суеты.</p>
                    </header>

                    <div className="grid3">
                        {workshops.map((w) => (
                            <article key={w.title} className="card">
                                <div className="badge">{w.tag}</div>
                                <h3 className="h3">{w.title}</h3>
                                <p className="muted">{w.meta}</p>
                                <a className="link" href="/workshops">подробнее →</a>
                            </article>
                        ))}
                    </div>

                    <div className="center">
                        <a className="btn btn--ghost" href="/workshops">Все мастер-классы</a>
                    </div>
                </div>
            </section>

            {/* GIFT */}
            <section className="section">
                <div className="container">
                    <div className="callout">
                        <div>
                            <h3 className="h3">Подарочные сертификаты</h3>
                            <p className="muted">
                                Лучший подарок — эмоции. Сертификат на сумму или конкретный формат.
                            </p>
                        </div>
                        <a className="btn btn--primary" href="/gift-cards">О сертификатах</a>
                    </div>
                </div>
            </section>

            {/* BOOK */}
            <section id="book" className="section">
                <div className="container">
                    <header className="section__head">
                        <h2 className="h2">Записаться</h2>
                        <p className="muted">Оставь заявку — ответим и подберём формат.</p>
                    </header>

                    <form className="form">
                        <div className="form__row">
                            <label>
                                Имя
                                <input placeholder="Ваше имя" required />
                            </label>
                            <label>
                                Контакт
                                <input placeholder="+372… / @telegram" required />
                            </label>
                        </div>
                        <label>
                            Сообщение
                            <textarea rows={4} placeholder="Что хотите? дата, кол-во человек, формат" />
                        </label>
                        <button className="btn btn--primary" type="submit">Отправить</button>
                        <p className="muted" style={{ marginTop: 10 }}>
                            * демо-форма для диплома (позже можно подключить EmailJS)
                        </p>
                    </form>
                </div>
            </section>
        </div>
    );
}
