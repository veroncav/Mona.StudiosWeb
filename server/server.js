const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* ===== Получить мастер-классы ===== */
app.get("/api/workshops", (req, res) => {
    db.all("SELECT * FROM workshops", [], (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

/* ===== Записаться ===== */
app.post("/api/book", (req, res) => {
    const { id } = req.body;

    db.get("SELECT spots FROM workshops WHERE id = ?", [id], (err, row) => {
        if (!row || row.spots <= 0) {
            return res.status(400).json({ message: "Нет мест" });
        }

        db.run(
            "UPDATE workshops SET spots = spots - 1 WHERE id = ?",
            [id],
            function (err) {
                if (err) return res.status(500).json(err);

                res.json({ message: "Вы записались!" });
            }
        );
    });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});