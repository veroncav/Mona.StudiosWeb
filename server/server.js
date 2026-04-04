app.post("/api/book", (req, res) => {
    const { id, name, phone, email, comment } = req.body;

    if (!name || !phone || !email) {
        return res.status(400).json({ message: "Заполните обязательные поля" });
    }

    db.get("SELECT * FROM workshops WHERE id = ?", [id], (err, workshop) => {
        if (err) {
            return res.status(500).json(err);
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
                    return res.status(500).json(insertErr);
                }

                db.run(
                    "UPDATE workshops SET spots = spots - 1 WHERE id = ?",
                    [id],
                    function (updateErr) {
                        if (updateErr) {
                            return res.status(500).json(updateErr);
                        }

                        res.json({ message: "Вы успешно записались!" });
                    }
                );
            }
        );
    });
});