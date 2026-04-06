/* eslint-disable no-undef */
require("dotenv").config();

const nodemailer = require("nodemailer");
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
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
        from: `"Mona Studio" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
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
        from: `"Mona Studio" <${process.env.EMAIL_USER}>`,
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
                <li>Ничего приносить с собой не нужно — все материалы и закуски и напитки будут на месте ✨</li>
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

const sendEventRequestAdminNotification = async (request) => {
    await transporter.sendMail({
        from: `"Mona Studio" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: "Новая заявка на мероприятие",
        html: `
            <h2>Новая заявка на мероприятие</h2>
            <p><b>Имя:</b> ${request.name}</p>
            <p><b>Контакт:</b> ${request.contact}</p>
            <p><b>Email:</b> ${request.email}</p>
            <p><b>Сообщение:</b></p>
            <p>${request.message}</p>
        `,
    });
};

const sendEventRequestUserConfirmation = async (request) => {
    await transporter.sendMail({
        from: `"Mona Studio" <${process.env.EMAIL_USER}>`,
        to: request.email,
        subject: "Спасибо за вашу заявку 💖",
        html: `
            <h2>Спасибо за вашу заявку! 💖</h2>
            <p>Мы получили ваше сообщение и свяжемся с вами в ближайшее время.</p>

            <hr />

            <p><b>Ваши данные:</b></p>
            <p>Имя: ${request.name}</p>
            <p>Контакт: ${request.contact}</p>
            <p>Email: ${request.email}</p>
            <p><b>Сообщение:</b></p>
            <p>${request.message}</p>

            <br />

            <p>С любовью,<br />Mona Studio ✨</p>
        `,
    });
};

module.exports = {
    sendAdminNotification,
    sendUserConfirmation,
    sendEventRequestAdminNotification,
    sendEventRequestUserConfirmation,
};