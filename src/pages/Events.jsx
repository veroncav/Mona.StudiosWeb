import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./events.css";
import useReveal from "../hooks/useReveal";

// Главные фото
import heroBirthday from "../assets/event-birthday.jpg";
import heroBachelorette from "../assets/event-bachelorette.jpg";
import heroKids from "../assets/event-kids.jpg";
import heroBaby from "../assets/event-babyshower.jpg";
import heroDate from "../assets/event-date.jpg";
import heroPicnic from "../assets/picnic.jpg";

// Доп фото
import birthday1 from "../assets/event-birthday-1.jpg";
import birthday2 from "../assets/event-birthday-2.jpg";
import photo2 from "../assets/photo2.jpg";

import bachelorette1 from "../assets/event-bachelorette-1.jpg";
import bachelorette2 from "../assets/event-bachelorette-2.jpg";

import kids1 from "../assets/event-kids-1.jpg";
import kids2 from "../assets/event-kids-2.jpg";

import baby1 from "../assets/event-babyshower-1.jpg";
import baby2 from "../assets/event-babyshower-2.jpg";

import date1 from "../assets/event-date-1.jpg";
import date2 from "../assets/event-date-2.jpg";

const workshopOptions = ["Картины", "Украшения", "Роспись шопперов"];

const includedList = [
    "Все материалы, закуски и напитки",
    "Мастер-класс на выбор",
    "Уютная и эстетичная атмосфера",
    "Красивые фото и смонтированное видео в подарок",
    "Проектор с фильмами и приятная музыка",
    "Чай из красивого сервиза",
    "Настольные игры",
];

const formats = [
    {
        id: "birthday",
        title: "Праздник под ключ",
        lead:
            "У нас можно отметить День Рождения, девичник или просто собраться компанией друзей/коллег и увлекательно провести время вместе!",
        text: [
            "Особенное событие с мастер-классом у нас в студии — в любой удобный день и время для вашей компании от 4 до 12 человек.",
            "Смонтированное видео в подарок о вашем празднике.",
        ],
        mainImg: heroBirthday,
        gallery: [
            { src: birthday1, alt: "День рождения — фото 1" },
            { src: birthday2, alt: "День рождения — фото 2" },
        ],
        notes: [
            "Мастер-классы на выбор: Картины, создание украшений или росписи по шопперам ",
            "Доступное время и точную стоимость можно уточнить по почте или через Direct в Инстаграм.",
        ],
        button: "Запишись",
    },
    {
        id: "bachelorette",
        title: "Девичники и Дни Рождения",
        lead:
            "Самый эстетичный повод собраться с подругами — творчество, уют и красивые кадры.",
        text: [
            "Вы выбираете мастер-класс, а мы готовим материалы, атмосферу и детали.",
            "В конце у каждой готовая работа и воспонимания с близкими.",
        ],
        mainImg: heroBachelorette,
        gallery: [
            { src: bachelorette1, alt: "Девичник — фото 1" },
            { src: bachelorette2, alt: "Девичник — фото 2" },
        ],
        notes: [
            "Все материалы, закуски  и напитки входят в стоимость.",
            "Мероприятие длится 3 часа.",
        ],
        button: "оставить заявку",
    },
    {
        id: "kids",
        title: "Детские дни рождения",
        lead:
            "Творческий праздник для детей: мастер-класс на выбор, море эмоций и веселья",
        text: [
            ".",
            "Родители могут быть рядом, в студии уютно, спокойно и красиво.",
        ],
        mainImg: heroKids,
        gallery: [
            { src: kids1, alt: "Детский праздник — фото 1" },
            { src: kids2, alt: "Детский праздник — фото 2" },
        ],
        notes: [
            "Формат подходит для детей 9+ (можно обсудить индивидуально).",
            "Декор, угощения, музыка — всё продумываем вместе.",
        ],
        button: "забронировать",
    },
    {
        id: "baby",
        title: "Baby Shower",
        lead:
            "Нежный праздник в ожидании малыша: уют, красивые детали и тёплая атмосфера.",
        text: [
            "Сервировка, декор и творческий мастер-класс — получится праздник, который запомнится.",
            "На мастер-классе участники будут раскрашивать боди для будущего малыша",
        ],
        mainImg: heroBaby,
        gallery: [
            { src: baby1, alt: "Baby shower — фото 1" },
            { src: baby2, alt: "Baby shower — фото 2" },
        ],
        notes: [
            "Все материалы, закуски и напитки включены в стоимость",
            "Мероприятие длится 3 часа",
        ],
        button: "оставить заявку",
    },
    {
        id: "date",
        title: "Арт-свидание для двоих",
        lead:
            "Увлекательный процесс совместного творчества в волшебной атмосфере.",
        text: [
            "Разделите трогательные моменты с близким человеком в сопровождении профессионального мастера.",
            "Длительность 2-2,5 часа. Пара рисует картины на одном холсте — получается одна общая работа на память.",
        ],
        mainImg: heroDate,
        gallery: [
            { src: date1, alt: "Арт-свидание — фото 1" },
            { src: date2, alt: "Арт-свидание — фото 2" },
        ],
        notes: [
            "Идеально для годовщины, предложения, сюрприза или просто вечера вдвоём.",
            "Поможем выбрать сюжет, палитру и стиль, получится красиво даже без опыта.",
        ],
        button: "забронировать",
    },
    {
        id: "outside",
        title: "Выездные мастер-классы",
        lead:
            "Мы организуем волшебное творческое мероприятие в выбранной вами локации. Событие мечты — в любом месте ✨",
        text: [
            "Весь необходимый инвентарь, оборудование и расходники",
            "Подходит для любых мероприятий",
        ],
        mainImg: heroPicnic,
        gallery: [
            { src: birthday1, alt: "Выездной МК — фото 1" },
            { src: photo2, alt: "Выездной МК — фото 2" },
        ],
        notes: [
            "Профессиональный мастер и декор включены",
            "Выезд: +10€ за человека к основному прайсу",
        ],
        button: "оставить заявку",
    },
];

