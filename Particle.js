"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    class Particle {
        alive;
        lifetime = 40; // Lebenszeit verlängert für schnelle Bewegung
        position;
        velocity;
        speed; // Separater Geschwindigkeitsfaktor
        crc2;
        color;
        size;
        constructor(config, position, startVelocity, speed = 1) {
            this.position = position;
            this.velocity = startVelocity;
            this.speed = speed; // Geschwindigkeitsfaktor initialisieren
            this.color = config.color;
            this.size = config.size;
            this.alive = true;
            if (this.color == "#000000") {
                this.color = "#" + Math.floor(Math.random() * 8000000 + 8000000).toString(16);
            }
            const canvas = document.querySelector("canvas");
            if (canvas) {
                const context = canvas.getContext("2d");
                if (context) {
                    this.crc2 = context;
                }
                else {
                    throw new Error("Failed to get canvas 2D context.");
                }
            }
            else {
                throw new Error("Canvas element not found.");
            }
        }
        setSpeed(newSpeed) {
            this.speed = newSpeed;
        }
        setVelocity(newVelocity) {
            this.velocity = newVelocity;
        }
        applyVelocityChange(change) {
            this.velocity.add(change);
        }
        update() {
            const gravity = new Feuerwerk.Vector(0, 0.2); // Verstärkte Gravitation
            this.velocity.add(gravity); // Gravitation anwenden
            const scaledVelocity = new Feuerwerk.Vector(this.velocity.x * this.speed, this.velocity.y * this.speed);
            this.position.add(scaledVelocity); // Position mit separater Geschwindigkeit aktualisieren
            this.lifetime -= 1;
            if (this.lifetime <= 0)
                this.alive = false;
        }
        draw() {
            if (!this.alive)
                return;
            this.crc2.beginPath();
            this.crc2.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
            this.crc2.fillStyle = this.color;
            this.crc2.fill();
            this.crc2.strokeStyle = this.color;
            this.crc2.stroke();
        }
    }
    Feuerwerk.Particle = Particle;
    // export async function saveRocket(config: ParticleConfig): Promise<void> {
    //     let response = await fetch("server.php", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ command: "save", config })
    //     });
    //     let result = await response.json();
    //     console.log("Server response:", result);
    // }
    // export async function loadRockets(): Promise<ParticleConfig[]> {
    //     let response = await fetch("server.php?command=load");
    //     let rockets = await response.json();
    //     console.log("Loaded rockets:", rockets);
    //     return rockets;
    // }
    // async function testLoadRockets() {
    //     let rockets = await Feuerwerk.loadRockets();
    //     console.log("Geladene Raketen:", rockets);
    // }
    // testLoadRockets();
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Particle.js.map