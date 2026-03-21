import "./workshops.css";

import painting from "../assets/paintings.jpg";
import jewelry from "../assets/jewelry.jpg";
import shopper from "../assets/totebags.jpg";

export default function Workshops() {
    return (
        <div className="workshopsPage">
            <div className="workshopsContainer">
                <h1 className="workshopsTitle">Мастер-классы</h1>

                <p className="workshopsLead">
                    В нашей студии вы можете выбрать творческий мастер-класс и провести
                    время в уютной атмосфере. Все материалы предоставляются, а готовую
                    работу вы заберёте с собой.
                </p>

                <section className="workshopBlock">
                    <h2 className="workshopName">Картины на холсте</h2>

                    <div className="workshopImage">
                        <img src={painting} alt="Мастер класс картины" />
                    </div>

                    <p className="workshopText">
                        На этом мастер-классе вы создадите собственную картину на холсте
                        размером <b>50×40 см</b>. Можно выбрать абстрактную композицию,
                        работать <b>акриловыми красками</b> или создать <b>текстурную
                        картину с помощью текстурной пасты</b>.
                        <br /><br />
                        Все участники рисуют одну выбранную композицию, поэтому даже
                        новички без опыта в рисовании легко справятся.
                        В конце мастер-класса у вас останется готовая картина,
                        которая станет стильным элементом интерьера.
                    </p>
                </section>

                <section className="workshopBlock">
                    <h2 className="workshopName">Создание украшений</h2>

                    <div className="workshopImage">
                        <img src={jewelry} alt="Мастер класс украшения" />
                    </div>

                    <p className="workshopText">
                        На мастер-классе вы создадите <b>одно украшение на выбор</b>:
                        украшение на шею, браслет, подвеску на сумку или декоративную булавку.
                        <br /><br />
                        Вы сможете выбрать материалы, цвета и стиль, чтобы создать
                        изделие, которое идеально подходит именно вам.
                        В результате получится <b>уникальное украшение ручной работы</b>,
                        которого точно не будет ни у кого другого.
                    </p>
                </section>

                <section className="workshopBlock">
                    <h2 className="workshopName">Роспись шопперов</h2>

                    <div className="workshopImage">
                        <img src={shopper} alt="Мастер класс роспись шопперов" />
                    </div>

                    <p className="workshopText">
                        Создайте собственную сумку-шоппер с уникальным дизайном.
                        На мастер-классе вы распишете тканевую сумку специальными
                        <b>красками по ткани</b>.
                        <br /><br />
                        Можно выбрать готовый эскиз или придумать свой дизайн,
                        чтобы сделать вещь по-настоящему индивидуальной.
                        В результате у вас останется стильный аксессуар,
                        который можно использовать каждый день.
                    </p>
                </section>
            </div>
        </div>
    );
}