import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/global.css";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
import { useEffect } from "react";

function useCursorFlowers() {
    useEffect(() => {
        const handleMove = (e) => {
            const flower = document.createElement("div");
            flower.className = "cursor-flower";

            // тут можно менять на разные цветочки
            const flowers = ["🌸", "🌷", "💮", "🌺"];
            flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];

            flower.style.left = e.clientX + "px";
            flower.style.top = e.clientY + "px";

            document.body.appendChild(flower);

            setTimeout(() => {
                flower.remove();
            }, 1000);
        };

        window.addEventListener("mousemove", handleMove);

        return () => {
            window.removeEventListener("mousemove", handleMove);
        };
    }, []);
}

export default useCursorFlowers;
