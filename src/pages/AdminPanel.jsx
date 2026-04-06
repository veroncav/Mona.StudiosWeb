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

    const [activeTab, setActiveTab] = useState("workshops");

    const [workshops, setWorkshops] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [requests, setRequests] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState(emptyForm);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadWorkshops();
        loadBookings();
        loadRequests();
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

    const loadBookings = async () => {
        try {
            const res = await fetch("http://localhost:5001/api/bookings");
            const data = await res.json();

            if (!res.ok) {
                console.error("Ошибка загрузки записей:", data);
                return;
            }

            setBookings(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Ошибка загрузки записей:", err);
        }
    };

    const loadRequests = async () => {
        try {
            const res = await fetch("http://localhost:5001/api/event-requests");
            const data = await res.json();

            if (!res.ok) {
                console.error("Ошибка загрузки заявок:", data);
                return;
            }

            setRequests(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Ошибка загрузки заявок:", err);
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

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0] || null);
    };

    const resetForm = () => {
        setFormData(emptyForm);
        setSelectedFile(null);
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

    const buildFormData = () => {
        const data = new FormData();
        data.append("title", formData.title.trim());
        data.append("date", formData.date.trim());
        data.append("time", formData.time.trim());
        data.append("duration", formData.duration.trim());
        data.append("price", formData.price.trim());
        data.append("spots", Number(formData.spots));

        if (selectedFile) {
            data.append("image", selectedFile);
        }

        return data;
    };

    const handleAddWorkshop = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);

            const res = await fetch("http://localhost:5001/api/workshops", {
                method: "POST",
                body: buildFormData(),
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

        setSelectedFile(null);
        setActiveTab("workshops");

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
                body: buildFormData(),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Ошибка редактирования:", data);
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

                <div className="adminTabs">
                    <button
                        type="button"
                        className={`adminBtn ${activeTab === "workshops" ? "" : "adminBtn--outline"}`}
                        onClick={() => setActiveTab("workshops")}
                    >
                        мастер-классы
                    </button>

                    <button
                        type="button"
                        className={`adminBtn ${activeTab === "bookings" ? "" : "adminBtn--outline"}`}
                        onClick={() => setActiveTab("bookings")}
                    >
                        записи
                    </button>

                    <button
                        type="button"
                        className={`adminBtn ${activeTab === "requests" ? "" : "adminBtn--outline"}`}
                        onClick={() => setActiveTab("requests")}
                    >
                        заявки
                    </button>
                </div>

                {activeTab === "workshops" && (
                    <>
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

                                <label className="adminField">
                                    Фото
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleFileChange}
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
                                                {item.image && (
                                                    <p className="adminWorkshopText">Фото добавлено</p>
                                                )}
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
                    </>
                )}

                {activeTab === "bookings" && (
                    <div className="adminSection">
                        <h2 className="adminSubtitle">Записи на мастер-классы</h2>

                        <div className="adminWorkshopsList">
                            {bookings.length === 0 ? (
                                <p className="adminWorkshopText">Записей пока нет</p>
                            ) : (
                                bookings.map((item) => (
                                    <div className="adminWorkshopCard" key={item.id}>
                                        <div>
                                            <h3 className="adminWorkshopTitle">{item.name}</h3>
                                            <p className="adminWorkshopText">
                                                {item.email}
                                            </p>
                                            <p className="adminWorkshopText">
                                                {item.phone}
                                            </p>
                                            <p className="adminWorkshopText">
                                                Мастер-класс: {item.workshop_title}
                                            </p>
                                            <p className="adminWorkshopText">
                                                {item.workshop_date} • {item.workshop_time}
                                            </p>
                                            {item.comment && (
                                                <p className="adminWorkshopText">
                                                    Комментарий: {item.comment}
                                                </p>
                                            )}
                                            <p className="adminWorkshopText">
                                                Создано: {item.created_at}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "requests" && (
                    <div className="adminSection">
                        <h2 className="adminSubtitle">Заявки с сайта</h2>

                        <div className="adminWorkshopsList">
                            {requests.length === 0 ? (
                                <p className="adminWorkshopText">Заявок пока нет</p>
                            ) : (
                                requests.map((item) => (
                                    <div className="adminWorkshopCard" key={item.id}>
                                        <div>
                                            <h3 className="adminWorkshopTitle">{item.name}</h3>
                                            <p className="adminWorkshopText">
                                                {item.email}
                                            </p>
                                            <p className="adminWorkshopText">
                                                {item.contact}
                                            </p>
                                            <p className="adminWorkshopText">
                                                Сообщение: {item.message}
                                            </p>
                                            <p className="adminWorkshopText">
                                                Создано: {item.created_at}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}