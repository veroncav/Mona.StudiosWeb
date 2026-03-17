import "./gallery.css";

import birthday from "../assets/event-birthday.jpg";
import birthday1 from "../assets/event-birthday-1.jpg";
import birthday2 from "../assets/event-birthday-2.jpg";

import bachelorette from "../assets/event-bachelorette.jpg";
import bachelorette1 from "../assets/event-bachelorette-1.jpg";
import bachelorette2 from "../assets/event-bachelorette-2.jpg";

import baby from "../assets/event-babyshower.jpg";
import baby1 from "../assets/event-babyshower-1.jpg";
import baby2 from "../assets/event-babyshower-2.jpg";

import kids from "../assets/event-kids.jpg";
import kids1 from "../assets/event-kids-1.jpg";
import kids2 from "../assets/event-kids-2.jpg";

import date from "../assets/event-date.jpg";
import date1 from "../assets/event-date-1.jpg";
import date2 from "../assets/event-date-2.jpg";

const images = [
    birthday,
    birthday1,
    birthday2,
    bachelorette,
    bachelorette1,
    bachelorette2,
    baby,
    baby1,
    baby2,
    kids,
    kids1,
    kids2,
    date,
    date1,
    date2
];

export default function Gallery() {
    return (
        <div className="galleryPage">
            <div className="galleryContainer">

                <h1 className="galleryTitle">Галерея</h1>

                <p className="galleryText">
                    Атмосфера наших мастер-классов и праздников в студии Mona.
                </p>

                <div className="galleryGrid">
                    {images.map((img, index) => (
                        <div className="galleryItem" key={index}>
                            <img src={img} alt="Mona Studio event" />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}