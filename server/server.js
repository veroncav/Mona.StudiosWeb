/* eslint-disable no-undef */

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 5001;

console.log("🔥 SERVER VERSION CRUD FIX 🔥");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running");
});

/* ===== Получить все мастер-классы ===== */
app.get("/api/workshops", (req, res) => {
    db.all("SELECT * FROM workshops ORDER BY id DESC", [], (err, rows) => {
        if (err) {
            console.error("Ошибка загрузки мастер-классов:", err.message);
            return res.status(500).json({ message: "Ошибка загрузки мастер-классов" });
        }

        res.json(rows);
    });
});

/* ===== Получить один мастер-класс ===== */
app.get("/api/workshops/:id", (req, res) => {
    const id = Number(req.params.id);

    db.get("SELECT * FROM workshops WHERE id = ?", [id], (err, row) => {
        if (err) {
            console.error("Ошибка получения мастер-класса:", err.message);
            return res.status(500).json({ message: "Ошибка получения мастер-класса" });
        }

        if (!row) {
            return res.status(404).json({ message: "Мастер-класс не найден" });
        }

        res.json(row);
    });
});

/* ===== Добавить мастер-класс ===== */
app.post("/api/workshops", (req, res) => {
    console.log("POST /api/workshops", req.body);

    const { title, date, time, duration, price, spots } = req.body;

    if (!title || !date || !time || !duration || !price || spots === undefined) {
        return res.status(400).json({
            message: "Заполните все поля",
            received: req.body,
        });
    }

    db.run(
        `INSERT INTO workshops (title, date, time, duration, price, spots, image)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, date, time, duration, price, Number(spots), null],
        function (err) {
            if (err) {
                console.error("Ошибка добавления мастер-класса:", err.message);
                return res.status(500).json({
                    message: "Ошибка добавления мастер-класса",
                    error: err.message,
                });
            }

            res.json({
                message: "Мастер-класс добавлен",
                id: this.lastID,
            });
        }
    );
});

/* ===== Обновить мастер-класс ===== */
app.put("/api/workshops/:id", (req, res) => {
    const id = Number(req.params.id);
    console.log("PUT /api/workshops/:id", id, req.body);

    const { title, date, time, duration, price, spots } = req.body;

    if (!title || !date || !time || !duration || !price || spots === undefined) {
        return res.status(400).json({
            message: "Заполните все поля",
            received: req.body,
        });
    }

    db.get("SELECT * FROM workshops WHERE id = ?", [id], (selectErr, workshop) => {
        if (selectErr) {
            console.error("Ошибка поиска мастер-класса:", selectErr.message);
            return res.status(500).json({ message: "Ошибка поиска мастер-класса" });
        }

        if (!workshop) {
            return res.status(404).json({ message: "Мастер-класс не найден" });
        }

        db.run(
            `UPDATE workshops
             SET title = ?, date = ?, time = ?, duration = ?, price = ?, spots = ?
             WHERE id = ?`,
            [title, date, time, duration, price, Number(spots), id],
            function (err) {
                if (err) {
                    console.error("Ошибка обновления мастер-класса:", err.message);
                    return res.status(500).json({
                        message: "Ошибка обновления мастер-класса",
                        error: err.message,
                    });
                }

                console.log("PUT changes =", this.changes);

                if (this.changes === 0) {
                    return res.status(404).json({ message: "Мастер-класс не найден" });
                }

                res.json({ message: "Мастер-класс обновлён" });
            }
        );
    });
});

/* ===== Удалить мастер-класс ===== */
app.delete("/api/workshops/:id", (req, res) => {
    const id = Number(req.params.id);
    console.log("DELETE /api/workshops/:id", id);

    db.run("DELETE FROM workshops WHERE id = ?", [id], function (err) {
        if (err) {
            console.error("Ошибка удаления мастер-класса:", err.message);
            return res.status(500).json({
                message: "Ошибка удаления мастер-класса",
                error: err.message,
            });
        }

        console.log("DELETE changes =", this.changes);

        if (this.changes === 0) {
            return res.status(404).json({ message: "Мастер-класс не найден" });
        }

        res.json({ message: "Мастер-класс удалён" });
    });
});

/* ===== Получить все заявки ===== */
app.get("/api/bookings", (req, res) => {
    const query = `
        SELECT 
            bookings.id,
            bookings.name,
            bookings.phone,
            bookings.email,
            bookings.comment,
            bookings.created_at,
            workshops.title AS workshop_title,
            workshops.date AS workshop_date,
            workshops.time AS workshop_time
        FROM bookings
        LEFT JOIN workshops ON bookings.workshop_id = workshops.id
        ORDER BY bookings.created_at DESC
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error("Ошибка загрузки заявок:", err.message);
            return res.status(500).json({ message: "Ошибка загрузки заявок" });
        }

        res.json(rows);
    });
});

/* ===== Записаться на мастер-класс ===== */
app.post("/api/book", (req, res) => {
    const { id, name, phone, email, comment } = req.body;

    if (!name || !phone || !email) {
        return res.status(400).json({ message: "Заполните обязательные поля" });
    }

    db.get("SELECT * FROM workshops WHERE id = ?", [Number(id)], (err, workshop) => {
        if (err) {
            console.error("Ошибка поиска мастер-класса:", err.message);
            return res.status(500).json({ message: "Ошибка поиска мастер-класса" });
        }

        if (!workshop) {
            return res.status(404).json({ message: "Мастер-класс не найден" });
        }

        if (workshop.spots <= 0) {
            return res.status(400).json({ message: "Свободных мест нет" });
        }

        db.run(
            `INSERT INTO bookings (workshop_id, name, phone, email, comment)
             VALUES (?, ?, ?, ?, ?)`,
            [Number(id), name, phone, email, comment || ""],
            function (insertErr) {
                if (insertErr) {
                    console.error("Ошибка сохранения заявки:", insertErr.message);
                    return res.status(500).json({ message: "Ошибка сохранения заявки" });
                }

                db.run(
                    "UPDATE workshops SET spots = spots - 1 WHERE id = ?",
                    [Number(id)],
                    function (updateErr) {
                        if (updateErr) {
                            console.error("Ошибка обновления мест:", updateErr.message);
                            return res.status(500).json({ message: "Ошибка обновления мест" });
                        }

                        res.json({ message: "Вы успешно записались!" });
                    }
                );
            }
        );
    });
});

/* ===== Ловим несуществующие маршруты ===== */
app.use((req, res) => {
    console.log("NO ROUTE:", req.method, req.originalUrl);
    res.status(404).json({
        message: "Маршрут не найден",
        method: req.method,
        url: req.originalUrl,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});