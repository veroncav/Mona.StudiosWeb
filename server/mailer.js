const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ТВОЯ_ПОЧТА@gmail.com",
        pass: "ТВОЙ_APP_PASSWORD",
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.log("Ошибка подключения к Gmail:");
        console.log(error);
    } else {
        console.log("Gmail transporter готов:", success);
    }
});

const sendAdminNotification = async (booking) => {
    await transporter.sendMail({
        from: `"Mona Studio" <ТВОЯ_ПОЧТА@gmail.com>`,
        to: "ТВОЯ_ПОЧТА@gmail.com",
        subject: "Новая запись на мастер-класс",
        html: `
            <h2>Новая запись на мастер-класс</h2>
            <p><b>Имя:</b> ${booking.name}</p>
            <p><b>Email:</b> ${booking.email}</p>
            <p><b>Телефон:</b> ${booking.phone}</p>
            <p><b>Комментарий:</b> ${booking.comment || "-"}</p>
            <p><b>Мастер-класс:</b> ${booking.workshopTitle}</p>
            <p><b>Дата:</b> ${booking.workshopDate}</p>
            <p><b>Время:</b> ${booking.workshopTime}</p>
        `,
    });
};

const sendUserConfirmation = async (booking) => {
    await transporter.sendMail({
        from: `"Mona Studio" <ТВОЯ_ПОЧТА@gmail.com>`,
        to: booking.email,
        subject: "Вы записались на мастер-класс 🎨",
        html: `
            <h2>Спасибо за запись!</h2>
            <p>Вы успешно записались на мастер-класс:</p>
            <p><b>${booking.workshopTitle}</b></p>
            <p><b>Дата:</b> ${booking.workshopDate}</p>
            <p><b>Время:</b> ${booking.workshopTime}</p>
            <hr />
            <p><b>Ваши данные:</b></p>
            <p>Имя: ${booking.name}</p>
            <p>Телефон: ${booking.phone}</p>
            <p>Email: ${booking.email}</p>
            <br />
            <p>Ждём вас! 💖</p>
        `,
    });
};

module.exports = {
    sendAdminNotification,
    sendUserConfirmation,
};