import { useEffect } from "react";

export default function useCursorFlowers() {
    useEffect(() => {
        let lastTime = 0;

        const handleMove = (e) => {
            const now = Date.now();

            if (now - lastTime < 140) return;
            lastTime = now;

            const flower = document.createElement("div");
            flower.className = "flower";

            const size = Math.random() < 0.5 ? 16 : 22;
            const drift = Math.random() * 50 - 25;
            const rotateStart = Math.random() * 40 - 20;
            const rotateEnd = Math.random() * 300 + 90;
            const duration = 2.8 + Math.random() * 1.2;

            flower.style.left = `${e.clientX}px`;
            flower.style.top = `${e.clientY}px`;
            flower.style.width = `${size}px`;
            flower.style.height = `${size}px`;
            flower.style.setProperty("--drift", `${drift}px`);
            flower.style.setProperty("--rotate-start", `${rotateStart}deg`);
            flower.style.setProperty("--rotate-end", `${rotateEnd}deg`);
            flower.style.setProperty("--fall-duration", `${duration}s`);

            flower.innerHTML = `
                <svg viewBox="0 0 64 64" width="100%" height="100%" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <g stroke="#e6aeb6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <ellipse cx="32" cy="12" rx="9" ry="13"/>
                        <ellipse cx="50" cy="25" rx="9" ry="13" transform="rotate(72 50 25)"/>
                        <ellipse cx="43" cy="47" rx="9" ry="13" transform="rotate(144 43 47)"/>
                        <ellipse cx="21" cy="47" rx="9" ry="13" transform="rotate(-144 21 47)"/>
                        <ellipse cx="14" cy="25" rx="9" ry="13" transform="rotate(-72 14 25)"/>
                        <circle cx="32" cy="32" r="7"/>
                    </g>
                </svg>
            `;

            document.body.appendChild(flower);

            setTimeout(() => {
                flower.remove();
            }, duration * 1000);
        };

        window.addEventListener("mousemove", handleMove);

        return () => {
            window.removeEventListener("mousemove", handleMove);
        };
    }, []);
}