import { useState } from "react";
import "./faq.css";

const faqData = [
    {
        question: "Нужно ли иметь опыт рисования?",
        answer:
            "Нет, все наши мастер-классы подходят для новичков. Мы помогаем на каждом этапе, поэтому даже без опыта у вас получится красивый результат.",
    },
    {
        question: "Сколько длится мастер-класс?",
        answer:
            "Обычно мастер-классы длятся от 1,5 до 2 часов в зависимости от формата и выбранного направления.",
    },
    {
        question: "Можно ли прийти одному?",
        answer:
            "Да, конечно. К нам можно прийти одному, с подругой, с семьёй или компанией друзей.",
    },
    {
        question: "Все ли материалы входят в стоимость?",
        answer:
            "Да, все необходимые материалы уже включены в стоимость мастер-класса.",
    },
    {
        question: "Можно ли провести у вас праздник?",
        answer:
            "Да, у нас можно провести день рождения, девичник, детский праздник, baby shower или арт-свидание.",
    },
    {
        question: "Как записаться?",
        answer:
            "Вы можете написать нам через страницу контактов или оставить заявку на сайте.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faqPage">
            <div className="faqContainer">
                <h1 className="faqTitle">Частые вопросы</h1>

                <p className="faqLead">
                    Здесь собраны ответы на самые популярные вопросы о наших мастер-классах
                    и мероприятиях.
                </p>

                <div className="faqList">
                    {faqData.map((item, index) => (
                        <div className="faqItem" key={index}>
                            <button
                                className="faqQuestion"
                                onClick={() => toggleFAQ(index)}
                                type="button"
                            >
                                <span>{item.question}</span>
                                <span className="faqIcon">
                  {openIndex === index ? "−" : "+"}
                </span>
                            </button>

                            {openIndex === index && (
                                <div className="faqAnswer">
                                    <p>{item.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}