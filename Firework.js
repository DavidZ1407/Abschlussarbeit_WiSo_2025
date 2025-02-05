"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    class Firework {
        particles = [];
        createdParticles = false;
        particleConfig;
        crc2;
        position;
        numberOfParticles;
        constructor(config, particleConfig) {
            const canvas = document.querySelector("canvas");
            if (canvas) {
                this.crc2 = canvas.getContext("2d");
            }
            else {
                console.error("Canvas nicht gefunden");
            }
            this.position = new Feuerwerk.Vector(config.positionX, config.positionY);
            this.numberOfParticles = config.numberOfParticles;
            this.particleConfig = particleConfig;
        }
        draw() {
            for (let particle of this.particles) {
                particle.draw();
            }
        }
        update() {
            if (!this.createdParticles) {
                for (let i = 0; i < this.numberOfParticles; i++) {
                    let startVelocity = new Feuerwerk.Vector((Math.random() - 0.5) * this.particleConfig.width, (Math.random() - 0.5) * this.particleConfig.width);
                    this.particles.push(new Feuerwerk.Particle(this.particleConfig, this.position.copy(), startVelocity));
                }
                this.createdParticles = true;
                return;
            }
            this.particles = this.particles.filter(particle => particle.alive);
            this.particles.forEach(particle => particle.update());
        }
    }
    Feuerwerk.Firework = Firework;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Firework.js.map