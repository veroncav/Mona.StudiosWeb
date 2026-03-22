import "./about.css";
import eventsVideo from "../assets/events.mp4";

export default function About() {
    return (
        <div className="about">
            <h1 className="about__title">О студии Mona</h1>

            <div className="about__content">
                {/* Текстовая часть */}
                <div className="about__textBlock">
                    <div className="about__card about__card--pink">
                        <span className="about__heart">♥</span>
                        <p>
                            Mona Studios — творческая студия в Таллинне, где создаются душевные мастер-классы и особенные события.
                            Это пространство, наполненное эстетикой, уютом и вниманием к каждой детали.
                        </p>
                    </div>

                    <div className="about__card about__card--pink">
                        <span className="about__heart">♥</span>
                        <p>
                            С 2024 года мы создаём незабываемые впечатления для каждого гостя.
                            Здесь можно расслабиться, творить в спокойной атмосфере и воплотить свои идеи в красивый результат.
                        </p>
                    </div>
                </div>

                {/* Видео */}
                <div className="about__imageBlock">
                    <video
                        src={eventsVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="about__video"
                    />
                </div>
            </div>
        </div>
    );
}