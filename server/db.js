/* eslint-disable no-undef */

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./studio.db");

db.serialize(() => {
    // ===== ТАБЛИЦА МАСТЕР-КЛАССОВ =====
    db.run(`
        CREATE TABLE IF NOT EXISTS workshops (
                                                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                 title TEXT,
                                                 date TEXT,
                                                 time TEXT,
                                                 duration TEXT,
                                                 price TEXT,
                                                 spots INTEGER
        )
    `);

    // ===== ТАБЛИЦА ЗАЯВОК =====
    db.run(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            workshop_id INTEGER,
            name TEXT,
            phone TEXT,
            email TEXT,
            comment TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // ===== ЗАПОЛНЕНИЕ ДАННЫХ (только если пусто) =====
    db.get("SELECT COUNT(*) as count FROM workshops", (err, row) => {
        if (err) {
            console.error("Ошибка проверки данных:", err);
            return;
        }

        if (row.count === 0) {
            db.run(`
                INSERT INTO workshops (title, date, time, duration, price, spots)
                VALUES 
                ('Картина на холсте (Текстурная)', '13 мая', '12:00', '2 часа', '50€', 6),
                ('Создание украшений', '9 мая', '15:30', '2 часа', '45€', 4),
                ('Роспись шопперов', '20 мая', '12:00', '1.5–2 часа', '40€', 8),
                ('Картина на холсте (Свободная тема)', '15 мая', '16:00', '2 часа', '50€', 5)
            `);
        }
    });
});

module.exports = db;