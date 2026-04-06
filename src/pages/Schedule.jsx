import "./schedule.css";
import { useEffect, useState } from "react";

export default function Schedule() {
    const [scheduleData, setScheduleData] = useState([]);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        comment: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        loadWorkshops();
    }, []);

    const loadWorkshops = async () => {
        try {
            const res = await fetch("http://localhost:5001/api/workshops");
            const data = await res.json();
            setScheduleData(data);
        } catch (err) {
            console.error("Ошибка загрузки:", err);
        }
    };

    const openModal = (workshop) => {
        if (workshop.spots <= 0) return;
        setSelectedWorkshop(workshop);
    };

    const closeModal = () => {
        setSelectedWorkshop(null);
        setFormData({
            name: "",
            phone: "",
            email: "",
            comment: "",
        });
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};

        const trimmedName = formData.name.trim();
        const trimmedEmail = formData.email.trim();
        const trimmedComment = formData.comment.trim();

        const digitsOnly = formData.phone.replace(/\D/g, "");

        if (!trimmedName || trimmedName.length < 2) {
            newErrors.name = "Введите имя (минимум 2 символа)";
        }

        if (digitsOnly.length < 7 || digitsOnly.length > 15) {
            newErrors.phone = "Телефон должен содержать от 7 до 15 цифр";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            newErrors.email = "Введите корректный email";
        }

        if (trimmedComment.length > 300) {
            newErrors.comment = "Комментарий слишком длинный";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            const cleaned = value.replace(/[^\d+()\-\s]/g, "");
            setFormData((prev) => ({
                ...prev,
                [name]: cleaned,
            }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const res = await fetch("http://localhost:5001/api/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: selectedWorkshop.id,
                    name: formData.name.trim(),
                    phone: formData.phone.trim(),
                    email: formData.email.trim(),
                    comment: formData.comment.trim(),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Ошибка записи");
                await loadWorkshops();
                closeModal();
                return;
            }

            alert("Вы успешно записались!");
            closeModal();
            loadWorkshops();
        } catch (err) {
            console.error("Ошибка записи:", err);
            alert("Произошла ошибка при записи");
        }
    };

    return (
        <div className="schedulePage">
            <header className="scheduleHero">
                <div className="scheduleContainer">
                    <h1 className="scheduleTitle">Расписание мастер-классов</h1>
                    <p className="scheduleLead">
                        Групповые занятия по расписанию. Можно прийти одной/одному или с друзьями — материалы включены.
                    </p>

                    <div className="scheduleActions">
                        <a className="sBtn sBtn--primary" href="#list">
                            Смотреть даты
                        </a>
                        <a className="sBtn sBtn--outline" href="/events">
                            Хочу свой праздник
                        </a>
                    </div>
                </div>
            </header>

            <main className="scheduleMain" id="list">
                <div className="scheduleContainer">
                    <div className="scheduleGrid">
                        {scheduleData.map((item) => (
                            <article className="slotCard" key={item.id}>
                                {item.image && (
                                    <img
                                        src={`http://localhost:5001${item.image}`}
                                        alt={item.title}
                                        className="slotImage"
                                    />
                                )}

                                <div className="slotTop">
                                    <div className="slotDate">{item.date}</div>
                                    <div className="slotTime">{item.time}</div>
                                </div>

                                <h3 className="slotTitle">{item.title}</h3>

                                <div className="slotMeta">
                                    <span className="chip">{item.duration}</span>
                                    <span className="chip">{item.price}</span>
                                    <span className="chip chip--muted">
                                        {item.spots > 0 ? `осталось ${item.spots} мест` : "мест нет"}
                                    </span>
                                </div>

                                <div className="slotBottom">
                                    <button
                                        className={`sBtn sBtn--primary sBtn--small ${item.spots <= 0 ? "sBtn--disabled" : ""}`}
                                        type="button"
                                        onClick={() => openModal(item)}
                                        disabled={item.spots <= 0}
                                    >
                                        {item.spots > 0 ? "записаться" : "мест нет"}
                                    </button>

                                    <a className="sLink" href="/workshops">
                                        подробнее →
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>

                    <section className="noteBlock">
                        <h2 className="noteTitle">Хочется особенный формат?</h2>
                        <p className="noteText">
                            Если вы хотите отметить День Рождения, девичник, Baby Shower, арт-свидание
                            или организовать выездной мастер-класс, можно оставить отдельную заявку —
                            мы свяжемся с вами и предложим подходящие варианты.
                        </p>

                        <div className="noteActions">
                            <a className="sBtn sBtn--primary" href="/events">
                                хочу свой праздник
                            </a>

                            <a className="sBtn sBtn--outline" href="/contact">
                                связаться с нами
                            </a>
                        </div>
                    </section>
                </div>
            </main>

            {selectedWorkshop && (
                <div className="bookingModalOverlay" onClick={closeModal}>
                    <div
                        className="bookingModal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="bookingModalClose"
                            type="button"
                            onClick={closeModal}
                        >
                            ×
                        </button>

                        <h2 className="bookingModalTitle">Запись на мастер-класс</h2>

                        <p className="bookingModalSubtitle">
                            <strong>{selectedWorkshop.title}</strong>
                            <br />
                            {selectedWorkshop.date} • {selectedWorkshop.time}
                        </p>

                        <form className="bookingForm" onSubmit={handleSubmit}>
                            <label className="bookingField">
                                Имя
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ваше имя"
                                />
                                {errors.name && <span className="bookingError">{errors.name}</span>}
                            </label>

                            <label className="bookingField">
                                Телефон
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+372..."
                                />
                                {errors.phone && <span className="bookingError">{errors.phone}</span>}
                            </label>

                            <label className="bookingField">
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                />
                                {errors.email && <span className="bookingError">{errors.email}</span>}
                            </label>

                            <label className="bookingField bookingField--full">
                                Комментарий
                                <textarea
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleChange}
                                    placeholder="Дополнительная информация"
                                    rows={4}
                                />
                                {errors.comment && <span className="bookingError">{errors.comment}</span>}
                            </label>

                            <button
                                className="sBtn sBtn--primary bookingSubmit"
                                type="submit"
                            >
                                подтвердить запись
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}