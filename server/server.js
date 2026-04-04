/* eslint-disable no-undef */

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running");
});

/* ===== Получить все мастер-классы ===== */
app.get("/api/workshops", (req, res) => {
    db.all("SELECT * FROM workshops ORDER BY id DESC", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: "Ошибка загрузки мастер-классов" });
        }

        res.json(rows);
    });
});

/* ===== Добавить мастер-класс ===== */
app.post("/api/workshops", (req, res) => {
    const { title, date, time, duration, price, spots } = req.body;

    if (!title || !date || !time || !duration || !price || spots === undefined) {
        return res.status(400).json({ message: "Заполните все поля" });
    }

    db.run(
        `INSERT INTO workshops (title, date, time, duration, price, spots)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [title, date, time, duration, price, Number(spots)],
        function (err) {
            if (err) {
                return res.status(500).json({ message: "Ошибка добавления мастер-класса" });
            }

            res.json({
                message: "Мастер-класс добавлен",
                id: this.lastID,
            });
        }
    );
});

/* ===== Удалить мастер-класс ===== */
app.delete("/api/workshops/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM workshops WHERE id = ?", [id], function (err) {
        if (err) {
            return res.status(500).json({ message: "Ошибка удаления мастер-класса" });
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

    db.get("SELECT * FROM workshops WHERE id = ?", [id], (err, workshop) => {
        if (err) {
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
            [id, name, phone, email, comment || ""],
            function (insertErr) {
                if (insertErr) {
                    return res.status(500).json({ message: "Ошибка сохранения заявки" });
                }

                db.run(
                    "UPDATE workshops SET spots = spots - 1 WHERE id = ?",
                    [id],
                    function (updateErr) {
                        if (updateErr) {
                            return res.status(500).json({ message: "Ошибка обновления мест" });
                        }

                        res.json({ message: "Вы успешно записались!" });
                    }
                );
            }
        );
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});