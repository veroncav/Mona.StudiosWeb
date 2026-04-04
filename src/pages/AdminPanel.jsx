import { useNavigate } from "react-router-dom";
import "./admin.css";

export default function AdminPanel() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        navigate("/admin-login");
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

                <p className="adminText">
                    Здесь будет управление мастер-классами и заявками.
                </p>

                <div className="adminSection">
                    <h2 className="adminSubtitle">Что можно будет делать</h2>
                    <ul className="adminList">
                        <li>добавлять мастер-классы</li>
                        <li>редактировать даты и время</li>
                        <li>менять количество мест</li>
                        <li>удалять мастер-классы</li>
                        <li>смотреть заявки пользователей</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}