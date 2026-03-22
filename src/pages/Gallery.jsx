import "./gallery.css";

// Импорт всех картинок
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

import photo2 from "../assets/photo2.jpg";
import picnic from "../assets/picnic.jpg";
import atmo from "../assets/atmo.jpg";
import atmo1 from "../assets/atmo1.jpg";
import atmo2 from "../assets/atmo2.jpg";
import atmo3 from "../assets/atmo3.jpg";
import atmo4 from "../assets/atmo4.jpg";
import atmo5 from "../assets/atmo5.jpg";
import atmo6 from "../assets/atmo6.jpg";

// Лайтбокс
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const images = [
    birthday, birthday1, birthday2,
    bachelorette, bachelorette1, bachelorette2,
    baby, baby1, baby2,
    kids, kids1, kids2,
    date, date1, date2,
    photo2, picnic, atmo, atmo1, atmo2, atmo3, atmo4, atmo5, atmo6
];

export default function Gallery() {
    const [index, setIndex] = useState(-1); // -1 = закрыт

    return (
        <div className="galleryPage">
            <div className="galleryContainer">
                <h1 className="galleryTitle">Галерея</h1>
                <p className="galleryText">
                    Атмосфера наших мастер-классов и праздников в студии Mona.
                </p>

                <div className="galleryGrid">
                    {images.map((img, idx) => (
                        <div
                            className="galleryItem"
                            key={idx}
                            onClick={() => setIndex(idx)}
                        >
                            <img src={img} alt="Mona Studio event" />
                        </div>
                    ))}
                </div>

                {index >= 0 && (
                    <Lightbox
                        open={index >= 0}
                        index={index}
                        slides={images.map((src) => ({ src }))}
                        close={() => setIndex(-1)}
                        // optional props:
                        animation={{ fade: 250 }}
                    />
                )}
            </div>
        </div>
    );
}