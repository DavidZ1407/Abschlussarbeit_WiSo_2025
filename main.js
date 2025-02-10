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
    let background; // Neue Instanz der Background-Klasse
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
        background = new Feuerwerk.Background(crc2);
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
        const explosionSound = new Audio("Sound/Firework.wav");
        explosionSound.play();
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
    function update() {
        background.draw();
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
        savedFireworks.forEach((config) => {
            console.log("Firework Name:", config);
        });
    }
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=main.js.map