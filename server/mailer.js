/* eslint-disable no-undef */

const nodemailer = require("nodemailer");
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "monastuudio@gmail.com",
        pass: "vwkuowgcigkzaicz",
    },
    tls: {
        rejectUnauthorized: false,
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
        from: `"Mona Studio" <monastuudio@gmail.com>`,
        to: "monastuudio@gmail.com",
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
        subject: "Вы записались на мастер-класс в студию Mona 🎨",
        html: `
            <h2>Спасибо за запись! 🎨</h2>

    <p>Вы записались на мастер-класс:</p>
    <p><b>${booking.workshopTitle}</b></p>
    <p><b>Дата:</b> ${booking.workshopDate}</p>
    <p><b>Время:</b> ${booking.workshopTime}</p>

    <hr />

    <p><b>Важная информация:</b></p>
    <ul>
        <li>Ничего приносить с собой не нужно — все материалы и закуски и напитки будут на месте✨</li>
        <li>Оплата производится на месте перед началом мастер-класса</li>
        <li>Пожалуйста, приходите за 5–10 минут до начала</li>
    </ul>

    <p><b>Если у вас изменятся планы:</b></p>
    <p>
        Пожалуйста, предупредите нас как можно заранее, 
        желательно не позднее чем за 24 часа
    </p>

    <hr />

    <p><b>Ваши данные:</b></p>
    <p>Имя: ${booking.name}</p>
    <p>Телефон: ${booking.phone}</p>
    <p>Email: ${booking.email}</p>

    <br />

    <p>Ждём вас в нашей студии! 💖</p>
`,
    });
};

module.exports = {
    sendAdminNotification,
    sendUserConfirmation,
};