import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

export default function AdminPanel() {
    const navigate = useNavigate();

    const emptyForm = {
        title: "",
        date: "",
        time: "",
        duration: "",
        price: "",
        spots: "",
    };

    const [workshops, setWorkshops] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState(emptyForm);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadWorkshops();
    }, []);

    const loadWorkshops = async () => {
        try {
            const res = await fetch("http://localhost:5001/api/workshops");
            const data = await res.json();

            if (!res.ok) {
                console.error("Ошибка загрузки списка:", data);
                return;
            }

            setWorkshops(Array.isArray(data) ? data : []);
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
            [name]: name === "spots" ? value.replace(/[^\d]/g, "") : value,
        }));
    };

    const resetForm = () => {
        setFormData(emptyForm);
        setIsEditing(false);
        setEditingId(null);
    };

    const validateForm = () => {
        if (
            !formData.title.trim() ||
            !formData.date.trim() ||
            !formData.time.trim() ||
            !formData.duration.trim() ||
            !formData.price.trim() ||
            formData.spots === ""
        ) {
            alert("Заполни все поля");
            return false;
        }

        return true;
    };

    const buildPayload = () => ({
        title: formData.title.trim(),
        date: formData.date.trim(),
        time: formData.time.trim(),
        duration: formData.duration.trim(),
        price: formData.price.trim(),
        spots: Number(formData.spots),
    });

    const handleAddWorkshop = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);

            const res = await fetch("http://localhost:5001/api/workshops", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(buildPayload()),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Ошибка добавления:", data);
                alert(data.message || "Ошибка добавления");
                return;
            }

            alert("Мастер-класс добавлен");
            resetForm();
            await loadWorkshops();
        } catch (err) {
            console.error("Ошибка добавления:", err);
            alert("Не удалось добавить мастер-класс");
        } finally {
            setLoading(false);
        }
    };

    const handleEditWorkshop = (item) => {
        setIsEditing(true);
        setEditingId(item.id);

        setFormData({
            title: item.title ?? "",
            date: item.date ?? "",
            time: item.time ?? "",
            duration: item.duration ?? "",
            price: item.price ?? "",
            spots: String(item.spots ?? ""),
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleUpdateWorkshop = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;
        if (!editingId) {
            alert("Не найден id мастер-класса для редактирования");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(`http://localhost:5001/api/workshops/${editingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(buildPayload()),
            });

            const data = await res.json();

            console.log("UPDATE STATUS:", res.status);
            console.log("UPDATE RESPONSE:", data);
            console.log("EDITING ID:", editingId);
            console.log("FORM DATA:", buildPayload());

            if (!res.ok) {
                alert(data.message || "Ошибка редактирования");
                return;
            }

            alert("Мастер-класс обновлён");
            resetForm();
            await loadWorkshops();
        } catch (err) {
            console.error("Ошибка редактирования:", err);
            alert("Не удалось обновить мастер-класс");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteWorkshop = async (id) => {
        const confirmDelete = window.confirm("Удалить мастер-класс?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:5001/api/workshops/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Ошибка удаления:", data);
                alert(data.message || "Ошибка удаления");
                return;
            }

            alert("Мастер-класс удалён");

            if (isEditing && editingId === id) {
                resetForm();
            }

            await loadWorkshops();
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
                    <button
                        type="button"
                        className="adminBtn adminBtn--outline"
                        onClick={handleLogout}
                    >
                        выйти
                    </button>
                </div>

                <div className="adminSection">
                    <h2 className="adminSubtitle">
                        {isEditing ? "Редактировать мастер-класс" : "Добавить мастер-класс"}
                    </h2>

                    <form
                        className="adminForm adminForm--grid"
                        onSubmit={isEditing ? handleUpdateWorkshop : handleAddWorkshop}
                    >
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

                        <button
                            type="submit"
                            className="adminBtn adminBtn--full"
                            disabled={loading}
                        >
                            {loading
                                ? "сохранение..."
                                : isEditing
                                    ? "сохранить изменения"
                                    : "добавить мастер-класс"}
                        </button>

                        {isEditing && (
                            <button
                                type="button"
                                className="adminBtn adminBtn--outline adminBtn--full"
                                onClick={resetForm}
                                disabled={loading}
                            >
                                отмена
                            </button>
                        )}
                    </form>
                </div>

                <div className="adminSection">
                    <h2 className="adminSubtitle">Список мастер-классов</h2>

                    <div className="adminWorkshopsList">
                        {workshops.length === 0 ? (
                            <p className="adminWorkshopText">Мастер-классов пока нет</p>
                        ) : (
                            workshops.map((item) => (
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

                                    <div className="adminActions">
                                        <button
                                            type="button"
                                            className="adminBtn"
                                            onClick={() => handleEditWorkshop(item)}
                                        >
                                            редактировать
                                        </button>

                                        <button
                                            type="button"
                                            className="adminBtn adminBtn--danger"
                                            onClick={() => handleDeleteWorkshop(item.id)}
                                        >
                                            удалить
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}