import "./events.css";
import eventsVideo from "../assets/events.mp4";

const workshopOptions = [
    "Живопись (Pinterest style)",
    "Украшения (браслеты/серьги)",
    "Роспись шопперов",
    "Свечи и арома-саше",
    "Кремовая флористика",
    "Бенто-тортики",
];

const includedList = [
    "Все материалы, закуски и напитки",
    "Мастер-класс на выбор",
    "Уютная и эстетичная атмосфера",
    "Красивые фото и смонтированное видео в подарок",
    "Проектор с фильмами и приятная музыка",
    "Чай из красивого сервиза",
    "Настольные игры",
];

export default function Events() {
    return (
        <div className="eventsPage">
            {/* HERO */}
            <section className="eventsHero">
                <div className="eventsContainer">
                    <h1 className="eventsTitle">Твой праздник у нас</h1>

                    <p className="eventsLead">
                        У нас можно отметить День Рождения, девичник, устроить свидание или просто
                        собраться компанией друзей или коллег и увлекательно провести время вместе!
                    </p>

                    <div className="eventsBadges">
                        <span className="eChip">до 12 человек</span>
                        <span className="eChip">любой день и время</span>
                        <span className="eChip">мастер-класс на выбор</span>
                    </div>

                    <div className="eventsActions">
                        <a className="eBtn eBtn--primary" href="#request">Оставить заявку</a>
                        <a className="eBtn eBtn--outline" href="#included">Что входит</a>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="eventsSection">
                <div className="eventsContainer">
                    <div className="eventsGrid">
                        {/* Left: text blocks */}
                        <div className="eventsCol">
                            <div className="eCard">
                                <h2 className="eH2">Особенное событие с мастер-классом</h2>
                                <p className="eText">
                                    Организуем мероприятие в нашей студии{" "}
                                    <b>в любой удобный день и время</b> для вашей компании{" "}
                                    <b>до 12 человек</b>. Поможем выбрать формат, подготовим материалы и создадим
                                    атмосферу — вам останется просто наслаждаться процессом.
                                </p>
                            </div>

                            <div className="eCard eCard--pink" id="included">
                                <h2 className="eH2">В стоимость входит</h2>
                                <ul className="eList">
                                    {includedList.map((item) => (
                                        <li key={item}>
                                            <span className="eHeart">♡</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="eCard">
                                <h2 className="eH2">Мастер-класс на выбор</h2>
                                <div className="ePills">
                                    {workshopOptions.map((w) => (
                                        <span className="ePill" key={w}>
                      {w}
                    </span>
                                    ))}
                                </div>

                                <div className="eSmallNote">
                                    * Если хочешь, мы можем собрать индивидуальный формат и тайминг под вашу компанию.
                                </div>
                            </div>
                        </div>

                        {/* Right: video */}
                        <div className="eventsCol">
                            <div className="videoCard">
                                <div className="videoTop">
                                    <div className="videoTitle">Как это выглядит</div>
                                    <div className="videoSub">атмосфера студии • эмоции • результат</div>
                                </div>

                                <video
                                    className="video"
                                    src={eventsVideo}
                                    controls
                                    playsInline
                                />

                                <div className="videoFooter">
                                    <a className="eLink" href="/schedule">смотреть расписание →</a>
                                    <a className="eLink" href="/workshops">все мастер-классы →</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* REQUEST */}
                    <div className="request" id="request">
                        <div className="request__left">
                            <h2 className="eH2">Оставить заявку</h2>
                            <p className="eText">
                                Напиши дату, количество людей и какой формат хочется — мы ответим и предложим варианты.
                            </p>
                        </div>

                        <form className="request__form">
                            <label className="field">
                                Имя
                                <input placeholder="Ваше имя" />
                            </label>

                            <label className="field">
                                Контакт
                                <input placeholder="+372… / Telegram / Instagram" />
                            </label>

                            <label className="field field--full">
                                Сообщение
                                <textarea rows={4} placeholder="Дата, кол-во человек, какой мастер-класс, пожелания" />
                            </label>

                            <button className="eBtn eBtn--primary eBtn--wide" type="button">
                                отправить
                            </button>

                            <div className="eSmallNote">
                                * демо-форма для диплома (позже можно подключить EmailJS/Telegram).
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}