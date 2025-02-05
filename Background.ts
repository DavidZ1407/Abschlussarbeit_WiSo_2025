namespace Feuerwerk {
    interface Snowflake {
        x: number;
        y: number;
        radius: number;
        speedY: number;
        opacity: number;
    }

    export class Background {
        private crc2: CanvasRenderingContext2D;
        private snowflakes: Snowflake[] = [];
        private numberOfSnow: number = 50;
        private snowSpeed: number = 2;

        constructor(crc2: CanvasRenderingContext2D) {
            this.crc2 = crc2;
            this.initSnowflakes();
        }

        public setSnowSpeed(speed: number): void {
            this.snowSpeed = speed;
        }

        private initSnowflakes(): void {
            for (let i = 0; i < this.numberOfSnow; i++) {
                this.snowflakes.push({
                    x: Math.random() * this.crc2.canvas.width,
                    y: Math.random() * this.crc2.canvas.height,
                    radius: Math.random() * 2,
                    speedY: Math.random() * 1 + 0.5,
                    opacity: Math.random() * 0.5 + 0.3
                });
            }
        }

        public draw(): void {
            // Hintergrund zeichnen
            let gradient = this.crc2.createLinearGradient(0, 0, 0, this.crc2.canvas.height);
            gradient.addColorStop(0, "#05050555");
            gradient.addColorStop(0.62, "#00002255");
            gradient.addColorStop(1, "#00003355");
            this.crc2.fillStyle = gradient;
            this.crc2.fillRect(0, 0, this.crc2.canvas.width, this.crc2.canvas.height);

            // Schneeflocken aktualisieren und zeichnen
            this.updateSnowflakes();
            this.drawSnowflakes();
        }

        private updateSnowflakes(): void {
            for (let snowflake of this.snowflakes) {
                snowflake.y += snowflake.speedY * this.snowSpeed;

                // Schneeflocken wieder oben erscheinen lassen, wenn sie den unteren Rand erreichen
                if (snowflake.y > this.crc2.canvas.height) {
                    snowflake.y = 0;
                    snowflake.x = Math.random() * this.crc2.canvas.width;
                }
            }
        }

        private drawSnowflakes(): void {
            for (let snowflake of this.snowflakes) {
                this.crc2.beginPath();
                this.crc2.arc(snowflake.x, snowflake.y, snowflake.radius, 0, 2 * Math.PI);
                this.crc2.fillStyle = `rgba(255, 255, 255, ${snowflake.opacity})`;
                this.crc2.fill();
                this.crc2.closePath();
            }
        }
    }
}