function FormatBlock({ f }) {
    const [revealRef, revealVisible] = useReveal();

    return (
        <section
            className={`formatBlock reveal ${revealVisible ? "reveal-visible" : ""}`}
            id={f.id}
            ref={revealRef}
        >
            <div className="formatGrid">
                <div className="formatLeft">
                    <div className="formatMainPhoto">
                        <img src={f.mainImg} alt={f.title} />
                    </div>
                </div>

                <div className="formatRight">
                    <h2 className="formatTitle">{f.title}</h2>

                    <p className="formatLead">{f.lead}</p>

                    <div className="formatText">
                        {f.text.map((p, idx) => (
                            <p key={idx}>{p}</p>
                        ))}
                    </div>

                    <div className="formatNoteBox">
                        <div className="noteItem">
                            <span className="noteHeart">♡</span>
                            <span>{f.notes[0]}</span>
                        </div>
                        <div className="noteItem">
                            <span className="noteHeart">♡</span>
                            <span>{f.notes[1]}</span>
                        </div>
                    </div>

                    <a className="formatCta" href="#request">
                        {f.button}
                    </a>
                </div>

                <div className="formatGallery">
                    {f.gallery.map((img, idx) => (
                        <div className="galleryPhoto" key={idx}>
                            <img src={img.src} alt={img.alt} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function Events() {
    const location = useLocation();

    const [heroRef, heroVisible] = useReveal();
    const [includedRef, includedVisible] = useReveal();
    const [workshopRef, workshopVisible] = useReveal();
    const [requestRef, requestVisible] = useReveal();

    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (location.hash) {
            const el = document.querySelector(location.hash);

            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
            }
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.contact || !formData.email || !formData.message) {
            setIsError(true);
            setStatusMessage("Заполните все поля");
            return;
        }

        try {
            setLoading(true);
            setIsError(false);
            setStatusMessage("");

            const response = await fetch("http://localhost:5001/api/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Ошибка отправки заявки");
            }

            setStatusMessage("Спасибо! Ваша заявка отправлена");
            setFormData({
                name: "",
                contact: "",
                email: "",
                message: "",
            });
        } catch (error) {
            setIsError(true);
            setStatusMessage(error.message || "Не удалось отправить заявку");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="eventsPage">
            <section
                className={`eventsHero reveal ${heroVisible ? "reveal-visible" : ""}`}
                ref={heroRef}
            >
                <div className="eventsContainer">
                    <h1 className="eventsTitle">Твой праздник у нас</h1>

                    <p className="eventsLead">
                        У нас можно отметить День Рождения, девичник, детский праздник,
                        устроить арт-свидание или Baby Shower и провести время красиво и
                        увлекательно!
                    </p>

                    <div className="eventsActions">
                        <a className="eBtn eBtn--primary" href="#request">
                            Оставить заявку
                        </a>
                        <a className="eBtn eBtn--outline" href="#included">
                            Что входит
                        </a>
                    </div>

                    <div className="formatAnchors">
                        <a href="#birthday">Праздник под ключ</a>
                        <a href="#bachelorette">Девичники и дни рождения</a>
                        <a href="#kids">Детский ДР</a>
                        <a href="#baby">Baby Shower</a>
                        <a href="#date">Арт-свидание</a>
                        <a href="#outside">Выездные мастер-классы</a>
                    </div>
                </div>
            </section>

            <section className="eventsSection">
                <div className="eventsContainer">
                    <div className="eventsGridSingle">
                        <div className="eventsCol">
                            {formats.map((f) => (
                                <FormatBlock key={f.id} f={f} />
                            ))}

                            <div
                                className={`eCard eCard--pink reveal-left ${includedVisible ? "reveal-visible" : ""}`}
                                id="included"
                                ref={includedRef}
                            >
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

                            <div
                                className={`eCard reveal-right ${workshopVisible ? "reveal-visible" : ""}`}
                                ref={workshopRef}
                            >
                                <h2 className="eH2">Мастер-класс на выбор</h2>
                                <div className="ePills">
                                    {workshopOptions.map((w) => (
                                        <span className="ePill" key={w}>
                                            {w}
                                        </span>
                                    ))}
                                </div>

                                <div className="eSmallNote">
                                    * Подробнее — на странице{" "}
                                    <a className="eInlineLink" href="/workshops">
                                        мастер-классов
                                    </a>
                                    .
                                </div>
                            </div>

                            <div
                                className={`request reveal ${requestVisible ? "reveal-visible" : ""}`}
                                id="request"
                                ref={requestRef}
                            >
                                <div className="request__left">
                                    <h2 className="eH2">Оставить заявку</h2>
                                    <p className="eText">
                                        Напиши дату, количество людей и какой формат хочется — мы ответим
                                        и предложим варианты.
                                    </p>
                                </div>

                                <form className="request__form" onSubmit={handleSubmit}>
                                    <label className="field">
                                        Имя
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Ваше имя"
                                        />
                                    </label>

                                    <label className="field">
                                        Контакт
                                        <input
                                            name="contact"
                                            value={formData.contact}
                                            onChange={handleChange}
                                            placeholder="+372…/ Instagram"
                                        />
                                    </label>

                                    <label className="field">
                                        Email
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Ваш email"
                                        />
                                    </label>

                                    <label className="field field--full">
                                        Сообщение
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder="Дата, кол-во человек, формат, пожелания"
                                        />
                                    </label>

                                    <button
                                        className="eBtn eBtn--primary eBtn--wide"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? "отправка..." : "отправить"}
                                    </button>

                                    {statusMessage && (
                                        <div
                                            className="eSmallNote"
                                            style={{
                                                color: isError ? "#b42318" : "#7a5c61",
                                            }}
                                        >
                                            {statusMessage}
                                        </div>
                                    )}
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}