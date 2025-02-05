"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    window.addEventListener("load", handleLoad);
    let canvas;
    let crc2;
    let fireworks = [];
    let rect;
    let color = "#ff0000";
    let numberOfParticles = 50;
    let speed = 5;
    let size = 2;
    let width = 10;
    function updateColor() {
        const red = document.getElementById("red").value;
        const green = document.getElementById("green").value;
        const blue = document.getElementById("blue").value;
        color = `rgb(${red}, ${green}, ${blue})`;
        document.getElementById("color").style.backgroundColor = color;
    }
    function handleLoad() {
        canvas = document.querySelector("canvas");
        rect = canvas.getBoundingClientRect();
        canvas.addEventListener("click", handleClick);
        crc2 = canvas.getContext("2d");
        setInterval(update, 20);
        loadFireworkNames();
        document.getElementById("red").addEventListener("input", updateColor);
        document.getElementById("green").addEventListener("input", updateColor);
        document.getElementById("blue").addEventListener("input", updateColor);
        document.getElementById("numberOfParticles").addEventListener("input", (e) => numberOfParticles = parseInt(e.target.value));
        document.getElementById("speed").addEventListener("input", (e) => speed = parseInt(e.target.value));
        document.getElementById("size").addEventListener("input", (e) => size = parseInt(e.target.value));
        document.getElementById("width").addEventListener("input", (e) => width = parseInt(e.target.value));
    }
    function handleClick(e) {
        let fireworkConfig = {
            color: color,
            numberOfParticles: numberOfParticles,
            positionX: e.clientX - rect.left,
            positionY: e.clientY - rect.top,
            speed: speed
        };
        let particleConfig = {
            color: color,
            size: size,
            width: width
        };
        fireworks.push(new Feuerwerk.Firework(fireworkConfig, particleConfig));
        saveFirework(fireworkConfig);
    }
    function drawBackground() {
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "#05050555");
        gradient.addColorStop(0.62, "#00002255");
        gradient.addColorStop(1, "#00003355");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    function update() {
        drawBackground();
        fireworks.forEach(firework => {
            firework.draw();
            firework.update();
        });
    }
    function saveFirework(config) {
        let savedFireworks = JSON.parse(localStorage.getItem("fireworks") || "[]");
        savedFireworks.push(config);
        localStorage.setItem("fireworks", JSON.stringify(savedFireworks));
        console.log("Firework saved:", config);
    }
    function loadFireworkNames() {
        let savedFireworks = JSON.parse(localStorage.getItem("fireworks") || "[]");
        console.log("Loaded Firework Configurations:", savedFireworks);
    }
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=main.js.map