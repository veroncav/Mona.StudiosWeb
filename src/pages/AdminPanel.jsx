import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

export default function AdminPanel() {
    const navigate = useNavigate();

    const [workshops, setWorkshops] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        time: "",
        duration: "",
        price: "",
        spots: "",
    });

    useEffect(() => {
        loadWorkshops();
    }, []);

    const loadWorkshops = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/workshops");
            const data = await res.json();
            setWorkshops(data);
        } catch (err) {
            console.error("Ошибка загрузки мастер-классов:", err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        navigate("/admin-login");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddWorkshop = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/workshops", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Ошибка добавления");
                return;
            }

            alert("Мастер-класс добавлен");
            setFormData({
                title: "",
                date: "",
                time: "",
                duration: "",
                price: "",
                spots: "",
            });
            loadWorkshops();
        } catch (err) {
            console.error("Ошибка добавления:", err);
            alert("Не удалось добавить мастер-класс");
        }
    };

    const handleDeleteWorkshop = async (id) => {
        const confirmDelete = window.confirm("Удалить мастер-класс?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:5000/api/workshops/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Ошибка удаления");
                return;
            }

            alert("Мастер-класс удалён");
            loadWorkshops();
        } catch (err) {
            console.error("Ошибка удаления:", err);
            alert("Не удалось удалить мастер-класс");
        }
    };

    return (
        <div className="adminPage">
            <div className="adminCard adminCard--wide">
                <div className="adminTop">
                    <h1 className="adminTitle">Админ-панель Mona Studios</h1>
                    <button className="adminBtn adminBtn--outline" onClick={handleLogout}>
                        выйти
                    </button>
                </div>

                <div className="adminSection">
                    <h2 className="adminSubtitle">Добавить мастер-класс</h2>

                    <form className="adminForm adminForm--grid" onSubmit={handleAddWorkshop}>
                        <label className="adminField">
                            Название
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Название мастер-класса"
                            />
                        </label>

                        <label className="adminField">
                            Дата
                            <input
                                type="text"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                placeholder="Например: 13 мая"
                            />
                        </label>

                        <label className="adminField">
                            Время
                            <input
                                type="text"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                placeholder="12:00"
                            />
                        </label>

                        <label className="adminField">
                            Длительность
                            <input
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="2 часа"
                            />
                        </label>

                        <label className="adminField">
                            Цена
                            <input
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="50€"
                            />
                        </label>

                        <label className="adminField">
                            Места
                            <input
                                type="number"
                                name="spots"
                                value={formData.spots}
                                onChange={handleChange}
                                placeholder="6"
                                min="0"
                            />
                        </label>

                        <button type="submit" className="adminBtn adminBtn--full">
                            добавить мастер-класс
                        </button>
                    </form>
                </div>

                <div className="adminSection">
                    <h2 className="adminSubtitle">Список мастер-классов</h2>

                    <div className="adminWorkshopsList">
                        {workshops.map((item) => (
                            <div className="adminWorkshopCard" key={item.id}>
                                <div>
                                    <h3 className="adminWorkshopTitle">{item.title}</h3>
                                    <p className="adminWorkshopText">
                                        {item.date} • {item.time}
                                    </p>
                                    <p className="adminWorkshopText">
                                        {item.duration} • {item.price}
                                    </p>
                                    <p className="adminWorkshopText">
                                        Осталось мест: {item.spots}
                                    </p>
                                </div>

                                <button
                                    className="adminBtn adminBtn--danger"
                                    onClick={() => handleDeleteWorkshop(item.id)}
                                >
                                    удалить
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}