namespace Feuerwerk {
    export interface FireworkConfig {
        color: string;
        numberOfParticles: number;
        positionX: number;
        positionY: number;
        speed: number;
    }

    export class Firework {
        particles: Particle[] = [];
        createdParticles: boolean = false;
        particleConfig: ParticleConfig;
        crc2: CanvasRenderingContext2D;
        position: Vector;
        numberOfParticles: number;

        constructor(config: FireworkConfig, particleConfig: ParticleConfig) {
            const canvas = document.querySelector("canvas");
            if (canvas) {
                this.crc2 = canvas.getContext("2d") as CanvasRenderingContext2D;
            } else {
                console.error("Canvas nicht gefunden");
            }

            this.position = new Vector(config.positionX, config.positionY);
            this.numberOfParticles = config.numberOfParticles;
            this.particleConfig = particleConfig;
        }

        draw(): void {
            for (let particle of this.particles) {
                particle.draw();
            }
        }

        update(): void {
            if (!this.createdParticles) {
                for (let i = 0; i < this.numberOfParticles; i++) {
                    let startVelocity = new Vector(
                        (Math.random() - 0.5) * this.particleConfig.width,
                        (Math.random() - 0.5) * this.particleConfig.width
                    );
                    this.particles.push(new Particle(this.particleConfig, this.position.copy(), startVelocity));
                }
                this.createdParticles = true;
                return;
            }

            this.particles = this.particles.filter(particle => particle.alive);
            this.particles.forEach(particle => particle.update());
        }
    }
}