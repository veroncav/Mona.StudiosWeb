import "./events.css";

// Главные фото
import heroBirthday from "../assets/event-birthday.jpg";
import heroBachelorette from "../assets/event-bachelorette.jpg";
import heroKids from "../assets/event-kids.jpg";
import heroBaby from "../assets/event-babyshower.jpg";
import heroDate from "../assets/event-date.jpg";

// Доп фото (по 2 на формат)
import birthday1 from "../assets/event-birthday-1.jpg";
import birthday2 from "../assets/event-birthday-2.jpg";

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
            "Особенное событие с мастер-классом у нас в студии — в любой удобный день и время для вашей компании до 12 человек.",
            "Можно дополнить формат декором и красивой сервировкой — чтобы получились памятные фото и видео.",
        ],
        mainImg: heroBirthday,
        gallery: [
            { src: birthday1, alt: "День рождения — фото 1" },
            { src: birthday2, alt: "День рождения — фото 2" },
        ],
        notes: [
            "Мастер-классы по картинам, украшениям, росписи шопперов и другим направлениям!",
            "Все доступные мастер-классы и точную стоимость уточняйте у менеджера.",
        ],
        button: "онлайн-запись",
    },
    {
        id: "bachelorette",
        title: "Девичники",
        lead:
            "Самый эстетичный повод собраться с подругами — творчество, уют и красивые кадры.",
        text: [
            "Вы выбираете мастер-класс и настроение (нежно/ярко), а мы готовим материалы, атмосферу и детали.",
            "В конце у каждой — готовая работа и контент на память.",
        ],
        mainImg: heroBachelorette,
        gallery: [
            { src: bachelorette1, alt: "Девичник — фото 1" },
            { src: bachelorette2, alt: "Девичник — фото 2" },
        ],
        notes: [
            "Можно сделать тематический девичник: pink party, bridal mood, кино-вечер с проектором.",
            "Подстроим тайминг: 1.5–3 часа, комфортно и красиво.",
        ],
        button: "оставить заявку",
    },
    {
        id: "kids",
        title: "Детские дни рождения",
        lead:
            "Творческий праздник для детей: понятный мастер-класс, безопасные материалы и море эмоций.",
        text: [
            "Подберём мастер-класс по возрасту и интересам. Можно добавить игры и небольшой сценарий.",
            "Родители могут быть рядом — в студии уютно, спокойно и красиво.",
        ],
        mainImg: heroKids,
        gallery: [
            { src: kids1, alt: "Детский праздник — фото 1" },
            { src: kids2, alt: "Детский праздник — фото 2" },
        ],
        notes: [
            "Формат подходит для детей 5+ (можно обсудить индивидуально).",
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
            "Можно сделать спокойный чайный формат или более праздничный с сюрпризами.",
        ],
        mainImg: heroBaby,
        gallery: [
            { src: baby1, alt: "Baby shower — фото 1" },
            { src: baby2, alt: "Baby shower — фото 2" },
        ],
        notes: [
            "Поможем подобрать стиль: pastel / neutral / pink / blue.",
            "Сделаем всё аккуратно и эстетично — как на Pinterest.",
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
            "Длительность 1,5–2 часа. Пара рисует картины на одном холсте — получается одна общая работа на память.",
        ],
        mainImg: heroDate,
        gallery: [
            { src: date1, alt: "Арт-свидание — фото 1" },
            { src: date2, alt: "Арт-свидание — фото 2" },
        ],
        notes: [
            "Идеально для годовщины, предложения, сюрприза или просто вечера вдвоём.",
            "Поможем выбрать сюжет, палитру и стиль — получится красиво даже без опыта.",
        ],
        button: "забронировать",
    },
];

function FormatBlock({ f }) {
    return (
        <section className="formatBlock" id={f.id}>
            <div className="formatGrid">
                {/* LEFT: big photo */}
                <div className="formatLeft">
                    <div className="formatMainPhoto">
                        <img src={f.mainImg} alt={f.title} />
                    </div>
                </div>

                {/* RIGHT: text and notes */}
                <div className="formatRight">
                    <h2 className="formatTitle">{f.title}</h2>

                    <p className="formatLead">{f.lead}</p>

                    <div className="formatText">
                        {f.text.map((p) => (
                            <p key={p}>{p}</p>
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

                {/* small photos under the text (like reference) */}
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
    return (
        <div className="eventsPage">
            <section className="eventsHero">
                <div className="eventsContainer">
                    <h1 className="eventsTitle">Твой праздник у нас</h1>

                    <p className="eventsLead">
                        У нас можно отметить День Рождения, девичник, детский праздник,
                        устроить арт-свидание или Baby Shower — и провести время красиво и
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
                        <a href="#birthday">Праздник</a>
                        <a href="#bachelorette">Девичник</a>
                        <a href="#kids">Детский ДР</a>
                        <a href="#baby">Baby Shower</a>
                        <a href="#date">Арт-свидание</a>
                    </div>
                </div>
            </section>

            <section className="eventsSection">
                <div className="eventsContainer">
                    <div className="eventsGridSingle">
                        {/* FORMATS */}
                        <div className="eventsCol">
                            {formats.map((f) => (
                                <FormatBlock key={f.id} f={f} />
                            ))}

                            {/* INCLUDED */}
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

                            {/* WORKSHOPS */}
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
                                    * Подробнее — на странице{" "}
                                    <a className="eInlineLink" href="/workshops">
                                        мастер-классов
                                    </a>
                                    .
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* REQUEST */}
                    <div className="request" id="request">
                        <div className="request__left">
                            <h2 className="eH2">Оставить заявку</h2>
                            <p className="eText">
                                Напиши дату, количество людей и какой формат хочется — мы ответим
                                и предложим варианты.
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
                                <textarea
                                    rows={4}
                                    placeholder="Дата, кол-во человек, формат, пожелания"
                                />
                            </label>

                            <button className="eBtn eBtn--primary eBtn--wide" type="button">
                                отправить
                            </button>

                            <div className="eSmallNote">* демо-форма</div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}