/* eslint-disable no-undef */

const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(__dirname, "studio.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS workshops (
                                                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                 title TEXT,
                                                 date TEXT,
                                                 time TEXT,
                                                 duration TEXT,
                                                 price TEXT,
                                                 spots INTEGER,
                                                 image TEXT
        )
    `);

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

    db.run(`
        CREATE TABLE IF NOT EXISTS event_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            contact TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    db.all("PRAGMA table_info(workshops)", [], (err, columns) => {
        if (err) {
            console.error("Ошибка проверки структуры workshops:", err);
            return;
        }

        const hasImageColumn = columns.some((col) => col.name === "image");

        if (!hasImageColumn) {
            db.run(`ALTER TABLE workshops ADD COLUMN image TEXT`, (alterErr) => {
                if (alterErr) {
                    console.error("Ошибка добавления колонки image:", alterErr);
                } else {
                    console.log("Колонка image добавлена в таблицу workshops");
                }
            });
        }
    });

    db.get("SELECT COUNT(*) as count FROM workshops", (err, row) => {
        if (err) {
            console.error("Ошибка проверки данных:", err);
            return;
        }

        if (row.count === 0) {
            db.run(`
                INSERT INTO workshops (title, date, time, duration, price, spots, image)
                VALUES
                    ('Картина на холсте', '13 мая', '12:00', '2 часа', '50€', 6, null),
                    ('Украшения', '9 мая', '15:30', '2 часа', '45€', 4, null)
            `);
        }
    });
});

module.exports = db;