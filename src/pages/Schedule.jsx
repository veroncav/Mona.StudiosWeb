import "./schedule.css";

const scheduleData = [
    {
        date: "Сб, 9 марта",
        time: "12:00",
        title: "Живопись (Pinterest style)",
        duration: "2 часа",
        price: "45€",
        spots: "осталось 6 мест",
    },
    {
        date: "Сб, 9 марта",
        time: "15:30",
        title: "Украшения (браслет + серьги)",
        duration: "2 часа",
        price: "45€",
        spots: "осталось 4 места",
    },
    {
        date: "Вс, 10 марта",
        time: "12:00",
        title: "Роспись шопперов",
        duration: "1.5–2 часа",
        price: "39€",
        spots: "осталось 8 мест",
    },
    {
        date: "Вс, 10 марта",
        time: "16:00",
        title: "Свечи + арома-саше",
        duration: "2 часа",
        price: "39€",
        spots: "осталось 5 мест",
    },
];

export default function Schedule() {
    return (
        <div className="schedulePage">
            <header className="scheduleHero">
                <div className="scheduleContainer">
                    <h1 className="scheduleTitle">Расписание мастер-классов</h1>
                    <p className="scheduleLead">
                        Групповые занятия по расписанию. Можно прийти одной/одному или с друзьями — материалы включены.
                    </p>

                    <div className="scheduleActions">
                        <a className="sBtn sBtn--primary" href="#list">Смотреть даты</a>
                        <a className="sBtn sBtn--outline" href="/events">Хочу свой праздник</a>
                    </div>
                </div>
            </header>

            <main className="scheduleMain" id="list">
                <div className="scheduleContainer">
                    <div className="scheduleGrid">
                        {scheduleData.map((item, idx) => (
                            <article className="slotCard" key={idx}>
                                <div className="slotTop">
                                    <div className="slotDate">{item.date}</div>
                                    <div className="slotTime">{item.time}</div>
                                </div>

                                <h3 className="slotTitle">{item.title}</h3>

                                <div className="slotMeta">
                                    <span className="chip">{item.duration}</span>
                                    <span className="chip">{item.price}</span>
                                    <span className="chip chip--muted">{item.spots}</span>
                                </div>

                                <div className="slotBottom">
                                    <a className="sBtn sBtn--primary sBtn--small" href="/contact">
                                        записаться
                                    </a>
                                    <a className="sLink" href="/workshops">
                                        подробнее →
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>

                    <section className="noteBlock">
                        <h2 className="noteTitle">Как записаться</h2>
                        <p className="noteText">
                            Пока это демо-версия для диплома: кнопка ведёт на страницу контактов.
                            Позже можно подключить форму (EmailJS/Telegram) и админ-панель.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}