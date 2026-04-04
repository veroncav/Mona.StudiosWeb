import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

export default function AdminLogin() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const adminLogin = "admin";
        const adminPassword = "mona123";

        if (login === adminLogin && password === adminPassword) {
            localStorage.setItem("isAdmin", "true");
            navigate("/admin");
        } else {
            setError("Неверный логин или пароль");
        }
    };

    return (
        <div className="adminPage">
            <div className="adminCard">
                <h1 className="adminTitle">Вход в админ-панель</h1>

                <form className="adminForm" onSubmit={handleSubmit}>
                    <label className="adminField">
                        Логин
                        <input
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            placeholder="Введите логин"
                        />
                    </label>

                    <label className="adminField">
                        Пароль
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Введите пароль"
                        />
                    </label>

                    {error && <p className="adminError">{error}</p>}

                    <button type="submit" className="adminBtn">
                        войти
                    </button>
                </form>
            </div>
        </div>
    );
}