const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./studio.db");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS workshops (
                                                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                 title TEXT,
                                                 date TEXT,
                                                 time TEXT,
                                                 spots INTEGER
        )
    `);

    // 👉 добавляем данные ВНУТРИ serialize
    db.run(`
        INSERT INTO workshops (title, date, time, spots)
        VALUES 
        ('Картина на холсте', '13 мая', '12:00', 6),
        ('Украшения', '9 мая', '15:30', 4)
    `);
});

module.exports = db;